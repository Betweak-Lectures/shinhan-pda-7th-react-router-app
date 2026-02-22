import { RouterProvider } from "react-router/dom";
import { router } from "./router";

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
// 실행후: '/', '/posts' 접속

export default App;
