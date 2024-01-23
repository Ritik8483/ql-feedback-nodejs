const GenerateFormModel = require("../model/generate-form");
const GenerateFormTable = GenerateFormModel.GenerateFormTable;
const codes = require("../constant/code");
const messages = require("../constant/messages");

const {
  generateFeedbackFormCodes: {
    addFeedbackFormCode,
    getAllFeedbackFormCode,
    getSingleFeedbackFormCode,
    updateFeedbackFormCode,
    deleteFeedbackFormCode,
  },
} = codes;

const {
  generateFeedbackFormMsg: {
    addFeedbackFormMsg,
    getAllFeedbackFormMsg,
    getSingleFeedbackFormMsg,
    updateFeedbackFormMsg,
    deleteFeedbackFormMsg,
  },
} = messages;

exports.addFeedbackForm = async (req, res) => {
  try {
    const resp = await new GenerateFormTable(req.body).save();
    if (resp.id) {
      res.status(200).json({
        code: addFeedbackFormCode,
        data: {},
        message: addFeedbackFormMsg,
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json(error);
  }
};

exports.getAllFeedbackForm = async (req, res) => {
  const limit = +req.query.limit;
  const pageNumber = +req.query.page;
  const searchRegEx = new RegExp(req.query.search, "i");
  try {
    const totalFeedbackForm = await GenerateFormTable.find().countDocuments();
    const totalSearchRoles = await GenerateFormTable.find({
      $or: [{ feedbackName: searchRegEx }, { feedback_type: searchRegEx }],
    }).countDocuments();
    if (!req.query.search) {
      // const totalFeedbackForm = await GenerateFormTable.find().countDocuments();
      const resp = await GenerateFormTable.find()
        .sort({ _id: -1 })
        .populate("feedback_parameters")
        .populate("reviewer")
        .populate("review")
        .skip(limit * (pageNumber - 1))
        .limit(limit)
        .select("-__v -updatedAt");
      if (Array.isArray(resp)) {
        res.status(200).json({
          code: getAllFeedbackFormCode,
          data: resp,
          message: getAllFeedbackFormMsg,
          total: totalFeedbackForm,
        });
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
        res.status(200).json({
          code: getAllFeedbackFormCode,
          data: resp,
          message: getAllFeedbackFormMsg,
          total: totalSearchRoles,
        });
      }
    }
  } catch (error) {
    console.log("error");
    res.status(400).json(error);
  }
};

exports.getSingleFeedbackForm = async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await GenerateFormTable.findById(id)
      .populate("feedback_parameters")
      .populate("reviewer")
      .populate("review")
      .select("-__v -updatedAt");
    if (Object.keys(resp).length) {
      res.status(200).json({
        code: getSingleFeedbackFormCode,
        data: resp,
        message: getSingleFeedbackFormMsg,
      });
    }
  } catch (error) {
    console.log("error");
    res.status(400).json(error);
  }
};

exports.updateFeedbackForm = async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await GenerateFormTable.findOneAndUpdate(
      { _id: id },
      req.body
    );
    if (Object.keys(resp).length) {
      res.status(200).json({
        code: updateFeedbackFormCode,
        data: {},
        message: updateFeedbackFormMsg,
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json(error);
  }
};

exports.deleteFeedbackForm = async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await GenerateFormTable.findOneAndDelete({ _id: id });
    if (!resp) {
      res.status(400).json({ error: "Feedback Form already deleted" });
    } else if (Object.keys(resp).length) {
      res.status(200).json({
        code: deleteFeedbackFormCode,
        data: {},
        message: deleteFeedbackFormMsg,
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json(error);
  }
};
