import React, { useState, useMemo, useCallback } from "react";
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getAmount } from "../store/reducers/RateReducer";
import { amountChanged } from "../store/actions/RateActions";
import { debounce } from "lodash";

export function AmountField() {

  const dispatch = useDispatch();
  const amount = useSelector(getAmount);
  const changeAmount = useCallback((newAmount) => dispatch(amountChanged(newAmount)), []);
  const [ displayAmount, setDispalayAmount ] = useState(amount);
  const onAmountChanged = useMemo(() => debounce(changeAmount, 500), [ changeAmount ]);
  
  function onChange(e) {
    let newAmount = e.target.value;
    setDispalayAmount(newAmount);
    // changeAmount(newAmount);
    onAmountChanged(newAmount);
  }

  return (
    <form className="ExchangeRate-form">
      <input type="text" value={displayAmount} onChange={onChange} />
    </form>
  );
}

// // prop types
// AmountField.propTypes = {
//   amount: PropTypes.string,
//   changeAmount: PropTypes.func,
// };

// // redux stuff
// function mapStateToProps(state) {
//   return {
//     amount: getAmount(state),
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     changeAmount: (newAmount) => dispatch(amountChanged(newAmount)),
//   };
// }

// export const AmountFieldContainer = connect(
//   null,
//   null
// )(AmountField);
