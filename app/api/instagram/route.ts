import { NextResponse } from "next/server";

type InstagramMedia = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp?: string;
};

type InstagramPage = {
  data?: InstagramMedia[];
  paging?: {
    next?: string;
  };
  error?: {
    message?: string;
  };
};

const fields = [
  "id",
  "caption",
  "media_type",
  "media_url",
  "permalink",
  "thumbnail_url",
  "timestamp",
].join(",");

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) {
    return NextResponse.json({ configured: false, posts: [] });
  }

  const posts: InstagramMedia[] = [];
  let nextUrl = `https://graph.instagram.com/me/media?fields=${fields}&limit=100&access_token=${accessToken}`;
  let pageCount = 0;

  try {
    while (nextUrl && pageCount < 20) {
      const response = await fetch(nextUrl, {
        next: { revalidate: 1800 },
      });
      const page = (await response.json()) as InstagramPage;

      if (!response.ok || page.error) {
        return NextResponse.json(
          {
            configured: true,
            error: page.error?.message ?? "Nao foi possivel carregar os posts do Instagram.",
            posts,
          },
          { status: response.status || 502 },
        );
      }

      posts.push(...(page.data ?? []));
      nextUrl = page.paging?.next ?? "";
      pageCount += 1;
    }

    return NextResponse.json({ configured: true, posts });
  } catch {
    return NextResponse.json(
      {
        configured: true,
        error: "Nao foi possivel carregar os posts do Instagram.",
        posts,
      },
      { status: 502 },
    );
  }
}
