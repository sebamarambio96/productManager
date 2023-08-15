fetch("http://localhost:8080/profile/current")
    .then((res) => res.json())
    .then((res) => {
        if (res.role === "admin") {
            const adminPanel = document.getElementById("adminPanel");
            adminPanel.classList.remove("hidden");
        }
    });
