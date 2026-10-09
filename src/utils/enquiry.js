export function normalizeIndianPhone(value) {
  const phone = String(value || '').trim();
  const digits = phone.replace(/\D/g, '');
  const national = digits.length === 12 && digits.startsWith('91')
    ? digits.slice(2)
    : digits.length === 11 && digits.startsWith('0') ? digits.slice(1) : digits;
  const valid = /^\+?[\d\s().-]+$/.test(phone)
    && (!phone.startsWith('+') || (digits.length === 12 && digits.startsWith('91')))
    && /^[2-9]\d{9}$/.test(national)
    && !/^(\d)\1{9}$/.test(national);
  return valid ? `+91${national}` : null;
}
