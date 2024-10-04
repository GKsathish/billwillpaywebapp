import React, { useState } from 'react';

const Entertainment = () => {
    var url = window.location.origin + "/";
    return (
        <>
            <div className="main">
                <div className="container ">
                    <div className="row">
                        <div className="col-md-4 offset-md-4 col-xs-8 offset-xs-2 mt-5">
                            <img src={`${url}images/entertainment-pack1.jpg`} alt="entertainment" className='w-100' />
                        </div>
                        <div className="col-md-4 offset-md-4 col-xs-8 offset-xs-2 mt-5">
                            <img src={`${url}images/entertainment-pack2.jpg`} alt="entertainment" className='w-100' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Entertainment;