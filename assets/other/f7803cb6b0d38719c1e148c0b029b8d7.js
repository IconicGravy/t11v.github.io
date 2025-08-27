// Ignore the horrid code :sob:
const targetLinks = {
    link1: "https://discordapp.com/users/1211838285887053885",
    link2: "https://www.tiktok.com/@trapbandito",
    link3: "https://www.roblox.com/users/718019838/profile",
    link4: "https://onlyfans.com/trapbandito"
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