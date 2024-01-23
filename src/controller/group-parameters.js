const FeedbackGroupSchema = require("../model/group-parameters");
const codes = require("../constant/code");
const messages = require("../constant/messages");
const GroupParameter = FeedbackGroupSchema.GroupParameter;

const {
  groupFeedbackCodes: {
    addGroupFeedbackCode,
    getAllGroupFeedbackCode,
    getSingleGroupFeedbackCode,
    updateGroupFeedbackCode,
    deleteGroupFeedbackCode,
  },
} = codes;

const {
  groupFeedbackMsg: {
    addGroupFeedbackMsg,
    getAllGroupFeedbackMsg,
    getSingleGroupFeedbackMsg,
    updateGroupFeedbackMsg,
    deleteGroupFeedbackMsg,
  },
} = messages;

exports.addFeedbackGroup = async (req, res) => {
  try {
    const resp = new GroupParameter(req.body);
    const finalResp = await resp.save();
    if (finalResp.id) {
      res.status(200).json({
        code: addGroupFeedbackCode,
        data: {},
        message: addGroupFeedbackMsg,
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      console.log("error", error);
      res.status(400).json({
        error: `Duplicate key error. ${error.keyValue.feedbackGroupName} feedback name already exists.`,
      });
    } else {
      console.log("error", error);
      res.status(400).json(error);
    }
  }
};

exports.getAllFeedbackGroup = async (req, res) => {
  const limit = +req.query.limit;
  const pageNumber = +req.query.page;
  const searchRegEx = new RegExp(req.query.search, "i");
  try {
    const totalFeedbackParameters =
      await GroupParameter.find().countDocuments();
    const totalSearchFeedbacks = await GroupParameter.find({
      feedbackGroupName: searchRegEx,
    }).countDocuments();
    if (!req.query.search) {
      const resp = await GroupParameter.find()
        .populate("groupFeedbacks")
        .sort({ _id: -1 })
        .skip(limit * (pageNumber - 1)) 
        .limit(limit)
        .select("-__v");
      if (Array.isArray(resp)) {
        res.status(200).json({
          code: getAllGroupFeedbackCode,
          data: resp,
          message: getAllGroupFeedbackMsg,
          total: totalFeedbackParameters,
        });
      }
    } else {
      const resp = await GroupParameter.find({ feedbackGroupName: searchRegEx })
      .populate("groupFeedbacks")
        .sort({ _id: -1 })
        .skip(limit * (pageNumber - 1))
        .limit(limit)
        .select("-__v");
      if (Array.isArray(resp)) {
        res.status(200).json({
          code: getAllGroupFeedbackCode,
          data: resp,
          message: getAllGroupFeedbackMsg,
          total: totalSearchFeedbacks,
        });
      }
    }
  } catch (error) {
    console.log("error");
    res.status(400).json(error);
  }
};

exports.getSingleFeedbackGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await GroupParameter.findById(id).select("-__v");
    if (Object.keys(resp).length) {
      res.status(200).json({
        code: getSingleGroupFeedbackCode,
        data: resp,
        message: getSingleGroupFeedbackMsg,
      });
    }
  } catch (error) {
    console.log("error");
    res.status(400).json(error);
  }
};

exports.updateFeedbackGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await GroupParameter.findOneAndUpdate({ _id: id }, req.body);
    if (Object.keys(resp).length) {
      res.status(200).json({
        code: updateGroupFeedbackCode,
        data: {},
        message: updateGroupFeedbackMsg,
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

exports.deleteFeedbackGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await GroupParameter.findOneAndDelete({ _id: id });
    if (!resp) {
      res
        .status(400)
        .json({ error: "Feedback Parameter group already deleted" });
    } else if (Object.keys(resp).length) {
      res.status(200).json({
        code: deleteGroupFeedbackCode,
        data: {},
        message: deleteGroupFeedbackMsg,
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json(error);
  }
};
