import { Contact } from "../models/Contact.js";
import { Lead } from "../models/Lead.js";
import { Task } from "../models/Task.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getOverview = asyncHandler(async (req, res) => {
  const owner = req.user.id

  const [leads, contactCount, openTasks] = await Promise.all([
    Lead.find({ owner })
    Contact.countDocuments({ owner })
    Task.countDocuments({ owner, status: { $ne: "Completed"}})
  ])

  const stages = ["New", "Qualified", "Proposal", "Won", "Lost"]
  const byStage = Object.fromEntries(stages.map((s) => [s, {count: 0, value: 0}]))
  let totalValue = 0
  let wonValue = 0
  
})