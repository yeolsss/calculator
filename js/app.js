// 전역변수
// 첫번째 숫자 배열
const prevNumArr = [];
const resultNumArr = [];
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
    if (resultNumArr.includes(".") && value === ".") {
      return;
    }

    // 배열의 0번 index에 '0'이 있을때
    if (resultNumArr[0] === "0") {
      // 배열에 '.'이 없고 입력값이 '.'이 아닐때
      if (!resultNumArr.includes(".") && value !== ".") {
        removeZero(resultNumArr);
      }
    }

    pushNum(resultNumArr, value);
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
      removeArrElement(prevNumArr);
      removeArrElement(resultNumArr);
      operator = "";
      pushNum(resultNumArr, "0");
      return;
    }

    // 연산자 버튼이 'delete', 'clear'가 아닌 value가 들어왔을때
    // resultNumArr를 prevNumArr로 옮긴 후 resultNumArr 초기화

    operator = value;
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
 * 배열 요소 삭제 함수
 * @param numArr
 */
const removeArrElement = (numArr) => {
  numArr.splice(0, numArr.length);
};

/**
 * 배열 제일 앞의 요소가 '0'일 때 삭제하는 함수
 * @param numArr
 */
const removeZero = (numArr) => {
  numArr.shift();
  printNum(numArr);
};

const calculation = () => {};
