const route = require("express").Router();
const Bug = require("../../Models/bugModel");
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({extended: false})

// Create bug
route.post("/createBug", async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Please add text to fields");
  }

  const { name, status, details, assigned, author, comments } = req.body;
  const steps = Object.values(req.body.steps);
  const bug = await Bug.create({
    name,
    status,
    details,
    steps,
    assigned,
    author,
    comments,
  });

  res.status(200).json(bug);
});

// Add comment
route.put("/leaveComment/:id", async (req, res) => {
  const bug = await Bug.findById(req.params.id);

  if (!bug) {
    res.status(400);
    throw new Error("Bug not found")
  }

  let updatedBug = await Bug.findByIdAndUpdate(req.params.id, {$push: {comments: req.body.comment}}, {new: true})

  res.json(updatedBug)

})

// Update bug
route
  .put("/updateBug/:id", async (req, res) => {
    const { name, status, details, steps, assigned, author, comments } =
      req.body;
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
      res.status(400);
      throw new Error("Bug not found");
    }

    const checkForSteps = () => {
      let tempBug = null;

      if (steps) {
        tempBug = Bug.findByIdAndUpdate(
          req.params.id,
          { $push: { steps: steps } },
          { new: true }
        );
      }

      return tempBug;
    };

    const checkForComments = () => {
      let tempBug = null;

      if (comments) {
        tempBug = Bug.findByIdAndUpdate(
          req.params.id,
          { $push: { comments: comments } },
          { new: true }
        );
      }

      return tempBug;
    };

    const checkForRestOfUpdates = () => {
      let tempBug = null;

      tempBug = Bug.findByIdAndUpdate(
        req.params.id,
        { name, details, status, assigned, author },
        { new: true }
      );

      return tempBug;
    };
    let updatedBug = null;

    if (steps) {
      updatedBug = await checkForSteps();
    }

    if (comments) {
      updatedBug = await checkForComments();
    }

    if (name || details || author || assigned || status) {
      updatedBug = await checkForRestOfUpdates();
    }

    res.status(200).json(updatedBug);
  })

  // Get bugs
  .get("/", async (req, res) => {
    const bugs = await Bug.find();

    res.status(200).json(bugs);
  });

module.exports = route;
