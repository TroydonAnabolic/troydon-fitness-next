import React from "react";
import ListItem from "./ListItem";
import Image from "next/image";
import { getSortedPostsData } from "../../../lib/posts";

const Posts = () => {
  const posts = getSortedPostsData();
  return (
    <div className="flex flex-col md:flex-row gap-12">
      <div className="max-h-[500px] overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 no-scrollbar">
        {/* Use map to render the list of blog posts */}
        {posts.map((post) => (
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
  );
};

export default Posts;
