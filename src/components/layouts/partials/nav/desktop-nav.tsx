// src/components/layouts/partials/nav/desktop-nav.tsx
import { Link, NavLink } from "react-router";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/hooks";
import { toast } from "sonner";

interface DesktopNavProps {
  navItems: { to: string; label: string; end?: boolean }[];
}

export default function DesktopNav({ navItems }: DesktopNavProps) {
  const { user, logout } = useAuth();
  return (
    <>
      <nav className="ml-10 hidden items-center gap-6 md:flex">
        {navItems.map((item) => (
          // NavLink: 기본적으로 Link컴포넌트와 같다.
          // 다른점은 현재 브라우저의 경로와 NavLink의 to와 비교해서
          // 같으면 isActive를 true로 준다.
          // styling을 위한 것이라 className과 style props의 형태가
          // 함수이며, 함수의 인자의 객체의 키로 isActive값을 줍니다.

          // end props는 뭐에요? 어디까지 같아야 isActive가 true?
          // end: true 완전히 같아야 isActive, false: 시작만 하면 isActive true
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => {
              return cn(
                "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                isActive && "text-foreground",
              );
            }}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="ml-auto hidden items-center gap-2 md:flex">
        {user ? (
          <Button
            variant="ghost"
            onClick={async () => {
              const result = await logout();
              if (result.success) {
                toast("로그아웃하셨습니다.");
                // navigate
              }
            }}
          >
            로그아웃
          </Button>
        ) : (
          <>
            <Button variant="ghost" asChild>
              <Link to="/login">로그인</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">회원가입</Link>
            </Button>
          </>
        )}
      </div>
    </>
  );
}
