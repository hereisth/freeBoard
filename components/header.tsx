import Link from "next/link";
import HeaderAuth from "./header-auth";
import { createClient } from "@/lib/supabase/client";

export default async function Header() {

  const supabase = createClient();

  const  { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="w-full flex items-center border-b border-b-foreground/10 h-16">
      <div className="w-full flex justify-between items-center p-3 px-5 text-sm">

        <div className="flex gap-5 items-center font-semibold">
          <Link href={"/"}>FreeBoard</Link>
        </div>

        <div className="flex items-center gap-2">
          <HeaderAuth />
        </div>
      </div>
    </nav>
  );
}
