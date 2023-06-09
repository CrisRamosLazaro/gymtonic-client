import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import userService from "../../services/user.services"
import { Col, Container, Row } from "react-bootstrap"
import Loader from "../../components/Loader/Loader"

const UserDetails = () => {
    const { id } = useParams()
    const [users, setUsers] = useState()
    useEffect(() => {
        loadUser()
    }, [])
    const loadUser = () => {
        userService
            .getOneUser(id)
            .then(({ data }) => setUsers(data))
            .catch(err => console.log(err))
    }
    return (
        <Container>
            {
                !users
                    ?
                    <Loader />
                    :
                    <>
                        <h1>{users.firstName} {users.lastName}'s details</h1>
                        <hr />

                        <Row>
                            <Col md={{ span: 4 }}>
                                <img src={users.avatar} style={{ width: '100%' }} alt="exercise" />
                            </Col>
                            <Col md={{ offset: 3 }}>
                                <h1>{users.username}</h1>
                            </Col>
                        </Row>
                    </>
            }
        </Container>
    )
}
export default UserDetails