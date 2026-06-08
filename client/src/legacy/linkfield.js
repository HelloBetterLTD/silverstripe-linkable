import $ from 'jquery';

window.ss = window.ss || {};


$.entwine('ss', ($) => {
  $('input.link').entwine({
    Loading: null,
    Dialog: null,
    URL: null,
    onmatch() {
      const self = this;
      this.setDialog(self.siblings('.linkfield-dialog:first'));

      const form = this.parents('form');
      let formUrl = form.attr('action');
      const formUrlParts = formUrl.split('?');
      formUrl = formUrlParts[0];
      let url = `${encodeURI(formUrl)}/field/${this.attr('name')}/LinkFormHTML`;

      if (self.val().length) {
        url = `${url}?LinkID=${self.val()}`;
      } else {
        url += '?LinkID=0';
      }

      if (typeof formUrlParts[1] !== 'undefined') {
        url = `${url}&${formUrlParts[1]}`;
      }

      // add extra query params if provided
      const extraQuery = self.data('extra-query');
      if (typeof extraQuery !== 'undefined') {
          url = `${url}${extraQuery}`;
      }

      this.setURL(url);

      // configure the dialog
      this.getDialog().data('field', this).dialog({
        autoOpen: false,
        width: $(window).width() * (80 / 100),
        height: $(window).height() * (80 / 100),
        modal: true,
        title: this.data('dialog-title'),
        position: { my: 'center', at: 'center', of: window }
      });

      // submit button loading state while form is submitting
      this.getDialog().on('click', 'button', function () {
        $(this).addClass('loading ui-state-disabled');
        $(this).closest('form').data('submitter', this);
      });

      // handle dialog form submission
      this.getDialog().on('submit', 'form', function (event) {
        event.preventDefault();

        const options = {};
        options.success = function (response) {
          if ($(response).is('.field')) {
            self.getDialog().empty().dialog('close');
            self.parents('.field:first').replaceWith(response);
            form.addClass('changed');
          } else {
            self.getDialog().html(response);
          }
        };

        const dialogForm = $(this);
        if (typeof dialogForm.ajaxSubmit === 'function') {
          dialogForm.ajaxSubmit(options);
        } else {
          const formData = new FormData(this);
          const submitter = event.originalEvent && event.originalEvent.submitter
            ? event.originalEvent.submitter
            : dialogForm.data('submitter');

          if (submitter && submitter.name && !formData.has(submitter.name)) {
            formData.append(submitter.name, submitter.value || '');
          }

          $.ajax({
            url: dialogForm.attr('action'),
            type: dialogForm.attr('method') || 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: options.success
          });
        }

        return false;
      });
    },

    onunmatch() {
      const self = this;
      $('.linkfield-dialog.ui-dialog-content').filter(function () {
        return self[0] === $(this).data('field')[0];
      }).remove();
    },
    showDialog() {
      const dlg = this.getDialog();
      dlg.empty().dialog('open').parent().addClass('loading');
      dlg.load(this.getURL(), () => {
        dlg.parent().removeClass('loading');
      });
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
      formUrl = formUrlParts[0];
      let url = `${encodeURI(formUrl)}/field/${this.siblings('input:first').prop('name')}/doRemoveLink`;

      if (typeof formUrlParts[1] !== 'undefined') {
        url = `${url}?${formUrlParts[1]}`;
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
});
