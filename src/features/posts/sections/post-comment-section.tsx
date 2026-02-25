import { usePostComments } from "../hooks";
import { Spinner } from "@/components/ui/spinner";
import CommentCard from "../components/comment-card";

interface PostCommentSectionProps {
  postId: number;
}

export default function PostCommentSection({
  postId,
}: PostCommentSectionProps) {
  const {
    data: commentData,
    isLoading,
    isError,
    error,
  } = usePostComments({ postId });

  if (isLoading) {
    return <Spinner className="w-2xl h-2xl" />;
  }
  if (isError) {
    <div>에러가 발생하였습니다: {error.message}</div>;
  }

  if (!commentData) {
    return <div>댓글이 없습니다.</div>;
  }

  return (
    <section className="space-y-6">
      {commentData.comments?.map((comment) => {
        return <CommentCard key={comment.id} comment={comment} />;
      })}
    </section>
  );
}
