// javascript
const { Group } = require("../db/appModel.js");
const express = require("express");
const groupRouter = express();
// Function to create a new group
const createGroup = async (year, groupNumber) => {
  const group = new Group({ year, group_number: groupNumber });
  await group.save();
  return group;
};
// Function to get all groups
const getAllGroups = async () => {
  return Group.find();
};

// Function to get a group by ID
const getGroupById = async (id) => {
  return Group.findById(id);
};

// Function to update a group
const updateGroup = async (id, year, groupNumber) => {
  const group = await Group.findByIdAndUpdate(
    id,
    { year, group_number: groupNumber },
    { new: true }
  );
  return group;
};

// Function to delete a group
const deleteGroup = async (id) => {
  await Group.findByIdAndDelete(id);
};

// API Endpoints

// Create a new group
groupRouter.post("/groups", async (req, res) => {
  try {

    const { year, groupNumber } = req.body;
    const group = await createGroup(year, groupNumber);
   
    res.status(201).json({ message: "Group created successfully", group });
  } catch (error) {
    res.status(500).json({ message: "Failed to create group", error });
  }
});

// Get all groups
groupRouter.get("/groups", async (req, res) => {
  try {
    const groups = await getAllGroups();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: "Failed to get groups", error });
  }
});

// Get a group by ID
groupRouter.get("/groups/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const group = await getGroupById(id);
    if (!group) {
      res.status(404).json({ message: "Group not found" });
    } else {
      res.status(200).json(group);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to get group", error });
  }
});

// Update a group
groupRouter.put("/groups/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { year, groupNumber } = req.body;
    const group = await updateGroup(id, year, groupNumber);
    res.status(200).json({ message: "Group updated successfully", group });
  } catch (error) {
    res.status(500).json({ message: "Failed to update group", error });
  }
});

// Delete a group
groupRouter.delete("/groups/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteGroup(id);
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete group", error });
  }
});
module.exports = groupRouter;
