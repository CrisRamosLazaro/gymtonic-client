import { useEffect, useState, useContext } from "react"
import { Container, ProgressBar, Button } from "react-bootstrap"
import { useNavigate, useParams } from 'react-router-dom'
import workoutService from "../../services/workout.services"
import ExerciseCardUser from "../../components/ExerciseCardUser/ExerciseCardUser"
import { getProgressMessage } from "../../utils/getProgressMesage"
import { ThemeContext } from '../../contexts/theme.context'

import '../TodaysWorkoutPage/TodaysWorkout.css'

const TodaysWorkout = () => {

    const { id } = useParams()

    const navigate = useNavigate()

    const { theme, switchTheme } = useContext(ThemeContext)
    const variant = theme === 'light' ? 'dark' : 'light'

    const [workout, setWorkout] = useState({
        type: '',
        exercises: [],
    })
    const [doneExercises, setDoneExercises] = useState([])

    useEffect(() => {
        workoutService
            .getWorkoutById(id)
            .then(response => {
                setWorkout(response.data)
            })
            .catch(err => console.log(err))

    }, [id])

    const toggleExerciseDone = (exerciseId) => {
        if (!doneExercises.includes(exerciseId)) {
            setDoneExercises((previousState) => [...previousState, exerciseId])
        } else {
            setDoneExercises((previousState) =>
                previousState.filter((id) => id !== exerciseId)
            )
        }
    }

    const calculateCompletionPercentage = () => {
        const totalExercises = workout.exercises.length
        const completedExercises = doneExercises.length

        return totalExercises === 0 ? 0 : (completedExercises / totalExercises) * 100
    }

    const handleSaveButtonClick = () => {
        workoutService
            .updateWorkout(workout._id, { completed: workout.completed + 1 })
            .then((response) => {
                setWorkout(response.data)
                navigate("/whats-next")
            })
            .catch(err => console.log(err))
    }

    return (
        <Container style={{ paddingBottom: '50px' }}>
            <div className={variant === 'light' ? 'sticky-progress-bar-light' : 'sticky-progress-bar-dark'}>
                <h1>Today's Workout</h1>
                <ProgressBar className="custom-progress-bar" now={calculateCompletionPercentage()} label={`${calculateCompletionPercentage()}%`} />
                <p>{getProgressMessage(calculateCompletionPercentage())}</p>
            </div>
            {workout ? (
                <>


                    <ul>
                        {workout.exercises.map((exercise) => (
                            <ExerciseCardUser
                                key={exercise._id}
                                exercise={exercise}
                                isChecked={doneExercises.includes(exercise._id)}
                                onCheckChange={() => toggleExerciseDone(exercise._id)}
                                isEditable={false}
                            />
                        ))}

                    </ul>
                    <div className="workout-button-container">
                        <Button className="custom-workout-button mb-5"
                            disabled={calculateCompletionPercentage() !== 100}
                            onClick={handleSaveButtonClick}
                        >{calculateCompletionPercentage() !== 100 ? 'You can do it!' : 'SMASHED IT!'}
                        </Button>
                    </div>


                </>
            ) : (
                <p>Loading workout...</p>
            )}
        </Container>
    )
}

export default TodaysWorkout
