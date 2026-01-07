fetch("http://127.0.0.1:5000/api/maintenance")
  .then(res => res.json())
  .then(data => renderMaintenance(data))
  .catch(err => console.error("Maintenance error:", err));


function renderMaintenance(records) {
  const container = document.getElementById("maintenance-list");
  container.innerHTML = "";

  if (records.length === 0) {
    container.innerHTML =
      "<p class='text-slate-400'>No maintenance records found.</p>";
    return;
  }

  records.forEach(r => {
    const card = document.createElement("div");

    card.className =
      "bg-slate-900 border border-white/5 rounded-xl p-5";

    card.innerHTML = `
      <div class="flex justify-between items-center mb-2">
        <h3 class="font-semibold">${r.maintenance_type}</h3>
        <span class="text-xs text-slate-400">${r.service_date}</span>
      </div>

      <p class="text-sm text-slate-300 mb-1">
        <strong>Equipment ID:</strong> ${r.equipment_id}
      </p>

      <p class="text-sm text-slate-300 mb-1">
        <strong>Technician:</strong> ${r.technician}
      </p>

      <p class="text-sm text-slate-300 mb-1">
        <strong>Usage at Service:</strong> ${r.usage_at_service} hrs
      </p>

      <p class="text-sm text-slate-400 mt-2">
        ${r.description}
      </p>
    `;

    container.appendChild(card);
  });
}
