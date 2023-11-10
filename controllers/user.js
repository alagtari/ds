const bcrypt = require("bcrypt");
const User = require("../models/user");

const validation = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Author not found !" });
      }
      bcrypt.hash(user.phone, 10).then((hash) => {
        user.password = hash;
        user.status = "V";
        user
          .save()
          .then((response) => {
            const newUser = response.toObject();
            delete newUser.password;
            res.status(200).json({
              payload: newUser,
              message: "Author verified!",
            });
          })
          .catch((error) => res.status(400).json({ error: error.message }));
      });
    })
    .catch((error) => res.status(500).json({ error: error }));
};

const info = (req, res, next) => {
  User.findOne({ _id: req.auth.userId })
    .populate("publications")
    .select("-password")
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Author not found !" });
      } else {
        res.status(200).json({
          payload: user,
          message: "Success",
        });
      }
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

module.exports = {
  validation,
  info,
};
