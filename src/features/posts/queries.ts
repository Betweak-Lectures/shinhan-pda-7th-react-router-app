// src/features/posts/queries.ts
import { fetchPostComments, fetchPostDetail, fetchPostList } from "./apis";

// Query KEY
export const POST_LIST_QUERY_KEY = "posts" as const;

// Query Key 관리 변경
export const postQueryKey = {
  list: (page: number, limit: number) => ["posts", page, limit] as const,
  detail: (postId: number) => ["posts", "details", postId] as const,

  comments: (postId: number) => ["posts", "comments", postId],
} as const;

// queryOptions
export function getPostListQueryOptions(page: number = 1, limit: number = 10) {
  return {
    queryKey: postQueryKey.list(page, limit),
    queryFn: () => fetchPostList(page, limit),
  };
}

export function getPostDetailQueryOption(postId: number) {
  return {
    queryKey: postQueryKey.detail(postId),
    queryFn: () => fetchPostDetail(postId),
  };
}

export function getPostCommentQueryOption(postId: number) {
  return {
    queryKey: postQueryKey.comments(postId),
    queryFn: () => fetchPostComments(postId),
  };
}
