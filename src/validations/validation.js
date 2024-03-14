const addFeedbackParameterRules = {
  feedbackName: {
    notEmpty: true,
    errorMessage: "feedbackName is required",
  },
  feedback_parameter_type: {
    notEmpty: true,
    errorMessage: "feedback_parameter_type is required",
  },
};

const getAllFeedbackParametersRules = {
  limit: {
    isInt: {
      options: {
        min: 1,
      },
    },
    optional: true,
    errorMessage: "limit must be a number",
  },
  // limit: {
  //   custom: {
  //     options: (limit, { req }) => {
  //       const page = req.query.page;
  //       if (page && Number.isInteger(+limit) && +limit > 0) {
  //         return true;
  //       }
  //       return false;
  //     },
  //   },
  // },
  page: {
    isInt: {
      options: {
        min: 1,
      },
    },
    optional: true,
    errorMessage: "page must be a number",
  },
  search: {
    isString: true,
    optional: true,
    errorMessage: "search must be a string",
  },
};

const getSingleFeedbackParameterRules = {
  id: {
    isMongoId: true,
    errorMessage: "Invalid Mongodb Id",
  },
};

const updateFeedbackParametersRules = {
  id: {
    isMongoId: true,
    errorMessage: "Invalid Mongodb Id",
  },
  feedbackName: {
    notEmpty: true,
    errorMessage: "feedbackName is required",
  },
  feedback_parameter_type: {
    notEmpty: true,
    errorMessage: "feedback_parameter_type is required",
  },
};

const deleteFeedbackParametersRules = {
  id: {
    isMongoId: true,
    errorMessage: "Invalid Mongodb Id",
  },
};

const addUserRules = {
  firstName: {
    notEmpty: true,
    errorMessage: "firstName is required",
  },
  email: {
    isEmail: {
      errorMessage: "email address is not valid",
    },
    notEmpty: true,
    errorMessage: "email is required",
  },
  designation: {
    notEmpty: true,
    errorMessage: "designation is required",
  },
};

const getAllUsersRules = {
  limit: {
    isInt: {
      options: {
        min: 1,
      },
    },
    optional: true,
  },
  page: {
    isInt: {
      options: {
        min: 1,
      },
    },
    optional: true,
    errorMessage: "page must be a number",
  },
  search: {
    isString: true,
    errorMessage: "search must be a string",
    optional: true,
  },
};

const getSingleUserRules = {
  id: {
    isMongoId: true,
    errorMessage: "Invalid Mongodb Id",
  },
};

const updateUserRules = {
  id: {
    isMongoId: true,
    errorMessage: "Invalid Mongodb Id",
  },
  firstName: {
    notEmpty: true,
    errorMessage: "firstName is required",
  },
  email: {
    isEmail: {
      errorMessage: "email address is not valid",
    },
    notEmpty: true,
    errorMessage: "email is required",
  },
  designation: {
    notEmpty: true,
    errorMessage: "designation is required",
  },
};

const deleteUserRules = {
  id: {
    isMongoId: true,
    errorMessage: "Invalid Mongodb Id",
  },
};

const addRolesRules = {
  teamName: {
    notEmpty: true,
    errorMessage: "teamName is required",
  },
  teamEmail: {
    isEmail: {
      errorMessage: "teamEmail address is not valid",
    },
    notEmpty: true,
    errorMessage: "teamEmail is required",
  },
};

const getAllRolesRules = {
  limit: {
    isInt: {
      options: {
        min: 1,
      },
    },
    optional: true,
  },
  page: {
    isInt: {
      options: {
        min: 1,
      },
    },
    optional: true,
    errorMessage: "page must be a number",
  },
  search: {
    isString: true,
    optional: true,
    errorMessage: "search must be a string",
  },
};

const getSingleRoleRules = {
  id: {
    isMongoId: true,
    errorMessage: "Invalid Mongodb Id",
  },
};

