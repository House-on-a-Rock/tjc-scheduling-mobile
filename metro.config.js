// const MetroConfig = require('@ui-kitten/metro-config');
// const { getDefaultConfig } = require('@expo/metro-config');

// const defaultConfig = getDefaultConfig(__dirname);

// const evaConfig = {
//     evaPackage: '@eva-design/eva',
//     customMappingPath: './src/ui/mapping.json',
//     // Optional, but may be useful when using mapping customization feature.
//     // customMappingPath: './custom-mapping.json',
// };

// // module.exports = MetroConfig.create(
// //     evaConfig,
// //     // Whatever was previously specified

// // );

// module.exports = (async () => {
//     const {
//         resolver: { sourceExts, assetExts },
//     } = await getDefaultConfig();

//     return {
//         transformer: {
//             babelTransformerPath: require.resolve('react-native-svg-transformer'),
//         },
//         resolver: {
//             assetExts: assetExts.filter((ext) => ext !== 'svg'),
//             sourceExts: [...sourceExts, 'svg'],
//         },
//     };
// })();

const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
    const {
        resolver: { sourceExts, assetExts },
    } = await getDefaultConfig();

    return {
        transformer: {
            babelTransformerPath: require.resolve('react-native-svg-transformer'),
        },
        resolver: {
            assetExts: assetExts.filter((ext) => ext !== 'svg'),
            sourceExts: [...sourceExts, 'svg'],
        },
    };
})();
