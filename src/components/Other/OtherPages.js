import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import parse from 'html-react-parser';

const OtherPages = () => {
    const [data, setData] = useState('');
    const location = useLocation();
    var url = window.location.origin + "/";

    const handelData = async () => {
        const response = await fetch("https://dev.billwill.in/api/html" + location.pathname, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const finaldata = await response.json()
        console.log(finaldata)

        if (finaldata.status === 'success') {
            setData(finaldata.information)
        } else {
            window.location.href = url;
        }
    }

    useEffect(() => {
        handelData();
    }, [location])

    return (
        <>
            <div className="main">
                <div className="container ">
                    <div className="row">
                        <div className="col-md-4 offset-md-4 col-xs-8 offset-xs-2 mt-5 mb-5 text-center">
                            {parse(data)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default OtherPages;