fetch("http://127.0.0.1:5000/api/equipment")
  .then(res => res.json())
  .then(data => {
    window.allEquipment = data;
    renderEquipment(data);
  });

const list = document.getElementById("equipment-list");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

function renderEquipment(items) {
  list.innerHTML = "";

  items.forEach(eq => {
    const percent = Math.round((eq.usage_hours / eq.maintenance_limit) * 100);

    let statusColor = {
      Good: "bg-emerald-500 text-emerald-400",
      Warning: "bg-amber-500 text-amber-400",
      Critical: "bg-red-600 text-red-400"
    }[eq.status];

    const card = document.createElement("div");
    card.className = "bg-slate-900 rounded-xl p-5 shadow-xl border border-white/5";

    card.innerHTML = `
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-semibold">${eq.name}</h3>
        <span class="px-3 py-1 text-xs rounded-full ${statusColor} bg-opacity-20">
          ${eq.status}
        </span>
      </div>

      <p class="text-xs text-slate-400 mb-2">${eq.code}</p>

      <p class="text-sm"><strong>Type:</strong> ${eq.type || "N/A"}</p>
      <p class="text-sm mb-3"><strong>Usage:</strong> ${eq.usage_hours} / ${eq.maintenance_limit} hrs</p>

      <div class="w-full bg-slate-800 rounded-full h-2 mb-4">
        <div class="h-2 rounded-full bg-emerald-500" style="width:${percent}%"></div>
      </div>

      <div class="flex gap-3">
        <button class="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded-lg">Edit</button>
        <button class="flex-1 bg-red-700 hover:bg-red-600 py-2 rounded-lg">Delete</button>
      </div>
    `;

    list.appendChild(card);
  });
}

searchInput.addEventListener("input", filterData);
statusFilter.addEventListener("change", filterData);

function filterData() {
  const q = searchInput.value.toLowerCase();
  const status = statusFilter.value;

  const filtered = allEquipment.filter(eq => {
    const matchText = eq.name.toLowerCase().includes(q);
    const matchStatus = status === "all" || eq.status === status;
    return matchText && matchStatus;
  });

  renderEquipment(filtered);
}
