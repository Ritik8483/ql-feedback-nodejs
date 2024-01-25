const RoleTableModel = require("../model/roles-table");
const RoleTable = RoleTableModel.RoleTable;
const { responder } = require("../responder/responder");

exports.addRoles = async (req, res) => {
  try {
    const resp = await new RoleTable(req.body).save();
    if (resp.id) {
      responder(res, 3011, {});
    }
  } catch (error) {
    console.log("error", error);
    if (error.code === 11000) {
      console.log("error", error);
      res.status(400).json({
        error: `Duplicate key error. ${
          error.keyValue.teamEmail || error.keyValue.teamName
        } already exists.`,
      });
    } else {
      console.log("error", error);
      res.status(400).json(error);
    }
  }
};

exports.getAllRoles = async (req, res) => {
  const limit = +req.query.limit;
  const pageNumber = +req.query.page;
  const searchRegEx = new RegExp(req.query.search, "i");
  try {
    const totalRoles = await RoleTable.find().countDocuments();
    const totalSearchRoles = await RoleTable.find({
      $or: [{ teamName: searchRegEx }, { teamEmail: searchRegEx }],
    }).countDocuments();
    if (!req.query.search) {
      const resp = await RoleTable.find()
        .sort({ _id: -1 })
        .populate("teamUsers")
        .skip(limit * (pageNumber - 1))
        .limit(limit)
        .select("-__v -createdAt -updatedAt");
      if (Array.isArray(resp)) {
        responder(res, 3012, resp, totalRoles);
      }
    } else {
      const resp = await RoleTable.find({
        $or: [{ teamName: searchRegEx }, { teamEmail: searchRegEx }],
      })
        .sort({ _id: -1 })
        .populate("teamUsers")
        .skip(limit * (pageNumber - 1))
        .limit(limit)
        .select("-__v -createdAt -updatedAt");
      if (Array.isArray(resp)) {
        responder(res, 3012, resp, totalSearchRoles);
      }
    }
  } catch (error) {
    console.log("error");
    res.status(400).json(error);
  }
};

exports.getSingleRole = async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await RoleTable.findById(id).select(
      "-__v -createdAt -updatedAt"
    );
    if (Object.keys(resp).length) {
      responder(res, 3013, resp);
    }
  } catch (error) {
    console.log("error");
    res.status(400).json(error);
  }
};

exports.updateRole = async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await RoleTable.findOneAndUpdate({ _id: id }, req.body);
    if (Object.keys(resp).length) {
      responder(res, 3014, {});
    }
  } catch (error) {
    if (error.code === 11000) {
      console.log("error", error);
      res.status(400).json({
        error: `Duplicate key error. ${
          error.keyValue.teamEmail || error.keyValue.teamName
        } already exists.`,
      });
    } else {
      console.log("error", error);
      res.status(400).json(error);
    }
  }
};

exports.deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await RoleTable.findOneAndDelete({ _id: id });
    if (!resp) {
      res.status(400).json({ error: "Role already deleted" });
    } else if (Object.keys(resp).length) {
      responder(res, 3015, {});
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json(error);
  }
};
