export const REGEXPS = {
  email: /^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-z]{2,}$/,
  url: /https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/,
  mobile: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
  chinese: /^[\u4e00-\u9fa5]{0,}$/,
  number: /^(\-|\+)?\d+(\.\d+)?$/,
};

export type IREGEXPS = keyof typeof REGEXPS;
