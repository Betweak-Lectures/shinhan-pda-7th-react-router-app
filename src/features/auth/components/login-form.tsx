// src/features/auth/components/login-form.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState, type ChangeEvent } from "react";
import type { LoginFormData } from "../types";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks";
import { toast } from "sonner";

export function LoginForm() {
  const [formInput, setFormInput] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await login(formInput);
    if (result.success) {
      toast(`${result.data.user.nickname}님 환영합니다.`);
      navigate("/");
    } else {
      toast.error(`${result.error.message}`);
    }
  };

  return (
    <div className={"flex flex-col gap-6"}>
      <Card>
        <CardHeader>
          <CardTitle>로그인</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">이메일</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  value={formInput.email}
                  onChange={onInputChange}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">비밀번호</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  value={formInput.password}
                  onChange={onInputChange}
                />
              </Field>
              <Field>
                <Button type="submit">로그인</Button>

                <FieldDescription className="text-center">
                  아직 계정이 없으십니까? <Link to="/signup">회원가입</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
