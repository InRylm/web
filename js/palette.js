function exchangeThemes() {
    functions.loadCSS(".css/palette.css").then(link => {
        const styleSheet = Array.from(document.styleSheets).find(sheet => sheet.ownerNode === link);
        if (styleSheet) {
            console.log("CSS file loaded:", styleSheet);

            // Exchange --base-* and --other-base-* variables
            for (let index = 1; index <= 3; index++) {
                var name1 = `--base-${index}`;
                var name2 = `--other-base-${index}`;
                exchange(name1, name2);
            }
            var name1 = `--text`;
                var name2 = `--other-text`;
                exchange(name1, name2);
        }
    }).catch(error => {
        console.error("Error loading CSS:", error);
    });
}

function exchange(var1, var2) {
    // Swap CSS variable names in the :root rule
    const root = document.documentElement;
    const value1 = getComputedStyle(root).getPropertyValue(var1);
    const value2 = getComputedStyle(root).getPropertyValue(var2);

    // Swap the values of the CSS variables
    root.style.setProperty(var1, value2);
    root.style.setProperty(var2, value1);
}
