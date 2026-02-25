import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { CommentItem } from "../types";

export default function CommentCard({ comment }: { comment: CommentItem }) {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <p className="text-sm text-muted-foreground">
          작성자: {comment.author.nickname} ·{" "}
          {new Date(comment.createdAt).toLocaleString()}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="whitespace-pre-wrap leading-7">{comment.content}</p>
      </CardContent>

      {comment.children
        ? comment.children.map((child) => {
            return (
              <div style={{ paddingLeft: 10 }}>
                <CommentCard key={child.id} comment={child} />
              </div>
            );
          })
        : null}
    </Card>
  );
}
