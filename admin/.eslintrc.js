module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        //'@vue/standard'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-irregular-whitespace': 'off',
        'object-property-newline': 'off',
        'object-curly-newline': 'off',
        //parserOptions: {
        //parser: 'babel-eslint'
        //}
    }
}