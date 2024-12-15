import Link from "next/link";
import Logo from "./logo";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <div className="flex items-center justify-between py-5">
      <Logo />
      <div className="flex gap-2 items-center">
        <ModeToggle />
        <Link href="/dashboard">
          <Button variant={"default"} >Get Started</Button>
        </Link>
      </div>
    </div>
  );
}