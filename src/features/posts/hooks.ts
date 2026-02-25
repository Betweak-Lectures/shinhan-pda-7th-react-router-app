// src/features/posts/hooks.ts
import { useQuery } from "@tanstack/react-query";
import {
  getPostCommentQueryOption,
  getPostDetailQueryOption,
  getPostListQueryOptions,
} from "./queries";

export function usePostList({ page, limit }: { page: number; limit: number }) {
  // api 요청 -> state 저장
  return useQuery(getPostListQueryOptions(page, limit));
}

export function usePostDetail({ postId }: { postId: number }) {
  return useQuery(getPostDetailQueryOption(postId));
}

export function usePostComments({ postId }: { postId: number }) {
  return useQuery(getPostCommentQueryOption(postId));
}
