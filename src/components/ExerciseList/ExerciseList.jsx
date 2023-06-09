import { Col } from "react-bootstrap"
import ExerciseCard from "../ExerciseCard/ExerciseCard"

const ExerciseList = ({ exercises }) => {

    return (
        exercises.map(elm => {
            return (
                <Col md={{ span: 3 }} key={elm._id}>
                    <ExerciseCard {...elm} />
                </Col>
            )
        })
    )
}
export default ExerciseList