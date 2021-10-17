/**
 * Global variables
 */
const transactions = [];

/**
 * Listeners
 */
const addFormListener = () => {
    const form = document.querySelector("#add-transaction-form");
    
    form.addEventListener("submit",  (e) => {
      e.preventDefault();

      const data = new FormData(form);
    
      const conceptInput = data.get("concept");
      const amountInput = data.get("amount");

      if(!areValidFields(conceptInput, amountInput)) return;

      addTransaction(conceptInput, amountInput);
      renderTransactions();
      
      form.reset();
    })
}

/**
 * Validators
 */
const areValidFields = (concept, amount) => {

    if(!(concept && amount)) return false;

    const amountNumber = Number(amount);

    if(isNaN(amountNumber)) return false;
    
    return true;

}

/**
 * Logic fuctions
 */
const addTransaction = (concept, amount) => {
    const newTransaction = {
        id: `Tsc_${new Date().getTime()}`,
        concept: concept,
        amount: Number(amount),
    }

    transactions.unshift(newTransaction);
}

/**
 * Funciones Render
 */
const renderListElement = (concept = "", amount = 0) => {
    return `
    <li>
        <div>
            <p>${concept}</p>
            <p>Concepto</p>
        </div>
                    
        <div>
            <p>$ ${amount.toFixed(2)}</p>
            <p>Monto</p>
        </div>
    </li>
    \n
    `
} 

const renderTransactions = () => {
    const transactionsList = document.getElementById("transactions");
    const resultTitle = document.querySelector("#result-container h3");
    const resultAmount = document.querySelector("#result-container p");
    let totalAmount = 0;
    
    const transactionsHTML = transactions.reduce((acc, current) => {
        const { concept, amount } = current;
        
        totalAmount += amount;
        
        return acc + `${renderListElement(concept, amount)}`;
    }, '')

    transactionsList.innerHTML = transactionsHTML;
    
    resultTitle.textContent = totalAmount < 0 ? "Debes" : "Tienes";
    resultAmount.textContent = `$ ${totalAmount.toFixed(2)}`;
}

/**
 * Función principal
 */
const App = () => {
    addFormListener();
}

window.onload = App;