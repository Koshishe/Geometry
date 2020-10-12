import './modules/sitePreloader';
import documentReady from './utils/documentReady';
import documentLoaded from './utils/documentLoaded';

import cssVars from './modules/cssVars';
import resize from './modules/resize';
import lazyload from './modules/lazyload';
import heroScene from './modules/heroScene';
import AOS from 'aos';

documentReady(() => {
  cssVars.init();
  resize.init();
  lazyload.init();
  heroScene.init();
  AOS.init();
});

documentLoaded(() => {

});
