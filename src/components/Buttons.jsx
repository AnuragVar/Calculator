import { useState } from "react";

function Buttons({ res, setRes }) {
  const [Responses, setResponses] = useState([null]);
  const [evaluated, setEvaluated] = useState(0);
  //handle simple clicks
  function handleClick(e) {
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
        ...Responses,
        {
          res: res,
          formattedResult: formattedResult,
        },
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

  return (
    <div className="buttons">
      <button onClick={handleClear}>AC</button>
      <button onClick={handleBackspace} name="">
        C
      </button>
      <button onClick={handlePercentage} name="%">
        %
      </button>
      <button onClick={handleClick} name="÷" className="orange">
        ÷
      </button>
      <button onClick={handleClick} name="7">
        7
      </button>
      <button onClick={handleClick} name="8">
        8
      </button>
      <button onClick={handleClick} name="9">
        9
      </button>
      <button onClick={handleClick} name="x" className="orange">
        &times;
      </button>
      <button onClick={handleClick} name="4">
        4
      </button>
      <button onClick={handleClick} name="5">
        5
      </button>
      <button onClick={handleClick} name="6">
        6
      </button>
      <button onClick={handleClick} name="-" className="orange">
        -
      </button>
      <button onClick={handleClick} name="1">
        1
      </button>
      <button onClick={handleClick} name="2">
        2
      </button>
      <button onClick={handleClick} name="3">
        3
      </button>
      <button onClick={handleClick} name="+" className="orange">
        +
      </button>
      <button onClick={handleClick} name="0">
        0
      </button>
      <button onClick={handleToggleSign}>+/-</button>
      <button onClick={handleClick} name=".">
        .
      </button>
      <button onClick={handleEvaluation} className="orange">
        =
      </button>
    </div>
  );
}

export default Buttons;
