import { Tables } from "@/types/supabase";
import { BoardCard } from "./board-card";

interface BoardListProps {
  boards: Tables<"boards">[];
}

export function BoardList({ boards }: BoardListProps) {
  return (
    <div>
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  );
}