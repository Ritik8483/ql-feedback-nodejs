const UserTableModel = require("../model/users-table");
const UserTable = UserTableModel.UserTable;
const { responder } = require("../responder/responder");

exports.addUsers = async (req, res) => {
  console.log(req.body);
  try {
    const resp = await new UserTable(req.body).save();
    if (resp.id) {
      responder(res, 3006, {});
    }
  } catch (error) {
    console.log("error", error);
    if (error.code === 11000) {
      console.log("error", error);
      res.status(400).json({
        error: `Duplicate key error. ${error.keyValue.email} already exists.`,
      });
    } else {
      console.log("error", error);
      res.status(400).json(error);
    }
  }
};

exports.getAllUsers = async (req, res) => {
  const limit = +req.query.limit;
  const pageNumber = +req.query.page;
  const searchRegEx = new RegExp(req.query.search, "i");
  try {
    const totalUsers = await UserTable.find().countDocuments();
    const totalSearchUsers = await UserTable.find({
      $or: [{ firstName: searchRegEx }, { email: searchRegEx }],
    }).countDocuments();
    if (!req.query.search) {
      const resp = await UserTable.find()
        .sort({ _id: -1 })
        .skip(limit * (pageNumber - 1))
        .limit(limit)
        .select("-__v -createdAt -updatedAt");
      if (Array.isArray(resp)) {
        responder(res, 3007, resp, totalUsers);
      }
    } else {
      const resp = await UserTable.find({
        $or: [{ firstName: searchRegEx }, { email: searchRegEx }],
      })
        .sort({ _id: -1 })
        .skip(limit * (pageNumber - 1))
        .limit(limit)
        .select("-__v -createdAt -updatedAt");
      if (Array.isArray(resp)) {
        responder(res, 3007, resp, totalSearchUsers);
      }
    }
  } catch (error) {
    console.log("error");
    res.status(400).json(error);
  }
};

exports.getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await UserTable.findById(id).select(
      "-__v -createdAt -updatedAt"
    );
    if (Object.keys(resp).length) {
      responder(res, 3008, resp);
    }
  } catch (error) {
    console.log("error");
    res.status(400).json(error);
  }
};

exports.updateUsers = async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await UserTable.findOneAndUpdate({ _id: id }, req.body);
    if (Object.keys(resp).length) {
      responder(res, 3009, {});
    }
  } catch (error) {
    if (error.code === 11000) {
      console.log("error", error);
      res.status(400).json({
        error: `Duplicate key error. ${error.keyValue.email} already exists.`,
      });
    } else {
      console.log("error", error);
      res.status(400).json(error);
    }
  }
};

exports.deleteUsers = async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await UserTable.findOneAndDelete({ _id: id });
    if (!resp) {
      res.status(400).json({ error: "User already deleted" });
    } else if (Object.keys(resp).length) {
      responder(res, 3010, {});
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json(error);
  }
};
