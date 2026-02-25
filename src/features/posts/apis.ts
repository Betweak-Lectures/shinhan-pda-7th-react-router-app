import type { ApiPaginationEnvelope } from "@/types/api-envelope";
import { apiRequest } from "@/lib/api-client";
import type { CommentItem, PostItem } from "./types";

export async function fetchPostList(page: number, pageSize: number) {
  // 환경변수 받은 것 사용
  // const url = `${import.meta.env.VITE_BASE_API_URL}/posts?page=${page}&pageSize=${pageSize}`;
  const url = `/api/posts?page=${page}&pageSize=${pageSize}`;
  try {
    const resp = await fetch(url);
    const data = (await resp.json()) as ApiPaginationEnvelope<PostItem>;

    if (data.success) {
      return data.data;
    }

    throw new Error(data.error.message);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function fetchPostDetail(postId: number) {
  try {
    const result = await apiRequest<{ post: PostItem }>(`/api/posts/${postId}`);

    if (result.success) {
      return result.data.post;
    } else {
      throw new Error(result.error.message);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function fetchPostComments(postId: number) {
  try {
    const result = await apiRequest<{
      postId: number;
      comments: CommentItem[];
    }>(`/api/posts/${postId}/comments`);

    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error.message);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function editPost(
  postId: number,
  payload: Partial<Omit<PostItem, "id">>,
) {
  try {
    const result = await apiRequest<{ post: PostItem }>(
      `/api/posts/${postId}`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      },
    );
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error.message);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function writePost(payload: { title: string; content: string }) {
  try {
    const result = await apiRequest<{ post: PostItem }>(`/api/posts`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error.message);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function writeComment(
  postId: number,
  payload: { content: string },
) {
  try {
    const result = await apiRequest<{ post: PostItem }>(
      `/api/posts/${postId}/comments`,
      {
        method: "POST",
        body: JSON.stringify({
          content: payload.content,
        }),
      },
    );
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error.message);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
