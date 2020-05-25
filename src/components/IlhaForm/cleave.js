import Cleave from 'cleave.js';

export default {
  name: 'cleave',
  bind(el, binding) {
    const input = el.querySelector('input');
    // eslint-disable-next-line
    input._vCleave = new Cleave(input, binding.value);
  },
  unbind(el) {
    const input = el.querySelector('input');
    // eslint-disable-next-line
    input._vCleave.destroy();
  },
};
