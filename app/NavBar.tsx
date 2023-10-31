"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center space-x-2">
        <span className="pl-2">{session?.user?.name}</span>
        <button
          className="btn btn-primary text-white font-bold py-2 px-4 rounded"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 pr-4 pl-4">
      <button
        className="btn btn-primary text-white font-bold py-2 px-4 rounded"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </div>
  );
}

// Nav bar sample from daisy UI Tailwind
const NavBar = () => {
  return (
    <div className="navbar bg-white dark:bg-sky-700">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <a>Services</a>
              <ul className="p-2">
                <li>
                  <Link href="/services/personalTraining">
                    Personal Training
                  </Link>
                </li>
                <li>
                  <Link href="/services/mealPlans">Meal Plans</Link>
                </li>
                <li>
                  <Link href="/services/trainingPrograms">
                    Training Programs
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </div>
        <div className="flex-1 bg-bwhite dark:bg-grey-900">
          <Link href="/" className="btn btn-ghost normal-case text-xl ">
            <Image
              src="/troydon-fitness-logo-2.png"
              alt="Fitness Image"
              width={80}
              height={60}
            />
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>Services</summary>
              <ul className="p-2">
                <li>
                  <Link href="/services/personalTraining">
                    Personal Training
                  </Link>
                </li>
                <li>
                  <Link href="/services/mealPlans">Meal Plans</Link>
                </li>
                <li>
                  <Link href="/services/trainingPrograms">
                    Training Programs
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link href="/appointments" className="btn">
          Book Appointment
        </Link>
        <AuthButton />
      </div>
    </div>
  );
};

export default NavBar;
