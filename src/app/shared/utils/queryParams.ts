export const mergeParams = (params: { [k: string]: string }): string => {
    return Object.keys(params).map(key => key + '=' + params[key]).join('&');
};
