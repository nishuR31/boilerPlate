let files = {
  config: ["app.js", "connect.js", "passport.js", "redis.js"],
  middleware: [
    "auth.middleware.js",
    "role.middleware.js",
    "uploader.middleware.js",
    "logger.middleware.js",
  ],
  controllers: ["user.controller.js"],
  models: ["user.model.js"],
  utils: [
    "tokenGenerator.js",
    "mailer.js",
    "json.js",
    "time.js",
    "statusCodes.js",
    "cookieOptions.js",
    "tokenOptions.js",
    "isEmpty.js",
    "asyncHandler.js",
    "apiErrorResponse.js",
    "apiResponse.js",
    "getOtp.js",
    "required.js",
    "hideEmail.js",
  ],
};

export default files;
