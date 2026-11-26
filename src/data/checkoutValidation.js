const namePattern = /^[\p{L}\p{M}]+(?:[ '’-][\p{L}\p{M}]+)*$/u;

export const checkoutRules = {
  cardholder: { pattern: namePattern, message: 'Escribe el titular con letras, espacios, tildes, apóstrofes o guiones.' },
  cardNumber: { pattern: /^(?:\d ?){12,18}\d$/, message: 'Ingresa entre 13 y 19 dígitos, con espacios opcionales y sin letras.' },
  cardExpiry: { pattern: /^(0[1-9]|1[0-2])\/\d{2}$/, message: 'Usa el formato MM/AA con un mes entre 01 y 12.' },
  cardSecurity: { pattern: /^\d{3,4}$/, message: 'El CVV debe contener 3 o 4 dígitos, sin espacios ni letras.' },
  firstName: { pattern: namePattern, message: 'Escribe tu nombre con letras. Puedes usar espacios, tildes, apóstrofes y guiones.' },
  lastName: { pattern: namePattern, message: 'Escribe tu apellido con letras. Puedes usar espacios, tildes, apóstrofes y guiones.' },
  phone: { pattern: /^(?:\+57[ ]?)?3\d{2}[ ]?\d{3}[ ]?\d{4}$/, message: 'Escribe un celular de 10 dígitos que empiece por 3, por ejemplo 300 123 4567. Puedes agregar +57.' },
  email: { pattern: /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/, message: 'Escribe un correo válido, por ejemplo nombre@correo.com.' },
  neighborhood: { pattern: /^(?=.*[\p{L}\p{N}])[\p{L}\p{M}\p{N} .,'’#°º()\-/]{2,100}$/u, message: 'Escribe un barrio de al menos 2 caracteres, usando letras, números y signos de dirección.' },
  address: { pattern: /^(?=.*[\p{L}\p{N}])[\p{L}\p{M}\p{N} .,'’#°º()\-/]{5,200}$/u, message: 'Escribe una dirección de al menos 5 caracteres, por ejemplo Calle 10 # 5-32, apartamento 201.' },
};

export function checkoutFieldError(name, rawValue, now = new Date()) {
  const rule = checkoutRules[name];
  if (!rule) return '';
  const value = rawValue.trim();
  if (!value) return 'Completa este campo.';
  if (!rule.pattern.test(value)) return rule.message;
  if (name === 'cardNumber') {
    const digits = value.replace(/ /g, '');
    let sum = 0;
    for (let i = digits.length - 1, double = false; i >= 0; i--, double = !double) {
      let digit = Number(digits[i]);
      if (double) digit *= 2;
      sum += digit > 9 ? digit - 9 : digit;
    }
    if (/^0+$/.test(digits) || sum % 10 !== 0) return 'Revisa el número de tarjeta: sus dígitos no son válidos.';
  }
  if (name === 'cardExpiry') {
    const [month, year] = value.split('/').map(Number);
    if ((2000 + year) * 12 + month < now.getFullYear() * 12 + now.getMonth() + 1) {
      return 'La tarjeta está vencida. Revisa el mes y el año.';
    }
  }
  return '';
}

export function validateCheckoutField(field) {
  if (!checkoutRules[field.name]) return;
  field.setCustomValidity(checkoutFieldError(field.name, field.value));
}
