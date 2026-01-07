fetch("http://127.0.0.1:5000/api/alerts")
  .then(res => res.json())
  .then(data => renderAlerts(data))
  .catch(err => console.error("Alert error:", err));


function renderAlerts(alerts) {
  const container = document.getElementById("alert-list");
  container.innerHTML = "";

  if (alerts.length === 0) {
    container.innerHTML =
      "<p class='text-slate-400'>No active alerts 🎉</p>";
    return;
  }

  alerts.forEach(a => {
    const color =
      a.status === "Critical"
        ? "border-red-500 text-red-400"
        : "border-amber-400 text-amber-400";

    const card = document.createElement("div");
    card.className =
      `bg-slate-900 border-l-4 ${color} p-5 rounded-xl`;

    card.innerHTML = `
      <h3 class="font-semibold mb-1">
        ${a.name} (${a.code})
      </h3>

      <p class="text-sm mb-1">
        Status: <strong>${a.status}</strong>
      </p>

      <p class="text-sm text-slate-400">
        Usage: ${a.usage_hours} / ${a.maintenance_limit} hrs
      </p>
    `;

    container.appendChild(card);
  });
}
