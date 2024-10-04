import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Login from "../Login/Login";
import Counter from "../Other/Counter";
import './Recharge.css';

const Recharge = (props) => {
    const { isPaused, setIsPaused } = props;
    var url = window.location.origin + "/";
    const [data, setData] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [plan, setPlan] = useState('');
    const [price, setPrice] = useState('');
    const [des, setDes] = useState('');
    const [inputdisabled, setInputdisabled] = useState('');
    const fetchData = async () => {
        const response = await fetch("https://dev.billwill.in/billwill-api/fetch-operator?mobile=" + window.sessionStorage.getItem("number"), {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + window.sessionStorage.getItem("key"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const finaldata = await response.json();
        if (finaldata.status === 'SUCCESS') {
            setData(finaldata);
            setInputdisabled('disabled');
        } else {
            window.sessionStorage.removeItem('number');
            window.sessionStorage.removeItem('key');
            window.location.href = url;
        }
    }

    useEffect(() => {
        if (window.sessionStorage.getItem("number") && window.sessionStorage.getItem("key")) {
            fetchData();
        }
    }, [])


    if (!window.sessionStorage.getItem("number") && !window.sessionStorage.getItem("key")) {
        return <Login />
    }

    if (!data) {
        return
    }

    const { mobile, operatorCode, circleCode, operatorName, offer_title, offer_desc } = data;

    const handelpayment = async (mobile) => {
        setIsPaused(true)
        const apidata = {
            "mobile": mobile,
            "productCode": plan
        }
        const response = await fetch("https://dev.billwill.in/billwill-api/recharge", {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + window.sessionStorage.getItem("key"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(apidata)
        })
        const finaldata = await response.json()
        if (finaldata.status === 'PROCESSING') {
            var req_body = { "id": finaldata.pgId };
            postData('https://dev.billwill.in/pg/paymentprocess', req_body, 'post')
        } else {
            window.sessionStorage.setItem("danger", 'Somthing Went Worng!');
            window.sessionStorage.removeItem('number');
            window.sessionStorage.removeItem('key');
            window.location.href = url;
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


    return (
        <div className="main" id="main">
            <div className="container ">
                <div className="row">
                    <div className="col-md-6 offset-md-3 d-flex align-items-center justify-content-center">
                        <div className="my-form w-100 m-1 p-3">
                            <div className="d-flex justify-content-between align-items-start ">
                                <div>
                                    <h4 className="">Recharge</h4>
                                </div>
                                <div className="counter text-end">
                                    <p>Time Remaining</p>
                                    <div>
                                        <Counter setIsPaused={setIsPaused} isPaused={isPaused} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group  mt-3 mb-3">
                                <label>Mobile Number</label>
                                <input className="form-control" type="number" value={mobile} disabled={inputdisabled} readOnly={true} />
                            </div>
                            <div className="form-group  mt-3 mb-3 ">
                                <label>Operator</label>
                                <input className="form-control" type="text" value={operatorName} disabled={inputdisabled} readOnly={true} />
                            </div>
                            <div className="form-group  mt-3 mb-3">
                                <label>Circle</label>
                                <input className="form-control" type="text" value={circleCode} disabled={inputdisabled} readOnly={true} />
                            </div>
                            <div className="form-group  mt-3 mb-3">
                                <label>Amount</label>
                                <input className="form-control" type="text" value={price} readOnly={true} />
                                <span><a onClick={() => setModalShow(true)} >Browse a Plan</a></span>
                            </div>
                            <div className="form-group  mt-3 mb-3">
                                {des}
                            </div>
                            <div className="text-center">
                                {plan != '' ? (
                                    <Button variant="success" onClick={() => handelpayment(mobile)}>Proceed to Recharge</Button>
                                ) : (
                                    <Button variant="danger" >Select the Plan</Button>
                                )}
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
            <RechargeModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                handelplan={setPlan}
                description={setDes}
                amount={setPrice}
                setIsPaused={setIsPaused}
                isPaused={isPaused}
                operatorCode={operatorCode}
                circleCode={circleCode}
            />
        </div >
    )
}

const RechargeModal = (props) => {
    var url = window.location.origin + "/";
    const [plans, setPlans] = useState();
    const fetchData = async () => {
        const response2 = await fetch("https://dev.billwill.in/api/recharge-plans?operatorCode=" + props.operatorCode + '&circleCode=' + props.circleCode, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + window.sessionStorage.getItem("key"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const finaldata2 = await response2.json();
        if (finaldata2.status === 'SUCCESS') {
            setPlans(finaldata2.mobilePlans);
        } else {
            window.sessionStorage.setItem("danger", 'Somting Worng!');
            window.sessionStorage.removeItem('number');
            window.sessionStorage.removeItem('key');
            window.location.href = url;
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (props.show == true) {
            props.setIsPaused(true);
        } else {
            props.setIsPaused(false);
        }
    }, [props.show])

    if (!plans) {
        return
    }

    const setplan = (e, f, g) => {
        props.handelplan(e);
        props.amount("Rs. " + f);
        props.description(g);
        props.onHide(true);
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter" >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Browse Plans
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="plans">
                    < Tabs
                        defaultActiveKey="All Plans"
                        id="justify-tab-example"
                        className="mb-3"
                        justify
                    >
                        {
                            plans.map((value, index) => {
                                return <Tab eventKey={value.service} title={value.service} key={index}> {
                                    value.plans.map((inner, index2) => {
                                        return (
                                            <div className="plan-type" key={index2}>
                                                <div className="row align-items-center">
                                                    <div className="col-8">
                                                        <div className="title">Plan : {inner.productName}</div>
                                                        <div className="description">Info : {inner.description}</div>
                                                        <div className="validity">Validity : {inner.validity}</div>
                                                    </div>
                                                    <div className="col-4 ">
                                                        <Button variant="outline-success" onClick={() => setplan(inner.productCode, inner.price, inner.description)}>Rs. {inner.price}</Button>
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
    );
}

export default Recharge;