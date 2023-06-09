import { Container, Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'


const WhatsNextPage = () => {

    const navigate = useNavigate()

    return (
        <Container>

            <h1>WHAT DO YOU WANT TO DO NEXT?</h1>

            <Button className="mr-5" onClick={() => navigate(`/workouts/create`)}><p>Create Another Workout</p></Button>
            <Button className="mr-5" onClick={() => navigate(`/workouts/my-workouts`)}><p>View Your Workouts</p></Button>

        </Container>

    )
}

export default WhatsNextPage
