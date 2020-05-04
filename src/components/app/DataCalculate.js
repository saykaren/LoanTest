import React, { useState, useEffect } from 'react';
import '../../styling/App1.scss';
import numberConverter from './numberConverter';
import Modal from './Modal';
import DataAnalysis from './DataAnalysis';

const DataCalculate = ()=>{
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

    let savedYears = parseInt((interestPaidArray.length-extraInterestPaidArray.length)/12)
    let savedMonths = (interestPaidArray.length-extraInterestPaidArray.length) % 12;
    let savedTotalPaid = parseFloat(totalPaidToBank-extraTotalPaidToBank).toFixed(2);


    const InputLabelOne = (handleReset, title, arrayCheck, value, setProperty)=>{
        return(
            <label className="inputSection">
                {title}:
                {(arrayCheck.length <= 1 && (
                    <input
                        type="number"
                        name="Mortgage"
                        value={value}
                        onChange={(e) =>
                            handleReset(e.currentTarget.value, setProperty)
                        }
                    ></input>
                )) || <span>{value}</span>}
            </label>
        )
    }

    const AmortizationColumn = (title, initialRow, arr)=>{
        return(
            <div className="tableCell">
                {title}
                <div className="cellDetails">{initialRow}</div>
                {arr.map((value, index) => (
                    <div className="cellDetails" key={index}>
                        {value}
                    </div>
                ))}
            </div>
        )
    }
    return(
        <section className="App">
            {modal && <Modal savedYears={savedYears} savedMonths={savedMonths} setModal={setModal} savedTotalPaid={savedTotalPaid}/>}
            <div id="inputSection">
                <form className="inputForm">
                    {InputLabelOne(handleReset, 'Mortgage Checking', newEndingPrincipalArray, principal, setPrincipal)}
                    {InputLabelOne(handleReset, 'Interest Rate', newEndingPrincipalArray, interestRate, setInterestRate)}
                    {InputLabelOne(handleReset, 'Monthly Payment', newEndingPrincipalArray, monthlyPayment, setMonthlyPayment)}
                    {InputLabelOne(handleReset, 'Extra Monthly Payment', newEndingPrincipalArray, extraPayment, setExtraPayment)}

                </form>
            </div>
            {(newEndingPrincipalArray[newEndingPrincipalArray.length - 1] < 0 ||
                newEndingPrincipalArray[newEndingPrincipalArray.length - 1] ===
                undefined) && (
                <button onClick={() => calculate()}>Calculate</button>
            )}
            <button onClick={() => window.location.reload()}>Reset Numbers</button>

            <DataAnalysis interestPaidArray={interestPaidArray} mortgage={principal} extraInterestPaidArray={extraInterestPaidArray} extraTotalPaidToBank={extraTotalPaidToBank} totalPaidToBank={totalPaidToBank}/>

            { extraNewEndingPrincipalArray.length>1 &&
            <div id="flexTable">
                {AmortizationColumn( 'Extra Principal', principal, extraNewEndingPrincipalArray)}
                <div className="tableCell">
                    Monthly Payment
                    {extraNewEndingPrincipalArray.map((value, index) => (
                        <div className="cellDetails" key={index}>
                            {monthlyPayment}
                        </div>
                    ))}
                </div>
                {AmortizationColumn( 'Interest Paid With Extra Included', "-", extraInterestPaidArray)}
                {AmortizationColumn( 'Principal Paid (Extra)', "-", extraPrincipalPaidArray)}
                {AmortizationColumn( 'Ending Principal (Extra)', "", extraNewEndingPrincipalArray)}
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
        </section>
    )
}

export default DataCalculate;