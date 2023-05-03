import React, { useState } from 'react';
import { Contact } from 'components/Contact/Contact';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/operations';
import { selectFilteredContactList } from 'redux/selectors';
import { Modal } from 'components/Modal/Modal';
import css from './ContactList.module.css';

let contactNameToDelete = '';

export const ContactList = () => {
  const [shownModal, setShownModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');

  const dispatch = useDispatch();

  const shouldDeleteContact = value => {
    if (value) {
      dispatch(deleteContact(idToDelete));
    }
    modalShoudClose();
  };

  const showModal = (contactId, contactName) => {
    contactNameToDelete = contactName;
    setShownModal(true);
    setIdToDelete(contactId);
  };

  const modalShoudClose = () => {
    setShownModal(false);
  };

  const filteredContactList = useSelector(selectFilteredContactList);

  return (
    <>
      <table className={css.contactListTable}>
        <tbody>
          {filteredContactList.map(contact => (
            <tr key={contact.id} className={css.contactListItem}>
              <Contact contact={contact} showModal={showModal} />
            </tr>
          ))}
        </tbody>
      </table>

      {shownModal && (
        <Modal modalShoudClose={modalShoudClose}>
          <>
            <p>
              Do you really want to remove <br /> {contactNameToDelete}?
            </p>

            <button
              type="button"
              className={css.button}
              onClick={() => shouldDeleteContact(true)}
            >
              YES
            </button>
            <button
              type="button"
              className={css.button}
              onClick={() => shouldDeleteContact(false)}
            >
              NO
            </button>
          </>
        </Modal>
      )}
    </>
  );
};