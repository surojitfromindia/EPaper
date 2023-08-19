const organizationMember = (req, _res, next) => {
    // we check if organization id exists in clientInfo
    const clientInfo = req.clientInfo;
    const organizationId = clientInfo.organizationId; // if organization id not provided via a query,
    // fall back to default
    const userOrganizations = clientInfo.userOrganizations;
    if (!organizationId) {
        return next(new Error('Organization does not exists'))
    }
    // search inside active organization.
    const isOrganizationActive = userOrganizations.some(info => info.organization_id === organizationId);
    if (!isOrganizationActive) {
        return next(new Error('Not part of this organization'))
    }
    return next()
}
export {
    organizationMember
}