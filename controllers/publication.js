const Publication = require("../models/publication");
const User = require("../models/user");



const add = async (req, res) => {
  try {
    const publicationObject = new Publication(req.body);
    const savedPublication = await publicationObject.save();

    const updatedUser = await User.findByIdAndUpdate(
      req.auth.userId,
      { $push: { publications: savedPublication._id } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found !",
      });
    }
    res.status(201).json({
      payload: savedPublication,
      message: "Publication created !",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Problem of creation of the publication !",
    });
  }
};

const getById = (req, res) => {
  Publication.findOne({ _id: req.params.id })
    .then((publication) => {
      if (!publication) {
        res.status(404).json({
          message: "",
        });
      } else {
        res.status(200).json({
          payload: publication,
          message: "",
        });
      }
    })
    .catch((error) =>
      res.status(400).json({
        error: error.message,
        message: "",
      })
    );
};

module.exports = {
  add,
  getById,
};
