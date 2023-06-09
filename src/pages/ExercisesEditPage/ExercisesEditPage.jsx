import exercisesService from "../../services/exercises.services"
import { useEffect, useState } from "react"
import { Col, Row, Form, Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import React from 'react'
import Loader from "../../components/Loader/Loader"
import { MUSCLE_GROUPS_ARR, NEEDED_EQUIPMENT_ARR, WORKOUT_TYPES_ARR } from "../../consts/exercises-consts"

const ExercisesEditPage = () => {
    const { id } = useParams()
    const [exerciseData, setExerciseData] = useState({
        exerciseName: '',
        percentage: '',
        description: '',
        imageUrl: '',
        muscleGroup: [],
        type: '',
        equipment: ''
    })

    const loadExerciseData = () => {
        exercisesService
            .getOneExercise(id)
            .then(res => setExerciseData(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadExerciseData()
    }, [])

    const navigate = useNavigate()

    const handleInputChange = event => {
        const { name, value } = event.target
        setExerciseData({ ...exerciseData, [name]: value })
    }

    const handleMuscleGroupChange = event => {
        const selectedMuscleGroup = Array.from(event.target.selectedOptions, option => option.value)
        setExerciseData({ ...exerciseData, muscleGroup: selectedMuscleGroup })
    }

    const handleSubmit = event => {
        event.preventDefault()

        exercisesService
            .editOneExercise(exerciseData._id, exerciseData)
            .then(() => { navigate(`/exercises/${exerciseData._id}`) })
            .catch(err => console.log(err))
    }

    if (!exerciseData) {
        return <Loader />
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="exerciseName">
                        <Form.Label>Exercise Name</Form.Label>
                        <Form.Control type="text" value={exerciseData.exerciseName} onChange={handleInputChange} name="exerciseName" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="percentage">
                        <Form.Label>Percentage</Form.Label>
                        <Form.Control type="text" value={exerciseData.percentage} onChange={handleInputChange} name="percentage" />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={exerciseData.description} onChange={handleInputChange} name="description" />
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="muscleGroup">
                        <Form.Label>Muscle Groups</Form.Label>
                        <Form.Select multiple value={exerciseData.muscleGroup} onChange={handleMuscleGroupChange} name='muscleGroup'>
                            <option>Open this select menu</option>
                            {
                                MUSCLE_GROUPS_ARR.map(elm => {
                                    return <option value={elm}>{elm}</option>
                                })
                            }
                        </Form.Select>
                    </Form.Group>

                </Col>

                <Col>
                    <Form.Group className="mb-3" controlId="type">
                        <Form.Label>Type of Workout</Form.Label>
                        <Form.Select type="text" value={exerciseData.type} onChange={handleInputChange} name="type">
                            <option>Open this select menu</option>
                            {
                                WORKOUT_TYPES_ARR.map(elm => {
                                    return <option value={elm}>{elm}</option>
                                })
                            }
                        </Form.Select>
                    </Form.Group>

                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="equipment">
                        <Form.Label>Equipment Needed</Form.Label>
                        <Form.Select type="text" value={exerciseData.equipment} onChange={handleInputChange} name="equipment">
                            <option>Open this select menu</option>
                            {
                                NEEDED_EQUIPMENT_ARR.map(elm => {
                                    return <option value={elm}>{elm}</option>
                                })
                            }
                        </Form.Select>
                    </Form.Group>

                </Col>

                <Col>
                    <Form.Group className="mb-3" controlId="imageUrl">
                        <Form.Label>Imagen (URL)</Form.Label>
                        <Form.Control type="text" value={exerciseData.imageUrl} onChange={handleInputChange} name="imageUrl" />
                    </Form.Group>
                </Col>

            </Row>

            <div className="d-grid mt-3">
                <Button variant="dark" type="submit">Update Exercise</Button>
            </div>
        </Form>
    )
}
export default ExercisesEditPage