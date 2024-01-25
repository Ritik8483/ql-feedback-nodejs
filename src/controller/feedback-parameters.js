const {
  createItem,
  getAllItems,
  getSingleItem,
  updateItem,
  deleteItem
} = require("../services/feedback-parameters");
const { responder } = require("../responder/responder");

exports.addFeedbackParameters = async (req, res) => {
  try {
    const finalResp = await createItem(req.body);
    if (finalResp.id) {
      responder(res, 3001, {});
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
    const resp = await getAllItems(limit, pageNumber, req.query.search, searchRegEx);
    if (Array.isArray(resp.resp)) {
      responder(
        res,
        3002,
        resp.resp,
        Object.keys(resp).includes("totalFeedbackParameters")
          ? resp.totalFeedbackParameters
          : resp.totalSearchFeedbacks
      );
    }
  } catch (error) {
    console.log("error");
    res.status(400).json(error);
  }
};

exports.getSingleFeedbackParameter = async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await getSingleItem(id);
    if (Object.keys(resp).length) {
      responder(res, 3003, resp);
    }
  } catch (error) {
    console.log("error");
    res.status(400).json(error);
  }
};

exports.updateFeedbackParameters = async (req, res) => {
  const { id } = req.params;
  try {
    const resp =await updateItem(id, req.body);
    if (Object.keys(resp).length) {
      responder(res, 3004, {});
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
    const resp = await deleteItem(id)
    if (!resp) {
      res.status(400).json({ error: "Feedback Parameter already deleted" });
    } else if (Object.keys(resp).length) {
      responder(res, 3005, {});
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json(error);
  }
};
