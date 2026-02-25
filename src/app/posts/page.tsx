import { Button } from "@/components/ui/button";
import PostList from "@/features/posts/components/post-list";
import { Link } from "react-router";

// src/app/posts/page.tsx
export default function PostPage() {
  return (
    <div>
      <div className="flex justify-end p-4">
        <Button asChild>
          <Link to="/posts/write">글 쓰기</Link>
        </Button>
      </div>
      <PostList />
    </div>
  );
}
