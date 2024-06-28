const express  = require('express')
const attendanceRouter = express.Router()
const {Attendance} = require('../db/appModel')

// Function to create a new attendance record
const createAttendance = async (userId, groupId, date, status) => {
  const attendance = new Attendance({ user_id: userId, group_id: groupId, date, status });
  await attendance.save();
  return attendance;
};

// Function to get all attendance records
const getAllAttendance = async () => {
  return Attendance.find();
};

// Function to get attendance records by user ID and group ID
const getAttendanceByUserAndGroup = async (userId, groupId) => {
  return Attendance.find({ user_id: userId, group_id: groupId }).exec();
};

// Function to update an attendance record
const updateAttendance = async (id, userId, groupId, date, status) => {
  const attendance = await Attendance.findByIdAndUpdate(id, { user_id: userId, group_id: groupId, date, status }, { new: true }).exec();
  return attendance;
};

// Function to delete an attendance record
const deleteAttendance = async (id) => {
  await Attendance.findByIdAndRemove(id).exec();
};

// API Endpoints

// Create a new attendance record
attendanceRouter.post('/attendance', async (req, res) => {
  try {
    const { userId, groupId, date, status } = req.body;
    const attendance = await createAttendance(userId, groupId, date, status);
    res.status(201).json({ message: 'Attendance record created successfully', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create attendance record', error });
  }
});

// Get all attendance records
attendanceRouter.get('/attendance', async (req, res) => {
  try {
    const attendance = await getAllAttendance();
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get attendance records', error });
  }
});

// Get attendance records by user ID and group ID
attendanceRouter.get('/attendance/:userId/:groupId', async (req, res) => {
  try {
    const { userId, groupId } = req.params;
    const attendance = await getAttendanceByUserAndGroup(userId, groupId);
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get attendance records', error });
  }
});

// Update an attendance record
attendanceRouter.put('/attendance/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { userId, groupId, date, status } = req.body;
    const attendance = await updateAttendance(id, userId, groupId, date, status);
    res.status(200).json({ message: 'Attendance record updated successfully', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update attendance record', error });
  }
});

// Delete an attendance record
attendanceRouter.delete('/attendance/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await deleteAttendance(id);
    res.status(200).json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete attendance record', error });
  }
});

module.exports =  attendanceRouter