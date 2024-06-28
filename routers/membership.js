const express  = require('express')
const mRouter = express()
// Function to create a new membership
const createMembership = async (userId, groupId, role) => {
  const membership = new Membership({ user_id: userId, group_id: groupId, role });
  await membership.save();
  return membership;
};

// Function to get all memberships
const getAllMemberships = async () => {
  return Membership.find().exec();
};

// Function to get a membership by ID
const getMembershipById = async (id) => {
  return Membership.findById(id).exec();
};

// Function to update a membership
const updateMembership = async (id, userId, groupId, role) => {
  const membership = await Membership.findByIdAndUpdate(id, { user_id: userId, group_id: groupId, role }, { new: true }).exec();
  return membership;
};

// Function to delete a membership
const deleteMembership = async (id) => {
  await Membership.findByIdAndRemove(id).exec();
};

// API Endpoints

// Create a new membership
mRouter.post('/memberships', async (req, res) => {
  try {
    const { userId, groupId, role } = req.body;
    const membership = await createMembership(userId, groupId, role);
    res.status(201).json({ message: 'Membership created successfully', membership });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create membership', error });
  }
});

// Get all memberships
mRouter.get('/memberships', async (req, res) => {
  try {
    const memberships = await getAllMemberships();
    res.status(200).json(memberships);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get memberships', error });
  }
});

// Get a membership by ID
mRouter.get('/memberships/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const membership = await getMembershipById(id);
    if (!membership) {
      res.status(404).json({ message: 'Membership not found' });
    } else {
      res.status(200).json(membership);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to get membership', error });
  }
});

// Update a membership
mRouter.put('/memberships/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { userId, groupId, role } = req.body;
    const membership = await updateMembership(id, userId, groupId, role);
    res.status(200).json({ message: 'Membership updated successfully', membership });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update membership', error });
  }
});

// Delete a membership
mRouter.delete('/memberships/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await deleteMembership(id);
    res.status(200).json({ message: 'Membership deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete membership', error });
  }
});
module.exports = mRouter