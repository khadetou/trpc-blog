import moment from "moment";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { api } from "@/utils/api";

const SideSection = () => {
  const readingList = api.post.getReadingList.useQuery();
  const suggestions = api.user.getSuggestions.useQuery();

  const followUser = api.user.followUser.useMutation({
    onSuccess: () => {
      toast.success("user followed");
    },
  });

  return (
    <aside className="col-span-4 flex flex-col space-y-4 p-6">
      <div>
        <h3 className="my-6 text-lg font-semibold">
          People you might be interested
        </h3>
        <div className="flex flex-col space-y-4">
          {suggestions.isSuccess &&
            suggestions.data.map((user) => (
              <div
                key={user.id}
                className="flex flex-row items-center space-x-5"
              >
                <div className="h-10 w-10 flex-none rounded-full bg-gray-300"></div>
                <div>
                  <div className="text-sm font-bold text-gray-900">
                    {user.name}
                  </div>
                  <div className="text-xs">{user.username}</div>
                  <div>
                    <button
                      onClick={() =>
                        followUser.mutate({
                          followingUserId: user.id,
                        })
                      }
                      className="flex items-center space-x-3 rounded border border-gray-400/50 px-4 py-2 transition hover:border-gray-900 hover:text-gray-900"
                    >
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div>
        <h3 className="my-6 text-lg font-semibold">Your reading list</h3>
        <div className="flex flex-col space-y-8">
          {readingList.data &&
            readingList.data.map((bookmark) => (
              <Link
                href={`${bookmark.post.slug}`}
                key={bookmark.id}
                className="group flex items-center space-x-6"
              >
                <div className="aspect-square h-full w-2/5 rounded-xl bg-gray-300">
                  <div className="text-lg font-semibold decoration-indigo-600 group-hover:underline">
                    {bookmark.post.title}
                  </div>
                  <div className="truncate">{bookmark.post.description}</div>
                  <div className="flex w-full items-center space-x-4">
                    <div className="roundee h-8 w-8">
                      {bookmark.post.author.name} &#x2022;
                    </div>
                    <div>
                      {moment(bookmark.post.createdAt, "DDMMYYYY").fromNow()}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </aside>
  );
};

export default SideSection;
