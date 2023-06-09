import { useContext, useEffect, useState } from "react"
import { AuthContext } from './../../contexts/auth.context'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import userService from "../../services/user.services"
import { Link, useNavigate } from "react-router-dom"
import { ThemeContext } from '../../contexts/theme.context'

import '../ProfilePage/ProfilePage.css'

const ProfilePage = () => {

    const { user, logout } = useContext(AuthContext)
    const [userData, setUserData] = useState({})
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    const { theme, switchTheme } = useContext(ThemeContext)
    const variant = theme === 'light' ? 'dark' : 'light'

    const loadUser = () => {
        userService
            .getOneUser(user._id)
            .then(data => setUserData(data.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadUser()
    }, [])
    console.log(user._id)
    const handleDelete = event => {
        event.preventDefault()

        userService
            .deleteOneUser(user._id)
            .then(() => {
                logout()
                navigate('/login')
            })
            .catch(err => console.log(err))
    }

    return (
        <Container className='profilePageContainer'>
            <h1 className="profilePageH1">Rise and shine, {userData.username}!</h1>
            <hr className="profilePageHr" />
            <Row className="profilePageRow">
                <Col md={4} className="profilePageCol">
                    <img src={userData.avatar} alt={userData.firstName} className="profile-image" />
                </Col>
                <Col md={{ span: 3 }} className="profileDetails">
                    <h2>{userData.firstName} {userData.lastName}</h2>
                    <h2>{userData.email}</h2>
                    <h3>{userData.username}</h3>
                </Col>
            </Row>
            <Link to={`/profile/edit/${userData._id}`} className="btn btn-dark">Edit</Link>
            <Button variant="dark" onClick={() => setShowModal(true)}>Delete</Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Estás seguro?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="dark" onClick={handleDelete}>Delete</Button>
                </Modal.Body>
            </Modal>
        </Container>

    )
}

export default ProfilePage