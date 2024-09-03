import React, { useState } from "react";
import "./Calculator.css";
import Fraction from "fraction.js";
import { getDifferentiation, getIntegration } from "./apiService";

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [history, setHistory] = useState([]);
  const [angleMode, setAngleMode] = useState("DEG");

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
    setDisplay(display + value);
  };

  const calculate = () => {
    try {
      const result = eval(display).toString();
      setDisplay(result);
      setHistory([...history, { expression: display, result }]);
    } catch (error) {
      setDisplay("Error");
    }
  };

  const toggleFraction = () => {
    try {
      const frac = new Fraction(display);
      setDisplay(frac.toFraction());
    } catch (error) {
      setDisplay("Error");
    }
  };

  const clearDisplay = () => {
    setDisplay("");
  };

  const scientificFunctions = {
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    asin: Math.asin,
    acos: Math.acos,
    atan: Math.atan,
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
      setDisplay(funcResult.toString());
      setHistory([...history, { expression: `${func}(${display})`, result: funcResult.toString() }]);
    } catch (error) {
      setDisplay("Error");
    }
  };

  const differentiate = async () => {
    const diffResult = await getDifferentiation(display, 'x');
    setDisplay(diffResult);
    setHistory([...history, { expression: `d/dx(${display})`, result: diffResult }]);
  };

  const integrate = async () => {
    const integralResult = await getIntegration(display, 'x');
    setDisplay(integralResult);
    setHistory([...history, { expression: `∫(${display})dx`, result: integralResult }]);
  };

  return (
    <div className="calculator">
      <div className="calculator__history">
        {history.map((item, index) => (
          <div key={index} className="calculator__history-item">
            <span>{item.expression} = </span>
            <strong>{item.result}</strong>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="calculator__display"
        value={display}
        onChange={(e) => setDisplay(e.target.value)} /* Allow direct typing */
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
        <button onClick={clearDisplay}>C</button>
        <button onClick={calculate}>=</button>
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
