import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { saveAs } from 'file-saver'

const Invoice = (props) => {
    var url = window.location.origin + "/";
    const { invoice } = props;
    const downloadImage = () => {
        saveAs(invoice, 'invoice.jpg')
        window.location.href = url;
    }
    useEffect(() => {
        localStorage.removeItem('countdown');
        localStorage.removeItem('isPaused');
        window.sessionStorage.removeItem('number')
        window.sessionStorage.removeItem('key')
        setTimeout(() => {
            window.location.href = url;
        }, 100000)
    })

    return (
        <div className="main">
            <div className="container ">
                <div className="row">
                    <div className="col-md-6 offset-md-3 align-items-center justify-content-center mb-5">
                        <div className='text-center'>
                            <img className="w-100" src={invoice} />
                        </div>
                        <div className='d-flex align-items-center justify-content-between'>
                            <Button onClick={downloadImage} className='mt-3' variant="danger" >Download Invoice!</Button>
                            <a href={url}><Button className='mt-3' variant="success" >Go to Home</Button></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Invoice;