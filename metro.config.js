const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Garantir extensões e módulos de animação web
config.resolver.sourceExts.push('mjs', 'cjs');

module.exports = config;
