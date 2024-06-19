"use client";
import { AddTaskWrapper } from "@/components/add-tasks/add-task-button";
import SuggestMissingTasks from "@/components/add-tasks/suggest-tasks";
import MobileNav from "@/components/nav/mobile-nav";
import SideBar from "@/components/nav/side-bar";
import DeleteProject from "@/components/projects/delete-project";
import CompletedTodos from "@/components/todos/completed-todos";
import Todos from "@/components/todos/todos";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

export default function ProjectIdPage() {
  const { projectId } = useParams<{ projectId: Id<"projects"> }>();

  const inCompletedTodosByProject =
    useQuery(api.todos.getInCompleteTodosByProjectId, {
      projectId,
    }) ?? [];
  const completedTodosByProject =
    useQuery(api.todos.getCompletedTodosByProjectId, {
      projectId,
    }) ?? [];

  const project = useQuery(api.projects.getProjectByProjectId, {
    projectId,
  });
  const projectTodosTotal =
    useQuery(api.todos.getTodosTotalByProjectId, {
      projectId,
    }) || 0;

  const projectName = project?.name || "";

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <MobileNav navTitle={"My Projects"} navLink="/loggedin/projects" />

        <main className="flex flex-1 flex-col gap-4 p-4 lg:px-8">
          <div className="xl:px-40">
            <div className="flex items-center justify-between flex-wrap gap-2 lg:gap-0">
              <h1 className="text-lg font-semibold md:text-2xl">
                {projectName || "Project"}
              </h1>
              <div className="flex gap-6 lg:gap-12 items-center">
                <SuggestMissingTasks projectId={projectId} />
                <DeleteProject projectId={projectId} />
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-4">
              <Todos items={inCompletedTodosByProject} />

              <div className="pb-6">
                <AddTaskWrapper projectId={projectId} />
              </div>

              <Todos items={completedTodosByProject} />
              <div className="flex items-center space-x-4 gap-2 border-b-2 p-2 border-gray-100 text-sm text-foreground/80">
                <CompletedTodos totalTodos={projectTodosTotal} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
