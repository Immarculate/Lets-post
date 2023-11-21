import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesandmutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite"
import React,{ useState, useEffect } from "react";
import Loader from "./Loader";

type PostStatsProps = {
    post?: Models.Document;
    userId: string;
}
const PostStats = ({post, userId}: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isSavingPost } = useDeleteSavedPost();
  const { data: currentUser, isPending: isDeletingSaved } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.post.$id === post?.$id)


  useEffect(() => {
    setIsSaved(savedPostRecord ? true : false)
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId)
    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId)
    } else {
      newLikes.push(userId)
    }

    setLikes(newLikes);
    likePost({postId: post?.$id || '', likesArray: newLikes})
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();
   
    if(savedPostRecord) {
       setIsSaved(false);
       deleteSavedPost(savedPostRecord.$id)
    } else {
      savePost({postId: post?.$id || '', userId});
      setIsSaved(true);
    }
  };

  return (
    <div className="flex justify-between items-center z-20">
        <div className="flex mr-5 gap-2">
            <img src={`${checkIsLiked(likes, userId) ? "/Assets/icons/liked.svg" : "/Assets/icons/like.svg"}`}
              alt="like" width={20} height={20} className="cursor-pointer"
              onClick={handleLikePost}
             />
            <p className="small-medium lg:base-medium">{likes.length}</p>
        </div>

        <div className="flex gap-2">
          {isDeletingSaved || isSavingPost ? <Loader /> : 
             <img src={`${isSaved ? "/Assets/icons/saved.svg" : "/Assets/icons/save.svg"}`}
             alt="like" width={20} height={20} className="cursor-pointer"
             onClick={handleSavePost}
             />
          }    
        </div>
    </div>
  )
}

export default PostStats