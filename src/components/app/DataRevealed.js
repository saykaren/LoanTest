import React, { useState } from 'react';
import numberConverter from './numberConverter';

const RevealData = ({interestPaidArray, mortgage, extraInterestPaidArray})=>{

    let paidToBank;
    let extraCalcPaidToBank;

    // const arrayResults = interestPaidArray;
    if(interestPaidArray.length > 0){
        paidToBank = numberConverter(interestPaidArray.reduce((accu, cur)=>(

            accu + cur
        )));


    }
    if(extraInterestPaidArray.length > 0){
        extraCalcPaidToBank = numberConverter(extraInterestPaidArray.reduce((accu,cur)=>(
            accu + cur
        )));
    }
    const totalPaid = paidToBank + parseInt(mortgage);
    const extraTotalPaid = extraCalcPaidToBank + parseInt(mortgage);

    return(

        <section >
            {extraInterestPaidArray.length>0 && <div className="dataForm">
                <div className="dataSection">
                    You Paid the Bank ${extraCalcPaidToBank} you saved ${(paidToBank-extraCalcPaidToBank).toFixed(2)}
                </div>
                <div className="dataSection">
                    Total you paid ${extraTotalPaid} for a loan of ${mortgage}
                </div>
                <div className="bar dataSection" >
                    <div id="principalBar" style={{width: `{${mortgage}/${extraTotalPaid}}%`, backgroundColor: '#282c34', border: '4px solid white'}}>
                        ${mortgage} Mortgage
                    </div>
                    <div id="interestPaid" style={{width: `{${extraCalcPaidToBank}/${extraTotalPaid}}%`, backgroundColor: '#61dafb', border: '4px solid white', color: '#282c34' }}>
                        ${extraCalcPaidToBank} Interest Paid
                    </div>
                </div>
                <div className="dataSection">
                    Will take you {extraInterestPaidArray.length} months ({(extraInterestPaidArray.length/12).toFixed(2)} years)to pay off this loan
                </div>
            </div>}
            {interestPaidArray.length>0 && <div className="dataForm">
                <div className="dataSection">
                    You Paid the Bank ${paidToBank}
                </div>
                <div className="dataSection">
                    Total you paid ${totalPaid} for a loan of ${mortgage}
                </div>
                <div className="bar dataSection" >
                    <div id="principalBar" style={{width: `{${mortgage}/${totalPaid}}%`, backgroundColor: '#282c34', border: '4px solid white'}}>
                        ${mortgage} Mortgage
                    </div>
                    <div id="interestPaid" style={{width: `{${paidToBank}/${totalPaid}}%`, backgroundColor: '#61dafb', border: '4px solid white', color: '#282c34' }}>
                        ${paidToBank} Interest Paid
                    </div>
                </div>
                <div className="dataSection">
                    Will take you {interestPaidArray.length} months ({(interestPaidArray.length/12).toFixed(2)} years)to pay off this loan
                </div>
            </div>}
        </section>
    )
}

export default RevealData;