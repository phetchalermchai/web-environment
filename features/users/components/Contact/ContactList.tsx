import { contactData } from "@/config/contactConfig"
import ContactDetails from "./ContactDetails"

const ContactList = () => {
  return (
    <ul className="menu bg-base-200 rounded-box max-w-3xl w-full self-center">
        {contactData.map((category, index) => (
        <li key={index}>
          <ContactDetails title={category.title} details={category.details} />
        </li>
      ))}
    </ul>
  )
}

export default ContactList