const logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/profile/logout")
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
