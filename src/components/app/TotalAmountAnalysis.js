import React from 'react';

const TotalAmountAnalysis = ({
                                 loan,
                                 principalWidth,
                                 intTotal,
                                 interestWidth,
                                 overalTotal,
                             }
) => {
  return (
    <div className="dataSection">
      <div className="amounts">
        Loan Amount: ${loan} ({parseFloat(principalWidth).toFixed(2)}%)
      </div>
      <div className="amounts">
        Total Interest Paid:{' '}
        <span className="negative">
          ${intTotal} ({parseInt(interestWidth)}%)
        </span>
      </div>
      <div className="amounts">
        Total Paid: <span className="negative"> ${parseInt(overalTotal)}</span>
      </div>
    </div>
  );
};

export default TotalAmountAnalysis;
