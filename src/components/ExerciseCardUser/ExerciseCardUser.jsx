import { Card, Row, Col } from "react-bootstrap"
import { useContext } from 'react'
import { ThemeContext } from '../../contexts/theme.context'
import Checkbox from '../Checkbox/Checkbox'
import './ExerciseCardUser.css'

const ExerciseCardUser = ({ exercise, isChecked, onCheckChange, isEditable, onExerciseFieldChange }) => {

    const { theme, switchTheme } = useContext(ThemeContext)
    const variant = theme === 'light' ? 'dark' : 'light'

    return (
        <div className="card-container">

            <Card className={variant === 'light' ? 'mb-3 ExerciseCard ExerciseCard-light' : 'mb-3 ExerciseCard ExerciseCard-dark'}>
                <Card.Body>
                    <Row>
                        <Col xs={1}>

                            <Checkbox
                                type="checkbox"
                                checked={isChecked}
                                onChange={(event) => onCheckChange({ event, exercise })}
                                className="custom-checkbox"
                            />

                        </Col>
                        <Col xs={2}>
                            {
                                isEditable ? <img src={exercise.imageUrl} alt="exercise" /> : <img src={exercise.exercise.imageUrl} alt="exercise" />
                            }

                        </Col>
                        <Col xs={9}>
                            <Row>
                                <Col>
                                    <Card.Title className="card-title">
                                        {isEditable ? <><strong>{exercise.exerciseName}</strong>
                                            <span className="percentage">- {exercise.percentage} points</span></>
                                            :
                                            <> {exercise.exercise.exerciseName}</>}
                                    </Card.Title>
                                </Col>
                            </Row>

                            <Row>
                                <Col>

                                    {isEditable ? (
                                        <>
                                            <Row className="exercise-fields">
                                                <Col xs={3}>

                                                    <input
                                                        type="number"
                                                        name="series"
                                                        value={exercise.series}
                                                        onChange={(event) => onExerciseFieldChange({ exerciseId: exercise._id, field: 'series', value: event.target.value })}
                                                        className="transparent-input workout-input"
                                                        placeholder="series:"
                                                    />

                                                </Col>
                                                <Col xs={3}>

                                                    <input
                                                        type="number"
                                                        name="reps"
                                                        value={exercise.reps}
                                                        onChange={(event) => onExerciseFieldChange({ exerciseId: exercise._id, field: 'reps', value: event.target.value })}
                                                        className="transparent-input workout-input"
                                                        placeholder="reps:"
                                                    />

                                                </Col>
                                                <Col xs={3}>

                                                    <input
                                                        type="number"
                                                        name="time"
                                                        value={exercise.time}
                                                        onChange={(event) => onExerciseFieldChange({ exerciseId: exercise._id, field: 'time', value: event.target.value })}
                                                        className="transparent-input workout-input"
                                                        placeholder="time:"
                                                    />

                                                </Col>
                                                <Col xs={3}>

                                                    <input
                                                        type="number"
                                                        name="weight"
                                                        value={exercise.weight}
                                                        onChange={(event) => onExerciseFieldChange({ exerciseId: exercise._id, field: 'weight', value: event.target.value })}
                                                        className="transparent-input workout-input"
                                                        placeholder="weight:"
                                                    />

                                                </Col>
                                            </Row>
                                        </>
                                    ) : (
                                        <>
                                            <Row>
                                                <Col xs={3}>
                                                    <Card.Text>Series: {exercise.series}</Card.Text>
                                                </Col>
                                                <Col xs={3}>
                                                    <Card.Text>Reps: {exercise.reps}</Card.Text>

                                                </Col>
                                                <Col xs={3}>
                                                    <Card.Text>Time: {exercise.time}</Card.Text>

                                                </Col>
                                                <Col xs={3}>
                                                    <Card.Text>Weight: {exercise.weight}</Card.Text>
                                                </Col>
                                            </Row>
                                        </>
                                    )}

                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body >
            </Card >
        </div>
    )
}

export default ExerciseCardUser