import React from 'react'
import './Loader.Module.css'

const Loader = () => {
    return (
        <div className='flex flex-1 justify-center items-center z-20' >
            <div className="loader">
                <div className="box box-1">
                    <div className="side-left"></div>
                    <div className="side-right"></div>
                    <div className="side-top"></div>
                </div>
                <div className="box box-2">
                    <div className="side-left"></div>
                    <div className="side-right"></div>
                    <div className="side-top"></div>
                </div>
                <div className="box box-3">
                    <div className="side-left"></div>
                    <div className="side-right"></div>
                    <div className="side-top"></div>
                </div>
                <div className="box box-4">
                    <div className="side-left"></div>
                    <div className="side-right"></div>
                    <div className="side-top"></div>
                </div>
            </div>
        </div>
    )
}

export default Loader

