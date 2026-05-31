const friendNumber =
document.getElementById(
"friendNumber"
);

const addFriendBtn =
document.getElementById(
"addFriendBtn"
);

const friendsList =
document.getElementById(
"friendsList"
);

const backBtn =
document.getElementById(
"backBtn"
);

let friends =
JSON.parse(
localStorage.getItem(
"friends"
) || "[]"
);

function renderFriends(){

friendsList.innerHTML =
"";

friends.forEach(
friend => {

 
  const div =
    document.createElement(
      "div"
    );

  div.className =
    "friend";

  div.innerHTML =
  `
    <span>
      📞 ${friend}
    </span>

    <button
      class="callFriendBtn"
      data-number="${friend}"
    >
      Call
    </button>
  `;

  friendsList.appendChild(
    div
  );

}
 

);

document
.querySelectorAll(
".callFriendBtn"
)
.forEach(
button => {

 
    button.onclick =
      () => {

        const number =
          button.dataset.number;

        location.href =
          `../dial/dial.html?number=${number}`;

      };

  }
);
 

}

renderFriends();

addFriendBtn.onclick =
() => {

 
const number =
  friendNumber.value.trim();

if(!number){

  alert(
    "Nhập Call4me Number!"
  );

  return;
}

friends.push(
  number
);

localStorage.setItem(
  "friends",
  JSON.stringify(
    friends
  )
);

friendNumber.value =
  "";

renderFriends();
 

};

backBtn.onclick =
() => {

 
location.href =
  "../home-screen/home.html";
 

};
