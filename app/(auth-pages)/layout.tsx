import Header from "@/components/header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="felx max-w-7xl flex flex-col gap-12 items-center">
      <Header />
      {children}
    </div>
  );
}
