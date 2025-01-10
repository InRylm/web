window.functions = window.functions || {};

functions.loadCSS = function(filePath) {
    // Check if the CSS file is already loaded
    const existingLink = document.querySelector(`link[href="${filePath}"]`);
    if (existingLink) {
        console.log("CSS file already loaded.");
        return Promise.resolve(existingLink); // If already loaded, return the existing link
    }

    // Create a new <link> element to load the CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = filePath;

    // Append the <link> element to the <head>
    document.head.appendChild(link);

    console.log(`CSS file loaded: ${filePath}`);

    // Return a promise that resolves when the CSS is fully loaded
    return new Promise((resolve) => {
        link.onload = () => resolve(link);
    });
};
