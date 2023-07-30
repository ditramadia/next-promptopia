'use client';

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = (props) => {
  const { posts, handleTagLick } = props;

  console.log(Array.isArray(posts));
  console.log("POSTS: " + posts.length);
  console.log(posts);
  
  return (
    <div className='mt-16 prompt_layout'>
      {posts.map((post) => (
        <>
          <PromptCard
            key={post._id}
            post={post}
            handleTagLick={handleTagLick}
          />
        </>
      ))}
    </div>
  );
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data)
    }

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text" 
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        posts={posts}
        handleTagLick={() => {}}
      />
    </section>
  );
};

export default Feed;