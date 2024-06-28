const mongoose  = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'facilitator', 'coordinator'], required: true },
  year: { type: String, required: true }
});

const groupSchema = new Schema({
  year: { type: String, required: true },
  group_number: { type: Number, required: true }
});

const membershipSchema = new Schema({
  userId: { type:String, required: true , unique:true },
  groupId: { type: String, required: true },
  role: { type: String, required: true }
});

const attendanceSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  group_id: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
  date: { type: Date, required: true, default:Date.now() },
  status: { type: String, enum: ['present', 'absent'], required: true }
});

const User = mongoose.model('User', userSchema);
const Group = mongoose.model('Group', groupSchema);
const Membership = mongoose.model('Membership', membershipSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports  = {
  User, Group, Membership, Attendance
}