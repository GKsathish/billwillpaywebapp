import React, { useEffect, useState } from "react";
import './HomePage.css'
import Login from "../Login/Login";
import { Link, redirect, useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button } from "react-bootstrap";

const HomePage = (props) => {
    var url = window.location.origin + "/";
    const navigate = useNavigate();
    // const [value, setValue] = useState('');
    const [data, setData] = useState('');

    // const handelSelect = (e) => {
    //     setValue(e.target.value);
    //     navigate('/' + e.target.value);
    // }


    const handelClick = (e) => {
        // setValue(e);
        navigate('/' + e);
    }

    useEffect(() => {
        if (props.loginpage === true) {
            return <Login />
        }

        fetchdata();
    }, [])

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const fetchdata = async () => {
        const response = await fetch("https://dev.billwill.in/api/offers", {
            method: 'GET'
        })
        const finaldata = await response.json()
        if (finaldata.status === 'SUCCESS') {
            setData(finaldata.offers);

        }
    }


    return (
        <>
            <div className="main text-center">
                <div className="container ">
                    <div className="row mt-5">
                        <h1>PAY <span style={{ color: 'red' }}>BILLS</span>
                        </h1>
                        <h2><span style={{ color: '#1f6d5c' }}>Earn</span> Cashback</h2>
                        {/* <div className="col-md-4 offset-md-4 col-xs-8 offset-xs-2 mt-3">
                            <select value={value} onChange={handelSelect}>
                                <option selected hidden>Select Service</option>
                                <option value="recharge"> Recharge</option>
                                <option value="dth">DTH</option>
                            </select>
                        </div> */}
                        <div className="col-md-4 offset-md-4 col-xs-8 offset-xs-2 mt-5 home">
                            <div className="row justify-content-center align-items-center" onClick={() => handelClick('recharge')}>
                                <div className="col-4">
                                    <img src={`${url}icons/recharge.webp`} className="home-icon" alt="recharge" width="100" height="100" />
                                </div>
                                <div className="col-6">
                                    <p className="text-start">Recharge</p>
                                </div>
                                <div className="col-2">
                                    <p>{`>`}</p>
                                </div>
                            </div>
                            <div className="row justify-content-center align-items-center" onClick={() => handelClick('dth')}>
                                <div className="col-4">
                                    <img src={`${url}icons/dth.webp`} className="home-icon" alt="dth" width="100" height="100" />
                                </div>
                                <div className="col-6">
                                    <p className="text-start">DTH</p>
                                </div>
                                <div className="col-2">
                                    <p>{`>`}</p>
                                </div>
                            </div>
                            <div className="row justify-content-center align-items-center" onClick={() => handelClick('entertainment')}>
                                <div className="col-4">
                                    <img src={`${url}icons/entertainment.webp`} className="home-icon" alt="dth" width="100" height="100" />
                                </div>
                                <div className="col-6">
                                    <p className="text-start">Entertainment</p>
                                </div>
                                <div className="col-2">
                                    <p>{`>`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="row p-0 mt-5 offer">
                        <div className="col-md-4 offset-md-4 col-xs-8 offset-xs-2">
                            <Button variant="outline-success" onClick={() => handelClick('history')}>Account Login</Button>

                        </div>
                    </div> */}
                    <div className="row p-0 mt-5 offer">
                        <div className="col-md-4 offset-md-4 col-xs-8 offset-xs-2">
                            <Carousel autoPlaySpeed={2500} infinite={true} autoPlay={true} showDots={true} arrows={false} responsive={responsive} className="p-0">
                                {data.length > 0 && data.map((value, index) => {
                                    return <div className="image" key={index}><Link to={`${url}${value.url}`} rel={value.url}> <img fetchpriority="high" src={value.offer_img} alt="Offers" width="100" height="100" aria-label={`offer${index}`} /></Link></div>
                                })}
                            </Carousel>
                        </div>
                    </div>

                </div >
            </div >
        </>
    )

}

export default HomePage;