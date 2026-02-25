import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { commentWriteForm, type CommentWriteForm } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postQueryKey } from "../queries";
import { writeComment } from "../apis";
import { toast } from "sonner";
import { useNavigate } from "react-router";
export default function CommentWrite({
  parentId,
  postId,
}: {
  parentId: number;
  postId: number;
}) {
  const defaultValue: CommentWriteForm = {
    content: "",
  };
  if (parentId) {
    defaultValue.parentId = parentId;
  }

  const form = useForm<CommentWriteForm>({
    resolver: zodResolver(commentWriteForm),
    defaultValues: defaultValue,
    mode: "onChange",
  });

  const qc = useQueryClient();

  const { mutateAsync: editMutate } = useMutation({
    mutationFn: async (data: CommentWriteForm) => {
      console.log("data", data);
      if (postId) {
        return await writeComment(postId, data);
      }
    },
    onSuccess: (data) => {
      console.log(data);
      if (data?.comment.id) {
        qc.invalidateQueries({
          queryKey: postQueryKey.comments(data.comment.postId),
        });
        qc.invalidateQueries({
          queryKey: postQueryKey.all(),
        });
      }
    },
  });

  const onSubmit: SubmitHandler<CommentWriteForm> = (data) => {
    editMutate(data);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>댓글 달기</FieldLabel>
                <Textarea {...field} id={field.name} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button type="submit">작성</Button>
        </form>
      </Form>
    </div>
  );
}
