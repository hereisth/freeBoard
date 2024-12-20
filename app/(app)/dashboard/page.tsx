import { PageTitle } from "./_components/page-title";
import { fetchAllBoards } from "@/app/actions";
import { BoardList } from "./_components/board-list";
export default async function DashboardPage() {
  const boards = await fetchAllBoards();

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
