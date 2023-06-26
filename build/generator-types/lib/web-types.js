"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genWebTypes = void 0;
// create web-types.json to provide autocomplete in JetBrains IDEs
function genWebTypes(tags, options) {
    return {
        $schema: 'https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json',
        framework: 'vue',
        name: options.name,
        version: options.version,
        contributions: {
            html: {
                tags,
                attributes: [],
                'types-syntax': 'typescript',
            },
        },
    };
}
exports.genWebTypes = genWebTypes;
