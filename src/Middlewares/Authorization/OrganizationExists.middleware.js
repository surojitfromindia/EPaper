const organizationExists = (req, _res, next) => {
    // we check if organization id exists in clientInfo
    const clientInfo = req.clientInfo;
    const organizationId = clientInfo.organizationId;
    if (!organizationId) {
        return next(new Error('Organization does not exists'))
    }
    return next()
}
export {
    organizationExists
}