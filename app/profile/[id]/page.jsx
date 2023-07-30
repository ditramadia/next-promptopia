'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import Profile from '@components/Profile';

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([]);
  
  const userId = useParams().id;
  
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();

      setUsername(data.username);
    };

    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();

      setPosts(data);
    }

    fetchUser();
    fetchPosts();
  }, [])

  return (
    <Profile
    name={`${username}'s`}
    desc={`Welcome to ${username}'s profile page`}
    posts={posts}
  />
  );
};

export default UserProfile;