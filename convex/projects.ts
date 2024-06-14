import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getProjects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("projects").collect();
  },
});

export const getProjectByProjectId = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    const project = await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("_id"), projectId))
      .collect();

    return project?.[0] || null;
  },
});
