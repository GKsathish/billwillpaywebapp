import React, { useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
const Notification = (props) => {
    const { status, message } = props;

    useEffect(() => {
        setTimeout(function () {
            props.showstatus()
        }, 3000);
    }, [])

    return (
        <div id="notification">
            <ToastContainer position="bottom-end" className="p-3 position-fixed" style={{ zIndex: 9999 }}>
                <Toast
                    className="d-inline-block m-1" bg={status.toLowerCase()}
                >
                    <Toast.Header>
                        <strong className="me-auto">Alert</strong>
                    </Toast.Header>
                    <Toast.Body className={status} style={{ color: 'white' }}>
                        {message}
                    </Toast.Body>
                </Toast>
            </ToastContainer >
        </div>
    )
}

export default Notification;