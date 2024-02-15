const RoleTableModel = require("../model/roles-table");
const RoleTable = RoleTableModel.RoleTable;
const { responder, errorResponder } = require("../responder/responder");
const { validationResult } = require("express-validator");

exports.addRoles = async (req, res) => {
  const validationError = validationResult(req);
  if (validationError.isEmpty()) {
    try {
      const resp = await new RoleTable(req.body).save();
      if (resp.id) {
        responder(res, 3011, {});
      }
    } catch (error) {
      if (error.code === 11000) {
        errorResponder(res, {
          error: `Duplicate key error. ${
            error.keyValue.teamEmail || error.keyValue.teamName
          } already exists.`,
        });
      } else {
        errorResponder(res, error);
      }
    }
  } else {
    errorResponder(res, validationError.array());
  }
};

exports.getAllRoles = async (req, res) => {
  const limit = +req.query.limit || 100;
  const pageNumber = +req.query.page || 1;
  const searchRegEx = new RegExp(req.query.search, "i");
  const validationError = validationResult(req);
  if (validationError.isEmpty()) {
    try {
      const totalRoles = await RoleTable.find()
        .countDocuments()
        .skip(limit * (pageNumber - 1))
        .limit(limit);
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
      errorResponder(res, error);
    }
  } else {
    errorResponder(res, validationError.array());
  }
};

exports.getSingleRole = async (req, res) => {
  const { id } = req.params;
  const validationError = validationResult(req);
  if (validationError.isEmpty()) {
    try {
      const resp = await RoleTable.findById(id).select(
        "-__v -createdAt -updatedAt"
      );
      if (Object.keys(resp).length) {
        responder(res, 3013, resp);
      }
    } catch (error) {
      errorResponder(res, error);
    }
  } else {
    errorResponder(res, validationError.array());
  }
};

exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const validationError = validationResult(req);
  if (validationError.isEmpty()) {
    try {
      const resp = await RoleTable.findOneAndUpdate({ _id: id }, req.body);
      if (Object.keys(resp).length) {
        responder(res, 3014, {});
      }
    } catch (error) {
      if (error.code === 11000) {
        errorResponder(res, {
          error: `Duplicate key error. ${
            error.keyValue.teamEmail || error.keyValue.teamName
          } already exists.`,
        });
      } else {
        errorResponder(res, error);
      }
    }
  } else {
    errorResponder(res, validationError.array());
  }
};

exports.deleteRole = async (req, res) => {
  const { id } = req.params;
  const validationError = validationResult(req);
  if (validationError.isEmpty()) {
    try {
      const resp = await RoleTable.findOneAndDelete({ _id: id });
      if (!resp) {
        errorResponder(res, { error: "Role already deleted" });
      } else if (Object.keys(resp).length) {
        responder(res, 3015, {});
      }
    } catch (error) {
      errorResponder(res, validationError.array());
    }
  }
};
