const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const addAdmin = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        phone: req.body.phone,
        role: "admin",
        status: "V",
      });
      user
        .save()
        .then((response) => {
          const newUser = response.toObject();
          delete newUser.password;
          res.status(201).json({
            payload: newUser,
            message: "Admin creared !",
          });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
    })
    .catch((error) => res.status(500).json({ error }));
};
const signup = (req, res, next) => {
  const user = new User({
    email: req.body.email,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    phone: req.body.phone,
  });
  user
    .save()
    .then((response) => {
      const newUser = response.toObject();
      res.status(201).json({
        payload: newUser,
        message: "Author created!",
      });
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};
const login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Incorrect email or password !" });
      }
      bcrypt.compare(req.body.password, user.password).then((valid) => {
        if (!valid) {
          return res.status(401).json({ message: "Incorrect email or password !" });
        }
        res.status(200).json({
          token: jwt.sign(
            { userId: user._id, role: user.role },
            "RANDOM_TOKEN_SECRET",
            {
              expiresIn: "24h",
            }
          ),
        });
      });
    })
    .catch((error) => res.status(500).json({ error: error }));
};

module.exports = {
  signup,
  login,
  addAdmin,
};
