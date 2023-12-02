import { SortingUtil } from "./SortingUtil";

const SuccessErrorWrapper =
  (expressMiddleware, success_message, success_status_code) =>
  (req, res, next) => {
    Promise.resolve(expressMiddleware(req, res, next))
      .then((data) => {
        return res.status(success_status_code).json({
          message: success_message,
          success: true,
          data: SortingUtil.sortObjectKeysRecursively(data),
        });
      })
      .catch((error) => {
        return next(error);
      });
  };

export { SuccessErrorWrapper };
