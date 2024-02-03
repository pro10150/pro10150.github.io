import { format } from "date-fns"

function EducationExchangeProgram({name, startDate, endDate, description, type}) {
    const formattedStartDate = format(startDate, 'dd MMMM yyyy')
    const formattedEndDate = format(endDate, 'dd MMMM yyyy')
    return(
        <div>
            <h1 className="year-header">{formattedStartDate} - {formattedEndDate}</h1>
            <h2 className="name-body">{name}</h2>
            <h3 className="detail-body">{type}</h3>
            <h3 className="detail-body">{description}</h3>
            <br />
        </div>
    )
}

export default EducationExchangeProgram