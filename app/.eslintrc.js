module.exports = {
    "env": {
        "es6": true,
        "browser": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        }
    },
    "plugins": [
        "react"
    ,],
    "rules": {
        "no-undef": 0, // FIXME: many React componenets are undefined
        "react/react-in-jsx-scope": 0, // FIXME: React doesn't seem to be in scope correctly
        "no-console": 0, // TODO: remove this for production
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
