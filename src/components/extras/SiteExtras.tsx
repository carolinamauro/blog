"use client";

import BallCursor from "./BallCursor";
import CommandPalette from "./CommandPalette";
import ScrollBall from "./ScrollBall";
import TennisGame from "./TennisGame";

export default function SiteExtras({
  posts,
}: {
  posts: { slug: string; title: string; category?: string }[];
}) {
  return (
    <>
      <ScrollBall />
      <BallCursor />
      <CommandPalette posts={posts} />
      <TennisGame />
    </>
  );
}
