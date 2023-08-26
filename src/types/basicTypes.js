/**
 * @desc A client is a user of EPaper application. It can be another
 * application or a human user.
 * @typedef {Object} ClientInfoType
 * @property {number|null} userId user id in EPaper
 * @property {number|null} organizationId organization id in EPaper
 * @property {string} clientId client id from auth server
 * @property {string|null} clientEmail client email from auth server
 * @property {string} clientType client type from auth server
 * @property {string} clientName name of the client from auth server
 */

/**
 * @desc A sequelize transaction
 * @typedef {import('@sequelize/core').Transaction} SequelizeTransaction
 */
