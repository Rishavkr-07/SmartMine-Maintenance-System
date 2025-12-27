fetch("http://127.0.0.1:5000/api/equipment")
    .then(response => response.json())
    .then(data => {
        const equipmentList = document.getElementById("equipment-list");
        equipmentList.innerHTML = "";

        // Summary counters
        let total = data.length;
        let good = 0;
        let warning = 0;
        let critical = 0;

        data.forEach(item => {

            // Count statuses
            if (item.status === "Good") good++;
            if (item.status === "Warning") warning++;
            if (item.status === "Critical") critical++;

            // Create equipment card
            const card = document.createElement("div");
            card.classList.add("equipment-card");

            if (item.status === "Good") card.classList.add("good");
            if (item.status === "Warning") card.classList.add("warning");
            if (item.status === "Critical") card.classList.add("critical");

            card.innerHTML = `
                <h3>${item.name}</h3>
                <p><strong>Status:</strong> ${item.status}</p>
                <p><strong>Usage:</strong> ${item.usage_hours} / ${item.maintenance_limit} hrs</p>
            `;

            equipmentList.appendChild(card);
        });

        // Update summary UI
        document.getElementById("total-count").textContent = total;
        document.getElementById("good-count").textContent = good;
        document.getElementById("warning-count").textContent = warning;
        document.getElementById("critical-count").textContent = critical;
    })
    .catch(error => {
        console.error("Error fetching equipment:", error);
    });
