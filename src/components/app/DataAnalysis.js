import React from 'react';

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

  const TimeAnalysis = (title, arr)=> {
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

  const TotalAmountAnalysis = (loan,principalWidth, intTotal, interestWidth, overalTotal)=>{
      return(
          <div className="dataSection">
              <div className="amounts">
                  Loan Amount: ${loan} (
                  {parseFloat(principalWidth).toFixed(2)}%)
              </div>
              <div className="amounts">
                  Total Interest Paid:{' '}
                  <span className="negative">
                ${intTotal} ({parseInt(interestWidth)}%)
              </span>
              </div>
              <div className="amounts">
                  Total Paid:{' '}
                  <span className="negative"> ${parseInt(overalTotal)}</span>
              </div>
          </div>
      )
  }

  return (
    <section>
      {extraInterestPaidArray.length > 0 && (
        <div className="dataForm">
          <h2 className="headerCalc">
            Amortization with <span className="positive">Extra</span> Payment
          </h2>
          <div className="dataSection">
              {TimeAnalysis('Time til loan paid off', extraInterestPaidArray)}
          </div>
            {TotalAmountAnalysis(mortgage, extraPrincipalWidth, extraTotalPaidToBank, extraInterestWidth, extraTotalPaid  )}
          <div className="dataSection">
            <div className="negative">
              Total Paid ${parseInt(extraTotalPaid)}
            </div>
            <div className="growGraph">
              <div
                id="principalBar"
                className="detailsColumn"
                style={{
                  height: `${extraPrincipalWidth / 2}%`,
                  backgroundColor: '#61dafb',
                  border: '2px solid white',
                  color: '#282c34',
                }}
              >
                {parseFloat(extraPrincipalWidth).toFixed(2)}%
              </div>
              <div
                id="interestPaid"
                className="detailsColumn"
                style={{
                  height: `${extraInterestWidth / 2}%`,
                  backgroundColor: 'red',
                  border: '2px solid white',
                  color: '#282c34',
                }}
              >
                {parseFloat(extraInterestWidth).toFixed(2)}%
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>Principal</div>
              <div className="negative">Interest</div>
            </div>
          </div>
        </div>
      )}
      {interestPaidArray.length > 0 && (
        <div className="dataForm">
          <h2 className="headerCalc">Amortization Typical Payment</h2>
          <div className="dataSection">
              {TimeAnalysis('Time til loan paid off', interestPaidArray)}
          </div>
            {TotalAmountAnalysis(mortgage, principalWidth, totalPaidToBank, interestWidth, totalPaid)}
          <div className="dataSection">
            <div className="negative">Total Paid ${parseInt(totalPaid)}</div>
            <div className="growGraph">
              <div
                id="principalBar"
                className="detailsColumn"
                style={{
                  height: `${principalWidth / 2}%`,
                  backgroundColor: '#61dafb',
                  border: '2px solid white',
                  color: '#282c34',
                }}
              >
                {parseInt(principalWidth)}%
              </div>
              <div
                id="interestPaid"
                className="detailsColumn"
                style={{
                  height: `${interestWidth / 2}%`,
                  backgroundColor: 'red',
                  border: '2px solid white',
                  color: '#282c34',
                }}
              >
                {parseInt(interestWidth)}%
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>Principal</div>
              <div className="negative">Interest</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DataAnalysis;
