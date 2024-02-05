function EducationSchool({department, endYear, faculty, grade, major, name, startYear, type}) {
    return (
        <div>
            <h1 className="year-header">{startYear} - {endYear}</h1>
            <h1 className="name-body">{name}</h1>
            <h2 className="type-header">{type}</h2>
            <span className="detail-inline">
                { department &&
                    <h3 className="detail-body">{department}, </h3>
                }
                { faculty && 
                    <h3 className="detail-body">{faculty}, </h3>
                }
                <h3 className="detail-body">{major}</h3>
            </span>
            { grade &&
                <h4 className="grade-body">{grade}</h4>
            }
            <br />
        </div>
    )
}

export default EducationSchool