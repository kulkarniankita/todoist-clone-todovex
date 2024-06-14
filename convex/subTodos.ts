import { Id } from "./_generated/dataModel";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { handleUserId } from "./auth";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserId(ctx);
    if (userId) {
      return await ctx.db
        .query("subTodos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .collect();
    }
    return [];
  },
});

export const checkASubTodo = mutation({
  args: { taskId: v.id("subTodos") },
  handler: async (ctx, { taskId }) => {
    const newTaskId = await ctx.db.patch(taskId, { isCompleted: true });
    return newTaskId;
  },
});

export const unCheckASubTodo = mutation({
  args: { taskId: v.id("subTodos") },
  handler: async (ctx, { taskId }) => {
    const newTaskId = await ctx.db.patch(taskId, { isCompleted: false });
    return newTaskId;
  },
});

export const createASubTodo = mutation({
  args: {
    taskName: v.string(),
    description: v.optional(v.string()),
    priority: v.number(),
    dueDate: v.number(),
    projectId: v.id("projects"),
    labelId: v.id("labels"),
    parentId: v.id("todos"),
  },
  handler: async (
    ctx,
    { taskName, description, priority, dueDate, projectId, labelId, parentId }
  ) => {
    try {
      const userId = await handleUserId(ctx);
      if (userId) {
        const newTaskId = await ctx.db.insert("subTodos", {
          userId,
          parentId,
          taskName,
          description,
          priority,
          dueDate,
          projectId,
          labelId,
          isCompleted: false,
        });
        return newTaskId;
      }
      return null;
    } catch (err) {
      console.log("Error occurred during createASubTodo mutation", err);

      return null;
    }
  },
});

export const completedSubTodos = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserId(ctx);
    if (userId) {
      return await ctx.db
        .query("subTodos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .filter((q) => q.eq(q.field("isCompleted"), true))
        .collect();
    }
    return [];
  },
});

export const inCompleteSubTodos = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserId(ctx);
    if (userId) {
      return await ctx.db
        .query("subTodos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .filter((q) => q.eq(q.field("isCompleted"), false))
        .collect();
    }
    return [];
  },
});
