// import React from 'react'

// const EditPost = () => {
//   return (
//     <div>EditPost</div>
//   )
// }

// export default EditPost

// import React from 'react';
// import PostForm from '@/components/forms/postForm';
// import { useParams } from 'react-router-dom';
// import { useGetPostById } from '@/lib/react-query/queriesandmutations';
// import Loader from '@/components/shared/Loader';


// const EditPost = () => {
//   const { id } = useParams();
//   const {data: post, isPending } = useGetPostById(id || '');

//    if(isPending) return <Loader />

//   return (
//     <div className='flex flex-1'>
//       <div className='common-container'>
//          <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
//           <img src='/Assets/icons/add-post.svg'
//             alt='add'
//             width={36}
//             height={36} />
//             <p className='h3-bold md:h2-bold text-left w-full'>Edit post</p>
//          </div>
//          <PostForm action='Update' post={post} />
//       </div>
//     </div>
//   );
// }

// export default EditPost;

import { useParams } from "react-router-dom";

import Loader from '@/components/shared/Loader';
import PostForm from '@/components/forms/postForm';
import { useGetPostById } from '@/lib/react-query/queriesandmutations';

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostById(id || "");

  if (isLoading)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start w-full max-w-5xl">
          <img
            src="/Assets/icons/edit.svg"
            width={36}
            height={36}
            alt="edit"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

        {isLoading ? <Loader /> : <PostForm action="update" post={post} />}
      </div>
    </div>
  );
};

export default EditPost;