import { Spinner } from "react-bootstrap"

const Loader = () => {

    return (
        <div className="container">
            <div className="row">

                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        </div>
    )
}

export default Loader