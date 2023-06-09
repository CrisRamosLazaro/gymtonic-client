import { Container, Row } from "react-bootstrap"
import UsersList from "../../components/UsersList/UsersList"
import { useEffect, useState } from "react"
import userService from "../../services/user.services"
import Loader from "../../components/Loader/Loader"

const AdminPage = () => {

    const [users, setUsers] = useState()
    useEffect(() => {
        loadUsers()
    }, [])
    const loadUsers = () => {
        userService
            .getAllUsers()
            .then(({ data }) => setUsers(data))
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <h1>Users</h1>
            <hr />
            <Row>{
                !users
                    ?
                    <Loader />
                    :
                    <UsersList users={users} updateList={loadUsers} />
            }
            </Row>
        </Container>
    )
}
export default AdminPage