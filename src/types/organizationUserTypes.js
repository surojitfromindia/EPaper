/**
 * @desc Details and role of a user in an organization
 * @typedef {Object} OrganizationUserDetailsTypeAsDTO
 * @property {number} id
 * @property {number} organization_id organization id in EPaper
 * @property {number} user_id user id in EPaper
 * @property {("working"|"suspended")} job_status
 * @property {("admin"|"staff")} role_id
 * @property {("active"|"deactive"|"invited")} status
 * @property {number=} invited_by
 * @property {Date=} invite_in
 * @property {Date=} accepted_on
 * @property {boolean=} is_default_organization
 * @property {UserDetailsType=} user user details
 * @property {OrganizationDetailsType=} organizationBasic organization details
 */

/**
 * @desc Details and role of a user in an organization
 * @typedef {Object} OrganizationUserDetailsType
 * @property {number} id
 * @property {number} organizationId organization id in EPaper
 * @property {number} userId user id in EPaper
 * @property {("working"|"suspended")} jobStatus job status of the user in organization
 * @property {("active"|"deactive"|"invited")} status
 * @property {("admin"|"staff")} roleId
 * @property {number=} invitedBy
 * @property {Date=} invitedOn
 * @property {Date=} acceptedOn
 * @property {boolean=} isDefaultOrganization
 * @property {UserDetailsType=} user user details
 * @property {OrganizationDetailsType=} organizationBasic organization details
 */
