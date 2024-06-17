import { Menu, PlusIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { primaryNavItems } from "@/utils";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import SearchForm from "./search-form";
import UserProfile from "./user-profile";

import todovexLogo from "@/public/logo/todovex.svg";

export default function MobileNav() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <UserProfile />

            {primaryNavItems.map(({ name, icon, link }, idx) => (
              <Link
                key={idx}
                href={link}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  hover:text-foreground"
              >
                {icon}
                {name}
              </Link>
            ))}

            <Dialog>
              <DialogTrigger id="closeDialog">
                <p className="flex justify-between items-center">
                  My Projects
                  <PlusIcon className="h-5 w-5" aria-label="Add a Project" />
                </p>
              </DialogTrigger>
              <DialogContent>hii</DialogContent>
            </Dialog>
          </nav>
          <div className="mt-auto">
            <Card>
              <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex items-center md:justify-between w-full gap-1 md:gap-2 py-2">
        <div className="lg:flex-1">
          <Link href="/loggedin/projects">
            <p className="text-sm font-semibold text-foreground/70 w-24">
              / My Projects
            </p>
          </Link>
        </div>
        <div className="place-content-center w-full flex-1">
          <SearchForm />
        </div>
        <div className="place-content-center w-12 h-12 lg:w-16 lg:h-20">
          <Image alt="logo" src={todovexLogo} />
        </div>
      </div>
    </header>
  );
}
