let taxSwitch = document.querySelector("#switchCheckDefault");
taxSwitch.addEventListener("click", () => {
    let all_tax_info = document.querySelectorAll(".tax-info");
    for (tax_info of all_tax_info) {

        if (tax_info.style.display !== "inline") {
            tax_info.style.display = "inline"
        } else {
            tax_info.style.display = "none"
        }
    }
});