import type { ApiPaginationEnvelope } from "@/types/api-envelope";
import type { PostItem } from "./types";

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
