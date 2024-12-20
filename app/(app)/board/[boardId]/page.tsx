"use client";

import { use } from "react";
import { Tldraw } from "tldraw";
import 'tldraw/tldraw.css';

type SearchParams = {
  boardId: string;
};

interface BoardIdPageProps {
  params: Promise<SearchParams>;
}

export default function BoardPage({ params }: BoardIdPageProps) {
  const { boardId } = use(params);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }} id="tldraw-canvas">
      <Tldraw persistenceKey={boardId} />
    </div>
  );
}
