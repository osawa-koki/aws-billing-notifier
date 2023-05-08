
export const lambdaHandler = async (event: any, context: any) => {
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
