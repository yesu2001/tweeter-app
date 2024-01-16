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

export function parseAndFormatDate(dateString) {
  const date = new Date(dateString);

  // Extract the date components
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" }); // Month name in full
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensure 2-digit minutes

  // Adjust for desired time zone (here, assuming UTC+8 for 20:43)
  const adjustedHours = hours + 8;
  const adjustedMinutes = minutes; // Minutes remain unchanged

  // Combine the formatted components
  const formattedDate = `${day} ${month} ${year} at ${adjustedHours}:${adjustedMinutes}`;

  return formattedDate;
}
