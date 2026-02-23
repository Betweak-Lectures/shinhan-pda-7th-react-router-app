import { RouterProvider } from "react-router/dom";
import { router } from "./router";

import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./features/auth/components/auth-provider";

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
      </AuthProvider>
    </>
  );
}
// 실행후: '/', '/posts' 접속

export default App;
