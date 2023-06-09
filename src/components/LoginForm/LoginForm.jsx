import { useContext, useState } from "react"
import { ThemeContext } from '../../contexts/theme.context'
import { Form, Button, Container } from "react-bootstrap"
import authService from './../../services/auth.services'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../contexts/auth.context"
import '../LoginForm/LoginForm.css'

const LoginForm = () => {

    const { theme, switchTheme } = useContext(ThemeContext)
    const variant = theme === 'light' ? 'dark' : 'light'

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const { authenticateUser, storeToken } = useContext(AuthContext)

    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()


        authService
            .login(loginData)
            .then(({ data }) => {
                storeToken(data.authToken)
                authenticateUser(() => navigate('/workouts/create'))

            })
            .catch(err => console.log(err))
    }


    const { password, email } = loginData

    return (

        <>
            <Container className="centered-content">

                <Form onSubmit={handleSubmit}>
                    <h2 className={variant === 'light' ? 'login-title-light' : 'login-title-dark'}>Login</h2>
                    <p className={variant === 'light' ? 'login-subtitle-light' : 'login-subtitle-dark'} >Please sign in to continue</p>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Control
                            className={variant === 'light' ? 'transparent-input-light email-input-light' : 'transparent-input-dark email-input-dark'}
                            type="email" autoComplete="username" placeholder="email" value={email} onChange={handleInputChange} name="email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Control
                            className={variant === 'light' ? 'transparent-input-light password-input-light' : 'transparent-input-dark password-input-dark'}
                            type="password" autoComplete="current-password" placeholder="password" value={password} onChange={handleInputChange} name="password" />
                    </Form.Group>

                    <div className="d-grid">
                        <Button className="custom-button" type="submit" >
                            Login ➜
                        </Button>
                    </div>

                    <p className={variant === 'light' ? 'login-footer-light' : 'login-footer-dark'}>Don't have an account? <a className="login-link" href="/signup">Sign up!</a></p>

                </Form>
            </Container>
        </>
    )
}

export default LoginForm