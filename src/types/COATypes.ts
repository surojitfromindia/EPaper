/**
 * @desc An account either of organization or from a template
 * @typedef {Object} COAType
 * @property {number} userId creator of the account
 * @property {number} organizationId organization that this accounts belongs to
 * @property {number} id account id
 * @property {string} name account name
 * @property {string} code
 * @property {number} depth
 * @property {number|UndefinedOrNull} accountParentId
 * @property {number} accountGroupId
 * @property {number} accountTypeId
 * @property {COAType|UndefinedOrNull} AccountParent
 * @property {AccountGroup|UndefinedOrNull} AccountGroup
 * @property {AccountType|UndefinedOrNull} AccountType
 */

/**
 * @desc An account either of organization or from a template
 * @typedef {Object} COATypeAsDTO
 * @property {number} account_id account id
 * @property {string} account_name account name
 * @property {string} account_code
 * @property {number} depth
 * @property {number|UndefinedOrNull} account_parent_id
 * @property {number} account_group_id
 * @property {number} account_type_id
 * @property {string|UndefinedOrNull} account_parent_name
 * @property {string|UndefinedOrNull} account_group_name
 * @property {string|UndefinedOrNull} account_type_name
 */
