const { FeedbackParameter } = require("../model/feedback-parameters");

exports.createItem = async (body) => {
  return await FeedbackParameter.create(body);
};

exports.getAllItems = async (limit, pageNumber, search, searchRegEx) => {
  const totalFeedbackParameters = await FeedbackParameter.find()
    .countDocuments()
    .skip(limit * (pageNumber - 1))
    .limit(limit);
  const totalSearchFeedbacks = await FeedbackParameter.find({
    feedbackName: searchRegEx,
  }).countDocuments();
  if (!search) {
    const resp = await FeedbackParameter.find()
      .sort({ _id: -1 })
      .skip(limit * (pageNumber - 1))
      .limit(limit)
      .select("-__v -createdAt -updatedAt");
    return { resp, totalFeedbackParameters };
  } else {
    const resp = await FeedbackParameter.find({ feedbackName: searchRegEx })
      .sort({ _id: -1 })
      .skip(limit * (pageNumber - 1))
      .limit(limit)
      .select("-__v -createdAt -updatedAt");
    return { resp, totalSearchFeedbacks };
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
