import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import {  useSelector, useDispatch } from "react-redux";
import { ratesUpdated } from "../store/actions/RateActions";
import {
  getCurrencyCode,
  getSupportedCurrencies,
} from "../store/reducers/RateReducer";
import { RateTable } from "./RateTable";
import { CurrencyCodePicker } from "./CurrencyCodePicker";
import { getExchangeRates } from "../api";
import { AmountField } from "./AmountField";

export function ExchangeRate() {
  // constructor(props) {
  //   super(props);
  //   this.getLatestExchangeRates();
  // }
  // componentDidUpdate(prevProps) {
  //   if (this.props.currencyCode !== prevProps.currencyCode) {
  //     this.getLatestExchangeRates();
  //   }
  // }

  useCurrencyCodes();

  return (
    <>
      <section>
        <h1 className="ExchangeRate-header">
          Exchange Rates <CurrencyCodePicker />
        </h1>
      </section>
      <section>
        <AmountField />
      </section>
      <section>
        <RateTable />
      </section>
    </>
  );
}

// // props types
// ExchangeRate.propTypes = {
//   updateCurrencyCode: PropTypes.func,
//   // currencyCode: PropTypes.string,
//   // supportedCurrencies: PropTypes.arrayOf(PropTypes.string),
// };

// // redux stuff
// function mapStateToProps(state) {
//   return {
//     supportedCurrencies: getSupportedCurrencies(state),
//     currencyCode: getCurrencyCode(state),
//   };
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     updateRates: (rates) => dispatch(ratesUpdated(rates)),
//   };
// // }

// export const ExchangeRateContainer = connect(
//   // mapStateToProps,
//   null,
//   // mapDispatchToProps
//   null,
// )(ExchangeRate);


function useCurrencyCodes(){

  const dispatch = useDispatch();
  // they are the same
  const supportedCurrencies = useSelector(state => getSupportedCurrencies(state));
  const currencyCode = useSelector(getCurrencyCode);
  const updateRates = (rates) => dispatch(dispatch(ratesUpdated(rates)));

  function getLatestExchangeRates() {
    // const { currencyCode, updateRates, supportedCurrencies } = this.props;
    getExchangeRates(currencyCode, supportedCurrencies).then((rates) => {
      updateRates(rates);
    });
  }

  useEffect(() => {
    getLatestExchangeRates();
  }, [ ]);

  useEffect(() => {
    getLatestExchangeRates();
  }, [ currencyCode ]);
}