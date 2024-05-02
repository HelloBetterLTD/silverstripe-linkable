import $ from 'jquery';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { loadComponent } from 'lib/Injector';
import LinkFieldPopup from "../components/LinkFieldPopup";

$.entwine('ss', ($) => {
  $('input.link').entwine({
    getURL: function(action) {
      const form = this.parents('form');
      let formUrl = form.attr('action');
      const formUrlParts = formUrl.split('?');
      let url = `${encodeURI(formUrl)}/field/${this.attr('name')}/${action}`;

      if (this.val()) {
        url = `${url}?LinkID=${this.val()}`;
      } else {
        url += '?LinkID=0';
      }

      if (typeof formUrlParts[1] !== 'undefined') {
        url = `${url}&${formUrlParts[1]}`;
      }

      const extraQuery = this.data('extra-query');
      if (typeof extraQuery !== 'undefined') {
          url = `${url}${extraQuery}`;
      }
      return url;
    },
    showDialog() {
      let dialog = $('#link-field-popup__dialog-wrapper');
      if (!dialog.length) {
        dialog = $('<div id="link-field-popup__dialog-wrapper" />');
        $('body').append(dialog);
      }
      dialog.open(this);
      return false;
    }
  });

  $('.linkfield-button').entwine({
    onclick() {
      this.siblings('input.link').showDialog();
      return false;
    },
  });

  $('.linkfield-remove-button').entwine({
    onclick() {
      const form = this.parents('form');
      let formUrl = form.attr('action');
      const formUrlParts = formUrl.split('?');
      let url = `${encodeURI(formUrl)}/field/${this.siblings('input:first').prop('name')}/doRemoveLink`;

      formUrl = formUrlParts[0];

      if (typeof formUrlParts[1] !== 'undefined') {
        url = `${url}&${formUrlParts[1]}`;
      }
      const holder = this.parents('.field:first');
      this.parents('.middleColumn:first').html("<img src='framework/images/network-save.gif' />");
      holder.load(url, () => {
        form.addClass('changed');
        holder.replaceWith(holder.html());
      });

      return false;
    },
  });


  $('#link-field-popup__dialog-wrapper').entwine({
    ReactRoot: null,
    Field: null,

    onunmatch() {
      this._clearModal();
    },

    open(field) {
      this.setField(field);
      this._renderModal(
        true
      );
    },

    close() {
      this._renderModal(false);
    },

    _renderModal(isOpen) {
      const handleHide = () => this.close();
      const field = this.getField();
      let root = this.getReactRoot();
      if (!root) {
        root = createRoot(this[0]);
      }
      root.render(<LinkFieldPopup
        isOpen={isOpen}
        link={isOpen ? field.getURL('LinkFormHTML') : null}
        title={field.data('title')}
        onClosed={handleHide}
        onLinkSave={(response) => {
          this._onAfterSave(response)
        }}
      />);
      this.setReactRoot(root);
    },
    _clearModal() {
      const root = this.getReactRoot();
      if (root) {
        root.unmount();
        this.setReactRoot(null);
      }
    },
    _onAfterSave(response) {
      this._clearModal();
      this.getField().parents('.field:first').replaceWith(response)
    },
  });
});
