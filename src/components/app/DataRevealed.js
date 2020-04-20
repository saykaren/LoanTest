import React, { useState } from 'react';
import numberConverter from './numberConverter';

const RevealData = ({interestPaidArray, mortgage})=>{

    let paidInAss;


    // const arrayResults = interestPaidArray;
    if(interestPaidArray.length > 0){
        paidInAss = numberConverter(interestPaidArray.reduce((accu, cur)=>(

            accu + cur
        )))

    }
    const totalPaid = paidInAss + parseInt(mortgage);

    return(

        <section >
            {interestPaidArray.length>0 && <div className="dataForm">
                <div className="dataSection">
                    You Paid the Bank ${paidInAss}
                </div>
                <div className="dataSection">
                    Total you paid ${totalPaid} for a loan of ${mortgage}
                </div>
                <div className="bar dataSection" >
                    <div id="principalBar" style={{width: `{${mortgage}/${totalPaid}}%`, backgroundColor: '#282c34', border: '4px solid white'}}>
                        ${mortgage} Mortgage
                    </div>
                    <div id="interestPaid" style={{width: `{${paidInAss}/${totalPaid}}%`, backgroundColor: '#61dafb', border: '4px solid white', color: '#282c34' }}>
                        ${paidInAss} Interest Paid
                    </div>
                </div>
                <div className="dataSection">
                    Will take you {interestPaidArray.length} months to pay off this loan
                </div>
            </div>}
        </section>
    )
}

export default RevealData;