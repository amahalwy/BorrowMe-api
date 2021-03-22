export default function validArray(arr: string | any[]) {
  return Array.isArray(arr) && arr.length > 0;
}
