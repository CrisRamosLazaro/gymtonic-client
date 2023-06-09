import exercisesService from "../../services/exercises.services"
import { useState } from "react"
import { Col, Row, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import React from 'react'
import FormError from "../FormError/FormError"
import { MUSCLE_GROUPS_ARR, NEEDED_EQUIPMENT_ARR, WORKOUT_TYPES_ARR } from "../../consts/exercises-consts"

const NewExerciseForm = () => {

    const [exerciseData, setExerciseData] = useState({
        exerciseName: '',
        percentage: '',
        description: '',
        imageUrl: '',
        muscleGroup: [],
        type: '',
        equipment: ''
    })

    const [errors, setErrors] = useState([])

    const handleInputChange = event => {
        const { name, value } = event.target
        setExerciseData({ ...exerciseData, [name]: value })
    }

    const handleMuscleGroupChange = event => {
        const selectedMuscleGroup = Array.from(event.target.selectedOptions, option => option.value)
        setExerciseData({ ...exerciseData, muscleGroup: selectedMuscleGroup })
    }

    const navigate = useNavigate()

    const handleSubmit = event => {
        event.preventDefault()

        exercisesService
            .saveExercise(exerciseData)
            .then(() => navigate('/exercises'))
            .catch(err => setErrors(err.response.data.errorMessages))
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
                            <option>Pick One</option>
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
                            <option>Pick One</option>
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
                            <option>Pick One</option>
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
                        <Form.Label>Image (URL)</Form.Label>
                        <Form.Control type="text" value={exerciseData.imageUrl} onChange={handleInputChange} name="imageUrl" />
                    </Form.Group>
                </Col>

            </Row>

            <div className="d-grid mt-3">
                <Button variant="dark" type="submit">Create Exercise</Button>
            </div>
            {errors.length > 0 && <FormError> {errors.map((elm, index) => (<p key={index}>{elm}</p>))}</FormError>}
        </Form>
    )
}
export default NewExerciseForm