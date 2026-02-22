import AppHeader from "@/components/layouts/app-header";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div>
      {/* 메인 레이아웃 */}
      <AppHeader />
      {/* 자식 element가 Outlet 위치에 렌더링 됩니다. */}
      <Outlet />
    </div>
  );
}
