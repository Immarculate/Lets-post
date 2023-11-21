import GridPostList from '@/components/shared/GridPostList'
import Loader from '@/components/shared/Loader'
import SearchResult from '@/components/shared/SearchResult'
import { Input } from '@/components/ui/input'
import useDebounce from '@/hooks/useDebounce'
import { useGetPosts, useSearchPosts } from '@/lib/react-query/queriesandmutations'
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Explore = () => {
  const { ref, inView } = useInView();

  const { data: posts, fetchNextPage, hasNextPage, } = useGetPosts();
  const [searchValue, setSearchValue] = React.useState('')

  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedSearch);

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView, searchValue]);

  if (!posts) {
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    )
  }

  const shouldShowSearchResult = searchValue !== '';
  const shouldShowPosts = !shouldShowSearchResult && posts.pages.every((item) => item.documents.length === 0)

  return (
    <div className='explore-container'>Explore
      <div className='explore-inner_container'>
        <h2 className='h3-bold md:h2-bold w-full'>Search Post</h2>
        <div className='flex gap-1 px-4 w-full rounded-lg bg-dark-4'>
          <img src='/Assets/icons/search.svg' alt='search' width={24} height={24} />
          <Input type='text' placeholder='Search Posts' className='explore-search'
            value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        </div>
      </div>

      <div className='flex-between w-full mb-7 mt-16 max-w-5xl'>
        <h3 className='body-bold md:h3-bold'>Explore Posts</h3>

        <div className='flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer'>
          <p className='small-medium text-light-2 md:base-medium'>All</p>
          <img src='/Assets/icons/filter.svg' alt='arrow-down' width={20} height={20} />
        </div>
      </div>

      <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
        {shouldShowSearchResult ? (
          <SearchResult
            searchedPosts={searchedPosts} isSearchFetching={isSearchFetching} />
        ) : shouldShowPosts ? (
          <p className='text-center text-light-4 mt-10'>No posts found</p>
        ) : posts.pages.map((item, index) => (
          <GridPostList key={`posts-${index}`} posts={item.documents} />
        ))}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className='mt-10is '>
          <Loader />
        </div>
      )}
    </div>

  )
}

export default Explore