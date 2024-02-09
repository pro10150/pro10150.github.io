import getRepoNameFromUrl from "../../utils/Github"
import { Chip } from "@mui/material"

function ExperiencePastProject({name, hotlink, description, skill}) {
    const repoName = getRepoNameFromUrl(hotlink)
    return (
        <div>
            <a className="year-header" href={hotlink} target="_blank">{repoName.username}/{repoName.repoName}</a>
            <h2 className="name-body">{name}</h2>
            <h3 className="detail-bdoy">{description}</h3>
            <div className="chip-container">
                {skill.map((item) => (
                    <div>
                        <Chip label={item} className="chip-item"/>
                    </div>
                ))}
            </div>
            <br />
        </div>
    )
}

export default ExperiencePastProject