import { useEffect, useState } from "react";
import Image from "next/image";
import defaultPic from "../assets/defaultPic.png";
import { uploadImage } from "@/utils/clientHelpers";

export default function Avatar({ url, size, setUserData }) {
  const [avatarUrl, setAvatarUrl] = useState(url);
  const [uploading, setUploading] = useState(false);

  console.log(avatarUrl);

  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];

      const { data } = await uploadImage(file);
      setAvatarUrl(data?.publicUrl);
      setUserData((prevState) => ({
        ...prevState,
        user_pic: data?.publicUrl,
      }));
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {avatarUrl ? (
        <img
          src={url.length > 0 ? url : defaultPic}
          alt="Avatar"
          className="rounded-md object-cover object-center"
          style={{ height: "100px", width: "100px" }}
        />
      ) : (
        <div
          className="avatar no-image"
          style={{ height: size, width: size }}
        />
      )}
      <div className="mt-4">
        <label
          className="bg-green-500 text-white rounded-md px-3 py-1"
          htmlFor="single"
        >
          {uploading ? "Uploading ..." : "Upload"}
        </label>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}

// useEffect(() => {
//   if (url) downloadImage(url);
// }, [url]);

// async function downloadImage(path) {
//   try {
//     const supabase = createClient();
//     const { data, error } = await supabase.storage
//       .from("avatars")
//       .download(path);
//     if (error) {
//       throw error;
//     }
//     const url = URL.createObjectURL(data);
//     setAvatarUrl(url);
//   } catch (error) {
//     console.log("Error downloading image: ", error.message);
//   }
// }
