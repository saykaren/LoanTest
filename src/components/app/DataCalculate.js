import React, { useState, useEffect } from 'react';
import '../../styling/App1.scss';
import numberConverter from './numberConverter';
import Modal from './Modal';
import DataAnalysis from './DataAnalysis';
import GenerateCalculation from './GenerateCalculation';
import ExtraPaymentCalculation from './ExtraPaymentCalculation';
import AmortizationColumnSetValue from './AmortizationColumnSetValue';
import AmortizationColumn from './AmortizationColumn';

const DataCalculate = () => {
  // User Input
  const [principal, setPrincipal] = useState(172000);
  const [interestRate, setInterestRate] = useState(3.75);
  const [monthlyPayment, setMonthlyPayment] = useState(1500);
  const [extraPayment, setExtraPayment] = useState(1000);

  //Extra payment
  const [extraPrincipalPaidArray, setExtraPrincipalPaidArray] = useState([]);
  const [extraInterestPaidArray, setExtraInterestPaidArray] = useState([]);
  const [
    extraNewEndingPrincipalArray,
    setExtraNewEndingPrincipalArray,
  ] = useState([]);

  //Update Input
  const [principalPaidArray, setPrincipalPaidArray] = useState([]);
  const [interestPaidArray, setInterestPaidArray] = useState([]);
  const [newEndingPrincipalArray, setNewEndingPrincipalArray] = useState([]);

  // Modal
  const [modal, setModal] = useState(false);

  //Calculations
  const handleGenerateCalculation = () => {
    GenerateCalculation({
      newEndingPrincipalArray,
      interestRate,
      monthlyPayment,
      principalPaidArray,
      setPrincipalPaidArray,
      interestPaidArray,
      setInterestPaidArray,
      setNewEndingPrincipalArray,
      principal,
    });
  };

  const handleGenerateExtraCalculation = () => {
    ExtraPaymentCalculation({
      extraNewEndingPrincipalArray,
      interestRate,
      setModal,
      extraPayment,
      monthlyPayment,
      extraPrincipalPaidArray,
      setExtraPrincipalPaidArray,
      extraInterestPaidArray,
      setExtraInterestPaidArray,
      setExtraNewEndingPrincipalArray,
      principal,
    });
  };

  const handleReset = (e, setEvent) => {
    let result = parseFloat(e);
    setEvent(result);
  };

  useEffect(() => {
    if (
      newEndingPrincipalArray.length >= 1 &&
      newEndingPrincipalArray[newEndingPrincipalArray.length - 1] > 0
    ) {
      setTimeout(handleGenerateCalculation, 100);
    }
  }, [newEndingPrincipalArray]);

  useEffect(() => {
    if (
      extraNewEndingPrincipalArray.length >= 1 &&
      extraNewEndingPrincipalArray[extraNewEndingPrincipalArray.length - 1] > 0
    ) {
      setTimeout(handleGenerateExtraCalculation, 100);
    }
  }, [extraNewEndingPrincipalArray]);

  const calculate = () => {
    handleGenerateCalculation();
    if (extraPayment > 0) {
      handleGenerateExtraCalculation();
    }
  };

  //Calculate total paid
  let totalPaidToBank;
  let extraTotalPaidToBank;

  if (interestPaidArray.length > 0) {
    totalPaidToBank = numberConverter(
      interestPaidArray.reduce((accu, cur) => accu + cur),
    );
  }
  if (extraInterestPaidArray.length > 0) {
    extraTotalPaidToBank = numberConverter(
      extraInterestPaidArray.reduce((accu, cur) => accu + cur),
    );
  }

  let savedYears = Math.floor(
    (interestPaidArray.length - extraInterestPaidArray.length) / 12,
  );
  let savedMonths =
    (interestPaidArray.length - extraInterestPaidArray.length) % 12;
  let savedTotalPaid = Math.floor(totalPaidToBank - extraTotalPaidToBank);

  const InputLabelOne = (
    handleReset,
    title,
    arrayCheck,
    value,
    setProperty,
  ) => {
    return (
      <label className="inputSection">
        {title}:
        {(arrayCheck.length <= 1 && (
          <input
            type="number"
            name="Mortgage"
            value={value}
            onChange={(e) => handleReset(e.currentTarget.value, setProperty)}
          ></input>
        )) || <span>{value}</span>}
      </label>
    );
  };

  return (
    <section className="App">
      {modal && (
        <Modal
          savedYears={savedYears}
          savedMonths={savedMonths}
          setModal={setModal}
          savedTotalPaid={savedTotalPaid}
        />
      )}
      <div id="inputSection">
        <form className="inputForm">
          {InputLabelOne(
            handleReset,
            'Mortgage Checking',
            newEndingPrincipalArray,
            principal,
            setPrincipal,
          )}
          {InputLabelOne(
            handleReset,
            'Interest Rate',
            newEndingPrincipalArray,
            interestRate,
            setInterestRate,
          )}
          {InputLabelOne(
            handleReset,
            'Monthly Payment',
            newEndingPrincipalArray,
            monthlyPayment,
            setMonthlyPayment,
          )}
          {InputLabelOne(
            handleReset,
            'Extra Monthly Payment',
            newEndingPrincipalArray,
            extraPayment,
            setExtraPayment,
          )}
        </form>
      </div>
      {(newEndingPrincipalArray[newEndingPrincipalArray.length - 1] < 0 ||
        newEndingPrincipalArray[newEndingPrincipalArray.length - 1] ===
          undefined) && <button onClick={() => calculate()}>Calculate</button>}
      <button onClick={() => window.location.reload()}>Reset Numbers</button>

      <DataAnalysis
        interestPaidArray={interestPaidArray}
        mortgage={principal}
        extraInterestPaidArray={extraInterestPaidArray}
        extraTotalPaidToBank={extraTotalPaidToBank}
        totalPaidToBank={totalPaidToBank}
      />

      {extraNewEndingPrincipalArray.length > 1 && (
        <div id="flexTable">
          <AmortizationColumn title='Extra Principal' initialRow={principal} arr={extraNewEndingPrincipalArray}/>
          <AmortizationColumnSetValue title='Monthly Payment' copyValue={monthlyPayment} arr={extraNewEndingPrincipalArray}/>
          <AmortizationColumn title='Interest Paid (EXTRA Calculation)' initialRow='-' arr={extraInterestPaidArray}/>
          <AmortizationColumn title='Principal Paid (EXTRA Calculation)' initialRow='-' arr={extraPrincipalPaidArray}/>
          <AmortizationColumn title='Ending Principal (EXTRA Calculation)' initialRow='' arr={extraNewEndingPrincipalArray}/>
        </div>
      )}

      <div id="flexTable">
        <AmortizationColumn title='Principal' initialRow={principal} arr={newEndingPrincipalArray}/>
        <AmortizationColumnSetValue title={'Monthly Payment'} copyValue={monthlyPayment} arr={newEndingPrincipalArray}/>
        <AmortizationColumn title='Interest Paid' initialRow='-' arr={interestPaidArray} />
        <AmortizationColumn title='Principal Paid' initialRow='-' arr={principalPaidArray} />
        <AmortizationColumn title='Ending Principal' initialRow='' arr={newEndingPrincipalArray}/>
      </div>
    </section>
  );
};

export default DataCalculate;
