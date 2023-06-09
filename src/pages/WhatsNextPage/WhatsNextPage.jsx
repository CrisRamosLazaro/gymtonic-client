import { Container, Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { useContext } from "react"
import { ThemeContext } from '../../contexts/theme.context'
import '../WhatsNextPage/WhatsNextPage.css'


const WhatsNextPage = () => {

    const navigate = useNavigate()

    const { theme, switchTheme } = useContext(ThemeContext)
    const variant = theme === 'light' ? 'dark' : 'light'

    return (
        <Container className="whats-next-container mb-5">

            <h1>WHAT DO YOU WANT TO DO NEXT?</h1>

            <Button className="custom-whats-next-button" onClick={() => navigate(`/workouts/create`)}><p>Create Another Workout</p></Button>
            <Button className="custom-whats-next-button" onClick={() => navigate(`/workouts/my-workouts`)}><p>View Your Workouts</p></Button>

        </Container>

    )
}

export default WhatsNextPage
