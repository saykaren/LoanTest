import numberConverter from './numberConverter';

const GenerateCalculation = ({
  newEndingPrincipalArray,
  interestRate,
  monthlyPayment,
  principalPaidArray,
  setPrincipalPaidArray,
  interestPaidArray,
  setInterestPaidArray,
  setNewEndingPrincipalArray,
  principal,
}) => {
  let currentPrincipal;
  if (newEndingPrincipalArray.length > 0) {
    currentPrincipal = numberConverter(
      newEndingPrincipalArray[newEndingPrincipalArray.length - 1],
    );
  }

  const processEachPayment = (num) => {
    let paymentInterestPaid = numberConverter(
      currentPrincipal * ((interestRate * 0.01) / 12),
    );
    let principalPaid;
    ////0 is last payment
    if (num === 0) {
      principalPaid = numberConverter(currentPrincipal);
    } else {
      principalPaid = numberConverter(monthlyPayment - paymentInterestPaid);
    }
    let balance = numberConverter(currentPrincipal - principalPaid);
    setPrincipalPaidArray([...principalPaidArray, principalPaid]);
    setInterestPaidArray([...interestPaidArray, paymentInterestPaid]);
    setNewEndingPrincipalArray([...newEndingPrincipalArray, balance]);
  };

  switch (true) {
    case newEndingPrincipalArray.length < 1:
      setNewEndingPrincipalArray([principal]);
      break;
    case currentPrincipal > monthlyPayment &&
      newEndingPrincipalArray.length >= 1:
      processEachPayment(1);
      break;
    case currentPrincipal < monthlyPayment:
      processEachPayment(0);
      break;
    case newEndingPrincipalArray[newEndingPrincipalArray.length - 1] <= 0:
      break;
    default:
      break;
  }
};

export default GenerateCalculation;
