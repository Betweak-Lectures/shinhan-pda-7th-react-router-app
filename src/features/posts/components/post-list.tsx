import { PostCard } from "./post-card";

// ?page=1, ?page=2

import { Spinner } from "@/components/ui/spinner";
import { usePostList } from "../hooks";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router";

export default function PostList() {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
  });
  const page = Number(searchParams.get("page"));

  // const pageNum = searchParams.
  // api 요청 -> state 저장
  const {
    data: posts,
    isLoading,
    isError,
    // error,
  } = usePostList({
    page: page,
    limit: 10,
  });

  const pageSize = Math.floor(page / 10) * 10;

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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (Number(page) > 1) {
                  setSearchParams({
                    page: String(page - 1),
                  });
                }
              }}
            />
          </PaginationItem>

          {[...Array(10).keys()].map((elem, idx) => {
            const targetPage = pageSize + idx + 1;
            return (
              <PaginationItem>
                <PaginationLink
                  isActive={page === targetPage}
                  onClick={() => {
                    setSearchParams({
                      page: String(targetPage),
                    });
                  }}
                >
                  {targetPage}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => {
                if (Number(page) > 1) {
                  setSearchParams({
                    page: String(page + 1),
                  });
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
