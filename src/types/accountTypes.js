/**
 * @desc An account either of organization or from a template
 * @typedef {Object} COAType
 * @property {number} userId creator of the account
 * @property {number} organizationId organization that this accounts belongs to
 * @property {number} id account id
 * @property {string} name account name
 * @property {string} code
 * @property {number} depth
 * @property {number|null} accountParentId
 * @property {number|null} accountGroupId
 * @property {number|null} accountTypeId
 * @property {COAType|null} AccountParent
 * @property {COAType|null} AccountGroup
 * @property {COAType|null} AccountType
 */

/**
 * @desc An account either of organization or from a template
 * @typedef {Object} COATypeAsDTO
 * @property {number} user_id creator of the account
 * @property {number} account_id account id
 * @property {string} name account name
 * @property {string} code
 * @property {number} depth
 * @property {number|UndefinedOrNull} account_paren_id
 * @property {number|UndefinedOrNull} account_group_id
 * @property {number|UndefinedOrNull} account_type_id
 * @property {string|UndefinedOrNull} account_parent_name
 * @property {string|UndefinedOrNull} account_group_name
 * @property {string|UndefinedOrNull} account_type_name
 */
