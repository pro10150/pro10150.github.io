import { format } from "date-fns"

function CertificateTestScore({name, score, issuedDate, expiredDate}) {
    const formattedIssuedDate = format(issuedDate, "dd MMMM yyyy")
    const formattedExpiredDate = format(expiredDate, "dd MMMM yyyy")
    return (
        <div>
            <h1 className="year-header">{name}</h1>
            <h2 className="name-body">Score: {score}</h2>
            <h3 className="detail-body">Issued: {formattedIssuedDate}</h3>
            {expiredDate &&
                <h3 className="detail-body">Expired: {formattedExpiredDate}</h3>
            }
            <br />
        </div>
    )
}

export default CertificateTestScore