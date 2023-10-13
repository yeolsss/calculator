// 전역변수
// 항상 입력받는 배열
let currentNumArr = ["0"];
// 연산자가 입력되면 nextNumArr에 값을 받아오는 배열
let prevNumArr = ["0"];
// 항상 결과값만 갖는 배열
let resultNumArr = ["0"];
// 연산자를 받는 변수
let operator = "";

// 숫자버튼 button event
const numBtns = document.querySelectorAll(".button");
numBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    const {
      currentTarget: { value },
    } = event;

    // 배열에 이미 '.'이 있고 value가 '.' 이면 아무 행동을하지 않고 종료.
    if (currentNumArr.includes(".") && value === ".") {
      return;
    }

    // 배열의 0번 index에 '0'이 있을때
    if (currentNumArr[0] === "0") {
      // 배열에 '.'이 없고 입력값이 '.'이 아닐때
      if (!currentNumArr.includes(".") && value !== ".") {
        removeZero(currentNumArr);
      }
    }

    pushNum(currentNumArr, value);
  });
});

// 연산자 버튼 button event
const operatorBtns = document.querySelectorAll(".operator");
operatorBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    const {
      currentTarget: { value },
    } = event;

    // 입력 받은 연산자가 delete일 때
    if (value === "delete") {
      popNum(resultNumArr);
      return;
    }
    // 입력 받은 연산자가 clear일때
    if (value === "clear") {
      prevNumArr = ["0"];
      currentNumArr = ["0"];
      resultNumArr = ["0"];
      printNum(resultNumArr);
      operator = "";
      return;
    }

    // 연산자 버튼이 'delete', 'clear'가 아닌 value가 들어왔을때
    // resultNumArr를 prevNumArr로 옮긴 후 resultNumArr 초기화
    // = 연산자가 입력되면 계산 시작 그게 아닐경우
    // resultNumArr의 요소를 prevNumArr로 할당 후 resultNumArr 초기화
    if (operator !== "") {
      const result = calculation();
      resultNumArr = [...(result + "")];
      prevNumArr = [...resultNumArr];
      currentNumArr = ["0"];
      if (value === "=") {
        printNum(resultNumArr);
        return;
      }
    } else {
      prevNumArr = [...currentNumArr];
      resultNumArr = [...currentNumArr];
      currentNumArr = ["0"];
    }

    printNum(resultNumArr);
    operator = value !== "=" ? value : "";
  });
});

// 결과 및 입력 받은 숫자 출력 span
const result = document.querySelector("#result");

// 입력받은 숫자 출력 함수
const printNum = (numArr) => {
  result.innerText = numArr
    .join("")
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * 입력 받은 숫자 배열에 push 함수
 * @param numArr
 * @param num
 */
const pushNum = (numArr, num) => {
  numArr.push(num);
  printNum(numArr);
};

/**
 * 숫자 삭제 pop 함수
 * @param numArr
 */
const popNum = (numArr) => {
  numArr.pop();
  numArr.length <= 0 && pushNum(numArr, "0");
  printNum(numArr);
};

/**
 * 배열 제일 앞의 요소가 '0'일 때 삭제하는 함수
 * @param numArr
 */
const removeZero = (numArr) => {
  numArr.shift();
  printNum(numArr);
};

const calculation = () => {
  switch (operator) {
    case "+":
      return (
        parseFloat(prevNumArr.join("")) + parseFloat(currentNumArr.join(""))
      );
    case "-":
      return (
        parseFloat(prevNumArr.join("")) - parseFloat(currentNumArr.join(""))
      );
    case "X":
      return (
        parseFloat(prevNumArr.join("") === "0" ? "1" : prevNumArr.join("")) *
        parseFloat(
          currentNumArr.join("") === "0" ? "1" : currentNumArr.join("")
        )
      );
    case "/":
      return (
        parseFloat(prevNumArr.join("") === "0" ? "1" : prevNumArr.join("")) /
        parseFloat(
          currentNumArr.join("") === "0" ? "1" : currentNumArr.join("")
        )
      );
  }
};
