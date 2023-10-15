import React from "react";
import Link from "next/link";
import getFormattedDate from "../../lib/getFormattedDate";

type Props = {
  post: BlogPost;
};

export default function ListItem({ post }: Props) {
  const { id, title, date, author, description } = post;
  const formattedDate = getFormattedDate(date);
  return (
    <div>
      <Link
        className="underline hover:text-black/70 dark:hover:text-white"
        href={`/posts/${id}`}
      >
        <p>{title}</p>
        <p>{description}</p>
        <p>Author: {author}</p>
        {author}
      </Link>
      <br />
      <p className="text-sm mt-1">{formattedDate}</p>
    </div>
  );
}
