import React, { useEffect, useState } from "react";
import './DTH.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Login from "../Login/Login";
import Counter from "../Other/Counter";
import Dropdown from 'react-bootstrap/Dropdown';
import Notification from "../Notification/Notification";

const DTH = (props) => {
    const [note, setnote] = useState();
    const { isPaused, setIsPaused } = props;
    var url = window.location.origin + "/";
    const [operator, setOperator] = useState('');
    const [operatorcode, setOperatorcode] = useState('');
    const [subscriberID, setSubscriberID] = useState('');

    const [data, setData] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [price, setPrice] = useState('');
    const [inputdisabled, setInputdisabled] = useState();



    useEffect(() => {
        if (window.sessionStorage.getItem("number") && window.sessionStorage.getItem("key")) {
            fetchData();
        }
    }, [])


    if (!window.sessionStorage.getItem("number") && !window.sessionStorage.getItem("key")) {
        return <Login />
    }


    const fetchData = async () => {
        const response = await fetch("https://dev.billwill.in/api/fetch-dth-operators", {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + window.sessionStorage.getItem("key"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const finaldata = await response.json()
        if (finaldata.status === 'SUCCESS') {
            setOperator(finaldata);
        } else {
            window.sessionStorage.removeItem('number');
            window.sessionStorage.removeItem('key');
            window.location.href = url;
        }
    }

    if (!operator) {
        return
    }

    const handelselect = (e) => {
        setOperatorcode(e)
        handeloperator(e)
        setPrice('');
    }

    const handeloperator = async (code) => {
        const response = await fetch("https://dev.billwill.in/billwill-api/fetch-dth-subscriber-details?operatorCode=" + code + "&subscriberNumber=" + window.sessionStorage.getItem("number"), {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + window.sessionStorage.getItem("key"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const finaldata = await response.json()
        if (finaldata.status === 'SUCCESS') {
            setData(finaldata)
            setInputdisabled('disabled')
        } else {
        }
    }

    const handelpayment = async () => {

        if (price > 199 && subscriberID.length > 4) {
            setIsPaused(true)
            const apidata = {
                "operatorCode": operatorcode,
                "subscriberNumber": subscriberID,
                "amount": price,
                "mobile": window.sessionStorage.getItem("number")

            }
            const response = await fetch("https://dev.billwill.in/billwill-api/dth-recharge", {
                method: 'POST',
                headers: {
                    "Authorization": "Bearer " + window.sessionStorage.getItem("key"),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(apidata)
            })
            const finaldata = await response.json()
            console.log(finaldata)
            if (finaldata.status === 'PROCESSING') {
                var req_body = { "id": finaldata.pgId };
                postData('https://dev.billwill.in/pg/paymentprocess', req_body, 'post')
            } else {
                // window.sessionStorage.setItem("danger", 'Somthing Went Worng!');
                // window.sessionStorage.removeItem('number');
                // window.sessionStorage.removeItem('key');
                // window.location.href = url;
            }
        } else {
            setnote(<Notification status="Danger" message="Minimum Amount Rs.200/- (or) Check Subscriber Id" showstatus={setnote} />);
        }
    }


    function postData(path, params, method) {

        // Create form 
        const hidden_form = document.createElement('form');

        // Set method to post by default 
        hidden_form.method = method || 'post';

        // Set path 
        hidden_form.action = path;

        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const hidden_input = document.createElement
                    ('input');
                hidden_input.type = 'hidden';
                hidden_input.name = key;
                hidden_input.value = params[key];

                hidden_form.appendChild(hidden_input);
            }
        }

        document.body.appendChild(hidden_form);
        hidden_form.submit();
    }


    const { operators, offer_title, offer_desc } = operator;
    const { operatorCode, operatorName, subscriberNumber, dthPlans } = data;

    return (
        <>
            {note}
            <div className="main">
                <div className="container ">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 d-flex align-items-center justify-content-center">
                            <div className="my-form w-100 m-1 p-3">
                                <div className="d-flex justify-content-between align-items-start ">
                                    <div>
                                        <h4 className="">DTH</h4>
                                    </div>
                                    <div className="counter text-end">
                                        <p>Time Remaining</p>
                                        <div>
                                            <Counter setIsPaused={setIsPaused} isPaused={isPaused} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group  mt-3 mb-3 operator">

                                    <Dropdown >
                                        <Dropdown.Toggle variant="success" className="w-100" id="dropdown-basic">
                                            Select Operators
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {operators.map((op, index) => {
                                                return <Dropdown.Item key={index} onClick={() => handelselect(op.operatorCode)}><img src={op.operatorIcon} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{op.operatorName}</Dropdown.Item>
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                {(data && dthPlans.length > 0) &&
                                    <>
                                        <div className="form-group  mt-3 mb-3">
                                            <label>Operator</label>
                                            <input className="form-control" value={operatorName} disabled={inputdisabled} readOnly={true} />
                                        </div>
                                        <div className="form-group  mt-3 mb-3">
                                            <label>Subscriber Number</label>
                                            <input className="form-control" value={subscriberNumber} disabled={inputdisabled} readOnly={true} />
                                        </div>
                                        <div className="form-group  mt-3 mb-3">
                                            <label>Subscriber ID</label>
                                            <input className="form-control" value={subscriberID} onInput={e => setSubscriberID(e.target.value)} type="number" required />
                                        </div>
                                        <div className="form-group  mt-3 mb-3">
                                            <label>Amount</label>
                                            <input className="form-control" value={price} type="number" onInput={e => setPrice(e.target.value)} required />
                                            <span><a onClick={() => setModalShow(true)} >Browse a Plan</a></span>
                                        </div>
                                    </>
                                }
                                <div className="text-center">
                                    <Button variant="success" onClick={() => handelpayment()}>Proceed to Recharge</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-1">
                        <div className="col-md-6 offset-md-3 count-user mt-5">
                            <div className="row d-flex align-items-center justify-content-center ">
                                <div className="col-8 text-center">
                                    <h1>{offer_title}</h1>
                                    <span>{offer_desc}</span><br></br><br></br>
                                    <Button variant="danger" >HURRY!</Button>
                                </div>
                                <div className="col-4">
                                    <img src={`${url}images/recharge_banner.gif`} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {modalShow == true &&
                    <DTHModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        amount={setPrice}
                        setIsPaused={setIsPaused}
                        isPaused={isPaused}
                        plansdata={dthPlans}
                    />
                }
            </div >
        </>
    )
}

const DTHModal = (props) => {

    const [plan, setPlan] = useState([]);

    useEffect(() => {
        setPlan(props.plansdata);
        if (plan.length > 0) {
            return
        } else {
        }
    }, [])

    useEffect(() => {
        if (props.show == true) {
            props.setIsPaused(true);
        } else {
            props.setIsPaused(false);
        }
    }, [props.show])


    const setplans = (f, g) => {
        props.amount(f);
        props.onHide(true);
    }


    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Browse Plans
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="plans">
                    < Tabs
                        defaultActiveKey="Billing Details"
                        id="justify-tab-example"
                        className="mb-3"
                        justify
                    >
                        {plan.map((value, index) => {
                            return <Tab eventKey={value.service} title={value.service} key={index}> {
                                value.plans.map((inner, index2) => {
                                    return (
                                        <div className="plan-type" key={index2}>
                                            <div className="row align-items-center">
                                                <div className="col-8">
                                                    <div className="title">Price : Rs. {inner.price}/-</div>
                                                </div>
                                                <div className="col-4 ">
                                                    <Button variant="outline-success" onClick={() => setplans(inner.price)}>Rs. {inner.price}</Button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            } </Tab>
                        })
                        }
                    </Tabs>
                </div>
            </Modal.Body>
        </Modal >
    )
}

export default DTH;