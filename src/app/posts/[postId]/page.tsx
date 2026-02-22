import { useNavigate } from "react-router";

// src/app/posts/[postId]/page.tsx
export default function PostDetailPage() {
  // React-Router 주요 Hook
  // const location = useLocation();
  // console.log(location);

  // Link컴포넌트가 내부적으로 useNavigate 이용
  const navigate = useNavigate();

  // useParams: Parameter를 사용합니다. (:postId 등)
  // const params = useParams();
  // console.log(params);

  // searchParameter를 받음. (query-string, query-set, searchString, searchParameter ...)
  // const [searchParams, setSearchParams] = useSearchParams();
  //
  // console.log(searchParams);
  // console.log(searchParams.get("where"));
  // console.log(searchParams.get("page"));
  // console.log(searchParams.get("limit"));

  return (
    <div>
      <div
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </div>
      PostDetailPage
    </div>
  );
}
