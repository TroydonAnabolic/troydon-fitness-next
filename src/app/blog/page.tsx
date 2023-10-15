import React from "react";
import Image from "next/image";
import Posts from "@/components/Posts";

const Blog = () => {
  return (
    <div className="py-16 bg-white dark:bg-gray-800">
      <title> Blog | Troydon Fitness </title>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10 text-center">
          Blog
        </h2>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="max-h-[500px] overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 no-scrollbar">
            {/* Blog Post 1 */}
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Post Title 1
              </h3>
              <p className="text-gray-800 dark:text-gray-300 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <a
                href="#"
                className="text-blue-500 hover:underline dark:text-blue-300"
              >
                Read more
              </a>
            </div>

            <Posts />

            {/* Add more blog posts as needed */}
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
    </div>
  );
};

export default Blog;
