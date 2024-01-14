import { createClient } from "./supabase/client";

const supabase = createClient();

export const uploadImage = async (file) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  let { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  if (uploadError) {
    console.log(uploadError);
    throw uploadError;
  }
  const { data, error: getUrlError } = await supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  console.log(data);
  return {
    data,
  };
};
