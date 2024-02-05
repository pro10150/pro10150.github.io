import { format } from "date-fns"
import calculateDateDifference from "../../utils/Date"

function ExperienceWork({name, role, startDate, workType, endDate}) {
    const formattedStartDate = format(startDate, 'dd MMMM yyyy')
    var formattedEndDate
    var dateDifference
    if (endDate) {
        formattedEndDate = format(endDate, 'dd MMMM yyyy')
        dateDifference = calculateDateDifference(startDate, endDate)
    } else {
        dateDifference = calculateDateDifference(startDate, new Date())
    }
    console.log(dateDifference)
    return (
        <div>
            <span className="year-header detail-inline">
            <h3 className="year-header">{formattedStartDate} </h3>
            {formattedEndDate && <h3 
            className="year-header">&nbsp;- {formattedEndDate}
            </h3>
            }
            </span>
            <h2 className="detail-body">{role}</h2>
            <h3 className="detail-body">{workType}</h3>
            <span className="detail-inline detail-body ">
            {dateDifference.years != 0 && 
            <h3 className="detail-body">{dateDifference.years} years
            </h3>
            } 
            <h3 className="detail-body">{dateDifference.months} months</h3>
            </span>
            <h1 className="name-body">{name}</h1>
            <br />
        </div>
    )
}

export default ExperienceWork