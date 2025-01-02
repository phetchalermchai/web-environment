import { PhoneIcon } from "@/config/iconConfig";

type ContactDetailsProps = {
    title: string;
    details: { label: string; numbers: string[] }[];
};

const ContactDetails = ({ title, details }: ContactDetailsProps) => {
    return (
        <details open>
            <summary><PhoneIcon /> {title}</summary>
            <ul>
                {details.map((detail, index) => (
                    <li key={index}>
                        <details open={index === 0}>
                            <summary>{detail.label}</summary>
                            <ul>
                                {detail.numbers.map((number, idx) => (
                                    <li key={idx}>
                                        <a>{number}</a>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </li>
                ))}
            </ul>
        </details>
    )
}

export default ContactDetails