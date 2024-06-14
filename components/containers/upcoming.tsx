"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Dot } from "lucide-react";
import moment from "moment";
import { AddTaskWrapper } from "../add-tasks/add-task-button";
import Todos from "../todos/todos";

export default function Upcoming() {
  const groupTodosByDate = useQuery(api.todos.groupTodosByDate) ?? [];
  const overdueTodos = useQuery(api.todos.overdueTodos) ?? [];

  if (groupTodosByDate === undefined || overdueTodos === undefined) {
    <p>Loading...</p>;
  }
  return (
    <div className="xl:px-40">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Upcoming</h1>
      </div>
      <div className="flex flex-col gap-1 py-4">
        <p className="font-bold flex text-sm">Overdue</p>
        <Todos items={overdueTodos} />
      </div>
      <div className="pb-6">
        <AddTaskWrapper />
      </div>
      <div className="flex flex-col gap-1 py-4">
        {Object.keys(groupTodosByDate || {}).map((dueDate) => {
          return (
            <div key={dueDate} className="mb-6">
              <p className="font-bold flex text-sm items-center">
                {moment(dueDate).format("LL")} <Dot />
                {moment(dueDate).format("dddd")}
              </p>
              <ul>
                <Todos items={groupTodosByDate[dueDate]} />
                <AddTaskWrapper />
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
