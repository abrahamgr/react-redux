import React from "react";
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrencyCode,
  getSupportedCurrencies,
} from "../store/reducers/RateReducer";
import { updateCurrencyCode } from "../store/actions/RateActions";

export function CurrencyCodePicker() {


  const dispatch = useDispatch();
  const currencyCode = useSelector(state => getCurrencyCode(state));
  const supportedCurrencies = useSelector(state => getSupportedCurrencies(state));
  const currencyCodeUpdate = (currencyCode) => dispatch(updateCurrencyCode(currencyCode));
  
  function onChange(e) {
    const currencyCode = e.target.value;
    currencyCodeUpdate(currencyCode);
  }

  return (
    <select
      className="currencyCode"
      value={currencyCode}
      onChange={onChange}
    >
      {supportedCurrencies.map((code) => (
        <option key={code} value={code}>
          {code}
        </option>
      ))}
    </select>
  );
}

// // prop types
// CurrencyCodePicker.propTypes = {
//   supportedCurrencies: PropTypes.arrayOf(PropTypes.string),
//   currencyCode: PropTypes.string,
// };

// // redux stuff
// function mapStateToProps(state) {
//   return {
//     currencyCode: getCurrencyCode(state),
//     supportedCurrencies: getSupportedCurrencies(state),
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     currencyCodeUpdate: (currencyCode) =>
//       dispatch(updateCurrencyCode(currencyCode)),
//   };
// }
// export const CurrencyCodePickerContainer = connect(
//   null,
//   null
// )(CurrencyCodePicker);
