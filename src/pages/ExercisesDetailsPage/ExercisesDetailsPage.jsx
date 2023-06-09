import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import exercisesService from "../../services/exercises.services"
import { Button, Col, Container, Row, Modal } from "react-bootstrap"
import Loader from '../../components/Loader/Loader'
import { AuthContext } from "../../contexts/auth.context"

const WorkoutDetailsPage = () => {

    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const [exercise, setExercise] = useState()
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        loadExercise()
    }, [])

    const loadExercise = () => {
        exercisesService
            .getOneExercise(id)
            .then(({ data }) => setExercise(data))
            .catch(err => console.log(err))
    }

    const handleDelete = event => {
        event.preventDefault()

        exercisesService
            .deleteExercise(exercise._id)
            .then(() => { navigate('/exercises') })
            .catch(err => console.log(err))
    }

    return (
        <Container>
            {
                !exercise
                    ?
                    <Loader />
                    :
                    <>
                        <h1>{exercise.exerciseName}'s details</h1>
                        <hr />

                        <Row>
                            <Col md={{ span: 4 }}>
                                <img src={exercise.imageUrl} style={{ width: '100%' }} alt="exercise" />
                            </Col>
                            <Col md={{ span: 6 }}>
                                <h3>Description</h3>
                                <p>{exercise.description}</p>
                                <div>
                                    <ul>Muscle Group:

                                        {
                                            exercise.muscleGroup.map((group, index) => <li key={index}> {group}</li>)
                                        }

                                    </ul>
                                    <ul>Type: <li>{exercise.type}</li></ul>
                                    <ul>Type: <li>{exercise.equipment}</li></ul>
                                </div>
                                <hr />
                            </Col>
                            <Col className="topNumber">
                                <h2 className="topNumber">{exercise.percentage}</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 4, offset: 8 }}>
                                <Link to="/exercises">
                                    <Button variant="dark">Back</Button>
                                </Link>
                                {

                                    user.role === 'GM'
                                        ?
                                        <>
                                            <Link to={`/exercises/edit/${exercise._id}`}>
                                                <Button variant="dark">Edit</Button>
                                            </Link>
                                            <Button variant="dark" onClick={() => setShowModal(true)}>Delete</Button>
                                        </>

                                        :
                                        <></>
                                }
                            </Col>
                        </Row>
                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Estas seguro?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Link to={`/exercises/delete/${exercise._id}`}>
                                    <Button variant="dark" onClick={handleDelete}>Delete</Button>
                                </Link>
                            </Modal.Body>
                        </Modal>
                    </>
            }

        </Container >
    )
}

export default WorkoutDetailsPage