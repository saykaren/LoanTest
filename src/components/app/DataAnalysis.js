import React from 'react';
import TotalAmountAnalysis from './TotalAmountAnalysis';
import GraphAnalysis from './GraphAnalysis';
import TimeAnalysis from './TimeAnalysis';

const DataAnalysis = ({
  interestPaidArray,
  mortgage,
  extraInterestPaidArray,
  extraTotalPaidToBank,
  totalPaidToBank,
}) => {
  const totalPaid = totalPaidToBank + parseInt(mortgage);
  const extraTotalPaid = extraTotalPaidToBank + parseInt(mortgage);
  let interestWidth = (totalPaidToBank / totalPaid) * 100;
  let principalWidth = 100 - interestWidth;

  let extraInterestWidth = (extraTotalPaidToBank / extraTotalPaid) * 100;
  let extraPrincipalWidth = 100 - extraInterestWidth;

  return (
    <section>
      {extraInterestPaidArray.length > 0 && (
        <div className="dataForm">
          <h2 className="headerCalc">
            Amortization with <span className="positive">Extra</span> Payment
          </h2>
          <div className="dataSection">
            <TimeAnalysis
              title="Time til loan paid off"
              arr={extraInterestPaidArray}
            />
          </div>
          <TotalAmountAnalysis
            loan={mortgage}
            principalWidth={extraPrincipalWidth}
            intTotal={extraTotalPaidToBank}
            interestWidth={extraInterestWidth}
            overallTotal={extraTotalPaid}
          />
          <GraphAnalysis
            totalPaidData={extraTotalPaid}
            graphPWidth={extraPrincipalWidth}
            graphIWidth={extraInterestWidth}
          />
        </div>
      )}
      {interestPaidArray.length > 0 && (
        <div className="dataForm">
          <h2 className="headerCalc">Amortization Typical Payment</h2>
          <div className="dataSection">
            <TimeAnalysis
              title="Time til loan paid off"
              arr={interestPaidArray}
            />
          </div>
          <TotalAmountAnalysis
            loan={mortgage}
            principalWidth={principalWidth}
            intTotal={totalPaidToBank}
            interestWidth={interestWidth}
            overallTotal={totalPaid}
          />
          <GraphAnalysis
            totalPaidData={totalPaid}
            graphPWidth={principalWidth}
            graphIWidth={interestWidth}
          />
        </div>
      )}
    </section>
  );
};

export default DataAnalysis;
