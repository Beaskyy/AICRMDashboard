import { Contact } from "../models/Contact.js";
import { Lead } from "../models/Lead.js";
import { Task } from "../models/Task.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getOverview = asyncHandler(async (req, res) => {
  const owner = req.user.id;

  const [leads, contactCount, openTasks] = await Promise.all([
    Lead.find({ owner }),
    Contact.countDocuments({ owner }),
    Task.countDocuments({ owner, status: { $ne: "Completed" } }),
  ]);

  const stages = ["New", "Qualified", "Proposal", "Won", "Lost"];
  const byStage = Object.fromEntries(
    stages.map((s) => [s, { count: 0, value: 0 }]),
  );
  let totalValue = 0;
  let wonValue = 0;

  for (const l of leads) {
    const bucket =
      byStage[l.status] || (byStage[l.status] = { count: 0, value: 0 });
    bucket.count += 1;
    bucket.value += l.value || 0;
    totalValue += l.value || 0;
    if (l.status === "won") wonValue += l.value || 0;
  }

  const won = byStage.won.count;
  const lost = byStage.lost.count;
  const conversionRate = closed ? Math.round((won / closed) * 100) : 0;

  const months = lastSixMonths();
  const trend = months.map({ key, label }({ months: label, leads: 0, won: 0 }));
  const indexByKey = Object.fromEntries(months.map((m, i) => [m.key, i]));
});
