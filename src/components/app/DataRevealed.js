import React from 'react';
import numberConverter from './numberConverter';

const RevealData = ({
  interestPaidArray,
  mortgage,
  extraInterestPaidArray,
}) => {
  let paidToBank;
  let extraCalcPaidToBank;

  if (interestPaidArray.length > 0) {
    paidToBank = numberConverter(
      interestPaidArray.reduce((accu, cur) => accu + cur),
    );
  }
  if (extraInterestPaidArray.length > 0) {
    extraCalcPaidToBank = numberConverter(
      extraInterestPaidArray.reduce((accu, cur) => accu + cur),
    );
  }
  const totalPaid = paidToBank + parseInt(mortgage);
  const extraTotalPaid = extraCalcPaidToBank + parseInt(mortgage);
  let interestWidth = (paidToBank / totalPaid) * 100;
  let principalWidth = 100 - interestWidth;

  let extraInterestWidth = (extraCalcPaidToBank / extraTotalPaid) * 100;
  let extraPrincipalWidth = 100 - extraInterestWidth;

  return (
    <section>
      {extraInterestPaidArray.length > 0 && (
        <div className="dataForm">
            <h2 className="headerCalc">Amortization with   <span className="positive">Extra</span> Payment</h2>
          <div className="dataSection">
            Your loan will be paid off in {' '}
            <span className="positive">
              {extraInterestPaidArray.length} months (
              {(extraInterestPaidArray.length / 12).toFixed(2)} years)
            </span>
          </div>
          <div className="dataSection">
            Loan Amount: ${mortgage}
            <br />
            Total Interest Paid:{' '}
            <span className="negative">${extraCalcPaidToBank}</span>
            <div className="bar">
              <div
                id="principalBar"
                style={{
                  width: `${extraPrincipalWidth}%`,
                  backgroundColor: '#282c34',
                  border: '4px solid white',
                }}
              >
                {parseInt(extraPrincipalWidth)}% Principal
              </div>
              <div
                id="interestPaid"
                style={{
                  width: `${extraInterestWidth}%`,
                  backgroundColor: '#61dafb',
                  border: '4px solid white',
                  color: '#282c34',
                }}
              >
                {parseInt(extraInterestWidth)}%
              </div>
            </div>
            Total Paid:{' '}
            <span className="negative"> ${parseInt(extraTotalPaid)}</span>
          </div>
        </div>
      )}
      {interestPaidArray.length > 0 && (
        <div className="dataForm">
          <h2 className="headerCalc">Amortization Typical Payment</h2>
          <div className="dataSection">
            Your loan will be paid off in{' '}
            <span className="positive">
              {' '}
              {interestPaidArray.length} months (
              {(interestPaidArray.length / 12).toFixed(2)} years)
            </span>
          </div>
          <div className="dataSection">
            Loan Amount: ${mortgage}
            <br />
            Total Interest Paid: <span className="negative">${paidToBank}</span>
            <div className="bar">
              <div
                id="principalBar"
                style={{
                  width: `${principalWidth}%`,
                  backgroundColor: '#282c34',
                  border: '4px solid white',
                }}
              >
                {parseInt(principalWidth)}% Principal
              </div>
              <div
                id="interestPaid"
                style={{
                  width: `${interestWidth}%`,
                  backgroundColor: '#61dafb',
                  border: '4px solid white',
                  color: '#282c34',
                }}
              >
                {parseInt(interestWidth)}%
              </div>
            </div>
            Total Paid:{' '}
            <span className="negative"> ${parseInt(totalPaid)}</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default RevealData;
