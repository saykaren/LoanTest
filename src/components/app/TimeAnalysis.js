import React from "react";

const TimeAnalysis = ({title, arr})=> {
    return (
        <div className="title">
            {title} george
            <br />
            <div className="positiveLarge">
                {Math.floor(arr.length/12)} years
                {' '}
                {arr.length % 12} months
            </div>
            ({arr.length} months)
        </div>
    )
}

export default TimeAnalysis;