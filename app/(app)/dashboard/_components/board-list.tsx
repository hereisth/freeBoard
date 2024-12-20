import { BoardCard } from "./board-card";

interface BoardListProps {
  boards: any[];
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