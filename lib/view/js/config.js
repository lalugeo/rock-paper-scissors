/* global jQuery */
(function($){ // eslint-disable-line

  /**
  * This function is used for initialising the material css seclect
  * and collapsible class elements
  * @returns {null} nothing
  */
  function initMaterialise() {
    $('select').material_select();
    $('.collapsible').collapsible();
  }

  $(document).ready(initMaterialise);
  window.addEventListener('hashchange', initMaterialise, false);
}(jQuery));
