import "../modular/registry"; // užtikrinam, kad registry būtų bundle'e

// Webpack (CRA) konteksto importas – įtraukia visus feature.jsx failus
const ctx = require.context(".", true, /feature\.jsx$/);
ctx.keys().forEach(ctx);
