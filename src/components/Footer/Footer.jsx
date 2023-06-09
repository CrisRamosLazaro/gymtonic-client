import { useContext } from 'react'
import { ThemeContext } from '../../contexts/theme.context'
import './Footer.css'

const Footer = () => {

    const { theme } = useContext(ThemeContext)

    const themeStyle = {
        backgroundColor: theme === 'dark' ? 'white' : 'black',
        color: theme === 'dark' ? 'black' : 'white'
    }

    return (
        <footer className="d-none d-md-block" style={themeStyle}>derechos reservados</footer>
    )
}

export default Footer
