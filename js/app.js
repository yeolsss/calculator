// button에 addEventListener 생성
const numBtn = document.querySelectorAll(".button");
const operatorBtn = document.querySelectorAll(".operator");

// 결과 span
const resultSpan = document.querySelector(".result");

// 현재 상태 type
const currentType = document.querySelector("#current_type");

// 연산자 저장
let currentOperator = "";
let waitingOperator = "";

// 대기 값, 결과 값
let currentNumber = "0";
let resultNumber = "0";

//숫자 버튼 클릭 '.' 포함
numBtn.forEach((item) => {
  item.addEventListener("click", (event) => {
    if (currentType.value !== "0") {
      currentType.value = "0";
      printResult("");
    }

    // 현재 숫자
    currentNumber = String(currentNumber) + event.target.innerText;
    if (!currentNumber.includes(".")) {
      if (currentNumber.charAt("0") === "0")
        currentNumber = currentNumber.substring(1);
    }
    printResult(currentNumber);
  });
});

//연산자 버튼 클릭
operatorBtn.forEach((item) => {
  item.addEventListener("click", (event) => {
    waitingOperator = currentOperator;
    currentOperator = event.target.innerText;

    // currentOperator가 clear 이면 모든걸 초기화한다.
    if (currentOperator === "clear") {
      calculator(currentOperator, resultNumber, currentNumber);
      return;
    }

    // currentOperator가 = 이면 waitingOperator에 있는 연산을 하고 waitingOperator를 초기
    if (currentOperator === "=") {
      calculator(waitingOperator, resultNumber, currentNumber);
      waitingOperator = "";
      return;
    }

    if (waitingOperator === "") {
      resultNumber = currentNumber;
      printResult(resultNumber);
      currentNumber = "0";
      currentType.value = "1";
    } else {
      calculator(waitingOperator, resultNumber, currentNumber);
    }
  });
});

// 결과 출력 함수
const printResult = (num) => {
  const option = {
    maximumFractionDigits: 6,
  };
  num = num === "" ? "0" : num;
  resultSpan.innerText = num
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

// currentNum, type 초기화
const resetCurrentState = () => {
  currentType.value = "1";
  currentNumber = 0;
};

const delDot = (num) => {
  if (num.length > 0) {
    if (num.charAt(num.length - 1) === ".")
      return num.substring(0, num.length - 1);
    else return num;
  } else {
    return "0";
  }
};

const calculator = (operator, operatorNum1, operatorNum2) => {
  operatorNum1 = delDot(operatorNum1);
  operatorNum2 = delDot(operatorNum2);

  switch (operator) {
    case "+":
      resultNumber = String(
        parseFloat(operatorNum1) + parseFloat(operatorNum2)
      );
      printResult(resultNumber);
      resetCurrentState();
      break;
    case "-":
      resultNumber = String(
        parseFloat(operatorNum1) - parseFloat(operatorNum2)
      );
      printResult(resultNumber);
      resetCurrentState();
      break;
    case "X":
      resultNumber = String(
        parseFloat(operatorNum1) * parseFloat(operatorNum2)
      );
      printResult(resultNumber);
      resetCurrentState();
      break;
    case "/":
      resultNumber = String(
        parseFloat(operatorNum1) / parseFloat(operatorNum2)
      );
      printResult(resultNumber);
      resetCurrentState();
      break;
    case "=":
      printResult(resultNumber);
      break;
    case ".":
      currentNumber = operatorNum2 + ".";
      printResult(currentNumber);
      break;
    case "clear":
      resultNumber = "0";
      currentNumber = "0";
      currentOperator = "";
      waitingOperator = "";
      currentType.value = "0";
      printResult(0);
      break;
    default:
      resultNumber = operatorNum2;
      printResult(resultNumber);
      resetCurrentState();

      break;
  }
};
