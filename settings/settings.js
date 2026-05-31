import { auth } from "../firebase.js";

import {
onAuthStateChanged,
updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const avatarPreview =
document.getElementById(
"avatarPreview"
);

const displayName =
document.getElementById(
"displayName"
);

const callNumber =
document.getElementById(
"callNumber"
);

const generateBtn =
document.getElementById(
"generateBtn"
);

const saveBtn =
document.getElementById(
"saveBtn"
);

const backBtn =
document.getElementById(
"backBtn"
);

let currentUser = null;

function generateNumber(){

let result = "";

for(
let i = 0;
i < 12;
i++
){


result +=
  Math.floor(
    Math.random() * 10
  );

}

return result;
}

onAuthStateChanged(
auth,

user => {

if(!user){

  location.href =
    "../login.html";

  return;
}

currentUser = user;

avatarPreview.src =
  user.photoURL ||
  "https://ui-avatars.com/api/?name=User";

displayName.value =
  user.displayName ||
  "";

const savedNumber =
  localStorage.getItem(
    "call4meNumber"
  );

callNumber.value =
  savedNumber ||
  generateNumber();

}
);

generateBtn.onclick =
() => {


callNumber.value =
  generateNumber();


};

saveBtn.onclick =
async () => {


try{

  await updateProfile(
    currentUser,
    {
      displayName:
        displayName.value
    }
  );

  localStorage.setItem(
    "call4meNumber",
    callNumber.value
  );

  alert(
    "Đã lưu!"
  );

}

catch(error){

  console.error(
    error
  );

  alert(
    "Lỗi khi lưu!"
  );

}

};

backBtn.onclick =
() => {


location.href =
  "../home-screen/home.html";

};
