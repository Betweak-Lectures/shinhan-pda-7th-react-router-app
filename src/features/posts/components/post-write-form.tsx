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
import { writePost } from "../apis";
import { postQueryKey } from "../queries";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function PostWriteForm() {
  const form = useForm<PostEditFormSchema>({
    resolver: zodResolver(postEditFormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
    mode: "onChange",
  });

  const navigate = useNavigate();

  const qc = useQueryClient();

  const { mutateAsync: writeMutate } = useMutation({
    mutationFn: async (data: PostEditFormSchema) => {
      return await writePost(data);
    },
    onSuccess: (data) => {
      if (data?.post.id) {
        qc.invalidateQueries({
          queryKey: postQueryKey.detail(data.post.id),
        });
        qc.invalidateQueries({
          queryKey: postQueryKey.all(),
        });
        toast("게시글이 작성되었습니다.");
        navigate(`/posts/${data.post.id}`);
      }
    },
  });

  const onSubmit: SubmitHandler<PostEditFormSchema> = (data) => {
    writeMutate(data);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>게시글 작성</CardTitle>
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
                    작성
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
