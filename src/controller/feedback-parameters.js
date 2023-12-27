const FeedbackParametersSchema = require("../model/feedback-parameters");
const codes = require("../constant/code");
const messages = require("../constant/messages");
const FeedbackParameter = FeedbackParametersSchema.FeedbackParameter;

const {
  feedbackParameterCodes: {
    addFeedbackCode,
    getAllFeedbacksCode,
    getSingleFeedbackCode,
    updateFeedbackCode,
    deleteFeedbackCode,
  },
} = codes;

const {
  feedbackParameterMsg: {
    addFeedbackMsg,
    getAllFeedbacksMsg,
    getSingleFeedbackMsg,
    updateFeedbackMsg,
    deleteFeedbackMsg,
  },
} = messages;

exports.addFeedbackParameters = async (req, res) => {
  try {
    const resp = new FeedbackParameter(req.body);
    const finalResp = await resp.save();
    if (finalResp.id) {
      res.status(200).json({
        code: addFeedbackCode,
        data: {},
        message: addFeedbackMsg,
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      console.log("error", error);
      res.status(400).json({
        error: `Duplicate key error. ${error.keyValue.feedbackName} feedback name already exists.`,
      });
    } else {
      console.log("error", error);
      res.status(400).json(error);
    }
  }
};

exports.getAllFeedbackParameters = async (req, res) => {
  const limit = +req.query.limit;
  const pageNumber = +req.query.page;
  const searchRegEx = new RegExp(req.query.search, "i");
  try {
    const totalFeedbackParameters =
      await FeedbackParameter.find().countDocuments();
    const totalSearchFeedbacks = await FeedbackParameter.find({
      feedbackName: searchRegEx,
    }).countDocuments();
    if (!req.query.search) {
      const resp = await FeedbackParameter.find()
        .sort({ _id: -1 })
        .skip(limit * (pageNumber - 1))
        .limit(limit)
        .select("-__v");
      if (Array.isArray(resp)) {
        res.status(200).json({
          code: getAllFeedbacksCode,
          data: resp,
          message: getAllFeedbacksMsg,
          total: totalFeedbackParameters,
        });
      }
    } else {
      const resp = await FeedbackParameter.find({ feedbackName: searchRegEx })
        .sort({ _id: -1 })
        .skip(limit * (pageNumber - 1))
        .limit(limit)
        .select("-__v");
      if (Array.isArray(resp)) {
        res.status(200).json({
          code: getAllFeedbacksCode,
          data: resp,
          message: getAllFeedbacksMsg,
          total: totalSearchFeedbacks,
        });
      }
    }
  } catch (error) {
    console.log("error");
    res.status(400).json(error);
  }
};

exports.getSingleFeedbackParameter = async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await FeedbackParameter.findById(id).select("-__v");
    if (Object.keys(resp).length) {
      res.status(200).json({
        code: getSingleFeedbackCode,
        data: resp,
        message: getSingleFeedbackMsg,
      });
    }
  } catch (error) {
    console.log("error");
    res.status(400).json(error);
  }
};

exports.updateFeedbackParameters = async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await FeedbackParameter.findOneAndUpdate(
      { _id: id },
      req.body
    );
    if (Object.keys(resp).length) {
      res.status(200).json({
        code: updateFeedbackCode,
        data: {},
        message: updateFeedbackMsg,
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      console.log("error", error);
      res.status(400).json({
        error: `Duplicate key error. ${error.keyValue.feedbackName} feedback name already exists.`,
      });
    } else {
      console.log("error", error);
      res.status(400).json(error);
    }
  }
};

exports.deleteFeedbackParameters = async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await FeedbackParameter.findOneAndDelete({ _id: id });
    if (!resp) {
      res.status(400).json({ error: "Feedback Parameter already deleted" });
    } else if (Object.keys(resp).length) {
      res.status(200).json({
        code: deleteFeedbackCode,
        data: {},
        message: deleteFeedbackMsg,
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json(error);
  }
};
