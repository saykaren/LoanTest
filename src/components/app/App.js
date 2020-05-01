import React, { useState, useEffect } from 'react';
import '../../styling/App1.scss';
import numberConverter from './numberConverter';
import RevealData from './DataRevealed';
import Footer from './Footer';


const App = () => {

  // // //User Input
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

  const generateCalculation = () => {
    let currentPrincipal;
    if (newEndingPrincipalArray.length > 0) {
      currentPrincipal = numberConverter(
          newEndingPrincipalArray[newEndingPrincipalArray.length - 1],
      );
    }

    const processEachPayment = (num)=>{
      let paymentInterestPaid = numberConverter(
          currentPrincipal * ((interestRate * 0.01) / 12),
      );
      let principalPaid;
      ////0 is last payment
      if(num === 0){
        principalPaid = numberConverter(currentPrincipal);
      }else{
        principalPaid = numberConverter(monthlyPayment - paymentInterestPaid);
      }
      let balance = numberConverter(currentPrincipal - principalPaid);
      setPrincipalPaidArray([...principalPaidArray, principalPaid]);
      setInterestPaidArray([...interestPaidArray, paymentInterestPaid]);
      setNewEndingPrincipalArray([...newEndingPrincipalArray, balance]);
    }

    switch (true) {
      case (newEndingPrincipalArray.length < 1):
        setNewEndingPrincipalArray([principal]);
        break;
      case (currentPrincipal > monthlyPayment &&
          newEndingPrincipalArray.length >= 1):
        processEachPayment(1);
        break;
      case (currentPrincipal < monthlyPayment) :
        processEachPayment(0);
        break;
      case (newEndingPrincipalArray[newEndingPrincipalArray.length - 1] <= 0):
        break;
      default:
        break;
    }

  };

  const extraCalculation = ()=>{
    ///extra payment calculations
    let currentExtraPrincipal;
    if (extraNewEndingPrincipalArray.length > 0) {
      currentExtraPrincipal = numberConverter(
          extraNewEndingPrincipalArray[extraNewEndingPrincipalArray.length - 1],
      );
    }

    const processEachExtraPayment =(num)=>{
      let paymentExtraInterestPaid = numberConverter(
          currentExtraPrincipal * ((interestRate * 0.01) / 12),
      );
      let principalExtraPaid;
      ///Last payment 0
      if(num === 0){
        principalExtraPaid = numberConverter(currentExtraPrincipal);
        setModal(true);
      }else{
        principalExtraPaid = numberConverter(extraPayment + monthlyPayment - paymentExtraInterestPaid );
      }
      let extraBalance = numberConverter(currentExtraPrincipal - principalExtraPaid);
      setExtraPrincipalPaidArray([...extraPrincipalPaidArray, principalExtraPaid]);
      setExtraInterestPaidArray([...extraInterestPaidArray, paymentExtraInterestPaid]);
      setExtraNewEndingPrincipalArray([...extraNewEndingPrincipalArray, extraBalance]);
    }

    switch (true) {
      case (extraNewEndingPrincipalArray.length < 1):
        setExtraNewEndingPrincipalArray([principal]);
        break;
      case (currentExtraPrincipal > (monthlyPayment + extraPayment) &&
          extraNewEndingPrincipalArray.length >= 1):
        processEachExtraPayment(1);
        break;
      case (currentExtraPrincipal < (monthlyPayment + extraPayment) && extraNewEndingPrincipalArray[extraNewEndingPrincipalArray.length - 1] > 0) :
        processEachExtraPayment(0);
        break;
      case (extraNewEndingPrincipalArray[extraNewEndingPrincipalArray.length - 1] <= 0):
        break;
      default:
        break;
    }

  }
  const handleReset = (e, setEvent)=>{
    let result = parseFloat(e);
    setEvent(result);
  }

  useEffect(()=>{
    if(newEndingPrincipalArray.length>=1 && newEndingPrincipalArray[newEndingPrincipalArray.length-1]>0){
      setTimeout(generateCalculation, 100);
    }
  }, [newEndingPrincipalArray]);

  useEffect(()=>{
    if(extraNewEndingPrincipalArray.length>=1 && extraNewEndingPrincipalArray[extraNewEndingPrincipalArray.length-1]>0){
      setTimeout(extraCalculation, 100);
    }
  }, [extraNewEndingPrincipalArray]);

  const calculate =()=>{
    generateCalculation()
    if(extraPayment>0){
      extraCalculation();
    }
  }


  const calculateModalDetails = ()=>{
    setModal(true)
  }


  let savedYears = parseInt((interestPaidArray.length-extraInterestPaidArray.length)/12)
  let savedMonths = (interestPaidArray.length-extraInterestPaidArray.length) % 12;
  // let savedTotalPaid = parseFloat(totalPaid-extraTotalPaid).toFixed(2);
  return (
      <section className="App">
        {/*<button*/}

        {/*    onClick={() => calculateModalDetails()}*/}
        {/*>*/}
        {/*  modal active*/}
        {/*</button>*/}
        {modal && <div className="modal">
          <h2 className="modal-header">
            <span className='positiveLarge'>Savings!</span>
            <button
                className="modal-close"
                onClick={()=>setModal(false)}
            >
              X
            </button>
          </h2>
          <div className="modal-content">
            <div className='amounts positive'>
              {savedYears} years {savedMonths} months Saved!
            </div>
            {/*<div className='amounts positive'>*/}

            {/*  $XXXXX Saved*/}
            {/*</div>*/}

          </div>
        </div>}
        <div id="inputSection">
          <form className="inputForm">
            <label className="inputSection">
              Mortage:
              {(newEndingPrincipalArray.length <= 1 && (
                  <input
                      type="number"
                      name="Mortgage"
                      value={principal}
                      onChange={(e) =>
                          handleReset(e.currentTarget.value, setPrincipal)
                      }
                  ></input>
              )) || <span>{principal}</span>}
            </label>
            <label className="inputSection">
              Interest Rate:
              {(newEndingPrincipalArray.length <= 1 && (
                  <input
                      type="number"
                      name="Interest"
                      value={interestRate}
                      onChange={(e) =>
                          handleReset(e.currentTarget.value, setInterestRate)
                      }
                  ></input>
              )) || <span>{interestRate}</span>}
            </label>
            <label className="inputSection">
              Monthly Payment:
              {(newEndingPrincipalArray.length <= 1 && (
                  <input
                      type="number"
                      name="MonthlyPayment"
                      value={monthlyPayment}
                      onChange={(e) =>
                          // handleResetMonthlyPayment(e.currentTarget.value)
                          handleReset(e.currentTarget.value, setMonthlyPayment)
                      }
                  ></input>
              )) || <span>{monthlyPayment}</span>}
            </label>

            <label className="inputSection">
              Extra Monthly Payment:
              {(newEndingPrincipalArray.length <= 1 && (
                  <input
                      type="number"
                      name="ExtraMonthlyPayment"
                      value={extraPayment}
                      onChange={(e) =>
                          handleReset(e.currentTarget.value, setExtraPayment)
                      }
                  ></input>
              )) || <span>{extraPayment}</span>}
            </label>
          </form>
        </div>
        {(newEndingPrincipalArray[newEndingPrincipalArray.length - 1] > 0 ||
            newEndingPrincipalArray[newEndingPrincipalArray.length - 1] ===
            undefined) && (
            <button onClick={() => calculate()}>Calculate</button>
        )}

        <button onClick={() => window.location.reload()}>Reset Numbers</button>
        <RevealData interestPaidArray={interestPaidArray} mortgage={principal} extraInterestPaidArray={extraInterestPaidArray}/>
        {/* ****Below is for extra********* */}
        { extraNewEndingPrincipalArray.length>1 &&
        <div id="flexTable">

          <div className="tableCell">
            Extra Principal
            <div className="cellDetails">{principal}</div>
            {extraNewEndingPrincipalArray.map((value, index) => (
                <div className="cellDetails" key={index}>
                  {value}
                </div>
            ))}
          </div>
          <div className="tableCell">
            Monthly Payment
            {extraNewEndingPrincipalArray.map((value, index) => (
                <div className="cellDetails" key={index}>
                  {monthlyPayment}
                </div>
            ))}
          </div>

          <div className="tableCell bottomCell">
            Interest Paid With Extra Included
            <div className="cellDetails">-</div>
            {extraInterestPaidArray.map((value, index) => (
                <div className="cellDetails" key={index}>
                  {value}
                </div>
            ))}
          </div>
          <div className="tableCell">
            Principal Paid With Extra Included
            <div className="cellDetails">-</div>
            {extraPrincipalPaidArray.map((value, index) => (
                <div className="cellDetails" key={index}>
                  {value}
                </div>
            ))}
          </div>

          <div className="tableCell">
            Ending Principal with Extra Included
            {extraNewEndingPrincipalArray.map((value, index) => (
                <div className="cellDetails" key={index}>
                  {value}
                </div>
            ))}
          </div>
        </div>
        }

        <div id="flexTable">

          <div className="tableCell">
            Principal
            <div className="cellDetails">{principal}</div>
            {newEndingPrincipalArray.map((value, index) => (
                <div className="cellDetails" key={index}>
                  {value}
                </div>
            ))}
          </div>
          <div className="tableCell">
            Monthly Payment
            {newEndingPrincipalArray.map((value, index) => (
                <div className="cellDetails" key={index}>
                  {monthlyPayment}
                </div>
            ))}
          </div>
          <div className="tableCell bottomCell">
            Interest Paid
            <div className="cellDetails">-</div>
            {interestPaidArray.map((value, index) => (
                <div className="cellDetails" key={index}>
                  {value}
                </div>
            ))}
          </div>
          <div className="tableCell">
            Principal Paid
            <div className="cellDetails">-</div>
            {principalPaidArray.map((value, index) => (
                <div className="cellDetails" key={index}>
                  {value}
                </div>
            ))}
          </div>

          <div className="tableCell">
            Ending Principal
            {newEndingPrincipalArray.map((value, index) => (
                <div className="cellDetails" key={index}>
                  {value}
                </div>
            ))}
          </div>
        </div>
        <Footer/>
      </section>
  );
};

export default App;