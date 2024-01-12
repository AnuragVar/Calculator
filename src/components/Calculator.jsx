import { useState } from "react";
import BackButton from "./BackButton";
import Buttons from "./Buttons";
import Display from "./Display";
import Drop from "./Dropdown";

function Calculator() {
  const [res, setRes] = useState("");
  const [Responses, setResponses] = useState([]);
  const [evaluated, setEvaluated] = useState(0);
  const maxHistoryItems = 2;
  //handle simple clicks
  function handleClick(e) {
    if (res === "ERROR") return;
    if (evaluated === true) {
      if (/[+\-x÷%]/.test(e.target.name)) return;
      setRes(e.target.name);
      setEvaluated(false);
      return;
    }
    if (res.includes("ERROR")) {
      setRes("");
      if (/[+\-x÷%]/.test(e.target.name)) return;
    }
    if (res === "0" && e.target.name === "0") return;
    else if (res === "0" && !/[+\-x÷%.]/.test(e.target.name)) {
      setRes(e.target.name);
      return;
    }
    const lastCharIsOperator = /[+\-x÷%.]$/.test(res);
    const newValueIsOperator = /[+\x÷%.]/.test(e.target.name);
    const specialOperator = /[+\-x÷%]/.test(res);

    if (!res && /[+\-%x÷]/.test(e.target.name)) {
      return;
    }
    if (
      e.target.name === "." &&
      res.includes(".") &&
      !specialOperator &&
      !lastCharIsOperator
    ) {
      return;
    }
    if (lastCharIsOperator && newValueIsOperator) {
      return;
    }
    setRes((res) => res.concat(e.target.name));
  }

  //handle clear button
  function handleClear() {
    setRes("");
  }

  //handle backspace
  function handleBackspace() {
    setRes(res.slice(0, res.length - 1));
  }

  //handle =
  function handleEvaluation() {
    const sanitizedExpression = res.replace(/x/g, "*");
    const sanitizedExpression2 = sanitizedExpression.replace(/÷/g, "/");
    const result = eval(sanitizedExpression2);

    if (isNaN(result) || !isFinite(result)) {
      setRes("ERROR");
    } else {
      const formattedResult =
        result.toString().length > 7
          ? result.toExponential(2)
          : result.toString();
      setRes(formattedResult);
      setEvaluated(true);
      setResponses((Responses) => [
        {
          expression: res,
          result: formattedResult,
        },
        ...Responses.slice(0, maxHistoryItems - 1),
      ]);
      console.log(Responses);
    }
  }

  //handle +-
  const handleToggleSign = () => {
    // Toggle the sign of the current input
    if (res === "0") return;
    //if the expression is 0 only.
    setRes((res) => (res.startsWith("-") ? res.slice(1) : `-${res}`));
  };
  function handlePercentage(e) {
    const lastCharIsOperator = /[+\-x÷%.]$/.test(res);
    if (lastCharIsOperator) return;

    const sanitizedExpression = res.replace(/x/g, "*");
    const sanitizedExpression2 = sanitizedExpression.replace(/÷/g, "/");
    const result = eval(sanitizedExpression2);

    const parsedInput = parseFloat(result);
    if (isNaN(parsedInput)) {
      setRes("ERROR");
      return;
    }
    const percentageResult = parsedInput * 0.01;
    const precision = (percentageResult.toString().split(".")[1] || "").length;
    setRes(percentageResult.toFixed(precision));
  }

  const isDigit = /^[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?$/.test(res); // Check if res is a digit

  let displayValue;
  if (isDigit && !res.includes("e")) {
    const floatValue = parseFloat(res);
    if (floatValue % 1 === 0) {
      displayValue = parseInt(res).toString(); // Remove decimal places for integers
    } else {
      displayValue = floatValue.toFixed(
        Math.min(9, res.split(".")[1]?.length || 0)
      );
    }
  } else {
    displayValue = res.slice(-9); // Show only last 7 characters for expressions
  }
  if (res === "") displayValue = "";

  return (
    <div className="keypad">
      <div>
        <Drop Responses={Responses} />
      </div>
      <div>
        <Display displayValue={displayValue} />
        <Buttons
          handleBackspace={handleBackspace}
          handleClear={handleClear}
          handleClick={handleClick}
          handleEvaluation={handleEvaluation}
          handlePercentage={handlePercentage}
          handleToggleSign={handleToggleSign}
        />
        <BackButton />
      </div>
    </div>
  );
}

export default Calculator;
