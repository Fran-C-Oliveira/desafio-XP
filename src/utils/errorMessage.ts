/* SOURCE of this solution: 
https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript 
*/

import { Response } from 'express';

export const reportError = (res: Response, {message}: {message: string}) => {
  return res.status(400).json(message);
};

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message
  return String(error)
};

// export default { getErrorMessage, reportError };
