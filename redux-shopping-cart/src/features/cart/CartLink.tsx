import React from "react";
import { Link } from "react-router-dom";
import { getNumItems, getMemoizedNumItems } from "./cartSlice";
import { useAppSelector } from "../../app/hooks";
import styles from "./CartLink.module.css";

export function CartLink() {

  // run every time and calculates values again
  // const numItems = useAppSelector(getNumItems);
  // run only once
  const numItems = useAppSelector(getMemoizedNumItems);

  return (
    <Link to="/cart" className={styles.link}>
      <span className={styles.text}>
        🛒&nbsp;&nbsp;
        {numItems ? numItems : "Cart"}
        </span>
    </Link>
  );
}
