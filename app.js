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
      .catch(error => console.log(error));
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
      .catch(error => console.log(error));
  });

