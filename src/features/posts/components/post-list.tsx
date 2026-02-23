import { PostCard } from "./post-card";

import { Spinner } from "@/components/ui/spinner";
import { usePostList } from "../hooks";

export default function PostList() {
  // api 요청 -> state 저장
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = usePostList({
    page: 1,
    limit: 10,
  });

  return (
    <div>
      {isLoading && <Spinner />}
      {isError && <div>에러가 발생하였습니다.</div>}
      {!isLoading && !isError && (!posts || posts.items.length === 0) && (
        <p>게시글이 없습니다..</p>
      )}
      {posts?.items.map((post) => {
        return (
          <PostCard
            key={post.id}
            post={post}
            isLikePending={false}
            onToggleLike={() => {}}
            likedByMe={false}
            // viewerUserId=""
          />
        );
      })}
    </div>
  );
}
