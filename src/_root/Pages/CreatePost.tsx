// import React from 'react';
import PostForm from '@/components/forms/postForm';


const CreatePost = () => {
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
         <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <img src='/Assets/icons/add-post.svg'
            alt='add'
            width={36}
            height={36} />
            <p className='h3-bold md:h2-bold text-left w-full'>Create post</p>
         </div>
         <PostForm action="create"/>
      </div>
    </div>
  );
}

export default CreatePost;
