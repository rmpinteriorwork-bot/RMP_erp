/* =========================
RMP INTERIOR ERP
app.js Version 1.0
========================= */

let customers =
JSON.parse(localStorage.getItem("customers")) || [];

let projects =
JSON.parse(localStorage.getItem("projects")) || [];

let quotations =
JSON.parse(localStorage.getItem("quotations")) || [];

let expenses =
JSON.parse(localStorage.getItem("expenses")) || [];

/* =========================
Save Database
========================= */

function saveDatabase(){

localStorage.setItem(
"customers",
JSON.stringify(customers)
);

localStorage.setItem(
"projects",
JSON.stringify(projects)
);

localStorage.setItem(
"quotations",
JSON.stringify(quotations)
);

localStorage.setItem(
"expenses",
JSON.stringify(expenses)
);

updateDashboard();

}

/* =========================
Dashboard
========================= */

function updateDashboard(){

const customerCount =
document.getElementById("totalCustomers");

if(customerCount){

customerCount.textContent =
customers.length;

}

const projectCount =
document.getElementById("activeProjects");

if(projectCount){

projectCount.textContent =
projects.length;

}

const quoteCount =
document.getElementById("pendingQuotes");

if(quoteCount){

quoteCount.textContent =
quotations.length;

}

const expenseCount =
document.getElementById("totalExpenses");

if(expenseCount){

let total =
expenses.reduce(
(sum,item)=>sum + Number(item.amount || 0),
0
);

expenseCount.textContent =
"₹" + total.toLocaleString();

}

}

/* =========================
Customer Module
========================= */

function addCustomer(){

const name =
prompt("Customer Name");

if(!name) return;

const phone =
prompt("Mobile Number");

const address =
prompt("Address");

customers.push({

id: Date.now(),

name:name,

phone:phone,

address:address

});

saveDatabase();

renderCustomers();

}

function renderCustomers(){

const container =
document.getElementById("customerCards");

if(!container) return;

container.innerHTML = "";

customers.forEach(customer=>{

const card =
document.createElement("div");

card.className =
"customer-card";

card.innerHTML = `

<h4>${customer.name}</h4>

<p>${customer.phone || ""}</p>

<p>${customer.address || ""}</p>

`;

container.appendChild(card);

});

}

/* =========================
Project Module
========================= */

function addProject(){

const projectName =
prompt("Project Name");

if(!projectName) return;

const clientName =
prompt("Client Name");

const budget =
prompt("Budget");

projects.push({

id:Date.now(),

projectName,

clientName,

budget,

status:"Active"

});

saveDatabase();

renderProjects();

}

function renderProjects(){

const table =
document.getElementById("projectTable");

if(!table) return;

table.innerHTML = "";

projects.forEach(project=>{

table.innerHTML += `

<tr>

<td>${project.projectName}</td>

<td>${project.clientName}</td>

<td>${project.status}</td>

<td>₹${project.budget || 0}</td>

</tr>

`;

});

}

/* =========================
Expense Module
========================= */

function addExpense(){

const title =
prompt("Expense Title");

const amount =
prompt("Amount");

expenses.push({

id:Date.now(),

title,

amount

});

saveDatabase();

}

/* =========================
Quotation Module
========================= */

function addQuotation(){

const customer =
prompt("Customer Name");

const amount =
prompt("Quotation Amount");

const quoteNo =
"RMP-QT-" + Date.now();

quotations.push({

quoteNo,

customer,

amount

});

saveDatabase();

}

/* =========================
JSON Backup
========================= */

function exportBackup(){

const data = {

customers,

projects,

quotations,

expenses

};

const blob =
new Blob(
[JSON.stringify(data,null,2)],
{
type:"application/json"
}
);

const link =
document.createElement("a");

link.href =
URL.createObjectURL(blob);

link.download =
"RMP_Backup.json";

link.click();

}

/* =========================
JSON Restore
========================= */

function importBackup(event){

const file =
event.target.files[0];

if(!file) return;

const reader =
new FileReader();

reader.onload = function(e){

const data =
JSON.parse(e.target.result);

customers =
data.customers || [];

projects =
data.projects || [];

quotations =
data.quotations || [];

expenses =
data.expenses || [];

saveDatabase();

renderCustomers();

renderProjects();

alert(
"Backup Restored Successfully"
);

};

reader.readAsText(file);

}

/* =========================
Initialize
========================= */

window.onload = function(){

updateDashboard();

renderCustomers();

renderProjects();

};
