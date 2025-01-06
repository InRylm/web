function getColorSchemePreference() {
    /*if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    } else {
        return 'light';
    }*/
        if (window.matchMedia) {
            // Check if the dark-mode Media-Query matches
            if(window.matchMedia('(prefers-color-scheme: dark)').matches){
                return 'dark';
            } else {
                return 'light';
            }
          } else {
            return 'light';
          }
}

function applyTheme() {
    const theme = getColorSchemePreference();
    document.documentElement.setAttribute('data-theme', theme);
}

// Initial application
applyTheme();

// Listen for changes to the preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    applyTheme();
});
