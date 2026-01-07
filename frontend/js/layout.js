// js/layout.js
export function loadSidebar(active) {
  const sidebar = document.getElementById("sidebar");

  sidebar.innerHTML = `
  <aside class="w-72 bg-slate-900 border-r border-white/5 flex flex-col justify-between p-6">

    <!-- TOP -->
    <div>
      <!-- Brand -->
      <div class="flex items-center gap-3 mb-8">
        <div class="bg-amber-400 text-black rounded-lg p-2">
          ⛏️
        </div>
        <div>
          <h2 class="text-lg font-bold text-white">SmartMine</h2>
          <p class="text-xs text-slate-400">Maintenance System</p>
        </div>
      </div>

      <!-- User -->
      <div class="flex items-center gap-3 mb-8">
        <div class="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
          R
        </div>
        <div>
          <p class="text-sm">rishav4950@gmail.com</p>
          <p class="text-xs text-emerald-400">Admin</p>
        </div>
      </div>

      <!-- NAV -->
      <nav class="space-y-2">
        ${navItem("Dashboard", "dashboard.html", active === "dashboard")}
        ${navItem("Equipment", "equipment.html", active === "equipment")}
        ${navItem("Alerts", "alerts.html", active === "alerts")}
      </nav>
    </div>

    <!-- BOTTOM -->
    <div class="space-y-4">
      <div class="bg-slate-800 rounded-lg px-4 py-3 text-sm text-emerald-400">
        ● All Systems Online
      </div>

      <button class="w-full text-left text-slate-400 hover:text-red-400 text-sm">
        ⎋ Sign Out
      </button>
    </div>

  </aside>
  `;
}

function navItem(label, link, active) {
  return `
    <a href="${link}"
       class="flex items-center gap-3 px-4 py-3 rounded-lg
       ${active ? "bg-amber-400/10 text-amber-400" : "text-slate-300 hover:bg-white/5"}">
      ${label}
    </a>
  `;
}
