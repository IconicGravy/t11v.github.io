// Code explained to help developers contribute and to help skids understand what they're skidding.

// --- Protect Images --- //

// Create a <style> element to add CSS rules dynamically
const style = document.createElement("style");

// Add CSS rules to prevent user interactions on all images:
// pointer-events: none disables mouse events on images (e.g., right-click, drag)
// user-select: none prevents selecting the image content (no text/image selection)
style.textContent = `
    img {
        pointer-events: none; /* No right-click, no drag */
        user-select: none;    /* Can't select */
    }
`;

// Append the style element into <head> so CSS applies to the page
document.head.appendChild(style);

// Listen for right-click (contextmenu) events on the entire document
document.addEventListener('contextmenu', function(e) {
    // If the right-click target is an image (<img> element)
    if (e.target.tagName === 'IMG') {
        e.preventDefault();  // Prevent the default context menu from appearing
        alert("Image protection: Right-click disabled."); // Show alert warning
    }
});

// Listen for drag start events (when user tries to drag something)
document.addEventListener('dragstart', function(e) {
    // Prevent dragging images to block saving or dragging them out
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Listen for copy events (when user tries to copy content)
document.addEventListener('copy', function(e) {
    // Prevent copying images from the page
    if (e.target.tagName === 'IMG') {
        e.preventDefault(); // Block the copy action
        alert("Copying images is disabled."); // Alert user that copying is disabled
    }
});


// --- Disable Right-click globally on page --- //

// Listen for all right-click contextmenu events on the page
document.addEventListener('contextmenu', function (e) {
    e.preventDefault(); // Disable right-click everywhere
    alert("Sadly you cannot right-click in this page."); // Inform user
});


// --- Disable console / developer tools --- // 

// Immediately-invoked function expression (IIFE) to block DevTools
(function blockConsole() {
    // Run repeatedly every 100 milliseconds
    setInterval(function () {
        debugger; // Triggers a pause if DevTools are open, annoying the user
    }, 100);
})();


// --- Detect DevTools open by size difference (Elon musk type shit) --- // 

// Every 500ms, check window size difference between outer and inner window
setInterval(function () {
    // If difference is large (>200 pixels), assume DevTools is open
    if (window.outerWidth - window.innerWidth > 200 ||
        window.outerHeight - window.innerHeight > 200) {
        // Replace entire page content with a message disabling devtools
        document.body.innerHTML = "<h1>Developer tools are disabled.</h1>";
    }
}, 500);

