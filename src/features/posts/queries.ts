// src/features/posts/queries.ts
import { fetchPostList } from "./apis";

// Query KEY
export const POST_LIST_QUERY_KEY = "posts";

// queryOptions
export function getPostListQueryOptions(page: number = 1, limit: number = 10) {
  return {
    queryKey: [POST_LIST_QUERY_KEY, page, limit],
    queryFn: () => fetchPostList(page, limit),
  };
}
