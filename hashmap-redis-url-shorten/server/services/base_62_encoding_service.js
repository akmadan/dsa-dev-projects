export function encodeBase62(number) {
  let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";

  while (number > 0) {
    console.log("new number - " + number);
    result = chars[number % 62] + result;
    number = Math.floor(number / 62);
  }

  return result || "0";
}

