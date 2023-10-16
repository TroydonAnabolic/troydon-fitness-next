import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostData, getSortedPostsData } from "@/lib/posts";
import getFormattedDate from "@/lib/getFormattedDate";

export function generateStaticParams() {
  const posts = getSortedPostsData();

  return posts.map((post) => ({
    postId: post.id,
  }));
}

export function generateMetadata({ params }: { params: { postId: string } }) {
  const posts = getSortedPostsData();
  const { postId } = params;

  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
  };
}

export default async function Post({ params }: { params: { postId: string } }) {
  const posts = getSortedPostsData();
  const { postId } = params;

  if (!posts.find((post) => post.id === postId)) notFound();

  const { title, date, contentHtml } = await getPostData(postId);

  const pubDate = getFormattedDate(date);

  return (
    <div className="container mx-auto px-4 py-16  dark:prose-invert">
      <h3 className="text-3xl mb-4">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{pubDate}</p>
      <div className="mb-12">
        <article dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
      <p>
        <button className="btn btn-primary text-blue-500 hover:underline dark:text-blue-300">
          <Link
            href="/blog"
            className="text-blue-500 hover:underline dark:text-blue-300"
          >
            ← Back to Blogs
          </Link>
        </button>
      </p>
    </div>
  );
}
