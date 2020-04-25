import React, { useState, useEffect } from 'react';
import '../../styling/App1.scss';
import numberConverter from './numberConverter';
import RevealData from './DataRevealed';
import Footer from './Footer';

///Dates
let todayDate = new Date();
let monthToday = todayDate.getMonth();
let yearToday = todayDate.getFullYear();

const titleInfo = [
  'Date',
  'Principal Paid',
  'Interest Paid',
  'Ending Principal',
];
const titleExtraInfo = ['Principal Paid', 'Interest Paid', 'Ending Principal'];

const App = () => {

  let monthArray = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let yearArray = [2020];

  // // //User Input
  const [principal, setPrincipal] = useState(172000);
  const [interestRate, setInterestRate] = useState(3.75);
  const [monthlyPayment, setMonthlyPayment] = useState(1500);
  const [extraPayment, setExtraPayment] = useState(100);

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
  const [monthDate, setMonthDate] = useState([]);

  const generateCalculation = () => {
    let currentPrincipal;
    if (newEndingPrincipalArray.length > 0) {
      currentPrincipal = numberConverter(
          newEndingPrincipalArray[newEndingPrincipalArray.length - 1],
      );
    }



    const processPayment = () => {
      let paymentInterestPaid = numberConverter(
          currentPrincipal * ((interestRate * 0.01) / 12),
      );
      let principalPaid = numberConverter(monthlyPayment - paymentInterestPaid);
      // let balance = numberConverter(currentPrincipal - principalPaid);
      let balance = numberConverter(currentPrincipal - principalPaid);
      setPrincipalPaidArray([...principalPaidArray, principalPaid]);
      setInterestPaidArray([...interestPaidArray, paymentInterestPaid]);
      setNewEndingPrincipalArray([...newEndingPrincipalArray, balance]);

      let monthDateIndex =
          monthDate.length - Math.floor(monthDate.length / 12) * 12;
      setMonthDate([...monthDate, monthArray[monthDateIndex]]);
    };

    const processLastPayment = () => {
      // console.log(`last payment ${currentPrincipal}`);
      console.log('in Process Last Payment');
      let paymentInterestPaid = numberConverter(
          currentPrincipal * ((interestRate * 0.01) / 12),
      );
      let principalPaid = numberConverter(currentPrincipal);
      let balance = numberConverter(currentPrincipal - principalPaid);
      setPrincipalPaidArray([...principalPaidArray, principalPaid]);
      setInterestPaidArray([...interestPaidArray, paymentInterestPaid]);
      setNewEndingPrincipalArray([...newEndingPrincipalArray, balance]);
      let monthDateIndex =
          monthDate.length - Math.floor(monthDate.length / 12) * 12;
      setMonthDate([...monthDate, monthArray[monthDateIndex]]);
    };

    switch (true) {
      case (newEndingPrincipalArray.length < 1):
        setNewEndingPrincipalArray([principal]);
        break;
      case (currentPrincipal > monthlyPayment &&
          newEndingPrincipalArray.length >= 1):
        processPayment();
        break;
      case (currentPrincipal < monthlyPayment) :
        processLastPayment();
        break;
      case (newEndingPrincipalArray[newEndingPrincipalArray.length - 1] <= 0):
        break;
      default:
        break;
    }


    ///extra payment calculations
    let currentExtraPrincipal;
    if (extraNewEndingPrincipalArray.length > 0) {
      currentExtraPrincipal = numberConverter(
          extraNewEndingPrincipalArray[extraNewEndingPrincipalArray.length - 1],
      );
    }


    const processExtraPayment = () => {
      let paymentExtraInterestPaid = numberConverter(
          currentExtraPrincipal * ((interestRate * 0.01) / 12),
      );
      let principalExtraPaid = numberConverter(extraPayment + monthlyPayment - paymentExtraInterestPaid );
      let extraBalance = numberConverter(currentExtraPrincipal - principalExtraPaid);
      setExtraPrincipalPaidArray([...extraPrincipalPaidArray, principalExtraPaid]);
      setExtraInterestPaidArray([...extraInterestPaidArray, paymentExtraInterestPaid]);
      setExtraNewEndingPrincipalArray([...extraNewEndingPrincipalArray, extraBalance]);
    };



      const processExtraLastPayment = () => {
        // console.log(`last payment ${currentPrincipal}`);
        console.log('in Process Last Payment');
        let paymentExtraInterestPaid = numberConverter(
            currentExtraPrincipal * ((interestRate * 0.01) / 12),
        );
        let principalExtraPaid = numberConverter(currentExtraPrincipal);
        let extraBalance = numberConverter(currentExtraPrincipal - principalExtraPaid);
        setExtraPrincipalPaidArray([...extraPrincipalPaidArray, principalExtraPaid]);
        setExtraInterestPaidArray([...extraInterestPaidArray, paymentExtraInterestPaid]);
        setExtraNewEndingPrincipalArray([...extraNewEndingPrincipalArray, extraBalance]);

        // let monthDateIndex =
        //     monthDate.length - Math.floor(monthDate.length / 12) * 12;
        // setMonthDate([...monthDate, monthArray[monthDateIndex]]);
      };

      switch (true) {
        case (extraNewEndingPrincipalArray.length < 1):
          setExtraNewEndingPrincipalArray([principal]);
          break;
        case (currentExtraPrincipal > (monthlyPayment + extraPayment) &&
            extraNewEndingPrincipalArray.length >= 1):
          processExtraPayment();
          break;
        case (currentExtraPrincipal < (monthlyPayment + extraPayment) && extraNewEndingPrincipalArray[extraNewEndingPrincipalArray.length - 1] > 0) :
          processExtraLastPayment();
          break;
        case (extraNewEndingPrincipalArray[extraNewEndingPrincipalArray.length - 1] <= 0):
          break;
        default:
          break;
      }

  };
  const handleReset = (e, setEvent)=>{
    let result = parseFloat(e);
    setEvent(result);
  }

  const handleResetExtraMonthlyPayment = (e)=>{
    let result = parseFloat(e);
    setExtraPayment(result);

  }


  useEffect(()=>{
    if(newEndingPrincipalArray.length>=1 && newEndingPrincipalArray[newEndingPrincipalArray.length-1]>0){
      setTimeout(generateCalculation, 100);
    }
  }, [newEndingPrincipalArray]);


  return (
      <section className="App">
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
            <button onClick={() => generateCalculation()}>Calculate</button>
        )}

        <button onClick={() => window.location.reload()}>Reset Numbers</button>
        <RevealData interestPaidArray={interestPaidArray} mortgage={principal} />
        {/* ****Below is for extra********* */}
        { extraNewEndingPrincipalArray.length>1 &&
        <div id="flexTable">
          {/*<div className="tableCell">Date</div>*/}
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
          {/*<div className="tableCell">Date</div>*/}
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