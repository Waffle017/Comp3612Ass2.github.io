document.addEventListener("DOMContentLoaded", () => {
    let aboutOpen = document.querySelector("#about-open");
    let aboutDialog = document.querySelector(".about-dialog");

    aboutOpen.addEventListener("click", () =>{
        aboutDialog.showModal();
    })
});