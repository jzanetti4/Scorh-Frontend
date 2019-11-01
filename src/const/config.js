/**
 * default config of axios
 * @type {{headers: {"Content-Type": string}, baseURL: string, timeout: number}}
 */
export const defaultConfig={
    baseURL: 'http:localhost:8768',
    timeout: 3000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
};
