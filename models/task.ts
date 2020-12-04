import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const Task = mongoose.model('Task', new Schema({
  uid: { type: String, unique: true },
  name: String
}, { timestamps: true }));
