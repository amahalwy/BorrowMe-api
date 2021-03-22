export default function validText(str: string) {
  return typeof str === "string" && str.trim().length > 0;
}
