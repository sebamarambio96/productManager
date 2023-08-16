const logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch("https://productmanager.up.railway.app/profile/logout")
        .then((res) => res.json())
        .then((res) => {
            if (res.message == "Logout OK") {
                Swal.fire({
                    icon: "success",
                    title: "Genial!",
                    text: `Ha cerrado sesión`,
                });
                localStorage.clear();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `No ha iniciado sesión aún`,
                });
            }
        });
});
