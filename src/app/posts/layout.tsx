// src/app/posts/layout.tsx
import { Outlet } from "react-router";

export default function PostLayout() {
  return (
    <main className="mx-auto container">
      <h1>게시글 레이아웃</h1>
      <Outlet />
    </main>
  );
}
