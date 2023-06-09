import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import userService from "../../services/user.services"
import Loader from "../../components/Loader/Loader"
import { Button, Form, Row, Col } from "react-bootstrap"
import uploadServices from "../../services/upload.services"

const OwnUserPage = () => {
    const { id } = useParams()
    const [userData, setUserData] = useState({
        email: '',
        username: '',
        firsName: '',
        lastName: '',
        avatar: ''
    })

    const [loadingImage, setLoadingImage] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = () => {
        userService
            .getOneUser(id)
            .then(res => setUserData(res.data))
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value, name } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleFileUpload = e => {
        setLoadingImage(true)
        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setUserData({ ...userData, avatar: res.data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })
    }

    const handleSubmit = e => {
        e.preventDefault()

        userService
            .editOneUser(id, userData)
            .then(() => navigate('/profile'))
            .catch(err => console.log(err))
    }
    if (!userData) {
        return <Loader />
    }
    return (

        <Form onSubmit={handleSubmit} className="editForm">
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" value={userData.firstName} onChange={handleInputChange} name="firstName" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" value={userData.lastName} onChange={handleInputChange} name="lastName" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={userData.username} onChange={handleInputChange} name="username" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="avatar">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control type="file" onChange={handleFileUpload} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={userData.email} onChange={handleInputChange} name="email" />
                    </Form.Group>
                </Col>
            </Row>
            <div className="c-grid">
                <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Loading image...' : 'Update'}</Button>
            </div>

        </Form>
    )



}
export default OwnUserPage