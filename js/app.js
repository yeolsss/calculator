// 전역변수
// 첫번째 숫자 배열
let firstNumArr = [];
let secondNumArr = [];
let operator = "";

// 숫자버튼 button event
const numBtns = document.querySelectorAll(".button");
numBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    const {
      currentTarget: { value },
    } = event;

    // 점이 없을때
    if (!firstNumArr.includes(".") || !secondNumArr.includes(".")) {
      if (
        (firstNumArr[0] === "0" || secondNumArr[0] === "0") &&
        value === "0"
      ) {
        return;
      }
    }

    // 0다음 dot 이 오지 않는다면.. 0을 삭제....
    // 연산자가 입력되었는지 확인 후 배열에 나눠서 숫자 받기
    operator === ""
      ? pushNum(firstNumArr, value)
      : pushNum(secondNumArr, value);
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
      if (operator === "") popNum(firstNumArr);
      else popNum(secondNumArr);
      return;
    }
    // 입력 받은 연산자가 clear일때
    if (value === "clear") {
      firstNumArr = [];
      secondNumArr = [];
      operator = "";
      pushNum(firstNumArr, "0");
      return;
    }

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
  printNum(numArr);
};

const removeZero = (numArr) => {
  numArr.shift();
  printNum(numArr);
};

const Person = (name, age) => {
  (this.name = name), (this.age = age);
};

const person1 = new Person();
