const { terser } = require('rollup-plugin-terser');

module.exports = {
    rollup(config) {
        // ...existing configuration...

        // Add the terser plugin for code minification
        config.plugins.push(terser());

        return config;
    },
};
