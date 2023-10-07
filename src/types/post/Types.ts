import { Like, Tag, User,Image,Comment, UnLike } from "../Types";

 
export type Post={
     id:string;
     user: User;
     createdDate: string;
     updatedDAte: string;
     content: string;
     likes:Like[];
     unLikes:UnLike[];
     tages:Tag[];
     comments:Comment[];
     images:Image[];
}
export type PostListProps={
     posts: Post[];
}
export type CardProps={
     post: Post;
     isVisible: boolean;
     likeColor: string;
     unlikeColor: string;
     getElapsedTime: (date: string) => string;
     changeVisibility: () => void;   
     changeLikeColor: (postId:string) => void;
     changeUnlikeColor: (postId:string) => void; 
     addComment: () => void; 
     comment: string;
     changeComment: (event:any) => void;
     getImageFromBytes: (image: string) => string;
}
export type CardContainerProps={
  post: Post;
}
export type AddCommentProps={
     addComment: () => void;
     comment: string;
     changeComment: (event:any) => void;
     
}