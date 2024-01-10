import Filters from "@/components/explore/Filters";
import Posts from "@/components/home/Posts";

export default function Bookmarks() {
  const filters = ["tweets", "tweets & replies", "media", "likes"];
  return (
    <div className="flex-1 w-full flex flex-col md:flex-row gap-8 mx-4 md:mx-60 my-6">
      <div className="flex-[0.3]">
        <Filters filters={filters} defaultFilter={"tweets"} />
      </div>
      <div className="flex-[0.7] flex flex-col space-y-4">
        <Posts />
      </div>
    </div>
  );
}
