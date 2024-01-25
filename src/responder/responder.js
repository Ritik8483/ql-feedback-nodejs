const { responseCodeMsg } = require("../constant/constant");

exports.responder = (response, status, data, total) => {
  response.status(200).json({
    code: status,
    data,
    message: responseCodeMsg[status],
    total: total || undefined,
  });
};
