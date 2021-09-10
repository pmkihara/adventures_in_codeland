// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)


// ----------------------------------------------------
// Note(lewagon): ABOVE IS RAILS DEFAULT CONFIGURATION
// WRITE YOUR OWN JS STARTING FROM HERE 👇
// ----------------------------------------------------

// External imports
import "bootstrap";

// Internal imports, e.g:
import { moveCharacter } from '../components/moveCharacter';
import { enter } from '../components/enter';
import { backgroundAudio } from '../components/audio';
import { initSweetalert } from './init_sweetalert';

document.addEventListener('turbolinks:load', () => {
  // Call your functions here, e.g:
  // initSelect2();
  enter();

  if (document.getElementById("background_audio")) {
    backgroundAudio();
  }

  initSweetalert('#confirmation-alert-new-game', {
    title: "Are you sure?",
    text: "Once confirm, your previous Adventure will be reset!",
    icon: "warning",
    dangerMode: true,
    buttons: true
  }, (value) => {
    if (value) {
      const link = document.querySelector('#new-link-game');
      link.click();
    }
  });

  initSweetalert('#confirmation-alert-log-out', {
    title: "Are you sure?",
    text: "You can login after, don't worry. Ruby will be waiting!",
    icon: "warning",
    dangerMode: true,
    buttons: true
  }, (value) => {
    if (value) {
      const link = document.querySelector('#log-out-link');
      link.click();
    }
  });

});

document.addEventListener('keydown', moveCharacter);
import "controllers"
