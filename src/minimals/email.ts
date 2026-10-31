import LibErr from "../error";

type Domain = `${string}.${string}`;
type Rules = {
  domain?: Domain;
};

//Regex
const domainRegex =
  /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
const emailRegex =
  /^(?=.{1,254}$)(?=.{1,64}@)(?!\.)(?!.*\.\.)[a-zA-Z0-9_%+-]+(?:\.[a-zA-Z0-9_%+-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

//email validation
export function validateEmail(input: string, rules?: Rules): boolean {
  const { domain } = rules!;

  if (typeof input !== "string")
    throw new LibErr("validateEmail function accepts only strings as input");

  //trim and length
  const trimmed = input.trim();
  if (trimmed.length === 0 || trimmed.length === 264) return false;

  //test email
  if (!emailRegex.test(trimmed)) return false;

  //domain if required
  if (domain) {
    const normalizedDomain = domain.trim().toLowerCase();
    if (!domainRegex.test(normalizedDomain))
      throw new LibErr("validateEmail domain set accepts only valid domains");
    const extractedDomain = trimmed.split("@")[1]?.toLowerCase();
    if (normalizedDomain !== extractedDomain) return false;
  }

  return true;
}
