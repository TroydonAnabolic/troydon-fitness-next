import React from "react";
import Posts from "@/app/components/Posts";
import { getSortedPostsData } from "@/lib/posts";

const Blog = () => {
  const posts = getSortedPostsData();

  return (
    <div className="py-16">
      <title> Blog | Troydon Fitness </title>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10 text-center">
          Blog
        </h2>
        <div className="flex flex-col md:flex-row gap-12">
          <Posts posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default Blog;
