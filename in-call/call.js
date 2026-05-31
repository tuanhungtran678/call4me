const params =
new URLSearchParams(
location.search
);

const number =
params.get(
"number"
);

document
.getElementById(
"callNumber"
)
.textContent =
number ||
"Unknown";

const status =
document.getElementById(
"callStatus"
);

setTimeout(() => {

status.textContent =
"Connected";

}, 3000);

document
.getElementById(
"endBtn"
)
.onclick = () => {


location.href =
  "../calls/calls.html";


};
