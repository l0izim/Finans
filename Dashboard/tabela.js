const tbody = document.querySelector("tbody")
const descItem = document.querySelector("#desc")
const amount = document.querySelector("#amount")
const categ = document.querySelector("#categ")
const type = document.querySelector("#type")
const btnNew = document.querySelector("#btnNew")

const incomes = document.querySelector(".incomes");
const expenses = document.querySelector(".expenses");
const total = document.querySelector(".total");



let items;


btnNew.onclick = () => {
    // Verificar se os campos obrigatórios estão preenchidos
    if (descItem.value === "" || amount.value === "" || categ.value === "" || type.value === "") {
        alert("Preencha todos os campos!");
        return;
    }

    items.push({
        desc: descItem.value,
        amount: Math.abs(amount.value).toFixed(2),
        categ: categ.value,
        type: type.value,
      });

      
      setItensBD();
    
      loadItens();
    
      descItem.value = "";
      amount.value = "";
      categ.value = "";
    
}

function deleteItem(index) {
    items.splice(index, 1);
    setItensBD();
    loadItens();
}

function insertItem(item, index) {
    let tr = document.createElement("tr");
  
    tr.innerHTML = `
      <td class="uppercase" >${item.desc}</td>
      <td class="uppercase" >R$ ${item.amount}</td>
      <td class="uppercase" >${item.categ}</td>
      <td class="uppercase">
        ${item.type === "ENTRADA"
        ? '<i class="btn btn-success fa-solid fa-up-long"></i>'
        : '<i class="btn btn-danger fa-solid fa-down-long"></i>'}
        </td>
      <td class="uppercase" >
        <button onclick="deleteItem(${index})" class="btn btn-outline-danger">EXCLUIR DADOS</button>
      </td>
    `;
  
    tbody.appendChild(tr);
}

function loadItens() {
    items = getItensBD();
    tbody.innerHTML = "";
    items.forEach((item, index) => {
      insertItem(item, index);
    });
  
    getTotals();
}

function getTotals() {
    const amountIncomes = items
      .filter((item) => item.type === "ENTRADA")
      .map((transaction) => Number(transaction.amount));
  
    const amountExpenses = items
      .filter((item) => item.type === "SAIDA")
      .map((transaction) => Number(transaction.amount));
  
    const totalIncomes = amountIncomes
      .reduce((acc, cur) => acc + cur, 0)
      .toFixed(2);
  
    const totalExpenses = Math.abs(
      amountExpenses.reduce((acc, cur) => acc + cur, 0)
    ).toFixed(2);
  
    const totalItems = (totalIncomes - totalExpenses).toFixed(2);
  
    incomes.innerHTML = totalIncomes;
    expenses.innerHTML = totalExpenses;
    total.innerHTML = totalItems;
  }
  
  const getItensBD = () => JSON.parse(localStorage.getItem("db_items")) ?? [];
  const setItensBD = () =>
    localStorage.setItem("db_items", JSON.stringify(items));
  
  loadItens();
  




 