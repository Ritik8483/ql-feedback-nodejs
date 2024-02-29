const GenerateFormModel = require("../model/generate-form");
const GenerateFormTable = GenerateFormModel.GenerateFormTable;
const { responder, errorResponder } = require("../responder/responder");
const { validationResult } = require("express-validator");

exports.addFeedbackForm = async (req, res) => {
  const validationError = validationResult(req);
  if (validationError.isEmpty()) {
    try {
      const resp = await new GenerateFormTable(req.body).save();
      if (resp.id) {
        responder(res, 3016, {});
      }
    } catch (error) {
      errorResponder(res, error);
    }
  } else {
    errorResponder(res, validationError.array());
  }
};

exports.getAllFeedbackForm = async (req, res) => {
  const limit = +req.query.limit || 100;
  const pageNumber = +req.query.page || 1;
  const searchRegEx = new RegExp(req.query.search, "i");
  const validationError = validationResult(req);
  if (validationError.isEmpty()) {
    try {
      const totalFeedbackForm = await GenerateFormTable.find()
        .countDocuments()
        .skip(limit * (pageNumber - 1))
        .limit(limit);
      const totalSearchRoles = await GenerateFormTable.find({
        $or: [{ feedbackName: searchRegEx }, { feedback_type: searchRegEx }],
      }).countDocuments();
      if (!req.query.search) {
        const resp = await GenerateFormTable.find()
          .sort({ _id: -1 })
          .populate("feedback_parameters")
          .populate("reviewer")
          .populate("review")
          .skip(limit * (pageNumber - 1))
          .limit(limit)
          .select("-__v -updatedAt");
        if (Array.isArray(resp)) {
          responder(res, 3017, resp, totalFeedbackForm);
        }
      } else {
        const resp = await GenerateFormTable.find({
          $or: [{ feedbackName: searchRegEx }, { feedback_type: searchRegEx }],
        })
          .sort({ _id: -1 })
          .populate("feedback_parameters")
          .populate("reviewer")
          .populate("review")
          .skip(limit * (pageNumber - 1))
          .limit(limit)
          .select("-__v -updatedAt");
        if (Array.isArray(resp)) {
          responder(res, 3017, resp, totalSearchRoles);
        }
      }
    } catch (error) {
      errorResponder(res, error);
    }
  } else {
    errorResponder(res, validationError.array());
  }
};

exports.getSingleFeedbackForm = async (req, res) => {
  const { id } = req.params;
  const validationError = validationResult(req);
  if (validationError.isEmpty()) {
    try {
      const resp = await GenerateFormTable.findById(id)
        .populate("feedback_parameters")
        .populate("reviewer")
        .populate("review")
        .select("-__v -updatedAt");
      if (Object.keys(resp).length) {
        responder(res, 3018, resp);
      }
    } catch (error) {
      errorResponder(res, error);
    }
  } else {
    errorResponder(res, validationError.array());
  }
};

exports.updateFeedbackForm = async (req, res) => {
  const { id } = req.params;
  const validationError = validationResult(req);
  if (validationError.isEmpty()) {
    try {
      const resp = await GenerateFormTable.findOneAndUpdate(
        { _id: id },
        req.body
      );
      if (Object.keys(resp).length) {
        responder(res, 3019, {});
      }
    } catch (error) {
      errorResponder(res, error);
    }
  } else {
    errorResponder(res, validationError.array());
  }
};

exports.deleteFeedbackForm = async (req, res) => {
  const { id } = req.params;
  const validationError = validationResult(req);
  if (validationError.isEmpty()) {
    try {
      const resp = await GenerateFormTable.findOneAndDelete({ _id: id });
      if (!resp) {
        errorResponder(res, { error: "Feedback Form already deleted" });
      } else if (Object.keys(resp).length) {
        responder(res, 3020, {});
      }
    } catch (error) {
      errorResponder(res, error);
    }
  } else {
    errorResponder(res, validationError.array());
  }
};
