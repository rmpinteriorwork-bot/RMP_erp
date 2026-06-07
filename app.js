/* ==========================
   RMP ERP v1.1
   Customer + Project Module
========================== */

let customers =
JSON.parse(localStorage.getItem("customers")) || [];

let projects =
JSON.parse(localStorage.getItem("projects")) || [];

let quotations =
JSON.parse(localStorage.getItem("quotations")) || [];

let expenses =
JSON.parse(localStorage.getItem("expenses")) || [];

/* ==========================
   SAVE DATABASE
========================== */

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

/* ==========================
   DASHBOARD
========================== */

function updateDashboard(){

document.getElementById(
"totalCustomers"
).textContent =
customers.length;

document.getElementById(
"activeProjects"
).textContent =
projects.length;

document.getElementById(
"pendingQuotes"
).textContent =
quotations.length;

let totalExpense =
expenses.reduce(
(sum,item)=>
sum + Number(item.amount || 0),
0
);

document.getElementById(
"totalExpenses"
).textContent =
"₹" + totalExpense.toLocaleString();

}

/* ==========================
   CUSTOMER MODULE
========================== */

function addCustomer(){

const name =
document.getElementById(
"customerName"
).value.trim();

const phone =
document.getElementById(
"customerPhone"
).value.trim();

const address =
document.getElementById(
"customerAddress"
).value.trim();

if(!name){

alert("Enter Customer Name");

return;

}

customers.push({

id:Date.now(),

name:name,

phone:phone,

address:address

});

saveDatabase();

renderCustomers();

clearCustomerForm();

}

function renderCustomers(){

const container =
document.getElementById(
"customerCards"
);

container.innerHTML = "";

customers.forEach(customer=>{

container.innerHTML += `

<div class="customer-card">

<h4>${customer.name}</h4>

<p>${customer.phone}</p>

<p>${customer.address}</p>

<button
class="delete-btn"
onclick="deleteCustomer(${customer.id})">

Delete

</button>

</div>

`;

});

}

function deleteCustomer(id){

if(
!confirm(
"Delete this customer?"
)
)return;

customers =
customers.filter(
customer =>
customer.id !== id
);

saveDatabase();

renderCustomers();

}

function clearCustomerForm(){

document.getElementById(
"customerName"
).value="";

document.getElementById(
"customerPhone"
).value="";

document.getElementById(
"customerAddress"
).value="";

}

/* ==========================
   SEARCH CUSTOMER
========================== */

function searchCustomers(){

const keyword =
document.getElementById(
"customerSearch"
).value.toLowerCase();

const cards =
document.querySelectorAll(
".customer-card"
);

cards.forEach(card=>{

const text =
card.innerText.toLowerCase();

card.style.display =
text.includes(keyword)
? "block"
: "none";

});

}

/* ==========================
   PROJECT MODULE
========================== */

function addProject(){

const projectName =
document.getElementById(
"projectName"
).value.trim();

const clientName =
document.getElementById(
"clientName"
).value.trim();

const budget =
document.getElementById(
"projectBudget"
).value.trim();

if(!projectName){

alert(
"Enter Project Name"
);

return;

}

projects.push({

id:Date.now(),

projectName,

clientName,

budget,

status:"Active"

});

saveDatabase();

renderProjects();

clearProjectForm();

}

function renderProjects(){

const table =
document.getElementById(
"projectTable"
);

table.innerHTML = "";

projects.forEach(project=>{

table.innerHTML += `

<tr>

<td>
${project.projectName}
</td>

<td>
${project.clientName}
</td>

<td>
${project.status}
</td>

<td>
₹${project.budget}
</td>

<td>

<button
class="delete-btn"
onclick="deleteProject(${project.id})">

Delete

</button>

</td>

</tr>

`;

});

}

function deleteProject(id){

if(
!confirm(
"Delete this project?"
)
)return;

projects =
projects.filter(
project =>
project.id !== id
);

saveDatabase();

renderProjects();

}

function clearProjectForm(){

document.getElementById(
"projectName"
).value="";

document.getElementById(
"clientName"
).value="";

document.getElementById(
"projectBudget"
).value="";

}

/* ==========================
   JSON BACKUP
========================== */

function exportBackup(){

const data = {

customers,

projects,

quotations,

expenses

};

const blob =
new Blob(

[
JSON.stringify(
data,
null,
2
)
],

{
type:
"application/json"
}

);

const link =
document.createElement(
"a"
);

link.href =
URL.createObjectURL(
blob
);

link.download =
"RMP_Backup.json";

link.click();

}

/* ==========================
   IMPORT BACKUP
========================== */

function importBackup(event){

const file =
event.target.files[0];

if(!file) return;

const reader =
new FileReader();

reader.onload =
function(e){

const data =
JSON.parse(
e.target.result
);

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

reader.readAsText(
file
);

}

/* ==========================
   INITIALIZE
========================== */

window.onload =
function(){

updateDashboard();

renderCustomers();

renderProjects();

};
