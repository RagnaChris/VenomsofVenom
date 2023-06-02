import { FormEvent, useState } from "react";
import { api } from "~/utils/api";
import Image from "next/image";
import { Notify } from "notiflix";

export function NewProjectForm() {
  return <Form />;
}

function Form() {
  const [projectName, setProjectName] = useState("");
  const [username, setUsername] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [supply, setSupply] = useState("");
  const [mintPrice, setMintPrice] = useState("");
  const [mintDate, setMintDate] = useState("");

  const createProject = api.project.create.useMutation({
    onSuccess: () => {
      Notify.success("Project created successfully!");
    },
    onError: (event) => {
      Notify.failure(event.message);
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // if (!imageFile) {
    //   console.error("No Image");
    //   return
    // }

    createProject.mutate({
      projectName: projectName,
      username: username,
      twitterUrl: twitterUrl,
      imageUrl: "",
      supply: supply,
      mintPrice: mintPrice,
      mintDate: new Date(mintDate),
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setImageFile(file);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative grid grid-cols-5 gap-3 font-bold"
    >
      <div className="relative col-span-2 mx-16 mb-24 flex flex-col justify-center rounded-lg border-transparent bg-green-300/10">
        <input
          className="hidden"
          type="file"
          id="image"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <label className="flex flex-col items-center gap-5" htmlFor="image">
          {imageFile ? (
            <Image
              src={URL.createObjectURL(imageFile)}
              alt="Selected Image"
              height={100}
              width={100}
            />
          ) : (
            <Image
              src="/assets/add.png"
              alt="Upload Logo"
              height={100}
              width={100}
            />
          )}
          Upload Logo
        </label>
      </div>
      <div className="col-span-3 mr-24 gap-4">
        <div className="flex flex-col">
          <label htmlFor="projectName">Project Name</label>
          <input
            className="rounded-md bg-green-300/10 px-3"
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            className="rounded-md bg-green-300/10 px-3"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="twitterUrl">Twitter URL</label>
          <input
            className="rounded-md bg-green-300/10 px-3"
            type="text"
            id="twitterUrl"
            value={twitterUrl}
            onChange={(e) => setTwitterUrl(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="supply">Project Supply</label>
          <input
            className="rounded-md bg-green-300/10 px-3"
            type="text"
            id="supply"
            value={supply}
            onChange={(e) => setSupply(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="mintPrice">Mint Price</label>
          <input
            className="rounded-md bg-green-300/10 px-3"
            type="text"
            id="mintPrice"
            value={mintPrice}
            onChange={(e) => setMintPrice(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="mintDate">Mint Date</label>
          <input
            className="rounded-md bg-green-300/10 px-3"
            type="date"
            id="mintDate"
            value={mintDate}
            onChange={(e) => setMintDate(e.target.value)}
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className=" col-start-3 mt-5 flex justify-center rounded-md border border-transparent bg-green-300/10"
      >
        Save and Upload
      </button>
    </form>
  );
}
export default NewProjectForm;
