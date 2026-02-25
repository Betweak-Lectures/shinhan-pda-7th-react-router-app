import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { CommentItem } from "../types";
import { useAuth } from "@/features/auth/hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CommentWrite from "./comment-write-form";

export default function CommentCard({ comment }: { comment: CommentItem }) {
  const { user } = useAuth();

  const isMine = user && user.id === comment.author.id;

  const [isOpenForm, setIsOpenForm] = useState(false);

  return (
    <Card>
      <CardHeader className="space-y-2">
        <p className="text-sm text-muted-foreground">
          작성자: {comment.author.nickname} ·{" "}
          {new Date(comment.createdAt).toLocaleString()} ·{" "}
          {isMine ?? (
            <>
              · <Badge>내 댓글</Badge>
            </>
          )}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="whitespace-pre-wrap leading-7">{comment.content}</p>
        <Button
          onClick={() => {
            setIsOpenForm((prev) => !prev);
          }}
        >
          {!isOpenForm ? "댓글달기" : "닫기"}
        </Button>
        {isOpenForm ? (
          <>
            <CommentWrite postId={comment.postId} parentId={comment.id} />
          </>
        ) : null}
      </CardContent>

      {comment.children
        ? comment.children.map((child) => {
            return (
              <div className="px-3">
                <CommentCard key={child.id} comment={child} />
              </div>
            );
          })
        : null}
    </Card>
  );
}
