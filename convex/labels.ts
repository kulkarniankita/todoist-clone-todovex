import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getLabels = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("labels").collect();
  },
});

export const getLabelByLabelId = query({
  args: {
    labelId: v.id("labels"),
  },
  handler: async (ctx, { labelId }) => {
    const project = await ctx.db
      .query("labels")
      .filter((q) => q.eq(q.field("_id"), labelId))
      .collect();

    return project?.[0] || null;
  },
});
