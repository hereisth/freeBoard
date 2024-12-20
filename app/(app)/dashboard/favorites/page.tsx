import { PageTitle } from "../_components/page-title";
import { fetchAllFavoriteBoards } from "@/app/actions";
import { BoardList } from "../_components/board-list";

export default async function RecentPage() {
  const boards = await fetchAllFavoriteBoards();

  return (
    <div className="flex-1">
      <div>
        <PageTitle title="Favorites" />
      </div>

      <div className="mt-6">
        <BoardList boards={boards} />
      </div>
    </div>
  );
}
