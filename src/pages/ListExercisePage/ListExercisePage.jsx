import { useEffect, useState } from "react"
import exercisesService from "../../services/exercises.services"
import { Container, Row } from "react-bootstrap"
import Loader from "../../components/Loader/Loader"
import ExerciseList from "../../components/ExerciseList/ExerciseList"

const ListExercisePage = () => {

    const [exercises, setExercise] = useState()

    useEffect(() => {
        loadExercises()
    }, [])

    const loadExercises = () => {
        exercisesService
            .getAllExercises()
            .then(({ data }) => setExercise(data))
            .catch(err => console.log(err))
    }
    return (
        <Container>
            <Row>
                {
                    !exercises
                        ?
                        <Loader />
                        :
                        <ExerciseList exercises={exercises} />
                }
            </Row>
        </Container>
    )
}

export default ListExercisePage