import React, { useState } from "react";
import "./Calculator.css";
import * as math from "mathjs";
import Fraction from "fraction.js";
import { getDifferentiation, getIntegration } from "./apiService";

const Calculator = ({ addHistoryEntry }) => {
  const [display, setDisplay] = useState("0");
  const [angleMode, setAngleMode] = useState("DEG");
  const [clearText, setClearText] = useState("C"); // For handling "C" and "AC"
  const [result, setResult] = useState(null); // Store the last result

  const convertAngle = (value) => {
    switch (angleMode) {
      case "DEG":
        return (value * Math.PI) / 180;
      case "RAD":
        return value;
      case "GRAD":
        return (value * Math.PI) / 200;
      default:
        return value;
    }
  };

  const toggleAngleMode = () => {
    setAngleMode((prevMode) =>
      prevMode === "DEG" ? "RAD" : prevMode === "RAD" ? "GRAD" : "DEG"
    );
  };

  const handleClick = (value) => {
    if (display === "0" || clearText === "AC") {
      setDisplay(value);
      setClearText("C"); // Reset to "C" when a new value is entered
    } else if (result !== null) {
      setDisplay(result + value);
      setResult(null); // Reset result after continuing a calculation
    } else {
      setDisplay(display + value);
    }
  };

  const handleEqualClick = () => {
    try {
      const evalResult = math.evaluate(display);
      setDisplay(evalResult.toString()); // Show the result inside the display
      setResult(evalResult.toString()); // Store the result for continued calculations
      addHistoryEntry(`${display} = ${evalResult}`);
      setClearText("AC"); // Show "AC" after a result is displayed
    } catch (error) {
      setDisplay("Error");
      setResult(null);
      setClearText("AC"); // Show "AC" if there's an error
    }
  };

  const handleClearClick = () => {
    if (clearText === "C") {
      setDisplay("0");
      setClearText("AC");
    } else {
      setDisplay("0");
      setClearText("C");
      addHistoryEntry([]); // Clear history when "AC" is clicked
    }
    setResult(null); // Clear the stored result
  };

  const toggleFraction = () => {
    try {
      const frac = new Fraction(display);
      setDisplay(frac.toFraction());
    } catch (error) {
      setDisplay("Error");
      setResult(null);
      setClearText("AC");
    }
  };

  const scientificFunctions = {
    sin: (x) => Math.sin(convertAngle(x)),
    cos: (x) => Math.cos(convertAngle(x)),
    tan: (x) => Math.tan(convertAngle(x)),
    asin: (x) => Math.asin(x) * (angleMode === "DEG" ? 180 / Math.PI : angleMode === "GRAD" ? 200 / Math.PI : 1),
    acos: (x) => Math.acos(x) * (angleMode === "DEG" ? 180 / Math.PI : angleMode === "GRAD" ? 200 / Math.PI : 1),
    atan: (x) => Math.atan(x) * (angleMode === "DEG" ? 180 / Math.PI : angleMode === "GRAD" ? 200 / Math.PI : 1),
    log: Math.log10,
    ln: Math.log,
    sqrt: Math.sqrt,
    pow: Math.pow,
    exp: Math.exp,
    pi: Math.PI,
    e: Math.E,
    reciprocal: (x) => 1 / x,
    factorial: (x) => (x === 0 ? 1 : x * scientificFunctions.factorial(x - 1)),
  };

  const handleScientificFunction = (func) => {
    try {
      const funcResult = scientificFunctions[func](parseFloat(display));
      setDisplay(funcResult.toString()); // Show the result inside the display
      setResult(funcResult.toString()); // Store the result for continued calculations
      addHistoryEntry(`${func}(${display}) = ${funcResult}`);
      setClearText("AC"); // Show "AC" after a scientific calculation
    } catch (error) {
      setDisplay("Error");
      setResult(null);
      setClearText("AC");
    }
  };

  const differentiate = async () => {
    const diffResult = await getDifferentiation(display, "x");
    setDisplay(diffResult);
    setResult(diffResult); // Store the result for continued calculations
    addHistoryEntry(`d/dx(${display}) = ${diffResult}`);
    setClearText("AC"); // Show "AC" after differentiation
  };

  const integrate = async () => {
    const integralResult = await getIntegration(display, "x");
    setDisplay(integralResult);
    setResult(integralResult); // Store the result for continued calculations
    addHistoryEntry(`∫(${display})dx = ${integralResult}`);
    setClearText("AC"); // Show "AC" after integration
  };

  return (
    <div className="calculator">
      <input
        type="text"
        className="calculator__display"
        value={display}
        onChange={(e) => setDisplay(e.target.value)} // Allow direct typing
        placeholder="Enter expression"
      />
      <div className="calculator__keys">
        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("/")}>/</button>
        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("*")}>*</button>
        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button onClick={() => handleClick("-")}>-</button>
        <button onClick={() => handleClick("0")}>0</button>
        <button onClick={handleClearClick}>{clearText}</button>
        <button onClick={handleEqualClick}>=</button>
        <button onClick={toggleFraction} className="toggle-fraction-button">TF</button>
        <button onClick={toggleAngleMode}>{angleMode}</button>
        <button onClick={() => handleClick("+")}>+</button>
        <button onClick={() => handleClick("(")}>(</button>
        <button onClick={() => handleClick(")")}>)</button>
        <button onClick={() => handleClick("%")}>%</button>
        <button onClick={() => handleScientificFunction("sqrt")}>√</button>
        <button onClick={() => handleScientificFunction("sin")}>sin</button>
        <button onClick={() => handleScientificFunction("cos")}>cos</button>
        <button onClick={() => handleScientificFunction("tan")}>tan</button>
        <button onClick={() => handleScientificFunction("asin")}>asin</button>
        <button onClick={() => handleScientificFunction("acos")}>acos</button>
        <button onClick={() => handleScientificFunction("atan")}>atan</button>
        <button onClick={() => handleScientificFunction("log")}>log</button>
        <button onClick={() => handleScientificFunction("ln")}>ln</button>
        <button onClick={() => handleClick("**")}>^</button>
        <button onClick={() => handleScientificFunction("exp")}>exp</button>
        <button onClick={() => handleClick(scientificFunctions.pi)}>π</button>
        <button onClick={() => handleClick(scientificFunctions.e)}>e</button>
        <button onClick={() => handleScientificFunction("reciprocal")}>1/x</button>
        <button onClick={differentiate}>d/dx</button>
        <button onClick={integrate}>∫</button>
        <button onClick={() => handleClick("x")}>x</button>
        <button onClick={() => handleClick("y")}>y</button>
        <button onClick={() => handleClick("z")}>z</button>
      </div>
    </div>
  );
};

export default Calculator;
