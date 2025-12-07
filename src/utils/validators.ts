/**
 * Utilidades para validación de formularios
 */

export interface ValidationError {
  [key: string]: string;
}

/**
 * Prefijo telefónico internacional de Argentina
 * +549 (código de país + 9 para móviles)
 */
export const PHONE_PREFIX_ARGENTINA = "+549";

export const validators = {
  /**
   * Valida que un campo no esté vacío
   */
  required: (value: string, fieldName: string): string | undefined => {
    if (!value?.trim()) {
      return `${fieldName} es requerido`;
    }
    return undefined;
  },

  /**
   * Valida formato de email
   */
  email: (value: string): string | undefined => {
    if (!value?.trim()) {
      return "El correo es requerido";
    }
    if (!/\S+@\S+\.\S+/.test(value)) {
      return "El correo no es válido";
    }
    return undefined;
  },

  /**
   * Valida longitud mínima
   */
  minLength: (value: string, min: number, fieldName: string): string | undefined => {
    if (!value) {
      return `${fieldName} es requerido`;
    }
    if (value.length < min) {
      return `${fieldName} debe tener al menos ${min} caracteres`;
    }
    return undefined;
  },

  /**
   * Valida número de teléfono argentino
   * Debe incluir código de área (11, 221, 351, etc.) + número
   */
  phone: (value: string): string | undefined => {
    if (!value?.trim()) {
      return "El teléfono es requerido";
    }
    if (!/^\d+$/.test(value)) {
      return "El teléfono solo debe contener números";
    }
    if (value.length < 10) {
      return "Ingrese el código de área (ej: 11, 221, 351) y su número (mínimo 10 dígitos)";
    }
    return undefined;
  },

  /**
   * Valida que dos campos coincidan
   */
  match: (value1: string, value2: string, fieldName: string): string | undefined => {
    if (value1 !== value2) {
      return `${fieldName} no coinciden`;
    }
    return undefined;
  },

  /**
   * Valida contraseña
   */
  password: (value: string, required: boolean = true): string | undefined => {
    if (!required && !value) {
      return undefined;
    }
    if (required && !value) {
      return "La contraseña es requerida";
    }
    if (value && value.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres";
    }
    return undefined;
  },
};

/**
 * Ejecuta múltiples validaciones y retorna el primer error encontrado
 */
export const validate = (
  validations: Array<string | undefined>
): string | undefined => {
  return validations.find((error) => error !== undefined);
};

/**
 * Valida un objeto completo y retorna todos los errores
 */
export const validateForm = (
  fields: Record<string, Array<string | undefined>>
): ValidationError => {
  const errors: ValidationError = {};

  Object.keys(fields).forEach((fieldName) => {
    const fieldValidations = fields[fieldName];
    const error = validate(fieldValidations);
    if (error) {
      errors[fieldName] = error;
    }
  });

  return errors;
};
