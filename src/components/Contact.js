import ContactSocialMedia from "./List/ContactSocialMedia"

function Contact() {
    return(
        <div className="contact-body">
             <big className="contact-header">Interest in keeping contact with me?</big>
             <h1 className="contact-subheader">Let keep in touch!</h1>
             <h2 className="contact-detail">pro10150@gmail.com</h2>
             <div className="detail-inline contact-social-media">
                <ContactSocialMedia  url="https://www.linkedin.com/in/noppakun-anantakitthawon-67b96a183/" image="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/144px-LinkedIn_icon.svg.png?20210220164014" alt="Linkedin logo"/>
                <div className="contact-social-media-separator"></div>
                <ContactSocialMedia  url="https://github.com/pro10150" image="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="Github logo"/>
             </div>
        </div>
    )
}

export default Contact
