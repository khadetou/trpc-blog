import moment from "moment";
import { Dialog, Transition } from "@headlessui/react";
import { HiXMark } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/utils/api";
import { toast } from "react-hot-toast";
import { type Dispatch, type FC, type SetStateAction, Fragment } from "react";

type CommentSidebarProps = {
  showCommentSidebar: boolean;
  setShowCommentSidebar: Dispatch<SetStateAction<boolean>>;
  postId: string;
};

type CommentFormType = { text: string };

export const commentFormSchema = z.object({
  text: z.string().min(3),
});

const CommentSidebar: FC<CommentSidebarProps> = ({
  showCommentSidebar,
  setShowCommentSidebar,
  postId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<CommentFormType>({ resolver: zodResolver(commentFormSchema) });

  const postRoute = api.useContext().post;

  const submitComment = api.post.submitComment.useMutation({
    onSuccess: () => {
      toast.success("🥳");
      postRoute.getComments.invalidate({
        postId,
      });
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const getComments = api.post.getComments.useQuery({
    postId,
  });

  return (
    <Transition.Root show={showCommentSidebar} as={Fragment}>
      <Dialog as="div" onClose={() => setShowCommentSidebar(false)}>
        <div className="fixed right-0 top-0">
          <Transition.Child
            enter="transition duration-100"
            leave="transition duration-500"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leaveFrom="translate-x-0"
            leaveTo="translae-x-full"
          >
            <Dialog.Panel className="relative h-screen w-[200px] bg-white shadow-md sm:w-[400px]">
              <div className="flex h-full w-full flex-col overflow-scroll px-6">
                <div className="mb-5 mt-10 flex items-center justify-between text-xl">
                  <h2 className="font-medium">Response (4)</h2>
                  <div>
                    <HiXMark
                      className="cursor-pointer"
                      onClick={() => setShowCommentSidebar(false)}
                    />
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit((data) => {
                    submitComment.mutate({
                      ...data,
                      postId,
                    });
                  })}
                  className="my-6 flex flex-col items-end space-y-5"
                >
                  <textarea
                    className="w-full rounded-xl border border-gray-300 p-4 shadow-lg outline-none focus:border-gray-600"
                    id="comment"
                    rows={3}
                    placeholder="What are your thoughts?"
                    {...register("text")}
                  />
                  {isValid && (
                    <button
                      type="submit"
                      className="flex items-center space-x-3 rounded border border-gray-300 px-4 py-2 transition hover:border-gray-900 hover:text-gray-900"
                    >
                      Comment
                    </button>
                  )}
                </form>
                <div className="flex-co flex items-center justify-center space-y-6">
                  {getComments.isSuccess &&
                    getComments.data.map((comment) => (
                      <div
                        className="flex w-full flex-col space-y-2 border-b border-b-gray-300 pb-4 last:border-none"
                        key={comment.id}
                      >
                        <div className="flex w-full items-center space-x-2 text-xs">
                          <div className="font-semibold">
                            {comment.user.name}
                            <p>
                              {moment(comment.createdAt, "YYYYDDMM").fromNow()}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          {comment.text}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CommentSidebar;
