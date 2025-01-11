function exchangeThemes() {
    functions.loadCSS("../css/palette.css").then(link => {
        // Parent document: Find and modify the loaded CSS
        const styleSheet = Array.from(document.styleSheets).find(sheet => sheet.ownerNode === link);
        if (styleSheet) {
            console.log("CSS file loaded in parent document:", styleSheet);

            // Exchange variables in parent document
            exchangeVariablesInDocument(document);
        }

        // Apply changes in all iframes
        const iframes = document.querySelectorAll("iframe");
        iframes.forEach(iframe => {
            try {
                const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
                if (iframeDocument) {
                    exchangeVariablesInDocument(iframeDocument);
                }
            } catch (error) {
                console.error("Error accessing iframe's document:", error);
            }
        });
    }).catch(error => {
        console.error("Error loading CSS:", error);
    });
}

// Helper function to exchange CSS variables in a specific document
function exchangeVariablesInDocument(doc) {
    const root = doc.documentElement; // Access the :root element in the given document
    for (let index = 1; index <= 3; index++) {
        const name1 = `--base-${index}`;
        const name2 = `--other-base-${index}`;
        exchangeVariableInDocument(root, name1, name2);
    }
    exchangeVariableInDocument(root, `--text`, `--other-text`);
}

// Helper function to exchange two CSS variables in a specific document's :root
function exchangeVariableInDocument(root, var1, var2) {
    const value1 = getComputedStyle(root).getPropertyValue(var1).trim();
    const value2 = getComputedStyle(root).getPropertyValue(var2).trim();

    // Swap the values of the CSS variables
    if (value1 && value2) {
        root.style.setProperty(var1, value2);
        root.style.setProperty(var2, value1);
        console.log(`Swapped ${var1}: ${value1} with ${var2}: ${value2}`);
    } else {
        console.warn(`Could not find values for ${var1} or ${var2}`);
    }
}
