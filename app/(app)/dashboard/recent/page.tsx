import { PageTitle } from "../_components/page-title";
import { fetchBoardsUpdatedInLast7Days } from "@/app/actions";
import { BoardList } from "../_components/board-list";

export default async function RecentPage() {
  const boards = await fetchBoardsUpdatedInLast7Days();

  return (
    <div className="flex-1">
      <div>
        <PageTitle title="All Borads" />
      </div>

      <div className="mt-6">
        <BoardList boards={boards} />
      </div>
    </div>
  );
}
