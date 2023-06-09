import { Card } from "react-bootstrap"
import './ExerciseCard.css'
import { Link } from "react-router-dom"

const ExerciseCard = ({ exerciseName, imageUrl, _id }) => {
    return (

        <Card className="mb-3 ExercisesCard">
            <Card.Img variant="top" className="ExerciseCardImage" src={imageUrl} />
            <Card.Body>
                <h1 className="ExerciseCardH1">{exerciseName}</h1>
                <div className="d-grid">
                    <Link to={`/exercises/${_id}`} className="btn btn-dark btn-sm">Details</Link>
                </div>
            </Card.Body>
        </Card>
    )
}
export default ExerciseCard