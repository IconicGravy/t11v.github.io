// Ignore the horrid code :sob:
const targetLinks = {
    link1: "https://discordapp.com/users/1091592149105135686",
    link2: "https://www.instagram.com/ironic.gravy/",
    link3: "https://files.t11v.icu/photos/absolute-cinema-v0-d2wig7n6p5be1.png"
};

// Add click event for each link
Object.keys(targetLinks).forEach(id => {
const linkEl = document.getElementById(id);
    linkEl.style.cursor = "pointer"; // make it look clickable
    linkEl.addEventListener("click", (event) => {
        event.preventDefault(); // prevent default anchor behavior
        window.open(targetLinks[id], "_blank"); // redirect
    });
});