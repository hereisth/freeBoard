"use client";

import { use, useEffect } from "react";

type SearchParams = {
  boardId: string;
};

interface BoardIdPageProps {
  params: Promise<SearchParams>;
}

export default function BoardPage({ params }: BoardIdPageProps) {
  const { boardId } = use(params);
  return <div>Board Page with boardId: {boardId}</div>;
}
