const validText = (str: string) => {
  return typeof str === "string" && str.trim().length > 0;
};

export default validText;
