import { useContext } from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { ThemeContext } from '../../contexts/theme.context'
import Icon from './../../assets/images/weather.png'
import Icon2 from './../../assets/images/weather2.png'
import '../NavigationTop/NavigationTop.css'

const NavigationTop = () => {

    const { theme, switchTheme } = useContext(ThemeContext)
    const variant = theme === 'light' ? 'dark' : 'light'

    return (
        <Navbar
            variant={variant}
            className={variant === 'ligth' ? 'NavbarTop NavbarTop-ligth d-lg-none' : 'NavbarTop NavbarTop-dark d-lg-none'}
        >
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    <div className="themeButton">
                        <Navbar.Text onClick={switchTheme}>
                            {
                                theme === 'dark' ?
                                    <img src={Icon} alt='theme'></img> :
                                    <img src={Icon2} alt='theme'></img>
                            }
                        </Navbar.Text>
                    </div>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}

export default NavigationTop