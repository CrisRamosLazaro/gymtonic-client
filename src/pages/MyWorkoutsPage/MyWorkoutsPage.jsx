import { useContext, useEffect, useState } from "react"
import { Button, Row, Col, Container } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import workoutService from "../../services/workout.services"
import { AuthContext } from "../../contexts/auth.context"
import { ThemeContext } from '../../contexts/theme.context'
import { WORKOUT_TYPES_ARR } from "../../consts/exercises-consts"
import '../MyWorkoutsPage/MyWorkoutsPage.css'

const MyWorkoutsPage = () => {

    const { user } = useContext(AuthContext)

    const [workouts, setWorkouts] = useState([])

    const navigate = useNavigate()

    const { theme, switchTheme } = useContext(ThemeContext)
    const variant = theme === 'light' ? 'dark' : 'light'

    useEffect(() => {
        loadWorkouts()
    }, [])

    const loadWorkouts = () => {
        workoutService
            .getUserWorkouts(user._id)
            .then(response => {
                setWorkouts(response.data)
            })
            .catch(err => console.log(err))
    }

    let workoutSelection = [...new Set(workouts.map(workout => workout.level))]

    return (
        <>
            <Container >
                <h1 className={variant === 'light' ? 'sticky-progress-bar-light' : 'sticky-progress-bar-dark'}>Select a workout</h1>
            </Container>
            {
                workoutSelection.sort().map(level => (
                    <Container key={level}>
                        <h4>Level {level}</h4>
                        <Row className="my-workouts-row">
                            {
                                WORKOUT_TYPES_ARR.map(type => {

                                    const workout = workouts.find(w => w.level === level && w.type === type)

                                    return (
                                        <Col key={type} className="my-workout-box">
                                            {
                                                workout
                                                    ? <Button className={variant === 'light' ? 'my-workouts-button-light' : 'my-workouts-button-dark'} onClick={() => navigate(`/workouts/todays-workout/${workout._id}`)}><p>{type}</p><p className="completed-times">completed {workout.completed} {workout.completed !== 1 ? 'times' : 'time'}</p></Button>
                                                    : <Button className={variant === 'light' ? 'no-workouts-button-light' : 'no-workouts-button-dark'}><p className="no-workout-yet"> {type} </p><p className="no-workout-yet">(no workout yet)</p></Button>
                                            }
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Container>
                ))
            }
        </>
    )


}

export default MyWorkoutsPage