const updateRoleRules = {
  id: {
    isMongoId: true,
    errorMessage: "Invalid Mongodb Id",
  },
  teamName: {
    notEmpty: true,
    errorMessage: "teamName is required",
  },
  teamEmail: {
    isEmail: {
      errorMessage: "teamEmail address is not valid",
    },
    notEmpty: true,
    errorMessage: "teamEmail is required",
  },
};

const deleteRoleRules = {
  id: {
    isMongoId: true,
    errorMessage: "Invalid Mongodb Id",
  },
};

const addGroupFeedbackRules = {
  feedbackGroupName: {
    notEmpty: true,
    errorMessage: "feedbackGroupName is required",
  },
  groupFeedbacks: {
    isMongoId: true,
    isArray: {
      options: {
        min: 1,
      },
      errorMessage: "Must contain at least one item",
    },
    errorMessage: "Must be a valid MongoDB id",
  },
};

const getAllGroupFeedbacksRules = {
  limit: {
    isInt: {
      options: {
        min: 1,
      },
    },
    optional: true,
  },
  page: {
    isInt: {
      options: {
        min: 1,
      },
    },
    optional: true,
    errorMessage: "page must be a number",
  },
  search: {
    isString: true,
    optional: true,
    errorMessage: "search must be a string",
  },
};

const getSingleGroupFeedbackRules = {
  id: {
    isMongoId: true,
    errorMessage: "Invalid Mongodb Id",
  },
};

const updateGroupFeedbackRules = {
  id: {
    isMongoId: true,
    errorMessage: "Invalid Mongodb Id",
  },
  feedbackGroupName: {
    notEmpty: true,
    errorMessage: "feedbackGroupName is required",
  },
  groupFeedbacks: {
    notEmpty: true,
    isArray: {
      options: {
        isMongoId: true,
        min: 1,
      },
    },
    errorMessage: "groupFeedbacks is required ",
  },
};

const deleteGroupFeedbackRules = {
  id: {
    isMongoId: true,
    errorMessage: "Invalid Mongodb Id",
  },
};

const addGenerateFeedbackRules = {
  feedbackName: {
    notEmpty: true,
    errorMessage: "feedbackName is required",
  },
  feedback_type: {
    notEmpty: true,
    errorMessage: "feedback_type is required",
  },
};

const getAllGenerateFeedbacksRules = {
  limit: {
    isInt: {
      options: {
        min: 1,
      },
    },
    optional: true,
  },
  page: {
    isInt: {
      options: {
        min: 1,
      },
    },
    optional: true,
    errorMessage: "page must be a number",
  },
  search: {
    isString: true,
    optional: true,
    errorMessage: "search must be a string",
  },
};

const getSingleGenerateFeedbackRules = {
  id: {
    isMongoId: true,
    errorMessage: "Invalid Mongodb Id",
  },
};

const updateGenerateFeedbackRules = {
  id: {
    isMongoId: true,
    errorMessage: "Invalid Mongodb Id",
  },
  feedbackName: {
    notEmpty: true,
    errorMessage: "feedbackName is required",
  },
  feedback_type: {
    notEmpty: true,
    errorMessage: "feedback_type is required",
  },
};

const deleteGenerateFeedbackRules = {
  id: {
    isMongoId: true,
    errorMessage: "Invalid Mongodb Id",
  },
};

module.exports = {
  addFeedbackParameterRules,
  getAllFeedbackParametersRules,
  getSingleFeedbackParameterRules,
  updateFeedbackParametersRules,
  deleteFeedbackParametersRules,
  addUserRules,
  getAllUsersRules,
  getSingleUserRules,
  updateUserRules,
  deleteUserRules,
  addRolesRules,
  getAllRolesRules,
  getSingleRoleRules,
  updateRoleRules,
  deleteRoleRules,
  addGroupFeedbackRules,
  getAllGroupFeedbacksRules,
  getSingleGroupFeedbackRules,
  updateGroupFeedbackRules,
  deleteGroupFeedbackRules,
  addGenerateFeedbackRules,
  getAllGenerateFeedbacksRules,
  getSingleGenerateFeedbackRules,
  updateGenerateFeedbackRules,
  deleteGenerateFeedbackRules,
};
