// src/app/page.tsx
export default function MainPage() {
  fetch(
    "https://shinhan-pda-react-router-full-examp.vercel.app/api/auth/login",
    {
      method: "POST",
    },
  );
  return (
    <div>
      <h1>This is Main Page</h1>
      <div>메인페이지입니다.</div>
    </div>
  );
}
