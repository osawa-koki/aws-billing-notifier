/* eslint-disable @typescript-eslint/require-await */

export const lambdaHandler = async () => {
  try {
    return {
      'statusCode': 200,
      'body': JSON.stringify({
        message: 'hello world',
      })
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};
