/* =========================
   ELEMENTS
========================= */

const numberInput =
  document.getElementById(
    "numberInput"
  );

const callBtn =
  document.getElementById(
    "callBtn"
  );

const deleteBtn =
  document.getElementById(
    "deleteBtn"
  );

const status =
  document.getElementById(
    "status"
  );

const keypadButtons =
  document.querySelectorAll(
    ".keypad button"
  );

/* =========================
   KEYPAD
========================= */

keypadButtons.forEach(
  button => {

    button.addEventListener(
      "click",

      () => {

        const key =
          button.dataset.key;

        numberInput.value +=
          key;

      }
    );

  }
);

/* =========================
   DELETE
========================= */

deleteBtn.addEventListener(
  "click",

  () => {

    numberInput.value =
      numberInput.value.slice(
        0,
        -1
      );

  }
);

/* =========================
   CALL
========================= */

callBtn.addEventListener(
  "click",

  () => {

    const number =
      numberInput.value.trim();

    if (!number) {

      status.textContent =
        "⚠️ Hãy nhập số Call4me";

      return;
    }

    status.textContent =
      `📞 Đang gọi ${number}...`;

    console.log(
      "Calling:",
      number
    );

    /* =====================
       MOCK CALL
    ===================== */

setTimeout(() => {

  location.href =
    `../in-call/call.html?number=${encodeURIComponent(number)}`;

}, 1000);

  }
);

/* =========================
   ENTER SUPPORT
========================= */

document.addEventListener(
  "keydown",

  event => {

    if (
      event.key >= "0" &&
      event.key <= "9"
    ) {

      numberInput.value +=
        event.key;
    }

    if (
      event.key === "*"
    ) {

      numberInput.value += "*";
    }

    if (
      event.key === "#"
    ) {

      numberInput.value += "#";
    }

    if (
      event.key ===
      "Backspace"
    ) {

      numberInput.value =
        numberInput.value.slice(
          0,
          -1
        );
    }

    if (
      event.key ===
      "Enter"
    ) {

      callBtn.click();
    }

  }
);

const dialBtn =
  document.getElementById(
    "dialBtn"
  );

if (dialBtn) {

  dialBtn.onclick = () => {

    location.href =
      "../dial/dial.html";

  };

}