import Injector from 'lib/Injector';

import Config from 'lib/Config';

import registerComponents from 'boot/registerComponents';

window.ss = window.ss || {};

window.document.addEventListener('DOMContentLoaded', () => {
  registerComponents();
});

