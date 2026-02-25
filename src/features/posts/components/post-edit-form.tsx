import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { postEditFormSchema, type PostEditFormSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost } from "../apis";
import { postQueryKey } from "../queries";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { usePostDetail } from "../hooks";
import { Spinner } from "@/components/ui/spinner";

export interface PostEditFormProps {
  postId: number;
}

export default function PostEditForm({ postId }: PostEditFormProps) {
  const { data: post, isLoading } = usePostDetail({ postId });

  const form = useForm<PostEditFormSchema>({
    resolver: zodResolver(postEditFormSchema),
    defaultValues: {
      title: post?.title,
      content: post?.content,
    },
    mode: "onChange",
  });

  const navigate = useNavigate();

  const qc = useQueryClient();

  const { mutateAsync: editMutate } = useMutation({
    mutationFn: async (data: PostEditFormSchema) => {
      if (postId) {
        return await editPost(postId, data);
      }
    },
    onSuccess: (data) => {
      if (data?.post.id) {
        qc.invalidateQueries({
          queryKey: postQueryKey.detail(data.post.id),
        });
        qc.invalidateQueries({
          queryKey: postQueryKey.all(),
        });
        toast("게시글이 수정되었습니다.");
        navigate(`/posts/${data.post.id}`);
      }
    },
  });

  const onSubmit: SubmitHandler<PostEditFormSchema> = (data) => {
    editMutate(data);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>게시글 수정</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>제목</FieldLabel>
                      <Input {...field} id={field.name} type="text" />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="content"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>내용</FieldLabel>

                      <Textarea
                        {...field}
                        id={field.name}
                        rows={10}
                        className="min-h-20"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Field>
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {postId ? `수정` : "작성"}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
      <h1>{postId ? `게시글 수정 (${postId})` : "게시글 작성"}</h1>
    </div>
  );
}
