const navbar = document.querySelector(".navbar");



document.addEventListener("DOMContentLoaded", () => {
    const navbarCollapse = document.getElementById("navbarNavAltMarkup");
    const mainContent = document.getElementById("mainContent");

    if (!navbarCollapse || !mainContent) return;

    // When navbar expands (mobile toggle open)
    navbarCollapse.addEventListener("shown.bs.collapse", () => {
        mainContent.style.marginTop = "200px"; // optional spacing
        mainContent.style.borderTop = "1px solid #ccc";
        navbar.classList.remove("nav-nature");
    });

    // When navbar collapses (mobile toggle close)
    navbarCollapse.addEventListener("hidden.bs.collapse", () => {
        mainContent.style.marginTop = "0";
        mainContent.style.borderTop = "none";
        navbar.classList.add("nav-nature");

    });
});
