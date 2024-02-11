import ListTemplate from "./List/ListTemplate"
import CertificateSpecialization from "./List/CertificateSpecialization"
import { CertificateSpecializationModel } from "../models/CertificateSpecializationModel"
import CertificateCourse from "./List/CertificateCourse"
import { CertificateCourseModel } from "../models/CertificateCourseModel"
import CertificateTestScore from "./List/CertificateTestScore"
import { CertificateTestScoreModel } from "../models/CertificateTestScoreModel"

function Certificate() {

    var FilteredCertificateTestScoreModel = CertificateTestScoreModel.filter((testScore) => testScore.expiredDate > new Date())

    const specializationCount = CertificateSpecializationModel.length
    const courseCount = CertificateCourseModel.length
    const testScoreCount = CertificateTestScoreModel.length

    return (
        <div>
            <big className="section-header">Certificate</big>
            <ListTemplate component={CertificateSpecialization} data={CertificateSpecializationModel} sectionTitle={`Specialization(${specializationCount})`}/>
            <ListTemplate component={CertificateCourse} data={CertificateCourseModel} sectionTitle={`Coursework(${courseCount})`}/>
            <ListTemplate component={CertificateTestScore} data={FilteredCertificateTestScoreModel} sectionTitle={`Test Score(${testScoreCount})`}/>
        </div>
    )
}

export default Certificate