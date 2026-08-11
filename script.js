// Default team data
let team = JSON.parse(localStorage.getItem("teamMembers"));

if (!team) {
    team = [
        {
            id: 1,
            name: "Alex Rivers",
            role: "Senior Developer",
            available: true
        },
        {
            id: 2,
            name: "Samantha Chen",
            role: "UI/UX Designer",
            available: false
        },
        {
            id: 3,
            name: "Jordan Taylor",
            role: "Project Manager",
            available: true
        },
        {
            id: 4,
            name: "Maria Garcia",
            role: "Marketing Lead",
            available: false
        }
    ];

    localStorage.setItem("teamMembers", JSON.stringify(team));
}

let currentFilter = "all";

// Display members
function renderMembers() {

    const list = document.getElementById("teamList");
    const search = document.getElementById("search").value.toLowerCase();

    list.innerHTML = "";

    let filtered = team.filter(member => {

        let statusMatch =
            currentFilter === "all" ||
            (currentFilter === "available" && member.available) ||
            (currentFilter === "busy" && !member.available);

        let searchMatch =
            member.name.toLowerCase().includes(search);

        return statusMatch && searchMatch;

    });

    filtered.forEach(member => {

        list.innerHTML += `
        <div class="member">

            <div class="info">

                <h3>${member.name}</h3>

                <p>${member.role}</p>

            </div>

            <div class="status">

                <span class="status-text ${member.available ? "available" : "busy"}">

                    ${member.available ? "AVAILABLE" : "BUSY"}

                </span>

                <button
                    class="toggle-btn"
                    onclick="toggleStatus(${member.id})">

                    Toggle

                </button>

            </div>

        </div>
        `;

    });

    updateStats();
}

// Toggle availability
function toggleStatus(id) {

    team = team.map(member => {

        if (member.id === id) {

            member.available = !member.available;

        }

        return member;

    });

    localStorage.setItem("teamMembers", JSON.stringify(team));

    document.getElementById("message").innerHTML =
        "✅ Status Updated Successfully!";

    setTimeout(() => {

        document.getElementById("message").innerHTML = "";

    }, 2000);

    renderMembers();
}

// Statistics
function updateStats() {

    document.getElementById("totalCount").innerText =
        team.length;

    document.getElementById("availableCount").innerText =
        team.filter(m => m.available).length;

    document.getElementById("busyCount").innerText =
        team.filter(m => !m.available).length;
}

// Filter
function filterMembers(type) {

    currentFilter = type;

    renderMembers();
}

// Search
document.getElementById("search").addEventListener("keyup", () => {

    renderMembers();

});

// First Load
renderMembers();