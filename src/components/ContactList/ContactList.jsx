import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css"; // Якщо використовуєте стилі

export default function ContactList() {
  const contacts = useSelector(selectFilteredContacts);
  
  console.log("Filtered Contacts in ContactList: ", contacts);

  return (
    <ul className={css.contactList}>
      {contacts.length > 0 ? (
        contacts.map((contact) => (
          <Contact contact={contact} key={contact.id} />
        ))
      ) : (
        <p>You don't have any contacts yet!</p>
      )}
    </ul>
  );
}
