const GenerateFormModel = require("../model/generate-form");
const GenerateFormTable = GenerateFormModel.GenerateFormTable;
const { responder } = require("../responder/responder");

exports.addFeedbackForm = async (req, res) => {
  try {
    const resp = await new GenerateFormTable(req.body).save();
    if (resp.id) {
      responder(res, 3016, {});
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
      responder(res, 3018, resp);
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
      responder(res, 3019, {});
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
      responder(res, 3020, {});
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json(error);
  }
};
