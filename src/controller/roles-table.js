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
      const totalRoles = await RoleTable.aggregate([
        {
          $match: {
            $or: [{ teamName: searchRegEx }, { teamEmail: searchRegEx }],
          },
        },
        {
          $count: "rolesCount",
        },
      ]);
      const resp = await RoleTable.aggregate([
        { $sort: { _id: -1 } },
        {
          $match: {
            $or: [{ teamName: searchRegEx }, { teamEmail: searchRegEx }],
          },
        },
        { $skip: limit * (pageNumber - 1) },
        { $limit: limit },
      ]);

      const finalResp = await RoleTable.populate(resp, { path: "teamUsers" });
      if (Array.isArray(finalResp)) {
        responder(res, 3012, finalResp, totalRoles[0].rolesCount);
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
