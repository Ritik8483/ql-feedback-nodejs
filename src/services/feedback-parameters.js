const { FeedbackParameter } = require("../model/feedback-parameters");

exports.createItem = async (body) => {
  return await FeedbackParameter.create(body);
};

exports.getAllItems = async (limit, pageNumber, searchRegEx) => {
  const totalFeedbacks = await FeedbackParameter.aggregate([
    {
      $match: {
        feedbackName: searchRegEx,
      },
    },
    {
      $count: "feedbacksCount",
    },
  ]);
  const resp = await FeedbackParameter.aggregate([
    { $sort: { _id: -1 } },
    {
      $match: {
        feedbackName: searchRegEx,
      },
    },
    { $skip: limit * (pageNumber - 1) },
    { $limit: limit },
  ]);

  if (Array.isArray(resp)) {
    return { resp, total: totalFeedbacks[0].feedbacksCount };
  }
};

exports.getSingleItem = async (id) => {
  return await FeedbackParameter.findById(id).select(
    "-__v -createdAt -updatedAt"
  );
};

exports.updateItem = async (id, body) => {
  return await FeedbackParameter.findOneAndUpdate({ _id: id }, body);
};

exports.deleteItem = async (id) => {
  return await FeedbackParameter.findOneAndDelete({ _id: id });
};
