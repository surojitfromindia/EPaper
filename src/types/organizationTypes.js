/**
 * @desc Details and role of a user in an organization
 * @typedef {Object} OrganizationUserDetailsTypeAsDTO
 * @property {number} id
 * @property {number} oragnization_id organization id in EPaper
 * @property {number} user_id user id in EPaper
 * @property {("working"|"suspended")} job_status job status of the user in organization
 * @property {("active"|"deactive"|"invited")} status
 * @property {("admin"|"staff")} role_id
 * @property {number|null} invited_by
 * @property {Date} invited_on
 * @property {Date} accepted_on
 * @property {boolean} is_default_organization
 * @property {UserTypeAsDTO|null} user user details
 * @property {OrganizationDetailsTypeAsDTO|null} organization organization details
 */

/**
 * @desc Organization details
 * @typedef {Object} OrganizationDetailsTypeAsDTO
 * @property {number} organization_id
 * @property {string} currency_code
 * @property {string} country_code
 * @property {number} created_by_id
 * @property {UserTypeAsDTO|null} created_by
 */
