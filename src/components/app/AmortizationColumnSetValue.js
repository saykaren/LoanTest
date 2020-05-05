import React from "react";

const AmortizationColumnSetValue = ({title, copyValue, arr}) => {
    return (
        <div className="tableCell">
            {title}
            {arr.map((value, index) => (
                <div className="cellDetails" key={index}>
                    {copyValue}
                </div>
            ))}
        </div>
    );
};

export default AmortizationColumnSetValue;