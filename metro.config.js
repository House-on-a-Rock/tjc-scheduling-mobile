const MetroConfig = require('@ui-kitten/metro-config');

const evaConfig = {
    evaPackage: '@eva-design/eva',
    customMappingPath: './ui/mapping.json',
    // Optional, but may be useful when using mapping customization feature.
    // customMappingPath: './custom-mapping.json',
};

module.exports = MetroConfig.create(evaConfig, {
    // Whatever was previously specified
});
