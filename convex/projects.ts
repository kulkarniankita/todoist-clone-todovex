import { query, mutation, action } from "./_generated/server";
import { v } from "convex/values";
import { handleUserId } from "./auth";
import { api } from "./_generated/api";

export const getProjects = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserId(ctx);
    if (userId) {
      const userProjects = await ctx.db
        .query("projects")
        .filter((q) => q.eq(q.field("userId"), userId))
        .collect();

      const systemProjects = await ctx.db
        .query("projects")
        .filter((q) => q.eq(q.field("type"), "system"))
        .collect();

      return [...systemProjects, ...userProjects];
    }
    return [];
  },
});

export const getProjectByProjectId = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    const userId = await handleUserId(ctx);
    if (userId) {
      const project = await ctx.db
        .query("projects")
        .filter((q) => q.eq(q.field("_id"), projectId))
        .collect();
      return project?.[0] || null;
    }
    return null;
  },
});

export const createAProject = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, { name }) => {
    try {
      const userId = await handleUserId(ctx);
      if (userId) {
        const newTaskId = await ctx.db.insert("projects", {
          userId,
          name,
          type: "user",
        });
        return newTaskId;
      }

      return null;
    } catch (err) {
      console.log("Error occurred during createAProject mutation", err);

      return null;
    }
  },
});

export const deleteProject = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    try {
      const userId = await handleUserId(ctx);
      if (userId) {
        const taskId = await ctx.db.delete(projectId);
        //query todos and map through them and delete

        return taskId;
      }

      return null;
    } catch (err) {
      console.log("Error occurred during deleteProject mutation", err);

      return null;
    }
  },
});

export const deleteProjectAndItsTasks = action({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    try {
      const todos = await ctx.runQuery(api.todos.getTodosByProjectId, {
        projectId,
      });
      todos.map(async (todo) => {
        console.log({ todo });

        const parentId = todo._id;
        const subTodos = await ctx.runQuery(
          api.subTodos.getSubTodosByParentId,
          {
            parentId,
          }
        );
        console.log({ subTodos });

        subTodos.map(async (todo) => {
          const id = todo._id;
          await ctx.runMutation(api.subTodos.deleteASubTodo, {
            taskId: id,
          });
        });
        await ctx.runMutation(api.todos.deleteATodo, {
          taskId: parentId,
        });
      });

      await ctx.runMutation(api.projects.deleteProject, { projectId });
    } catch (err) {
      console.error("Error while deleting projects and its tasks", err);
    }
  },
});
