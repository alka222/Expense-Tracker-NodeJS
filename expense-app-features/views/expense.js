const myForm = document.getElementById('my-form');
const amountInput = document.getElementById('amount');
const descriptionInput = document.getElementById('description');
const categoryInput = document.getElementById('category');

const btn = document.getElementById('btn');


window.addEventListener('DOMContentLoaded', () => {

    axios.get('http://localhost:3000/expense/getexpenses')
    .then(response => {

        console.log(response.data);
        
        response.data.expenses.forEach(expense => {
            showExpenses(expense);
        });
    })
    .catch((err) => console.log(err));
})


// myForm.addEventListener('submit', addForm)

function saveexpense(event){
    event.preventDefault();

    let myExpenses = {
        amount : event.target.amount.value,
        description : event.target.description.value,
        category : event.target.category.value,
       
    }

    console.log(myExpenses);
    let serilized_Obj = JSON.stringify(myExpenses);

    axios.post('http://localhost:3000/expense/addexpense',myExpenses)
        .then((response) => {
            console.log(response.data.expense);
            showExpenses(response.data.expense);
        })
        .catch((err) => console.log(err))

    amountInput.value ='';
    descriptionInput.value= '';
    categoryInput.value= '';

}

function showExpenses(expense){

    console.log(expense);

    const parentEle = document.getElementById('expenses');
    const childEle = `<li id='${expense.id}'> ${expense.amount} : ${expense.description} : ${expense.category}

                        <button onclick = deleteExpense('${expense.id}')> Delete </button>
                        </li>`

    parentEle.innerHTML = parentEle.innerHTML + childEle;

}

function deleteExpense(expenseId){
    axios.delete(`http://localhost:3000/expense/deleteexpense/${expenseId}`)
            .then(() => {
                // console.log(' id ' + expenseId + ' expense deleted ');
                removeExpenseFromScreen(expenseId);
            })
            .catch((err) => console.log(err));
}


function removeExpenseFromScreen(expenseId){

    let parentNode = document.getElementById('expenses');
    let childNodeToBeDeleted = document.getElementById(expenseId);

    console.log(childNodeToBeDeleted);
    if(childNodeToBeDeleted){

        parentNode.removeChild(childNodeToBeDeleted);
     }
}