import ContactSocialMedia from "./List/ContactSocialMedia"
import linkedinIcon from "../assets/images/linkedin.svg"
import githubIcon from "../assets/images/github.svg"

function Contact() {
    return(
        <div className="contact-body">
             <big className="contact-header">Interested in keeping in touch?</big>
             <h1 className="contact-subheader">Let's keep in touch!</h1>
             <h2 className="contact-detail"><a href="mailto:noppakun.antk@gmail.com">noppakun.antk@gmail.com</a></h2>
             <div className="detail-inline contact-social-media">
                <ContactSocialMedia  url="https://www.linkedin.com/in/noppakun-anan/" image={linkedinIcon} alt="LinkedIn"/>
                <div className="contact-social-media-separator"></div>
                <ContactSocialMedia  url="https://github.com/pro10150" image={githubIcon} alt="GitHub"/>
             </div>
        </div>
    )
}

export default Contact
