import {Link} from "react-scroll"

function Home() {
    return (
        <div className="home-body">
            <div className="home-header">
                <h1>
                    Hi!,
                </h1>
                <h2>
                    My name is
                </h2>
            </div>
            <div className="home-header">
                <h1>
                    Noppakun Anantakitthawon
                </h1>
            </div>
            <div className="home-header">
                <h2>
                    iOS Developer
                </h2>
            </div>
            <div className="home-header">
                <Link activeClass="active" smooth spy to="contact">
                <div>
                    <div className="reach-me-btn-box" id="reach-me-btn-box-left">
                    </div>
                    <div id="reach-me-btn">
                        <h2 id="reach-me-btn-label">
                            Reach me!
                        </h2>
                    </div>
                    <div className="reach-me-btn-box" id="reach-me-btn-box-right">
                    </div>
                </div>
                </Link>
            </div>
            <div className="home-header">
                <h2>
                    Or
                </h2>
            </div>
            <div>
                <h2>
                    Scroll down and get to know a little bit about me!
                </h2>
            </div>
        </div>
    )
}

export default Home