import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <div>
      <div className="flex w-full flex-col items-center p-6">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
