"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { ApiError } from "./apiErrorHandler";

const BASE_URL = process.env.BASE_URL;

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const updateUser = async () => {
  revalidateTag("user");
};

export const revalidate = async (path: string) => {
  revalidatePath(path);
};

export const updateUserPage = async (username: string) => {
  revalidatePath(`/@${username}`);
};

export const fetchSingleUser = async (username: string) => {
  const response = await fetch(`${BASE_URL}/api/user/${username}`, {
    method: "GET",
    next: { tags: ["user"] },
  });
  const user = await response.json();
  return user;
};

export const fetchSingleBlog = async (slug: string) => {
  const response = await fetch(`${BASE_URL}/api/blog/${slug}`, {
    method: "GET",
    next: { tags: ["blog"] },
    headers: new Headers(headers()),
  });
  if (!response.ok && response.status !== 404) {
    const { error } = await response.json();
    throw new ApiError("Bad Request", error, response.status);
  }
  if (response.ok) {
    return await response.json();
  }
};

export const fetchUserBlogs = async (username: string, limit?: number) => {
  const response = await fetch(
    `${BASE_URL}/api/user/${username}/blogs${limit ? `?limit=${limit}` : ""}`,
    {
      method: "GET",
    }
  );
  return await response.json();
};
export const fetchUserPopularBlogs = async (
  username: string,
  limit?: number
) => {
  const response = await fetch(
    `${BASE_URL}/api/user/${username}/blogs/popular${
      limit ? `?limit=${limit}` : ""
    }`,
    {
      method: "GET",
    }
  );
  return await response.json();
};
export const fetchUserDrafts = async (username: string, limit?: number) => {
  const response = await fetch(
    `${BASE_URL}/api/user/${username}/drafts${limit ? `?limit=${limit}` : ""}`,
    {
      method: "GET",
    }
  );
  return await response.json();
};
export const fetchDraftBlog = async (slug: string) => {
  const response = await fetch(`${BASE_URL}/api/blog/draft/${slug}`, {
    method: "GET",
  });
  return await response.json();
};

export const fetchRecentBlogs = async (limit?: number) => {
  const response = await fetch(`${BASE_URL}/api/blog/recent?limit=${limit}`, {
    method: "GET",
    headers: new Headers(headers()),
  });
  return await response.json();
};
export const fetchPopularBlogs = async (limit?: number) => {
  const response = await fetch(`${BASE_URL}/api/blog/popular?limit=${limit}`, {
    method: "GET",
    headers: new Headers(headers()),
  });
  return await response.json();
};

export const fetchFeaturedBlogs = async () => {
  const response = await fetch(`${BASE_URL}/api/blog/featured`, {
    method: "GET",
    headers: new Headers(headers()),
  });
  return await response.json();
};

export const fetchAllCategories = async (postCount = 0, offset = 0) => {
  const response = await fetch(
    `${BASE_URL}/api/category?offset=${offset}&post_count=${postCount}`,
    {
      method: "GET",
    }
  );
  return await response.json();
};

export const fetchCategory = async (name: string, offset = 0) => {
  const response = await fetch(
    `${BASE_URL}/api/category/${name}?offset=${offset}`,
    {
      method: "GET",
    }
  );
  return await response.json();
};

export const fetchBookmarks = async () => {
  const response = await fetch(`${BASE_URL}/api/user/bookmark`, {
    method: "GET",
    headers: new Headers(headers()),
  });
  return await response.json();
};
export const fetchFollowers = async (username: string) => {
  const response = await fetch(`${BASE_URL}/api/user/${username}/followers`, {
    method: "GET",
  });
  return await response.json();
};

export const fetchBlogViews = async (slug: string) => {
  const response = await fetch(`${BASE_URL}/api/blog/${slug}/views`, {
    method: "GET",
  });
  return await response.json();
};

export const checkIsFollowing = async (
  sourceUsername: string,
  targerUsername: string
) => {
  const response = await fetch(
    `${BASE_URL}/api/user/${sourceUsername}/follow/${targerUsername}`,
    {
      method: "GET",
    }
  );
  return await response.json();
};
export const checkIsFollowingTopic = async (category_name: string) => {
  const response = await fetch(
    `${BASE_URL}/api/category/${category_name}/follow`,
    {
      method: "GET",
      headers: new Headers(headers()),
    }
  );
  return await response.json();
};
export const searchBlogs = async (query: string, offset = 0) => {
  const response = await fetch(
    `${BASE_URL}/api/search/blogs?q=${query}&offset=${offset}`,
    {
      method: "GET",
      // headers: new Headers(headers()),
    }
  );
  return await response.json();
};
export const searchUsers = async (query: string, offset = 0) => {
  const response = await fetch(
    `${BASE_URL}/api/search/users?q=${query}&offset=${offset}`,
    {
      method: "GET",
      headers: new Headers(headers()),
    }
  );
  return await response.json();
};
export const searchTopics = async (query: string, offset = 0) => {
  const response = await fetch(
    `${BASE_URL}/api/search/topics?q=${query}&offset=${offset}`,
    {
      method: "GET",
      // headers: new Headers(headers()),
    }
  );
  return await response.json();
};

export const fetchRecentSearches = async () => {
  const response = await fetch(`${BASE_URL}/api/search/recents`, {
    method: "GET",
    headers: new Headers(headers()),
  });
  return await response.json();
};

export const addRecentSearch = async (query: string) => {
  const res = await fetch(`${BASE_URL}/api/search/recents`, {
    method: "POST",
    body: JSON.stringify({
      query,
    }),
    headers: new Headers(headers()),
  });
};
export const deleteBlogBySlug = async (slug: string) => {
  const res = await fetch(`${BASE_URL}/api/blog/${slug}`, {
    method: "DELETE",
    headers: new Headers(headers()),
  });
  return await res.json();
};
export const getTopWriters = async (limit?: number) => {
  const res = await fetch(`${BASE_URL}/api/user/top-authors?limit=${limit}`, {
    method: "GET",
    headers: new Headers(headers()),
  });
  return await res.json();
};

export const fetchBlogComments = async (slug: string) => {
  const res = await fetch(`${BASE_URL}/api/blog/${slug}/comment`, {
    method: "GET",
    headers: new Headers(headers()),
  });
  return await res.json();
};
