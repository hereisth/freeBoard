"use client";

import { addBoardToFavorite, removeBoardFromFavorite } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { formatTimeToNow } from "@/lib/utils";
import { Tables } from "@/types/supabase";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface BoardCardProps {
  board: Tables<"boards">;
}

export function BoardCard({ board }: BoardCardProps) {

  const [isFavorite, setIsFavorite] = useState(board.is_favorite);
  const router = useRouter();

  const toggleFavorite = async () => {
    const newIsFavorite = !isFavorite;
    setIsFavorite(newIsFavorite);
    if (newIsFavorite) {
      await addBoardToFavorite(board.id);
    } else {
      await removeBoardFromFavorite(board.id);
    }
  };

  const onDoubleClick = () => {
    router.push(`/board/${board.id}`);
  };

  return (
    <div
      className="flex justify-normal items-center bg-cover rounded-lg w-full py-4 overflow-hidden text-muted-foreground text-sm"
    >
      {/* like a card */}
      <div className="">
        <Button
          onClick={toggleFavorite}
          asChild
          variant="ghost" size="icon"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "text-red-500" : "text-muted-foreground"}`} />
        </Button>
      </div>

      <div
        onClick={() => { }}
        onDoubleClick={onDoubleClick}
        className="flex flex-1 pl-4 justify-between "
      >
        <div>
          {/* todo: iamge */}
          <p className="relative">
            {board.name}
          </p>
        </div>

        {/* create time */}
        <div>
          {formatTimeToNow(new Date(board.updated_at))}
        </div>
      </div>
    </div>
  );
}