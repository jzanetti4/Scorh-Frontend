/**
 * following APIs are the requests for backend service
 * @type {string}
 */

/**
 * requests for user service
 * @type {string}
 */
export const INITREG="/zuulUser/register/initReg"
export const REGACTIVE="/zuulUser/register/regActive"
export const LOGIN="/zuulUser/login/"
export const FINDALLUSERS="/zuulUser/common/findAllUsers"

/**
 * requests for post service
 * @type {string}
 */
export const  APPENDPOST="/zuulPost/post/appendPost"
export const NEWPOST="/zuulPost/post/newPost"
export const LISTALL="/zuulPost/post/ListAll"
export const FINDBYUSERNAME="/zuulPost/post/findByUsername?username="
export const FINDYTYPE="/zuulPost/post/findByTypes?type="
export const FINDBYCONTENT="/zuulPost/post/findByContent?content="

/**
 * request for group service
 * @type {string}
 */
export const FINDALLGROUP="/zuulGroup/group/findAllGroup"
