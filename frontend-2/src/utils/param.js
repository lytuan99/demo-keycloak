import queryString from 'query-string';
import snakecaseKeys from 'snakecase-keys';
import camelcaseKeys from 'camelcase-keys';

/**
 * get query object from url
 * @param {String} search query from url
 * @returns query object
 */
const getUrlParams = (search) => {
  try {
    return camelcaseKeys(queryString.parse(search));
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * get string params from object
 * @param {Object} params object which needs to convert to string
 * @returns string with snake-case-keys format
 */
const getStringifyParams = (params) => {
  try {
    return queryString.stringify(snakecaseKeys(params));
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { getUrlParams, getStringifyParams };
