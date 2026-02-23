import { SignupForm } from "@/features/auth/components/signup-form";

export default function SignUpPage() {
  return (
    <div>
      <div className="flex w-full flex-col items-center p-6">
        <div className="w-full max-w-sm">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
