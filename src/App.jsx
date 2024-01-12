import { useState } from "react";
import "./App.css";

function App() {
  const [res, setRes] = useState("");
  const [Responses, setResponses] = useState([null]);
  const [isOpen, setIsOpen] = useState(0);

  const displayValue = res.slice(-8);

  //handle simple clicks
  function handleClick(e) {
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
    const newValueIsOperator = /[+\-x÷%.]/.test(e.target.name);
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
        result.toString().length > 8
          ? result.toExponential()
          : result.toString();
      setRes(formattedResult);
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
    <div>
      {!isOpen && (
        <Iphone>
          <div className="screen"></div>
          <div className="icons front">
            <div className="app" onClick={() => setIsOpen(!isOpen)}></div>
            <div className="app"></div>
            <div className="app"></div>
            <div className="app"></div>
          </div>
          <div className="icons">
            <div className="app_2_row"></div>
            <div className="app_2_row"></div>
            <div className="app_2_row"></div>
            <div className="app_2_row"></div>
          </div>
          <div className="icons">
            <div className="app_3_row"></div>
            <div className="app_3_row"></div>
            <div className="app_3_row"></div>
            <div className="app_3_row"></div>
          </div>
          <div className="icons">
            <div className="app_4_row"></div>
            <div className="app_4_row"></div>
            <div className="app_4_row"></div>
            <div className="app_4_row"></div>
          </div>
          <div className="notch">
            <div className="camera"></div>
            <div className="speaker"></div>
          </div>
        </Iphone>
      )}
      {isOpen && (
        <Iphone>
          <div className="keypad">
            <input type="" value={displayValue} readOnly></input>
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
            <div className="line" onClick={() => setIsOpen(!isOpen)}></div>
          </div>
        </Iphone>
      )}
    </div>
  );
}
function Iphone({ children }) {
  return <div className="iphone">{children}</div>;
}
export default App;
// setting res when you are writing new value after getting an answer
//using responses and displaying that
//2x10 then if we apply %
//we are not able to put . in 2.5*3. this dot done
// 8/9 it gives 88888e-1
