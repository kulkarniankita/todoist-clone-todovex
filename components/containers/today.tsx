"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { AddTaskWrapper } from "../add-tasks/add-task-button";
import Todos from "../todos/todos";
import CompletedTodos from "../todos/completed-todos";
import { Dot } from "lucide-react";
import moment from "moment";

export default function Today() {
  const todos = useQuery(api.todos.get) ?? [];
  const todayTodos = useQuery(api.todos.todayTodos) ?? [];
  const overdueTodos = useQuery(api.todos.overdueTodos) ?? [];

  if (todos === undefined || todayTodos === undefined) {
    <p>Loading...</p>;
  }
  return (
    <div className="xl:px-40">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Today</h1>
      </div>
      <div className="flex flex-col gap-1 py-4">
        <p className="font-bold flex text-sm">Overdue</p>
        <Todos items={overdueTodos} />
      </div>
      <AddTaskWrapper />
      <div className="flex flex-col gap-1 py-4">
        <p className="font-bold flex text-sm items-center border-b-2 p-2 border-gray-100">
          {moment(new Date()).format("LL")}
          <Dot />
          Today
          <Dot />
          {moment(new Date()).format("dddd")}
        </p>
        <Todos items={todayTodos} />
      </div>
    </div>
  );
}
