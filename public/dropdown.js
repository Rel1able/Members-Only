let dropDownBtn = document.querySelector(".dropdown-btn");
let dropDownContent = document.querySelector(".dropdown-content");
dropDownBtn.addEventListener("click", () => {
    dropDownContent.classList.toggle("show");
    console.log("showed");
})