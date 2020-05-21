module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['module:metro-react-native-babel-preset'],
        plugins: [
            [
                'module-resolver',
                {
                    alias: {
                        '@shared': ['./shared/*'],
                        // '@secrets': ['./secrets/index.ts'],
                        // '@store': ['./src/store/*'],
                        // '@components': ['./src/components/*'],
                        // '@services': ['./src/services/*'],
                        // '@screens': ['./src/screens/*'],
                    },
                },
            ],
            ['@babel/transform-runtime'],
        ],
    };
};
