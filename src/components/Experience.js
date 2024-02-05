import ExperiencePastProjectModel from "../models/ExperiencePastProjectModel"
import { ExperienceWorkModel } from "../models/ExperienceWorkModel"
import ExperiencePastProject from "./List/ExperiencePastProject"
import ExperienceWork from "./List/ExperienceWork"
import ListTemplate from "./List/ListTemplate"

function Experience() {
    return (
        <div>
            <big className="section-header">Expereience</big>
            <ListTemplate component={ExperienceWork} data={ExperienceWorkModel} sectionTitle="Work Experience"/>
            <ListTemplate component={ExperiencePastProject} data={ExperiencePastProjectModel} sectionTitle="My Past Projects"/>
        </div>
    )
}

export default Experience