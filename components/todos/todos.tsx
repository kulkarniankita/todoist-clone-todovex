import React from "react";
import Task from "./task";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useToast } from "../ui/use-toast";

export default function Todos({ items }: { items: Array<Doc<"todos">> }) {
  const { toast } = useToast();

  const checkATodo = useMutation(api.todos.checkATodo);
  const unCheckATodo = useMutation(api.todos.unCheckATodo);

  const handleOnChangeTodo = (task: Doc<"todos">) => {
    if (task.isCompleted) {
      unCheckATodo({ taskId: task._id });
    } else {
      checkATodo({ taskId: task._id });
      toast({
        title: "✅ Task completed",
        description: "You're a rockstar",
        duration: 3000,
      });
    }
  };
  return items.map((task: Doc<"todos">, idx: number) => (
    <Task
      key={task._id}
      data={task}
      isCompleted={task.isCompleted}
      handleOnChange={() => handleOnChangeTodo(task)}
    />
  ));
}
