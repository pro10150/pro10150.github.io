import About from "./About";
import Home from "./Home";
import Contact from "./Contact";
import Certificate from "./Certificate";
import Education from "./Education";
import Experience from "./Experience";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-scroll"
import "../App.css"

function NavigationBar() {
    return (
        <div className="App">
            <header className="nav">
                <nav className="nav__container__actions">
                    <ul>
                        <li>
                            <Link activeClass="active" smooth spy to="home">
                                <img className="logo-image" src={require("../assets/images/noppakun_web_portfolio_logo.png")} alt="" />
                            </Link>
                        </li>
                        <li>
                            <Link activeClass="active" smooth spy to="about">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link activeClass="active" smooth spy to="certificate">
                                Certificate
                            </Link>
                        </li>
                        <li>
                            <Link activeClass="active" smooth spy to="education">
                                Education
                            </Link>
                        </li>
                        <li>
                            <Link activeClass="active" smooth spy to="experience">
                                Experience
                            </Link>
                        </li>
                        <li>
                            <Link activeClass="active" smooth spy to="contact">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>   
            <section id="home">
                <Home />
            </section>
             <section id="about" className="item-section">
                <About />
             </section>
             <section id="certificate" className="item-section">
                <Certificate />
             </section>
             <section id="education" className="item-section">
                <Education />
             </section>
             <section id="experience" className="item-section">
                <Experience />
             </section>
             <section id="contact" className="item-section">
                <Contact />
             </section>
        </div>
    );
}

export default NavigationBar