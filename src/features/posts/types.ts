export interface PostItem {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  authorNickname: string;
  likeCount: number;
  commentCount: number;
}

export interface CommentAuthor {
  id: string;
  nickname: string;
}

export interface CommentItem {
  id: number;
  postId: number;
  parentId: null | number;
  depth: number;
  content: string;
  isDeleted: false;
  createdAt: string;
  updatedAt: string;
  author: CommentAuthor;
  children: CommentItem[];
}
