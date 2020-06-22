const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  console.log(req.body.username);
  const username = req.body.username;

  const newUser = new User({ username });
  newUser
    .save()
    .then(() => res.json("User added!"))

    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/deleteUser").delete((req, res) => {
  console.log(req.body.source.username);
  User.find({ username: req.body.source.username })
    .then((response) => {
      console.log(response);
      if (response) {
        User.findByIdAndDelete(response[0]._id)
          .then(() => res.json("User deleted"))
          .catch((err) => res.status(400).json("Error: " + err));
      } else {
        alert("Error!!");
      }
    })
    .catch((err) => console.log(err));
});
module.exports = router;
