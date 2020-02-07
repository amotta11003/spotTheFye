import { last } from 'lodash';

export const parseTokens = () => {
  const url = window.location.href;
  const access = last(url.split('#access_token=')).split('&refresh_token=')[0];
  const refreshPlusUserID = last(url.split('#access_token=')).split('&refresh_token=')[1];
  // const querySplit = url.split('#access_token=');
  // console.log("QUERY SPLIT: ", querySplit);
  // const tokensAndID = last(querySplit);
  // console.log("TOKENS AND ID: ", tokensAndID);
  // const splitAccess = tokensAndID.split('&refresh_token=');
  // console.log("ACCESS SPLIT (REFRESH PLUS ID): ", splitAccess);
  // const finalSplit = last(splitAccess).split('&userID');
  return [access].concat(refreshPlusUserID.split('&userID='));
};

export default parseTokens;