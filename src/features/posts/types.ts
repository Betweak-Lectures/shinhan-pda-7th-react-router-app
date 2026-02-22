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
