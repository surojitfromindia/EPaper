const registeredUser = (req, _res, next) => {
  const clientInfo = req.clientInfo;
  const userId = clientInfo.userId;
  if (!userId) {
    return next(new Error("User does not exists"));
  }
  next();
};
export { registeredUser };
