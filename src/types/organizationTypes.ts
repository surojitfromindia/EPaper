/**
 * @desc Organization details DTO
 * @typedef {Object} OrganizationDetailsTypeAsDTO
 * @property {number} organization_id
 * @property {string} name
 * @property {string} primary_address
 * @property {string} currency_code
 * @property {string} country_code
 * @property {string} sector
 * @property {number} created_by_id
 * @property {UserDetailsTypeAsDTO=} created_by
 */

/**
 * @desc Organization create payload
 * @typedef {Object} OrganizationDetailsCreatePayloadType
 * @property {string} name
 * @property {string} primary_address
 * @property {string} currency_code
 * @property {string} country_code
 * @property {string} sector
 */

/**
 * @desc Organization create transformation payload
 * @typedef {Object} OrganizationDetailsCreateTransformationPayloadType
 * @property {string} name
 * @property {string} primaryAddress
 * @property {string} currencyCode
 * @property {string} countryCode
 * @property {string} sector
 */

/**
 * @desc Organization details
 * @typedef {Object} OrganizationDetailsType
 * @property {number} id
 * @property {string} name
 * @property {string} primaryAddress
 * @property {string} currencyCode
 * @property {string} countryCode
 * @property {string} sector
 * @property {number} createdBy
 * @property {UserDetailsType=} createdByUser
 */
