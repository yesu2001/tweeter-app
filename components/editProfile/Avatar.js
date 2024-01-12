import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Avatar({ url, size, setUserData }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

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

  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const supabase = createClient();
      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }
      const { data, error: getUrlError } = await supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      console.log(data);
      setUserData((prevState) => ({
        ...prevState,
        user_pic: data.publicUrl,
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
          src={avatarUrl}
          alt="Avatar"
          className="rounded-md object-cover object-center"
          style={{ height: size, width: size }}
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
