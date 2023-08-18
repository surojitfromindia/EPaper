const SuccessErrorWrapper = (expressMiddleware, success_status_code = 200) => (req, res, next) => {
    Promise.resolve(expressMiddleware(req, res, next))
        .then((data) => {
            return res.status(success_status_code).json({
                success: true,
                data: data
            })
        })
        .catch(
            (error) => {
                return next(error)
            }
        )
}

export {
    SuccessErrorWrapper
}