function ContactSocialMedia({url, image, alt}) {
    return(
        <a target="_blank" href={url}><img className="contact-logo-button" src={image} alt={alt} /></a>
    )
}

export default ContactSocialMedia