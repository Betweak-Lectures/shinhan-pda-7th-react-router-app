import { useEffect, useState } from "react";
import type { PostItem } from "../types";
import { fetchPostList } from "../apis";
import { PostCard } from "./post-card";

export default function PostList() {
  // api 요청 -> state 저장
  const [posts, setPosts] = useState<PostItem[]>([]);

  useEffect(() => {
    fetchPostList(1, 10).then((data) => {
      setPosts(data.items);
    });
  }, []);
  return (
    <div>
      {posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            post={post}
            isLikePending={false}
            onToggleLike={() => {}}
            likedByMe={false}
            // viewerUserId=""
          />
        );
      })}
    </div>
  );
}
