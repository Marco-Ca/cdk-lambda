exports.handler = async (event: any) => {
  console.log('request:', JSON.stringify(event));
  return sendRes(200, 'working');
}

const sendRes = (statusCode: number, body: string) => {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
}