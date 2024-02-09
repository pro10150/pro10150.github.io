import { format } from "date-fns"

function CertificateSpecialization({credentialId, credentialUrl, instructor, issuedDate, issuedOrganization, name}) {
    const formattedDate = format(issuedDate, "MMMM yyyy")
    return(
        <div>
            <a href={credentialUrl} target="_blank" className="year-header">{name}</a>
            <h3 className="name-body">Issued: {formattedDate}</h3>
            <h3 className="detail-body">{instructor}</h3>
            <h3 className="detail-body">{issuedOrganization}</h3>
            <br />
        </div>
    )
}

export default CertificateSpecialization