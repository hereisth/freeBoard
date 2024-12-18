import { cn } from "@/lib/utils";

const PAGE_COLOR = {
  Recent: " #FF9500",
  Favorites: "#FF3B30",
  "All Borads": "#007AFF",
};

interface PageTitleProps {
  title: keyof typeof PAGE_COLOR;
}

export function PageTitle({ title }: PageTitleProps) {
  return (
    <h1
      className={cn("text-2xl font-bold")}
      style={{ color: PAGE_COLOR[title] }}
    >
      {title}
    </h1>
  );
}
