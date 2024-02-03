import { EducationExchangeProgramModel } from "../models/EducationExchangeProgramModel"
import { EducationSchoolModel } from "../models/EducationSchoolModel"
import EducationExchangeProgram from "./List/EducationExchangeProgram"
import EducationSchool from "./List/EducationSchool"
import ListTemplate from "./List/ListTemplate"

function Education() {
    return(
        <div>
            <big className="section-header">Education</big>
            <ListTemplate component={EducationSchool} data={EducationSchoolModel} sectionTitle="Education Background"/>
            <ListTemplate component={EducationExchangeProgram} data={EducationExchangeProgramModel} sectionTitle="Participated Exchange Program"/>
        </div>

    )
}

export default Education