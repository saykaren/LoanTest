import React from "react";

const AmortizationColumn = ({title, initialRow, arr}) => {
    return (
        <div className="tableCell">
            {title}
            <div className="cellDetails">{initialRow}</div>
            {arr.map((value, index) => (
                <div className="cellDetails" key={index}>
                    {value}
                </div>
            ))}
        </div>
    );
};

export default AmortizationColumn;