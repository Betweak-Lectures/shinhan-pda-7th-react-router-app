// src/router.tsx
import { createBrowserRouter } from "react-router";
import MainLayout from "./app/layout";
import MainPage from "./app/page";
import PostLayout from "./app/posts/layout";
import PostPage from "./app/posts/page";
import ErrorPage from "./app/error";
import PostWritePage from "./app/posts/write/page";
import PostDetailPage from "./app/posts/[postId]/page";
import PostEditPage from "./app/posts/[postId]/edit/page";
import AuthLayout from "./app/(auth)/layout";
import LoginPage from "./app/(auth)/login/page";
import SignUpPage from "./app/(auth)/sign-up/page";

// :으로 시작 ==> parameter 입력(변수입력)
// 1. posts/write --> PostWritePage
// 2. posts/:postId --> PostDetailPage (/posts/3, /posts/4, ... 모두 서빙)
// 3. posts/:postId/edit --> PostEditPage

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        // index router : 부모 경로를 요청했을 때 보여줄 element를 정의
        // 없을경우 렌더링되지 않음.
        index: true,
        element: <MainPage />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "sign-up",
            element: <SignUpPage />,
          },
        ],
      },
      {
        path: "posts",
        element: <PostLayout />,
        // children: 상위 element의 <Outlet/> 위치에 들어갑니다.
        children: [
          {
            index: true,
            element: <PostPage />,
          },
          {
            path: "write",
            element: <PostWritePage />,
          },
          {
            // path의 콜론으로 시작하는 것은 paramter로 컴포넌트 내에서 받을 수 있습니다.
            path: ":postId",
            element: <PostDetailPage />,
          },
          {
            path: ":postId/edit",
            element: <PostEditPage />,
          },
        ],
      },
      {
        // 와일드카드 라우터 --> 매칭되는 라우터가 없을 경우 렌더링됩니다.
        path: "*",
        element: <ErrorPage code={404} message="페이지를 찾을 수 없습니다." />,
      },
    ],
  },
]);
