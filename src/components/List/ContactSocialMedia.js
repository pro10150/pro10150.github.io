function ContactSocialMedia({url, image, alt}) {
    return(
        <a target="_blank" rel="noopener noreferrer" href={url}><img className="contact-logo-button" src={image} alt={alt} /></a>
    )
}

export default ContactSocialMedia