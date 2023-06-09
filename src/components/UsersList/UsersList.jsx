import { Col } from "react-bootstrap"
import UserCard from "../UserCard/UserCard"

const UsersList = ({ users, updateList }) => {
    return (
        users.map(elm => {
            return (
                <Col md={{ span: 3 }} key={elm._id}>
                    <UserCard {...elm} updateList={updateList} />
                </Col>
            )
        })
    )
}
export default UsersList