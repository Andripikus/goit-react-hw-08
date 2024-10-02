import { useDispatch, useSelector } from "react-redux";
import ContactForm from "../components/ContactForm/ContactForm";
import ContactList from "../components/ContactList/ContactList";
import SearchBox from "../components/SearchBox/SearchBox";
import { fetchContacts } from "../redux/contacts/operations";
import { useEffect } from "react";
import { selectContacts, selectLoading, selectError } from "../redux/contacts/selectors";
import toast, { Toaster } from "react-hot-toast";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);


 useEffect(() => {
  dispatch(fetchContacts())
    .unwrap()
    .then(() => {
      toast.success("Phonebook loaded successfully!");
    })
    .catch((error) => {
      console.error("Failed to load contacts:", error);
      toast.error("Failed to load contacts.");
    });
}, [dispatch]);

  return (
    <>
      <h1>Phonebook</h1>
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <Toaster />
      <ContactForm />
      <SearchBox />
      <ContactList />
    </>
  );
};

export default ContactsPage;
