import getRepoNameFromUrl from "../../utils/Github"
import { Chip } from "@mui/material"

function ExperiencePastProject({name, hotlink, description, skill}) {
    const repoName = getRepoNameFromUrl(hotlink)
    return (
        <div className="past-project">
            <a className="year-header github-header" href={hotlink} target="_blank">{repoName.repoName}</a>
            {/* <h1>{repoName.username}/{repoName.repoName}</h1> */}
            <h2 className="name-body">{name}</h2>
            <h3 className="detail-body">{description}</h3>
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