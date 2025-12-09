import React, { useState } from "react";

const MoneyDisplay = ({
  value,
  tag = "h3",
  shorten = false,
  size = null,
  className = "",
}) => {
  const [showFull, setShowFull] = useState(false);

  const formatNumber = (num) => {
    if(!num && num !== 0) return "0.00"
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const shortenNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + "B";
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + "K";
    }
    return num.toFixed(2);
  };

  const displayValue =
    shorten && !showFull ? shortenNumber(value) : formatNumber(value);

  const parts = displayValue.match(/^(-?)([\d,]+)(\.?)(\d*)([KMB]?)$/);
  if (!parts) return;
  const sign = parts[1];
  const wholePart = parts[2];
  const decimalPoint = parts[3];
  const decimalPart = parts[4];
  const suffix = parts[5];

  const Tag = tag;

  const mainSize = size ? `${size}px` : undefined;
  const dollarSize = size ? `${size * 0.85}px` : "0.9em";
  const centsSize = size ? `${size * 0.7}px` : "0.7em";

  const baseStyles = {
    display: "inline-flex",
    alignItems: "baseline",
    fontWeight: "bold",
    fontSize: mainSize,
    cursor: shorten ? "pointer" : "default",
  };

  const handleClick = () => {
    if (shorten) {
      setShowFull(!showFull);
    }
  };

  return (
    <Tag
      className={`${className} money-display`}
      style={baseStyles}
      onClick={handleClick}
      title={
        shorten ? `Click to ${showFull ? "shorten" : "expand"}` : undefined
      }
    >
      <span
        style={{
          fontSize: dollarSize,
          fontWeight: "500",
          marginRight: "0.125em",
        }}
      >
        {sign}$
      </span>
      <span>{wholePart}</span>
      {(decimalPoint || decimalPart) && (
        <span
          style={{
            fontSize: centsSize,
            opacity: 0.75,
          }}
        >
          {decimalPoint}
          {decimalPart}
        </span>
      )}
      {suffix && (
        <span
          style={{
            fontSize: centsSize,
            fontWeight: "normal",
            opacity: 0.8,
            marginLeft: "0.125em",
          }}
        >
          {suffix}
        </span>
      )}
    </Tag>
  );
};

export default MoneyDisplay;
