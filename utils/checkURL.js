export function checkURL(url) {
  const params = new URLSearchParams(url.split("?")[1]);
  const id = params.get("id");
  const otp = params.get("otp");
  const amount = params.get("amount");
  const pointId = params.get("pointId");
  const name = params.get("name");

  return { id, otp, amount, pointId, name };
}
