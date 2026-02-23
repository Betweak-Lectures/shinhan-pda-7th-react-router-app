import { RouterProvider } from "react-router/dom";
import { router } from "./router";

import { Toaster } from "@/components/ui/sonner";
// import { AuthProvider } from "./features/auth/components/auth-provider";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query-client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <>
      {/* React Query를 쓰므로 AuthProvider제거 */}
      <QueryClientProvider client={queryClient}>
        {/* <AuthProvider> */}
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />

        {/* </AuthProvider> */}
      </QueryClientProvider>
    </>
  );
}
// 실행후: '/', '/posts' 접속

export default App;
