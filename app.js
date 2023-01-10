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
  axios.post("https://crudcrud.com/api/49d000fcb46a48f68504d87f0d977683/ExpenseTrackerApp",obj)
    .then((res) => {
      showNewExpenseOnScreen(res.data);
      console.log(res);
    })
    .catch((error) => console.log(error));
}
window.addEventListener("DOMContentLoaded", () => {
  const localStorageObj = localStorage;
  axios.get("https://crudcrud.com/api/49d000fcb46a48f68504d87f0d977683/ExpenseTrackerApp")
    .then((res) => {
      console.log(res);
      for (var i = 0; i < res.data.length; i++) {
        showNewExpenseOnScreen(res.data[i]);
      }
    })
    .catch((error) => console.log(error));
});

function showNewExpenseOnScreen(Expense) {
  const parentNode = document.getElementById("onSubmit");

  const childHTML = `<li id=${Expense._id}>${Expense.Amount} - ${Expense.Breif} - ${Expense.List}
                         <button onClick=deleteExpense('${Expense._id}')>Delete Expense</button>
                         <button onClick=editExpenseDetails('${Expense.Amount}','${Expense.Breif}','${Expense.List}','${Expense._id}')>Edit Expense</button>
                         </li>`;
  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function editExpenseDetails(Amount, Breif, List, expenseId) {
  document.getElementById("Amount").value = Amount;
  document.getElementById("Description").value = Breif;
  document.getElementById("Category").value = List;
  deleteExpense(expenseId);
}

function deleteExpense(expenseId) {
  axios.delete(`https://crudcrud.com/api/49d000fcb46a48f68504d87f0d977683/ExpenseTrackerApp/${expenseId}`)
    .then((res) => {
      removeExpenseFromScreen(expenseId);
    })
    .catch((error) => console.log(error));
}

function removeExpenseFromScreen(expenseId) {
  const parentNode = document.getElementById("onSubmit");
  const childNodeToBeDeleted = document.getElementById(expenseId);
  parentNode.removeChild(childNodeToBeDeleted);
}
