import PostDetailSection from "@/features/posts/sections/post-detail-section";
import { useParams } from "react-router";

// src/app/posts/[postId]/page.tsx
export default function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();

  if (!postId || isNaN(Number(postId))) {
    return <>찾으시는 게시글이 없습니다.</>;
  }
  return (
    <section className="space-y-6">
      <PostDetailSection postId={Number(postId)} />
    </section>
  );
}
