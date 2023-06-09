import { useContext } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Dropdown } from 'react-bootstrap'
import { ThemeContext } from '../../contexts/theme.context'
import { AuthContext } from '../../contexts/auth.context'
import { FaUser, FaDumbbell, FaChartPie } from 'react-icons/fa'

import '../NavigationBottom/NavigationBottom.css'

const NavigationBottom = () => {

    const navigate = useNavigate()

    const { user, logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout(navigate)
        navigate('/login')
    }

    const { theme, switchTheme } = useContext(ThemeContext)
    const variant = theme === 'light' ? 'dark' : 'light'

    return (
        <Container fluid className={variant === 'light' ? 'navbar-bottom-light d-lg-none' : 'navbar-bottom-dark d-lg-none'}>
            <Row className="justify-content-around">
                <Col xs={4} className="text-center">
                    <Link to='/workouts/create' className={`${variant === 'light' ? 'nav-bottom-link-light' : 'nav-bottom-link-dark'} link-container mt-1`}>
                        <>
                            <FaChartPie size={25} />
                            <p className="mt-1">New Workout</p>
                        </>
                    </Link>
                </Col>
                <Col xs={4} className="text-center">
                    <Link to='/workouts/my-workouts'
                        className={`${variant === 'light' ? 'nav-bottom-link-light' : 'nav-bottom-link-dark'} link-container mt-1`}>
                        <>
                            <FaDumbbell size={25} />
                            <p className="mt-1">Workouts</p>
                        </>
                    </Link>
                </Col>
                {/* <Col xs={4} className="text-center">

                    <Link to='/profile' className={`${variant === 'light' ? 'nav-bottom-link-light' : 'nav-bottom-link-dark'} link-container mt-1`}>
                        <>
                            <FaUser size={25} />
                            <p className="mt-1">Profile</p>
                        </>
                    </Link>
                </Col> */}

                <Col xs={4} className="text-center">
                    <Dropdown drop="up">
                        <Dropdown.Toggle bsPrefix="custom-toggle" className="dropdown-toggle link-container mt-1">
                            <>
                                <FaUser size={25} />
                                <p className="mt-1">Profile</p>
                            </>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropdown-menu-toggle">
                            <Dropdown.Item className={`${variant === 'light' ? 'dropdown-light' : 'dropdown-dark'} `}><Link to='/profile' className='nav-link'>Profile</Link></Dropdown.Item>
                            <Dropdown.Item className={`${variant === 'light' ? 'dropdown-light' : 'dropdown-dark'} `} onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
        </Container>
    )
}

export default NavigationBottom
