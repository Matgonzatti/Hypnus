import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    let errorPath = error.path;

    if (!errorPath) {
      errorPath = '';
    }
    validationErrors[errorPath] = error.message;
  });

  return validationErrors;
}
