'use client'

import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { createBoard } from "@/app/actions";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CreateNewBoardButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    try {
      setIsLoading(true);
      const board = await createBoard();
      toast.success('board created');
      router.push(`/board/${board.id}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'board creation failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleCreate}
      disabled={isLoading}
    >
      <Edit className={`w-4 h-4 ${isLoading ? 'cursor-not-allowed bg-muted' : ''}`} />
    </Button>
  );
}
