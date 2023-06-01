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
        limit: z.number().optional(),
        cursor: z
          .object({ projectName: z.string(), id: z.string() })
          .optional(),
      })
    )
    .query(async ({ input: { limit = 20, cursor }, ctx }) => {
      const currentUserId = ctx.session?.user.id;

      const data = await ctx.prisma.project.findMany({
        take: limit + 1,
        cursor: cursor ? { projectName_id: cursor } : undefined,
        orderBy: [{ likes: { _count: "desc" } }, { id: "asc" }],
        select: {
          id: true,
          projectName: true,
          twitterUrl: true,
          logoUrl: true,
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
      return {
        projects: data.map((project) => {
          return {
            id: project.id,
            projectName: project.projectName,
            twitterUrl: project.twitterUrl,
            logoUrl: project.logoUrl,
            supply: project.supply,
            mintPrice: project.mintPrice,
            mintDate: project.mintDate,
            likeCount: project._count.likes,
            likedByMe: project.likes?.length > 0,
          };
        }),
        nextCursor,
      };
    }),
  // create: protectedProcedure
  //   .input(z.object({ content: z.string() }))
  //   .mutation(async ({ input: { content }, ctx }) => {
  //     return await ctx.prisma.project.create({ data: content });
  //   }),
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
