import { Container } from "react-bootstrap"
import NewExerciseForm from "../../components/NewExerciseForm/NewExerciseForm"

const CreateExercisePage = () => {


    return (
        <Container>
            <h1>New Exercise</h1>
            <hr />
            <NewExerciseForm />
        </Container>
    )
}

export default CreateExercisePage;
