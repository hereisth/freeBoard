import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Toaster } from 'sonner'

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="w-full h-full relative">
      {children}
      <Toaster />
    </div>
  );
}
