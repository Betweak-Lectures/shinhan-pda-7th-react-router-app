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
import { Link } from "react-router";

export function LoginForm() {
  const [formInput, setFormInput] = useState<LoginFormData>({
    email: "",
    password: "",
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
    <div className={"flex flex-col gap-6"}>
      <Card>
        <CardHeader>
          <CardTitle>로그인</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
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
