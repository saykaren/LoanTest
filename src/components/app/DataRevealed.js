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
          <h2 className="headerCalc">
            Amortization with <span className="positive">Extra</span> Payment
          </h2>
          <div className="dataSection">
            Your loan will be paid off in{' '}
            <span className="positive">
              {extraInterestPaidArray.length} months (
              {(extraInterestPaidArray.length / 12).toFixed(2)} years)
            </span>
          </div>
          <div className="dataSection">
            <div>
              Loan Amount: ${mortgage} ({parseInt(extraPrincipalWidth)}%)
            </div>
            <div>
              Total Interest Paid:{' '}
              <span className="negative">${extraCalcPaidToBank} ({parseInt(extraInterestWidth)}%)</span>
            </div>
            <div>

            Total Paid:{' '}
            <span className="negative"> ${parseInt(extraTotalPaid)}</span>
            </div>
          </div>
          <div className="dataSection">
            <div className='negative'>
              Total Paid ${parseInt(extraTotalPaid)}
            </div>
            <div className='growGraph'>
              <div
                  id="principalBar"
                  className="detailsColumn"
                  style={{
                    height: `${extraPrincipalWidth/2}%`,
                    backgroundColor: '#61dafb',
                    border: '2px solid white',
                    color: '#282c34',

                  }}
              >
                {parseInt(extraPrincipalWidth)}%
              </div>
              <div
                  id="interestPaid"
                  className="detailsColumn"
                  style={{
                    height: `${extraInterestWidth/2}%`,
                    backgroundColor: 'red',
                    border: '2px solid white',
                    color: '#282c34',
                  }}
              >
                {parseInt(extraInterestWidth)}%

              </div>

            </div>
            <div
            style={{display: 'flex', justifyContent: 'space-around'}}>
              <div>Principal</div>
              <div className='negative'>Interest</div>
            </div>
          </div>
         </div>
      )}
      {interestPaidArray.length > 0 && (
          <div className="dataForm">
            <h2 className="headerCalc">
              Amortization Typical Payment
            </h2>
            <div className="dataSection">
              Your loan will be paid off in{' '}
              <span className="positive">
              {interestPaidArray.length} months (
                {(interestPaidArray.length / 12).toFixed(2)} years)
            </span>
            </div>
            <div className="dataSection">
              <div>
                Loan Amount: ${mortgage} ({parseInt(principalWidth)}%)
              </div>
              <div>
                Total Interest Paid:{' '}
                <span className="negative">${paidToBank} ({parseInt(interestWidth)}%)</span>
              </div>
              <div>

                Total Paid:{' '}
                <span className="negative"> ${parseInt(totalPaid)}</span>
              </div>
            </div>
            <div className="dataSection">
              <div className='negative'>
                Total Paid ${parseInt(totalPaid)}
              </div>
              <div className='growGraph'>
                <div
                    id="principalBar"
                    className="detailsColumn"
                    style={{
                      height: `${principalWidth/2}%`,
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
                      height: `${interestWidth/2}%`,
                      backgroundColor: 'red',
                      border: '2px solid white',
                      color: '#282c34',
                    }}
                >
                  {parseInt(interestWidth)}%

                </div>

              </div>
              <div
                  style={{display: 'flex', justifyContent: 'space-around'}}>
                <div>Principal</div>
                <div className='negative'>Interest</div>
              </div>
            </div>
          </div>
      )}

    </section>
  );
};

export default RevealData;
