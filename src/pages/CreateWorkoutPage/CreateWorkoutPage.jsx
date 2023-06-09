import { useContext, useEffect, useState } from "react"
import { Container, ProgressBar, Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import exercisesService from "../../services/exercises.services"
import userExercisesServices from '../../services/userExercises.services'
import workoutService from "../../services/workout.services"
import ExerciseCardUser from "../../components/ExerciseCardUser/ExerciseCardUser"
import Loader from '../../components/Loader/Loader'
import { AuthContext } from "../../contexts/auth.context"
import { ThemeContext } from '../../contexts/theme.context'
import { WORKOUT_TYPES_ARR } from "../../consts/exercises-consts"
import { totalPercentage } from "../../utils/setCurrentPercentage"
import '../CreateWorkoutPage/CreateWorkoutPage.css'

const CreateWorkoutPage = () => {
    const { user } = useContext(AuthContext)

    const [workoutType, setWorkoutType] = useState('Push')
    const [allExercises, setAllExercises] = useState([])
    const [selectedExercises, setSelectedExercises] = useState([])
    const [currentPercentage, setCurrentPercentage] = useState()
    const [createdWorkout, setCreatedWorkout] = useState([])
    const [alertMessage, setAlerMessage] = useState('')
    const [level, setLevel] = useState(0)

    const [workoutData, setWorkoutData] = useState({
        level: '',
    })

    const navigate = useNavigate()

    const { theme, switchTheme } = useContext(ThemeContext)
    const variant = theme === 'light' ? 'dark' : 'light'

    const actualPercentage = selectedExercises.reduce((sum, exercise) => sum + exercise.percentage, 0)


    useEffect(() => {
        exercisesService
            .getExercisesByType(workoutType)
            .then(response => setAllExercises(response.data))
            .catch(err => console.log(err))
    }, [workoutType])

    useEffect(() => {
        totalPercentage(selectedExercises, setCurrentPercentage, setAlerMessage)
    }, [selectedExercises])

    useEffect(() => {
        fetchWorkoutLevel()
    }, [workoutType])

    const fetchWorkoutLevel = () => {
        workoutService
            .getWorkoutLevel(user?._id, workoutType)
            .then(response => {
                setLevel(response.data.level + 1)
            })
            .catch(error => {
                console.error("Failed to fetch workout level:", error)
            })
    }

    const handleWorkoutTypeChange = (event) => {
        setWorkoutType(event.target.value)
    }

    const handleExerciseSelection = ({ event, exercise }) => {
        const { checked } = event.target

        if (checked) {
            const userExercise = { ...exercise, series: 0, reps: 0, time: 0, weight: 0 }
            setSelectedExercises([...selectedExercises, userExercise])
        } else {
            const actualSelectedExercises = selectedExercises.filter(ex => ex._id !== exercise._id)
            setSelectedExercises(actualSelectedExercises)
        }
    }

    const handleExerciseFieldChange = ({ exerciseId, field, value }) => {
        setSelectedExercises(selectedExercises.map(exercise =>
            exercise._id === exerciseId ? { ...exercise, [field]: value } : exercise
        ))
    }

    const handleCreateWorkout = () => {
        const userExercisePromises = selectedExercises.map((exercise) => {
            const userExerciseData = {
                exercise: exercise._id,
                series: exercise.series,
                reps: exercise.reps,
                time: exercise.time,
                weight: exercise.weight,
            }
            return userExercisesServices.saveUserExercise(userExerciseData)
        })

        Promise.all(userExercisePromises)
            .then((userExercisesResponses) => {
                const userExercisesIds = userExercisesResponses.map((res) => {
                    return res.data._id
                })
                const workoutDetails = {
                    ...workoutData,
                    level: workoutData.level,
                    type: workoutType,
                    exercises: userExercisesIds,
                }

                return workoutService.createWorkout(workoutDetails)
            })
            .then(() => {
                setCreatedWorkout([...selectedExercises])
                navigate(`/workouts/my-workouts`)
            })
            .catch(err => console.log(err))
    }

    return (
        <Container style={{ paddingBottom: '50px' }}>
            <div className={variant === 'light' ? 'sticky-progress-bar-light' : 'sticky-progress-bar-dark'}>
                <h3 className="create-workout-h3">Create your <span className="create-workout-type">{workoutType.toUpperCase()} </span> workout</h3>
                <h5>Level {level}</h5>
                <ProgressBar className="custom-progress-bar mt-2 mb-2" now={actualPercentage} />
                <p>{currentPercentage}% {alertMessage}</p>
            </div>
            {
                !allExercises
                    ?
                    <Loader />
                    :
                    <div>
                        <select onChange={handleWorkoutTypeChange} value={workoutType}>
                            <option>Pick One</option>
                            {
                                WORKOUT_TYPES_ARR.map(elm => (
                                    <option key={elm} value={elm}>{elm}</option>
                                ))
                            }
                        </select>
                        {
                            allExercises.map(exercise => (
                                <ExerciseCardUser
                                    key={exercise._id}
                                    exercise={exercise}
                                    isChecked={selectedExercises.some(selectedExercise => selectedExercise._id === exercise._id)}
                                    onCheckChange={({ event, series, reps, time, weight }) => handleExerciseSelection({ event, exercise, series, reps, time, weight })}
                                    isEditable={true}
                                    onExerciseFieldChange={handleExerciseFieldChange}
                                />
                            ))
                        }
                        <div className="workout-button-container">
                            <Button className="custom-workout-button mb-5" onClick={handleCreateWorkout} disabled={currentPercentage !== 100}>Create Workout</Button>
                        </div>
                    </div>
            }
        </Container>
    )
}

export default CreateWorkoutPage