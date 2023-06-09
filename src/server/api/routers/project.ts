import Client from "twitter-api-sdk";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  infiniteFeed: publicProcedure
    .input(
      z.object({
        name: z.string(),
        limit: z.number().optional(),
        cursor: z
          .object({ projectName: z.string(), id: z.string() })
          .optional(),
      })
    )
    .query(async ({ input: { limit = 20, cursor, name }, ctx }) => {
      const currentUserId = ctx.session?.user.id;

      const data = await ctx.prisma.project.findMany({
        take: limit + 1,
        cursor: cursor ? { projectName_id: cursor } : undefined,
        orderBy: [{ likes: { _count: "desc" } }, { id: "asc" }],
        where: {
          projectName: {
            startsWith: name.toLowerCase(),
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          projectName: true,
          username: true,
          twitterUrl: true,
          imageUrl: true,
          supply: true,
          mintPrice: true,
          mintDate: true,
          _count: { select: { likes: true } },
          likes:
            currentUserId == null
              ? false
              : { where: { userId: currentUserId } },
        },
      });

      let nextCursor: typeof cursor | undefined;
      if (data.length > limit) {
        const nextItem = data.pop();
        if (nextItem != null) {
          nextCursor = { id: nextItem.id, projectName: nextItem.projectName };
        }
      }

      const twitterBearerToken = process.env.TWITTER_BEARER_TOKEN;
      if (!twitterBearerToken) {
        throw new Error("TWITTER_BEARER_TOKEN environment variable is missing");
      }

      const twitterClient = new Client(twitterBearerToken);

      const projects = await Promise.all(
        data.map(async (project) => {
          let user;
          try {
            user = await twitterClient.users.findUserByUsername(
              project.username
            );
          } catch (error) {
            console.error(error);
          }

          console.debug(user);

          return {
            id: project.id,
            projectName: project.projectName,
            username: project.username,
            twitterUrl: project.twitterUrl,
            imageUrl: project.imageUrl,
            supply: project.supply,
            mintPrice: project.mintPrice,
            mintDate: project.mintDate,
            likeCount: project._count.likes,
            likedByMe: project.likes?.length > 0,
            userProfileImageUrl: user?.data?.profile_image_url,
            userFollowersCount:
              user?.data?.public_metrics?.followers_count ?? 0,
          };
        })
      );

      return {
        projects,
        nextCursor,
      };
    }),
  getProject: publicProcedure
    .input(
      z.object({
        projectId: z.string(),
      })
    )
    .query(async ({ input: { projectId }, ctx }) => {
      const project = await ctx.prisma.project.findFirst({
        where: { id: projectId },
        select: {
          id: true,
          projectName: true,
          username: true,
          twitterUrl: true,
          imageUrl: true,
          supply: true,
          mintPrice: true,
          mintDate: true,
          _count: { select: { likes: true } },
        },
      });

      if (!project) {
        throw new Error("Project not found");
      }

      return {
        id: project.id,
        projectName: project.projectName,
        username: project.username,
        twitterUrl: project.twitterUrl,
        imageUrl: project.imageUrl,
        supply: project.supply,
        mintPrice: project.mintPrice,
        mintDate: project.mintDate,
        likeCount: project._count.likes,
      };
    }),
  create: protectedProcedure
    .input(
      z.object({
        projectName: z.string(),
        username: z.string(),
        twitterUrl: z.string(),
        imageUrl: z.string(),
        supply: z.string(),
        mintPrice: z.string(),
        mintDate: z.date(),
      })
    )
    .mutation(
      async ({
        input: {
          projectName,
          username,
          twitterUrl,
          imageUrl,
          supply,
          mintPrice,
          mintDate,
        },
        ctx,
      }) => {
        return await ctx.prisma.project.create({
          data: {
            projectName,
            username,
            twitterUrl,
            imageUrl,
            supply,
            mintPrice,
            mintDate,
          },
        });
      }
    ),
  update: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        username: z.string(),
        twitterUrl: z.string(),
        // imageUrl: z.string(),
        supply: z.string(),
        mintPrice: z.string(),
        mintDate: z.date(),
      })
    )
    .mutation(
      async ({
        input: {
          projectId,
          projectName,
          username,
          twitterUrl,
          // imageUrl,
          supply,
          mintPrice,
          mintDate,
        },
        ctx,
      }) => {
        return await ctx.prisma.project.update({
          where: {
            id: projectId
          },
          data: {
            projectName,
            username,
            twitterUrl,
            // imageUrl,
            supply,
            mintPrice,
            mintDate,
          },
        });
      }
    ),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input: { id }, ctx }) => {
      return await ctx.prisma.project.delete({ where: { id: id } });
    }),
  toggleLike: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx }) => {
      const data = { projectId: id, userId: ctx.session.user.id };
      const existingLike = await ctx.prisma.like.findUnique({
        where: { userId_projectId: data },
      });

      if (existingLike == null) {
        await ctx.prisma.like.create({ data });
        return { addedLike: true };
      } else {
        await ctx.prisma.like.delete({ where: { userId_projectId: data } });
        return { addedLike: false };
      }
    }),
});
