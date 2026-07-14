import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import { User } from "./models/User.js";
import { Lead } from "./models/Lead.js";
import { Contact } from "./models/Contact.js";
import { Task } from "./models/Task.js";
import { Note } from "./models/Note.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();
    console.log("Database connected for seeding.");

    // Clear existing data
    await User.deleteMany();
    await Lead.deleteMany();
    await Contact.deleteMany();
    await Task.deleteMany();
    await Note.deleteMany();
    console.log("Cleared existing data.");

    // Create a demo user
    const user = await User.create({
      name: "Demo User",
      email: "demo@example.com",
      password: "password123",
      role: "owner",
      company: "Acme Corp",
    });
    console.log("Created demo user.");

    // Create Leads
    const leads = await Lead.insertMany([
      {
        owner: user._id,
        name: "Acme Deal",
        email: "contact@acme.com",
        company: "Acme Inc",
        status: "New",
        priority: "High",
        source: "Website",
        value: 10000,
      },
      {
        owner: user._id,
        name: "Global Tech Project",
        email: "info@globaltech.com",
        company: "Global Tech",
        status: "Qualified",
        priority: "Medium",
        source: "Referral",
        value: 25000,
      },
      {
        owner: user._id,
        name: "Stark Industries Upgrade",
        email: "tony@stark.com",
        company: "Stark Industries",
        status: "Proposal",
        priority: "High",
        source: "Cold Outreach",
        value: 150000,
      },
      {
        owner: user._id,
        name: "Wayne Enterprises Merger",
        email: "bruce@wayne.com",
        company: "Wayne Enterprises",
        status: "Won",
        priority: "Medium",
        source: "Event",
        value: 75000,
      },
      {
        owner: user._id,
        name: "Oscorp Deal",
        email: "norman@oscorp.com",
        company: "Oscorp",
        status: "Lost",
        priority: "Low",
        source: "Other",
        value: 5000,
      },
    ]);
    console.log("Created leads.");

    // Create Contacts
    const contacts = await Contact.insertMany([
      {
        owner: user._id,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        company: "Example Inc",
        title: "CEO",
        favorite: true,
      },
      {
        owner: user._id,
        name: "Jane Smith",
        email: "jane@tech.com",
        phone: "987-654-3210",
        company: "Tech Solutions",
        title: "CTO",
      },
      {
        owner: user._id,
        name: "Tony Stark",
        email: "tony@stark.com",
        phone: "555-0199",
        company: "Stark Industries",
        title: "CEO",
        favorite: true,
      },
      {
        owner: user._id,
        name: "Bruce Wayne",
        email: "bruce@wayne.com",
        phone: "555-0299",
        company: "Wayne Enterprises",
        title: "CEO",
      },
      {
        owner: user._id,
        name: "Clark Kent",
        email: "clark@dailyplanet.com",
        phone: "555-0399",
        company: "Daily Planet",
        title: "Reporter",
      },
    ]);
    console.log("Created contacts.");

    // Create Tasks
    await Task.insertMany([
      {
        owner: user._id,
        title: "Follow up with Acme",
        description: "Call them to discuss the new proposal.",
        status: "Pending",
        priority: "High",
        relatedLead: leads[0]._id,
      },
      {
        owner: user._id,
        title: "Send contract to Global Tech",
        description: "Draft and send the contract.",
        status: "In Progress",
        priority: "Medium",
        relatedLead: leads[1]._id,
      },
      {
        owner: user._id,
        title: "Meeting with Tony",
        description: "Discuss the Stark upgrade.",
        status: "Completed",
        priority: "High",
        relatedContact: contacts[2]._id,
      },
      {
        owner: user._id,
        title: "Cold call new prospects",
        description: "Find 10 new prospects.",
        status: "Pending",
        priority: "Low",
      },
      {
        owner: user._id,
        title: "Review Oscorp lost deal",
        description: "Analyze why we lost.",
        status: "Completed",
        priority: "Medium",
        relatedLead: leads[4]._id,
      },
    ]);
    console.log("Created tasks.");

    // Create Notes
    await Note.insertMany([
      {
        owner: user._id,
        content: "Acme seems very interested in our premium tier.",
        lead: leads[0]._id,
        pinned: true,
      },
      {
        owner: user._id,
        content: "Global tech needs a custom integration.",
        lead: leads[1]._id,
      },
      {
        owner: user._id,
        content: "Tony is tough to negotiate with, be prepared.",
        contact: contacts[2]._id,
        pinned: true,
      },
      {
        owner: user._id,
        content: "Wayne enterprises wants a demo next week.",
        lead: leads[3]._id,
      },
      {
        owner: user._id,
        content: "Clark might know some leads in Metropolis.",
        contact: contacts[4]._id,
      },
    ]);
    console.log("Created notes.");

    console.log("Database seeded successfully.");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
