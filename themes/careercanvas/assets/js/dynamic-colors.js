// Dynamic Color System
// Randomly selects color palettes and applies them to the website
// Similar to how Pexels background images work


// Utility functions
const ColorUtils = {

    // Apply colors to CSS custom properties
    applyColors: (palette) => {
        const root = document.documentElement;

        // Set CSS custom properties - use the same names as in CSS
        root.style.setProperty('--color-primary', palette.main_color);
        root.style.setProperty('--color-second', palette.second_color);
        root.style.setProperty('--color-third', palette.third_color);

        // Also set legacy property names for backward compatibility
        root.style.setProperty('--main-color', palette.main_color);
        root.style.setProperty('--second-color', palette.second_color);
        root.style.setProperty('--third-color', palette.third_color);

        // Add a data attribute to track current palette
        root.setAttribute('data-color-palette', palette.name);

        // Verify the colors were applied
        const appliedPrimary = getComputedStyle(root).getPropertyValue('--color-primary').trim();
        console.log(`🎨 Primary color applied: ${appliedPrimary} (expected: ${palette.main_color})`);
    },

    // Generate complementary colors (for future use)
    generateComplementary: (baseColor) => {
        // This could be expanded to generate complementary colors
        // For now, we'll use predefined palettes
        return baseColor;
    }
};

// Main initialization function
function initializeDynamicColors() {
    console.log('🎨 Initializing dynamic color system...');

    // Check if we should use a specific palette from URL parameters
    let selectedPalette;

    // Apply the selected palette
    ColorUtils.applyColors(selectedPalette);
    
    // Store current palette for potential use by other scripts
    window.currentColorPalette = selectedPalette;
    
    return selectedPalette;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure other scripts have loaded
    setTimeout(initializeDynamicColors, 100);
});

// Also initialize on window load as backup
window.addEventListener('load', function() {
    // Check if colors were already initialized
    if (!document.documentElement.getAttribute('data-color-palette')) {
        console.log('🎨 Colors not initialized on DOMContentLoaded, initializing on window load');
        initializeDynamicColors();
    }
});

// Export for potential use by other scripts
window.DynamicColors = {
    initialize: initializeDynamicColors,
    apply: ColorUtils.applyColors,
};