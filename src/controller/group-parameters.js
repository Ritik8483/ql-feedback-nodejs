const FeedbackGroupSchema = require("../model/group-parameters");
const GroupParameter = FeedbackGroupSchema.GroupParameter;
const { responder, errorResponder } = require("../responder/responder");
const { validationResult } = require("express-validator");

exports.addFeedbackGroup = async (req, res) => {
  const validationError = validationResult(req);
  if (validationError.isEmpty()) {
    try {
      const resp = new GroupParameter(req.body);
      const finalResp = await resp.save();
      if (finalResp.id) {
        responder(res, 3021, {});
      }
    } catch (error) {
      if (error.code === 11000) {
        errorResponder(res, {
          error: `Duplicate key error. ${error.keyValue.feedbackGroupName} feedback name already exists.`,
        });
      } else {
        errorResponder(res, error);
      }
    }
  } else {
    errorResponder(res, validationError.array());
  }
};

exports.getAllFeedbackGroup = async (req, res) => {
  const limit = +req.query.limit || 100;
  const pageNumber = +req.query.page || 1;
  const searchRegEx = new RegExp(req.query.search, "i");
  const validationError = validationResult(req);
  if (validationError.isEmpty()) {
    try {
      const totalGroupParameters = await GroupParameter.aggregate([
        {
          $match: {
            feedbackGroupName: searchRegEx,
          },
        },
        {
          $count: "groupParametersCount",
        },
      ]);
      const resp = await GroupParameter.aggregate([
        { $sort: { _id: -1 } },
        {
          $match: {
            feedbackGroupName: searchRegEx,
          },
        },
        { $skip: limit * (pageNumber - 1) },
        { $limit: limit },
      ]);

      const finalResp = await GroupParameter.populate(resp, {
        path: "groupFeedbacks",
      });
      if (Array.isArray(finalResp)) {
        responder(
          res,
          3022,
          finalResp,
          totalGroupParameters[0].groupParametersCount
        );
      }
    } catch (error) {
      errorResponder(res, error);
    }
  } else {
    errorResponder(res, validationError.array());
  }
};

exports.getSingleFeedbackGroup = async (req, res) => {
  const { id } = req.params;
  const validationError = validationResult(req);
  if (validationError.isEmpty()) {
    try {
      const resp = await GroupParameter.findById(id).select(
        "-__v -createdAt -updatedAt"
      );
      if (Object.keys(resp).length) {
        responder(res, 3023, resp);
      }
    } catch (error) {
      errorResponder(res, error);
    }
  } else {
    errorResponder(res, validationError.array());
  }
};

exports.updateFeedbackGroup = async (req, res) => {
  const { id } = req.params;
  const validationError = validationResult(req);
  if (validationError.isEmpty()) {
    try {
      const resp = await GroupParameter.findOneAndUpdate({ _id: id }, req.body);
      if (Object.keys(resp).length) {
        responder(res, 3024, {});
      }
    } catch (error) {
      if (error.code === 11000) {
        errorResponder(res, {
          error: `Duplicate key error. ${error.keyValue.feedbackName} feedback name already exists.`,
        });
      } else {
        errorResponder(res, error);
      }
    }
  } else {
    errorResponder(res, validationError.array());
  }
};

exports.deleteFeedbackGroup = async (req, res) => {
  const { id } = req.params;
  const validationError = validationResult(req);
  if (validationError.isEmpty()) {
    try {
      const resp = await GroupParameter.findOneAndDelete({ _id: id });
      if (!resp) {
        errorResponder(res, {
          error: "Feedback Parameter group already deleted",
        });
      } else if (Object.keys(resp).length) {
        responder(res, 3025, {});
      }
    } catch (error) {
      errorResponder(res, error);
    }
  } else {
    errorResponder(res, validationError.array());
  }
};
