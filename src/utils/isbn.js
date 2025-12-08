const ISBN_SEGMENTS = [3, 5, 2, 2, 1];
const ISBN_LENGTH = ISBN_SEGMENTS.reduce(
  (total, segment) => total + segment,
  0
);
export const ISBN_FORMAT_REGEX = /^\d{3}-\d{5}-\d{2}-\d{2}-\d$/;

export const ISSN_FORMAT_REGEX = /^\d{4}-\d{4}$/;

export const formatISBN = (value = "") => {
  const digitsOnly = value.replace(/\D/g, "").slice(0, ISBN_LENGTH);
  const parts = [];
  let cursor = 0;

  for (const segmentLength of ISBN_SEGMENTS) {
    const part = digitsOnly.slice(cursor, cursor + segmentLength);
    if (!part) break;
    parts.push(part);
    cursor += segmentLength;
  }

  return parts.join("-");
};

export const sanitizeISBN = (value = "") => value.replace(/\D/g, "");

export const formatISSN = (value = "") => {
  const digitsOnly = value.replace(/\D/g, "").slice(0, 8);
  if (digitsOnly.length <= 4) return digitsOnly;
  return `${digitsOnly.slice(0, 4)}-${digitsOnly.slice(4)}`;
};
