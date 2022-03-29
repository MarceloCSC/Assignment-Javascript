import { users } from "../../data/users";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(users);
  } else if (req.method === "POST") {
    const updatedUser = users.find((user) => user.id === req.body.user.id);
    updatedUser.status = req.body.user.status;
    res.status(201).json(updatedUser);
  }
}
