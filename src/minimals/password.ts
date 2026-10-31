import LibErr from "../error";

type Rules = {
  len?: [min: number, max: number];
  upperCase?: boolean;
  digits?: boolean;
  symbols?: boolean;
};

//Regex
const digitsRegex = /\d/;
const uppercaseRegex = /[A-Z]/;
const lowerCaseRegex = /[a-z]/;
const symbolRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/;

//validation
export function validatePassword(input: string, rules?: Rules):boolean {
  const { len, upperCase, digits, symbols } = rules!;

  if (typeof input !== "string")
    throw new LibErr("validatePassword() accepts only strings as input");

  //rules
  const minLen = len?.[0] ?? 8;
  const maxLen = len?.[1] ?? 256;
  const upper = upperCase !== undefined ? upperCase : false;
  const digs = digits !== undefined ? digits : false;
  const syms = symbols !== undefined ? symbols : false;

  //triming and len
  const trimmed = input.trim();
  const ilen = trimmed.length;

  // mininmal requirement check
  if (minLen < 8 || maxLen > 256)
    throw new LibErr("validatePassword() length must be between [8 , 256]");

  //testing phase
  if (ilen < minLen || ilen > maxLen) return false;
  if (!lowerCaseRegex.test(trimmed)) return false;
  if (upper && !uppercaseRegex.test(trimmed)) return false;
  if (digs && !digitsRegex.test(trimmed)) return false;
  if (syms && !symbolRegex.test(trimmed)) return false;

  return true;
}
