import PostEditForm from "@/features/posts/components/post-edit-form";
import { useParams } from "react-router";

// src/app/posts/[postId]/edit/page.tsx
export default function PostEditPage() {
  const { postId } = useParams<{ postId: string }>();

  if (!postId || isNaN(Number(postId))) {
    return <>찾으시는 게시글이 없습니다.</>;
  }
  return (
    <div>
      <PostEditForm postId={Number(postId)} />
    </div>
  );
}
