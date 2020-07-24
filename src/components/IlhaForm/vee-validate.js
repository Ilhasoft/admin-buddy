import {
  required,
  confirmed,
  length,
  email,
  min,
  max,
} from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';
import validCPF from './validators/cpf';
import validPhoneBr from './validators/phone-br';

export default function initVeeValidate() {
  extend('required', {
    ...required, message: 'This field is required',
  });

  extend('email', {
    ...email,
    message: 'This field must be a valid email',
  });

  extend('confirmed', {
    ...confirmed,
    message: 'This field confirmation does not match',
  });

  extend('length', {
    ...length,
    message: 'This field must have 2 options',
  });

  extend('min', {
    ...min,
    message: 'The min length is {length}',
  });

  extend('max', max);

  extend('cpf', {
    getMessage() {
      return 'Invalid CPF';
    },
    validate(value) {
      return validCPF(value);
    },
  });

  extend('phone', {
    getMessage() {
      return 'Invalid phone number';
    },
    validate(value, args) {
      if (args[0] === 'br') {
        return validPhoneBr(value);
      }
      throw new Error('Invalid code language');
    },
  });
  extend('url', {
    validate(value) {
      if (value) {
        // eslint-disable-next-line
        return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(value);
      }
      return false;
    },
    message: 'This value must be a valid URL',
  });
}
