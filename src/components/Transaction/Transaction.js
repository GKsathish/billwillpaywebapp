import React, { useState, useEffect } from "react";
import Invoice from "../Invoice/Invoice";

const Transaction = () => {
    var url = window.location.origin + "/";
    const [invoice, setInvoice] = useState('');

    const payment_status = async () => {

        const response = await fetch("https://dev.billwill.in/api/transaction-status?id=" + document.location.href.split('/').pop(), {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + window.sessionStorage.getItem("key"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const finaldata = await response.json()
        console.log(finaldata)
        if (finaldata.status === 'SUCCESS') {
            window.sessionStorage.setItem("success", 'Recharge Successfully')
            localStorage.removeItem('countdown');
            localStorage.removeItem('isPaused');
            setInvoice(finaldata.invoice);

        } else {
            window.sessionStorage.setItem("danger", 'Recharge Fail');
            window.sessionStorage.removeItem('number');
            window.sessionStorage.removeItem('key');
            window.location.href = url;
        }
    }


    useEffect(() => {
        payment_status();
    })
    if (invoice !== '') {
        return <Invoice invoice={invoice} />
    }

    return (
        <></>
    )
}

export default Transaction