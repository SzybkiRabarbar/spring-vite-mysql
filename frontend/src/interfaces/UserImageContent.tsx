export interface Comment_ {
  id: number;
  userName: string;
  content: string;
}

export default interface UserImageContent {
  id: number;
  userName: string;
  imageUri: string;
  comments: Comment_[];
}