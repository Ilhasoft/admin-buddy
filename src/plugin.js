import * as components from './components';

const AdminBuddy = {
  install(Vue) {
    // components
    Object.values(components).forEach((component) => {
      Vue.component(component.name, component);
    });
  },
};

export * from './mixins';
export { default as initVeeValidate } from './components/IlhaForm/vee-validate';
export default AdminBuddy;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(AdminBuddy);
}
