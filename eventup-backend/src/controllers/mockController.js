import { users, events, performers } from "../data/mockData.js";

export const getEvents = (req, res) => {
  res.json(events);
};

export const getPerformers = (req, res) => {
  res.json(performers);
};

export const getUsers = (req, res) => {
  res.json(users);
};
