"use client";
import React, { useState } from "react";
import ListItem from "./ListItem";
import Image from "next/image";

interface PostsProps {
  posts: BlogPost[]; // Define the prop for posts
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-10 w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Posts"
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-12">
        <div className="max-h-[500px] overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 no-scrollbar">
          {filteredPosts.map((post) => (
            <ListItem key={post.id} post={post} />
          ))}
        </div>

        <div className="md:w-1/2 m-12">
          <Image
            src="/gym-black-and-white.jpg"
            alt="Gym Image"
            width={600}
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default Posts;
