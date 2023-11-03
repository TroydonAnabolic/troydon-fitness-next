import React from "react";
import Link from "next/link";
import getFormattedDate from "@/lib/getFormattedDate";
import { Session } from "next-auth";
import { BlogPost } from "@/types";

type Props = {
  post: BlogPost;
  session: Session | null;
};

export default function ListItem({ post, session }: Props) {
  const { id, title, date, author, description } = post;
  const formattedDate = getFormattedDate(date);

  // If the user is logged in and is a paid customer for blogs, then render all posts
  if (session) {
    return (
      <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-800 dark:text-gray-300 mb-6">{description}</p>
        <p>Author: {author}</p>
        <p className="text-sm mt-1 mb-2">{formattedDate}</p>
        <Link
          className="text-blue-500 hover:underline dark:text-blue-300"
          href={`/posts/${id}`}
        >
          Read more
        </Link>
      </div>
    );
  } else if (title == "My Fitness History") {
    return (
      <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-800 dark:text-gray-300 mb-6">{description}</p>
        <p>Author: {author}</p>
        <p className="text-sm mt-1 mb-2">{formattedDate}</p>
        <Link
          className="text-blue-500 hover:underline dark:text-blue-300"
          href={`/posts/${id}`}
        >
          Read more
        </Link>
      </div>
    );
  }
}
