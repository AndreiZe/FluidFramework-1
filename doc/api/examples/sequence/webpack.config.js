const path = require('path');

module.exports = {
    entry: './dist/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    node: {
        fs: 'empty',
        dgram: 'empty',
        net: 'empty',
    }
};
