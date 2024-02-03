import React from "react"

function ListTemplate({component: Component, data, sectionTitle}) {
    return (
        <div className="section-detail">
            <big className="section-title">{sectionTitle}</big>
            <div className="list-template-body">
                <div className="list-template-line">
                </div>
                <div className="list-template-data">
                    {data.map((dataItem) => (
                        <div className="hStackContainer">
                            <div className="circle"></div>
                            <Component {...dataItem}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ListTemplate