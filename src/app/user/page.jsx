"use client";

import { getUser } from "../customHooks/fetchData";

export default function User() {
  const { user, isLoading, isError } = getUser("Vercel");
  if (isError) {
    return <p>An error has occurred.</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div>Hi {user.name}!</div>
      <p>Your Repo URL is {user.repos_url}</p>
    </>
  );
}
