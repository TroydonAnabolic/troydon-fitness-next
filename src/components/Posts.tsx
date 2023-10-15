import React from "react";
import { getSortedPostsData } from "../../lib/posts";
import ListItem from "./ListItem";

const Posts = () => {
  const posts = getSortedPostsData();
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Post Title 1
      </h3>

      <p className="text-gray-800 dark:text-gray-300 mb-6">
        {posts.map((post) => (
          <ListItem key={post.id} post={post} />
        ))}
      </p>
      <a href="#" className="text-blue-500 hover:underline dark:text-blue-300">
        Read more
      </a>
    </div>
  );
};

export default Posts;
