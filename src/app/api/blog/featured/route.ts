import client from "@/lib/prisma";
import apiErrorHandler from "@/utils/apiErrorHandler";
import { NextResponse } from "next/server";

export const GET = apiErrorHandler(async (reqest: Request) => {
  const featured = await client.blog.findMany({
    where: {
      isPublished: true,
      isFeatured: true,
    },
    select: {
      title: true,
      thumbnail: true,
      description: true,
      id: true,
      length: true,
      slug: true,
      categories: {
        orderBy: {
          createdAt: "desc",
        },
      },
      author: {
        include: { _count: { select: { follower: true, blogs: true } } },
      },
      createdAt: true,
      isPublished: true,
    },
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(featured, { status: 200 });
});
