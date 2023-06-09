import { Button, Container } from "react-bootstrap"
import '../HomePage/HomePage.css'
import horizontalVideo from './../../assets/videos/cottonbro-studio-4096x2160-25fps.mp4'
import verticalVideo from './../../assets/videos/tima-miroshnichenko-2160x3840-25fps.mp4'
import { useNavigate } from "react-router-dom"
import logo from './../../assets/images/gymtonic.png'

const HomePage = () => {

    const navigate = useNavigate()
    return (
        <>
            <div className="background">
                <div className="background-horizontal">
                    <video className="desktop-video" playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
                        <source src={horizontalVideo} type="video/mp4" />
                    </video>
                </div>
                <div className="background-vertical">
                    <video className="mobile-video" playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
                        <source src={verticalVideo} type="video/mp4" />
                    </video>
                </div>
            </div>
            <Container className="centered-content">
                <img src={logo} alt='GymTonic' />
                <Button onClick={() => navigate(`/login`)} className="custom-home-button white-button">Log In</Button>
                <p className="no-margin">Don't have an account?</p>
                <Button onClick={() => navigate(`/signup`)} className="custom-home-button transparent-button">Sign Up</Button>
            </Container>
        </>
    )
}

export default HomePage
