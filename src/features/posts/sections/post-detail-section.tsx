import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useAuth } from "@/features/auth/hooks";
import { Link } from "react-router";

import { usePostDetail } from "../hooks";
import { Spinner } from "@/components/ui/spinner";

interface PostDetailSectionProps {
  postId: number;
}

export default function PostDetailSection({ postId }: PostDetailSectionProps) {
  const { user } = useAuth();
  const { data: post, isLoading, isError, error } = usePostDetail({ postId });

  const isMine = user && user.id === post?.authorId;

  if (isLoading) {
    return <Spinner className="w-2xl h-2xl" />;
  }
  if (isError) {
    <div>에러가 발생하였습니다: {error.message}</div>;
  }

  if (!post) {
    return <div>찾으시는 페이지가 없습니다.</div>;
  }
  return (
    <section className="space-y-6">
      <Card>
        <CardHeader className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>{post.title}</CardTitle>
            {isMine ? <Badge variant="outline">내 글</Badge> : null}
          </div>
          <p className="text-sm text-muted-foreground">
            작성자: {post.authorNickname} ·{" "}
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="whitespace-pre-wrap leading-7">{post.content}</p>

          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" variant={"outline"} onClick={() => {}}>
              ({post.likeCount})
            </Button>

            <Button asChild size="sm" variant="secondary">
              <Link to="/posts">목록</Link>
            </Button>

            {isMine ? (
              <>
                <Button asChild size="sm" variant="outline">
                  <Link to={`/posts/${post.id}/edit`}>수정</Link>
                </Button>

                <Button size="sm" variant="destructive">
                  삭제
                </Button>
              </>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
