function saveToLocalStorage(event) {
  event.preventDefault();
  const Amount = event.target.Amount.value;
  const Breif = event.target.Description.value;
  const List = event.target.Category.value;
  const obj = {
    Amount,
    Breif,
    List,
  };
  axios.post("https://crudcrud.com/api/88c3965a21f34da2b3d30ea15b58a8e2/ExpenseTrackerApp",obj)
    .then((res) => {
      showNewUserOnScreen(res.data);
      console.log(res);
    })
    .catch((error) => console.log(error));
}
window.addEventListener("DOMContentLoaded", () => {
  const localStorageObj = localStorage;
  const localstoragekeys = Object.keys(localStorageObj);
  axios.get("https://crudcrud.com/api/88c3965a21f34da2b3d30ea15b58a8e2/ExpenseTrackerApp")
    .then((res) => {
      console.log(res);
      for (var i = 0; i < res.data.length; i++) {
        showNewUserOnScreen(res.data[i]);
      }
    })
    .catch((error) => console.log(error));
});

function showNewUserOnScreen(User) {
  const parentNode = document.getElementById("onSubmit");

  const childHTML = `<li id=${User._id}>${User.Amount}-${User.Breif}-${User.List}
                       <button onClick=deleteUser('${User._id}')>DeleteUser</button>
                       <button onClick=editUserDetails('${User.Amount}','${User.Breif}','${User.List}','${User._id}')>EditUser</button>
                       </li>`;
  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function editUserDetails(Amount, Breif, List, userId) {
  document.getElementById("Amount").value = Amount;
  document.getElementById("Description").value = Breif;
  document.getElementById("Category").value = List;
  deleteUser(userId);
}

function deleteUser(userId) {
  axios.delete(`https://crudcrud.com/api/88c3965a21f34da2b3d30ea15b58a8e2/ExpenseTrackerApp/${userId}`)
    .then((res) => {
      removeUserFromScreen(userId);
    })
    .catch((error) => console.log(error));
}

function removeUserFromScreen(userId) {
  const parentNode = document.getElementById("onSubmit");
  const childNodeToBeDeleted = document.getElementById(userId);
  parentNode.removeChild(childNodeToBeDeleted);
}
