import React, { Component, useState, useEffect, useRef } from 'react';
import i18n from 'i18n';
import { Modal, ModalHeader } from 'reactstrap';
import { loadComponent } from 'lib/Injector';

const Loading = loadComponent('Loading');

const LinkFieldPopup = (props) => {

  const {
    isOpen,
    link,
    grid,
    onLinkSave,
    ModalComponent,
    ModalHeaderComponent,
    onClosed
  } = props;

  const formContainer = useRef();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(null);

  const handleHide = () => {
    if (typeof onClosed === 'function') {
      setForm('');
      onClosed();
    }
  }

  const bindFormAction = () => {
    if (formContainer.current) {
      const form = formContainer.current.querySelector('form');
      $(form).on('submit', function (e) {
        e.preventDefault();
        const $this = $(this);
        $.ajax({
          url: $this.attr('action'),
          method: 'POST',
          data: $this.serializeArray(),
          success: function (response) {
            if ($(response).is('.field')) {
              if (onLinkSave) {
                onLinkSave(response);
              }
            } else {
              setForm(response);
            }
          }
        });
        return false;
      });
    }
  }

  useEffect(() => {
    // window.setTimeout(() => {
      bindFormAction();
    // }, 5);
  }, [form])

  useEffect(() => {
    if (link) {
      $.ajax({
        url: link,
        success: function (data) {
          setLoading(false);
          setForm(data);
        }
      })
    }
  }, [link]);

  return <ModalComponent
    size={'md'}
    centered={false}
    scrollable={true}
    isOpen={isOpen}>

    {!!loading && <Loading />}

    {!loading && <>
      <ModalHeaderComponent
        toggle={handleHide}
      >
        Edit
      </ModalHeaderComponent>
      <div className={'linkable-popup__body'}>
        <div
          ref={formContainer}
          className={'linkable-popup__form-container'}
          dangerouslySetInnerHTML={{__html: form}} />
      </div>
    </>}

  </ModalComponent>


}

LinkFieldPopup.defaultProps = {
  isOpen: false,
  link: null,
  modalClassName: 'link-field-popup-modal',
  ModalComponent: Modal,
  ModalHeaderComponent: ModalHeader,
};

export default LinkFieldPopup;
