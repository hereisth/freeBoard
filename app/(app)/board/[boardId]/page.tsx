"use client";

import { use } from "react";
import { TldrawWrapper } from "./_components/tldraw-wapper";
import { useAuth } from "@/hooks/useAuth";
type SearchParams = {
  boardId: string;
};

interface BoardIdPageProps {
  params: Promise<SearchParams>;
}

export default function BoardPage({ params }: BoardIdPageProps) {
  const { boardId } = use(params);
  const { user } = useAuth();
  if (!user) {
    // go back to sign in page
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TldrawWrapper boardId={boardId} userId={user.id} />
    </div>
  );
}
