import { Models } from 'appwrite';
// import React from 'react';
import Loader from './Loader';
import GridPostList from './GridPostList';

type SearchResultsProps = {
    isSearchedFetching: boolean;
    searchedPosts: Models.Document[];
}

const SearchResult = ({isSearchedFetching, searchedPosts}: SearchResultsProps) => {
    if(isSearchedFetching) {
        return (
            <div>
                <Loader />
            </div>
        )
    }

    if(searchedPosts && searchedPosts.length > 0) {
        return (
            <GridPostList posts={searchedPosts.documents}/>
        )
    }
    
        return (
            <p className='text-light-4 mt-10 text-center w-full'>
                no result found
            </p>
        )
    

  return (
    <div>
      search result
    </div>
  );
}

export default SearchResult;
