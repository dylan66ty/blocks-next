"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genVeturAttributes = exports.genVeturTags = void 0;
function genVeturTags(tags) {
    const veturTags = {};
    tags.forEach(tag => {
        veturTags[tag.name] = {
            attributes: tag.attributes ? tag.attributes.map(item => item.name) : [],
        };
    });
    return veturTags;
}
exports.genVeturTags = genVeturTags;
function genVeturAttributes(tags) {
    const veturAttributes = {};
    tags.forEach(tag => {
        if (tag.attributes) {
            tag.attributes.forEach(attr => {
                veturAttributes[`${tag.name}/${attr.name}`] = {
                    type: attr.value.type,
                    description: `${attr.description}, Default: ${attr.default}`,
                };
            });
        }
    });
    return veturAttributes;
}
exports.genVeturAttributes = genVeturAttributes;
