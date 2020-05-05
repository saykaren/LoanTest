import numberConverter from './numberConverter';

const ExtraPaymentCalculation = ({
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
}) => {
  let currentExtraPrincipal;
  if (extraNewEndingPrincipalArray.length > 0) {
    currentExtraPrincipal = numberConverter(
      extraNewEndingPrincipalArray[extraNewEndingPrincipalArray.length - 1],
    );
  }

  const processEachExtraPayment = (num) => {
    let paymentExtraInterestPaid = numberConverter(
      currentExtraPrincipal * ((interestRate * 0.01) / 12),
    );
    let principalExtraPaid;
    ///Last payment 0
    if (num === 0) {
      principalExtraPaid = numberConverter(currentExtraPrincipal);
      setModal(true);
    } else {
      principalExtraPaid = numberConverter(
        extraPayment + monthlyPayment - paymentExtraInterestPaid,
      );
    }
    let extraBalance = numberConverter(
      currentExtraPrincipal - principalExtraPaid,
    );
    setExtraPrincipalPaidArray([
      ...extraPrincipalPaidArray,
      principalExtraPaid,
    ]);
    setExtraInterestPaidArray([
      ...extraInterestPaidArray,
      paymentExtraInterestPaid,
    ]);
    setExtraNewEndingPrincipalArray([
      ...extraNewEndingPrincipalArray,
      extraBalance,
    ]);
  };

  switch (true) {
    case extraNewEndingPrincipalArray.length < 1:
      setExtraNewEndingPrincipalArray([principal]);
      break;
    case currentExtraPrincipal > monthlyPayment + extraPayment &&
      extraNewEndingPrincipalArray.length >= 1:
      processEachExtraPayment(1);
      break;
    case currentExtraPrincipal < monthlyPayment + extraPayment &&
      extraNewEndingPrincipalArray[extraNewEndingPrincipalArray.length - 1] > 0:
      processEachExtraPayment(0);
      break;
    case extraNewEndingPrincipalArray[
      extraNewEndingPrincipalArray.length - 1
    ] <= 0:
      break;
    default:
      break;
  }
};

export default ExtraPaymentCalculation;
