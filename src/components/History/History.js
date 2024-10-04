import React, { useEffect, useState } from "react";
import './History.css';
import Login from "../Login/Login";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const History = () => {
    const [note, setnote] = useState();
    const [Moddata, setModdata] = useState();

    var url = window.location.origin + "/";
    const [data, setData] = useState('');
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        if (window.sessionStorage.getItem("number") && window.sessionStorage.getItem("key")) {
            fetchData();
        }
    }, [])


    if (!window.sessionStorage.getItem("number") && !window.sessionStorage.getItem("key")) {
        return <Login />
    }


    const fetchData = async () => {
        const response = await fetch("https://dev.billwill.in/api/transactioninfo?msisdn=" + window.sessionStorage.getItem('number'), {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + window.sessionStorage.getItem("key"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const finaldata = await response.json()
        if (finaldata.message === 'SUCCESS') {
            setData(finaldata.data);
        } else {
            window.sessionStorage.removeItem('number');
            window.sessionStorage.removeItem('key');
            window.location.href = url;
        }

    }


    const modalData = (data) => {
        setModalShow(true)
        setModdata(data)
    }

    return (
        <>
            {note}
            <div className="main">
                <div className="container ">

                    <div className="row m-1">
                        <div className="col-md-4 offset-md-4 col-xs-8 offset-xs-2 mt-2 history">
                            <div className="text-center">
                                <h4 className="">History</h4>
                            </div>
                            {data.length > 0 && data.map((value, index) => {
                                return value.transactionType == "RECHARGE" ? (
                                    <div className="row  p-3" key={index} onClick={() => modalData(value)}>
                                        <div className="col-md-8">Recharge of {value.operator} Mobile<br></br>{value.subscriberNumber}
                                            <div style={{ fontSize: '12px', fontWeight: 400 }}>
                                                Paid On {value.date}
                                            </div>
                                        </div>
                                        <div className="col-md-4 text-end"><strong> Rs. {value.amount}</strong><br></br><span style={{ fontSize: '12px', fontWeight: 400 }}>{value.paymentStatus ? value.paymentStatus : 'Fail'}</span></div>
                                    </div>
                                ) : <div className="row p-3" key={index} onClick={() => modalData(value)}>
                                    <div className="col-md-8">Bill Payment For {`${value.operator} ${value.transactionType}`} <br></br>{value.subscriberNumber}
                                        <div style={{ fontSize: '12px', fontWeight: 400 }}>
                                            Paid On {value.date}
                                        </div>
                                    </div>
                                    <div className="col-md-4 text-end"><strong> Rs. {value.amount}</strong><br></br><span style={{ fontSize: '12px', fontWeight: 400 }}>{value.paymentStatus ? value.paymentStatus : 'Fail'}</span></div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div >
            {modalShow == true &&
                <InvoiceModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    info={Moddata}
                />
            }
        </>
    )
}



const InvoiceModal = (props) => {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div className=" text-start">

                        Transaction Id : {props.info.transactionId}<br></br>
                        Payment Type : {props.info.paymentType ? props.info.paymentType: 'Null'} <br></br>
                        Payment Id : {props.info.paymentId ? props.info.paymentId : 'Null'}
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container ">

                    <div className="row m-1">
                        Amount
                        <h2 className="m-0 p-0">
                            Rs. {props.info.amount}
                        </h2>
                        <hr className=" mt-3"></hr>
                        For<br></br>
                        <h4 className="m-0 p-0">Recharge of {props.info.operator} Mobile<br></br>{props.info.subscriberNumber}
                            <div style={{ fontSize: '12px', fontWeight: 400 }}>
                                Paid On {props.info.date}<br></br><br></br>

                            </div>
                        </h4>
                        <Link className="btn btn-outline-success mb-3" to={props.info.invoice}>Download Invoice</Link>
                    </div>
                </div>
            </Modal.Body>
        </Modal >
    )
}

export default History;