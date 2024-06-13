import Tasks from "@/components/todovex/tasks";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1>Todovex</h1>

      <Tasks />
    </main>
  );
}
