export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("🚀 ~ body:", body);
  console.log(body);
  return {
    result: 1,
    member: body,
  };
});
