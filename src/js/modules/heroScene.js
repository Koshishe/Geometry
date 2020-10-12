import Parallax from 'parallax-js';

export default {
  init() {
    const scene = document.querySelectorAll('.js-scene');

    scene.forEach((e) => {
      let parallaxInstancesmall = new Parallax(e, {
        limitX: 400,
      });
    });
  },
};
