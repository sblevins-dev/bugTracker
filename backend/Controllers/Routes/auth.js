const route = require("express").Router();
const bcrypt = require("bcrypt");
const userModel = require("../../Models/userModel");

const hashPassword = async (p) => {
    const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(p, salt)
  
  return hash;
};

// Create user
route.post("/user", async (req, res) => {
  const { name, role, password } = req.body;

  if (!name || !password) {
      res.status(400);
      throw new Error("Please add a name and password");
  }

  const userExists = await userModel.findOne({name});

  if (userExists) {
      res.status(400);
      throw new Error ("User already exists");
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  if (hashedPassword === undefined) {
      res.status(400);
      throw new Error ("Problem hashing")
  }

  // create user
  const user = await userModel.create({
      name,
      password: hashedPassword,
      role,
  })

  if (user) {
      res.status(201).send('User Created')
  } else {
      res.status(400);
      throw new Error ("Error creating user")
  }
});

// Update user
route
  .put("/user", (req, res) => {
    const { _id, name, password, role } = req.body;
    userModel
      .findByIdAndUpdate(_id, { name, password, role })
      .then((user) => {
        if (!user) return res.status(400).send("No user");
        res.send("Updated user");
      })
      .catch((err) => {
        if (err) res.status(400).send(err);
      });
  })

  // Login user
  .post("/", async (req, res) => {
    const { name, password } = req.body;

    // check for user
    const user = await userModel.findOne({name});

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            name,
            role: user.role
        })
    } else {
        res.status(400);
        throw new Error ("Invalid credentials")
    }
  })

  // Get users
  .get("/", (req, res) => {
    userModel
      .find()
      .then((user) => {
        if (!user) return res.status(400).send("No users");
        res.send(user);
      })
      .catch((err) => {
        if (err) res.status(400).send(err);
      });
  });

module.exports = route;
