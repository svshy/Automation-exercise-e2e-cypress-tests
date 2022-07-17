export function generateRandomString() {
  let randomString = "";
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const randomStringLength = Math.floor(Math.random() * 15 + 6);
  for (let i = 0; i < randomStringLength; i++) {
    randomString += chars[Math.floor(Math.random() * chars.length)];
  }
  return randomString;
}
