let customers = JSON.parse(localStorage.getItem("customers")) || [];

function save() {
  localStorage.setItem("customers", JSON.stringify(customers));
}

function addCustomer() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;

  if (!name) return;

  customers.push({
    id: Date.now(),
    name,
    phone,
    email,
    purchases: 0,
    rewards: 0
  });

  save();
  render();
}

function addPurchase(id) {
  const c = customers.find(x => x.id === id);
  c.purchases++;

  if (c.purchases === 11) {
    alert(`${c.name} earned a FREE purchase!`);
    c.rewards++;
    c.purchases = 0;
  }

  save();
  render();
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  customers.forEach(c => {
    list.innerHTML += `
      <div class="card">
        <b>${c.name}</b><br>
        📞 ${c.phone}<br>
        📧 ${c.email}<br>
        Purchases: ${c.purchases}/11<br>
        Rewards Earned: ${c.rewards}<br>
        <button onclick="addPurchase(${c.id})">Add Purchase</button>
      </div>
    `;
  });
}

function exportCSV() {
  let csv = "Name,Phone,Email,Purchases,Rewards\n";
  customers.forEach(c => {
    csv += `${c.name},${c.phone},${c.email},${c.purchases},${c.rewards}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "customers.csv";
  a.click();
}

render();
