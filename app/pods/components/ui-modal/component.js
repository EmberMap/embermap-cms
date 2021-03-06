import Component from '@ember/component';
import $ from 'jquery';

/*
  Default modal:

      {{#ui-modal as |m|}}
      {{/ui-modal}}

  Close action:

      {{#ui-modal onClose=(action '') as |m|}}

*/
export default Component.extend({
  onClose() {},

  didInsertElement() {
    this._super(...arguments);

    $('body').addClass('modal-showing');

    $('body').on('keyup.modal-dialog', (e) => {
      if (e.keyCode === 27) {
        this.onClose();
      }
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    $('body').off('keyup.modal-dialog');
    $('body').removeClass('modal-showing');
  }

});
