import { Plus } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import AddTaskInline from "./add-task-inline";

export const AddTaskWrapper = () => {
  const [showAddTask, setShowAddTask] = useState(false);

  return showAddTask ? (
    <AddTaskInline setShowAddTask={setShowAddTask} />
  ) : (
    <AddTaskButton onClick={() => setShowAddTask(true)} />
  );
};

export default function AddTaskButton({
  onClick,
}: {
  onClick: Dispatch<SetStateAction<any>>;
}) {
  return (
    <button className="pl-2 flex mt-2 flex-1" onClick={onClick}>
      <div className="flex flex-col items-center justify-center gap-1 text-center">
        <div className="flex items-center gap-2 justify-center">
          <Plus className="h-4 w-4 text-primary hover:bg-primary hover:rounded-xl hover:text-white" />
          <h3 className="text-base font-light tracking-tight text-foreground/70">
            Add Task
          </h3>
        </div>
      </div>
    </button>
  );
}
