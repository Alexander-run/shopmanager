import { post } from "../utils/request";

/**
 * 
 * @param {*} user 
 * username
 * password
 * @returns 
 */
export function loginApi(user) {
    return post('/api/v1/auth/manager_login', user);
}