'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import PromptCard from './PromptCard';

const PromptCardList = (props) => {
  const { posts, handleProfileClick, handleTagClick } = props;
  
  return (
    <div className='mt-16 prompt_layout'>
      {posts.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleProfileClick={handleProfileClick}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
}

const Feed = () => {
  const { data: session } = useSession();
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);

  const router = useRouter();

  const handleProfileClick = (prompt) => {
    if (session?.user.id === prompt.creator._id) {
      router.push(`/profile`);
    } else {
      router.push(`/profile/${prompt.creator._id}`);
    }
  }

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();

    setAllPosts(data)
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter(
      (item) => 
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setFirstLoad(false);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    setFirstLoad(false);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  }

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
        posts={firstLoad ? allPosts : searchedResults}
        handleProfileClick={handleProfileClick}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;