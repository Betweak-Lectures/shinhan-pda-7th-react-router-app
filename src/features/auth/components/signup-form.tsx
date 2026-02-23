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
import { Link } from "react-router";
import type { SignupFormData } from "../types";

export function SignupForm() {
  const [formInput, setFormInput] = useState<SignupFormData>({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>회원가입</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">이메일</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                name="email"
                value={formInput.email}
                onChange={onInputChange}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="name">닉네임</FieldLabel>
              <Input
                id="nickname"
                name="nickname"
                value={formInput.nickname}
                onChange={onInputChange}
                type="text"
                placeholder="John Doe"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">비밀번호</FieldLabel>
              <Input
                id="password"
                type="password"
                name="password"
                value={formInput.password}
                onChange={onInputChange}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">비밀번호 확인</FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                name="confirmPassword"
                value={formInput.confirmPassword}
                onChange={onInputChange}
                required
              />
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">회원가입</Button>

                <FieldDescription className="px-6 text-center">
                  이미 계정이 있으신가요? <Link to="/login">로그인</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
