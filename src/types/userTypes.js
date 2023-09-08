/**
 * @desc Details of a user of EPaper
 * @typedef {Object} UserDetailsTypeAsDTO
 * @property {number} user_id
 * @property {string} name name of the user
 * @property {string|null} email email of the user
 * @property {("active"|"deactive")} status
 * @property {string} client_id
 * @property {Array<OrganizationDetailsTypeAsDTO>} organization
 */

/**
 * @desc Details of a user of EPaper
 * @typedef {Object} UserDetailsType
 * @property {number} id table id of user
 * @property {string} name name of the user
 * @property {string|null} email email of the user
 * @property {("active"|"deactive")} status status of user
 * @property {string} clientId client id of user
 * @property {Array.<OrganizationDetailsType>} organizationsBasic
 */
