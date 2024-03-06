const {
  createItem,
  getAllItems,
  getSingleItem,
  updateItem,
  deleteItem,
} = require("../services/feedback-parameters");
const { responder, errorResponder } = require("../responder/responder");
const { validationResult } = require("express-validator");

exports.addFeedbackParameters = async (req, res) => {
  const validationError = validationResult(req);
  if (validationError.isEmpty()) {
    //means if there is no error
    try {
      const finalResp = await createItem(req.body);
      if (finalResp.id) {
        responder(res, 3001, {});
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
    errorResponder(res, validationError.array()); //if there is any validation error like feedbackName key or value is missing
  }
};

exports.getAllFeedbackParameters = async (req, res) => {
  const validationError = validationResult(req);
  if (validationError.isEmpty()) {
    const limit = +req.query.limit || 100;
    const pageNumber = +req.query.page || 1;
    const searchRegEx = new RegExp(req.query.search, "i");
    try {
      const resp = await getAllItems(limit, pageNumber, searchRegEx);
      if (Array.isArray(resp.resp)) {
        responder(res, 3002, resp.resp, resp.total);
      }
    } catch (error) {
      errorResponder(res, error);
    }
  } else {
    errorResponder(res, validationError.array());
  }
};

exports.getSingleFeedbackParameter = async (req, res) => {
  const validationError = validationResult(req);
  if (validationError.isEmpty()) {
    const { id } = req.params;
    try {
      const resp = await getSingleItem(id);
      if (Object.keys(resp).length) {
        responder(res, 3003, resp);
      }
    } catch (error) {
      errorResponder(res, error);
    }
  } else {
    errorResponder(res, validationError.array());
  }
};

exports.updateFeedbackParameters = async (req, res) => {
  const validationError = validationResult(req);
  if (validationError.isEmpty()) {
    const { id } = req.params;
    try {
      const resp = await updateItem(id, req.body);
      if (Object.keys(resp).length) {
        responder(res, 3004, {});
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

exports.deleteFeedbackParameters = async (req, res) => {
  const validationError = validationResult(req);
  if (validationError.isEmpty()) {
    const { id } = req.params;
    try {
      const resp = await deleteItem(id);
      if (!resp) {
        errorResponder(res, { error: "Feedback Parameter already deleted" });
      } else if (Object.keys(resp).length) {
        responder(res, 3005, {});
      }
    } catch (error) {
      errorResponder(res, error);
    }
  } else {
    errorResponder(res, validationError.array());
  }
};
