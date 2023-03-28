/**Author: Crystal Parker B00440168 */
// get the model
import User from "../models/userModel";
import { Types } from "mongoose";

// create new user
export const createUser = async (req, res) => {
  const { name, password, email } = req.body;

  // ToDo Hash password before storing in database -> done in auth and called by auth.
  // maybe some control that it can only be called by auth? not sure how to do that.

  // add to database - mongo makes an _id
  // ToDo - no duplicate emails
  try {
    const user = await User.create({ name, password, email });
    return res.status(200).json(user); // return the object
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// get all users
export const getUsers = async (_req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  return res.status(200).json(users);
};

// get a single user by id
export const getUser = async (req, res) => {
  const { id } = req.params;

  // if id is wrong type
  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  // get id from database
  const user = await User.findById(id);

  // if user not found
  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  // user found
  return res.status(200).json(user);
};

// findUser - find a user by email
export const findUser = async (req, res) => {
  const { email } = req.params;

  // toDo sanitize - check if it's an email
  const user = await User.find({ email: email });
  // if user not found
  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  // user found
  return res.status(200).json(user);
};

// delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

// update a user
export const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }

  res.status(200).json(user);
};
