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

const defaultMessages = {
  required: 'This field is required',
  validEmail: 'This field must be a valid email',
  confirmed: 'This field confirmation does not match',
  length: 'This field must have 2 options',
  min: 'The min length is {length}',
  max: 'The max length is {length}',
  cpf: 'Invalid CPF',
  phone: 'Invalid phone number',
  url: 'This value must be a valid URL',
};

export default function initVeeValidate(messages = defaultMessages) {
  extend('required', {
    ...required, message: messages.required,
  });

  extend('email', {
    ...email,
    message: messages.validEmail,
  });

  extend('confirmed', {
    ...confirmed,
    message: messages.confirmed,
  });

  extend('length', {
    ...length,
    message: messages.length,
  });

  extend('min', {
    ...min,
    message: messages.min,
  });

  extend('max', {
    ...max,
    message: messages.max,
  });

  extend('cpf', {
    getMessage() {
      return messages.cpf;
    },
    validate(value) {
      return validCPF(value);
    },
  });

  extend('phone', {
    getMessage() {
      return messages.phone;
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
    message: messages.url,
  });
}
