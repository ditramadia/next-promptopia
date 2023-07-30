'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import PromptCard from './PromptCard';

const PromptCardList = (props) => {
  const { posts, handleProfileClick, handleTagLick } = props;
  
  return (
    <div className='mt-16 prompt_layout'>
      {posts.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleProfileClick={handleProfileClick}
          handleTagLick={handleTagLick}
        />
      ))}
    </div>
  );
}

const Feed = () => {
  const { data: session } = useSession();
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const router = useRouter();

  const handleProfileClick = (prompt) => {
    if (session?.user.id === prompt.creator._id) {
      router.push(`/profile`);
    } else {
      router.push(`/profile/${prompt.creator._id}`);
    }
  }

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
        handleProfileClick={handleProfileClick}
        handleTagLick={() => {}}
      />
    </section>
  );
};

export default Feed;