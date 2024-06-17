"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { primaryNavItems } from "@/utils";
import UserProfile from "./user-profile";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { Hash, PlusIcon } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

interface MyListTitleType {
  [key: string]: string;
}

export default function SideBar() {
  const pathname = usePathname();

  const projectList = useQuery(api.projects.getProjects);

  const LIST_OF_TITLE_IDS: MyListTitleType = {
    primary: "",
    projects: "My Projects",
  };

  const [navItems, setNavItems] = useState([...primaryNavItems]);

  const renderItems = (projectList: Array<Doc<"projects">>) => {
    return projectList.map(({ _id, name }, idx) => {
      return {
        ...(idx === 0 && { id: "projects" }),
        name,
        link: `/loggedin/projects/${_id.toString()}`,
        icon: <Hash className="w-4 h-4" />,
      };
    });
  };
  useEffect(() => {
    if (projectList) {
      const projectItems = renderItems(projectList);
      const items = [...primaryNavItems, ...projectItems];
      setNavItems(items);
    }
  }, [projectList]);

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex justify-between h-14 items-center border-b p-1 lg:h-[60px] lg:px-2">
          <UserProfile />
        </div>
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navItems.map(({ name, icon, link, id }, idx) => (
            <div key={idx}>
              {id && (
                <div className="flex items-center mt-6 mb-2">
                  <p className="flex flex-1 text-base">
                    {LIST_OF_TITLE_IDS[id]}
                  </p>
                  {LIST_OF_TITLE_IDS[id] === "My Projects" && (
                    <Dialog>
                      <DialogTrigger id="closeDialog">
                        <PlusIcon
                          className="h-5 w-5"
                          aria-label="Add a Project"
                        />
                      </DialogTrigger>
                      <DialogContent>hiii</DialogContent>
                    </Dialog>
                  )}
                </div>
              )}
              <Link
                key={idx}
                href={link}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  pathname === link
                    ? "active rounded-lg bg-primary/10 text-primary transition-all hover:text-primary"
                    : "text-foreground"
                )}
              >
                {icon}
                {name}
              </Link>
            </div>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Card x-chunk="dashboard-02-chunk-0">
          <CardHeader className="p-2 pt-0 md:p-4">
            <CardTitle>Upgrade to Pro</CardTitle>
            <CardDescription>
              Unlock all features and get unlimited access to our support team.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
            <Button size="sm" className="w-full">
              Upgrade
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
