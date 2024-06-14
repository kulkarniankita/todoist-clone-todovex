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
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .collect();
    }
    return [];
  },
});

export const completedTodos = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserId(ctx);
    if (userId) {
      return await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .filter((q) => q.eq(q.field("isCompleted"), true))
        .collect();
    }
    return [];
  },
});

export const inCompleteTodos = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserId(ctx);
    if (userId) {
      return await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .filter((q) => q.eq(q.field("isCompleted"), false))
        .collect();
    }
    return [];
  },
});

export const totalTodos = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserId(ctx);
    if (userId) {
      const todos = await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .filter((q) => q.eq(q.field("isCompleted"), true))
        .collect();
      return todos.length || 0;
    }
    return 0;
  },
});

export const checkATodo = mutation({
  args: { taskId: v.id("todos") },
  handler: async (ctx, { taskId }) => {
    const newTaskId = await ctx.db.patch(taskId, { isCompleted: true });
    return newTaskId;
  },
});

export const unCheckATodo = mutation({
  args: { taskId: v.id("todos") },
  handler: async (ctx, { taskId }) => {
    const newTaskId = await ctx.db.patch(taskId, { isCompleted: false });
    return newTaskId;
  },
});

export const createATodo = mutation({
  args: {
    taskName: v.string(),
    description: v.optional(v.string()),
    priority: v.number(),
    dueDate: v.number(),
    projectId: v.id("projects"),
    labelId: v.id("labels"),
  },
  handler: async (
    ctx,
    { taskName, description, priority, dueDate, projectId, labelId }
  ) => {
    try {
      const userId = await handleUserId(ctx);
      if (userId) {
        const newTaskId = await ctx.db.insert("todos", {
          userId,
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
      console.log("Error occurred during createATodo mutation", err);

      return null;
    }
  },
});
