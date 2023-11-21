import { useUserContext } from '@/context/authContext'
import { Models } from 'appwrite'
// import React from 'react'
// import PostCard from './PostCard'
import { Link } from 'react-router-dom'
import PostStats from './PostStats'

type GridPostListProps = {
    posts: Models.Document[],
    showUser?: boolean,
    showStats?: boolean,
}
const GridPostList = ({posts, showUser = true, showStats = true}: GridPostListProps) => {
    const {user} = useUserContext();

  return (
    <ul className='grid-container'>
        {posts.map((post) => (
            <li key={post.$id} className='relative min-w-80 h-80'>
               <Link to={`/posts/${post.$id}`} className='grid-post_link'>
                <img src={post.imageUrl || '/Assets/icons/profile-placeholder.svg'} alt="post image" className='h-full w-full object-cover' />
               </Link>

               <div className='grid-post_user'>
                {showUser && (
                    <Link to={`/profile/${post.creator.$id}`} className='flex flex-1 gap-2 items-center justify-start'>
                        <img src={post?.creator?.imageUrl || '/Assets/icons/profile-placeholder.svg'} alt="creator" className="rounded-full w-8 h-8 lg:w-12 lg:h-12" />
                        <p className='line-clamp-1'>{post.creator.name}</p>
                    </Link>
                )}

                {showStats && (
                    <PostStats post={post} userId={user.id} />
                )}
               </div>
            </li>
        ))}
    </ul>
  )
}

export default GridPostList