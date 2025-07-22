module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        // Any custom theme extensions
      },
    },
    plugins: [],
    corePlugins: {
      preflight: true, // Make sure this is enabled
    },
  }