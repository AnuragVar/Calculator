import { useState } from "react";
import BackButton from "./BackButton";
import Buttons from "./Buttons";
import Display from "./Display";
import Drop from "./Dropdown";

function Calculator() {
  const [answer, setAnswer] = useState("");
  const [res, setRes] = useState("");
  const [Responses, setResponses] = useState([]);
  const [evaluated, setEvaluated] = useState(0);
  const maxHistoryItems = 2;
  //handle simple clicks
  function handleClick(e) {
    if (answer === "ERROR") return;
    let input = e.target.name;
    let newres = res + input;
    if (newres.length > 12) return;

    if (answer !== "") {
      setRes(answer + input);
      setAnswer("");
    } else {
      setRes(newres);
    }
  }

  //handle clear button
  function handleClear() {
    setRes("");
    setAnswer("");
  }

  //handle backspace
  function handleBackspace() {
    if (answer !== "") {
      setRes(answer.toString().slice(0, -1));
      setAnswer("");
    } else {
      setRes((res) => res.slice(0, -1));
    }
  }

  //handle =
  function handleEvaluation() {
    let Expression = res.replace(/x/g, "*");
    Expression = Expression.replace(/÷/g, "/");

    let result = 0;
    try {
      result = eval(Expression);
    } catch (error) {
      result = "ERROR";
    }

    if (result == "ERROR") setAnswer(result);
    else {
      result = Number(result.toFixed(3));
      const formattedResult =
        result.toString().length > 11
          ? result.toExponential(2)
          : result.toString();
      setAnswer(formattedResult);
      setEvaluated(true);
      setResponses((Responses) => [
        {
          expression: res,
          result: formattedResult,
        },
        ...Responses.slice(0, maxHistoryItems - 1),
      ]);
    }
  }

  //handle +-
  const handleToggleSign = () => {
    if (answer === "ERROR") return;
    if (answer !== "") {
      setRes(answer.startsWith("-") ? answer.slice(1) : `-${answer}`);
    } else {
      setRes(res.startsWith("-") ? res.slice(1) : `-${res}`);
    }
    // Toggle the sign of the current input
    // if (res === "0") return;
    // //if the expression is 0 only.
    // setRes((res) => (res.startsWith("-") ? res.slice(1) : `-${res}`));
  };
  function handlePercentage() {
    const lastCharIsOperator = /[+\-x÷%.]$/.test(res);
    if (lastCharIsOperator) return;

    const sanitizedExpression = res.replace(/x/g, "*");
    const sanitizedExpression2 = sanitizedExpression.replace(/÷/g, "/");
    const result = eval(sanitizedExpression2);

    const parsedInput = parseFloat(result);
    if (isNaN(parsedInput)) {
      setAnswer("ERROR");
      return;
    }
    const percentageResult = parsedInput * 0.01;
    const precision = (percentageResult.toString().split(".")[1] || "").length;
    setAnswer(percentageResult.toFixed(precision));
    setRes("");
  }

  const isDigit = /^[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?$/.test(answer); // Check if answer is a digit

  let displayValue;
  if (isDigit && !answer.includes("e")) {
    const floatValue = parseFloat(answer);
    if (floatValue % 1 === 0) {
      displayValue = parseInt(answer).toString(); // Remove decimal places for integers
    } else {
      displayValue = floatValue.toFixed(
        Math.min(12, answer.split(".")[1]?.length || 0)
      );
    }
  } else {
    displayValue = answer.slice(-12); // Show only last 7 characters for expressions
  }
  if (answer === "") displayValue = "";

  return (
    <div className="keypad">
      <Drop Responses={Responses} />
      <Display displayValue={displayValue} input={res} />
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
  );
}

export default Calculator;
