"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAndWrite = void 0;
const fast_glob_1 = __importDefault(require("fast-glob"));
const path_1 = require("path");
const parser_1 = require("./parser");
const formatter_1 = require("./formatter");
const web_types_1 = require("./web-types");
const fs_extra_1 = require("fs-extra");
const utils_1 = require("./utils");
const vetur_1 = require("./vetur");
async function readMarkdown(options) {
    const mdPaths = await (0, fast_glob_1.default)((0, utils_1.normalizePath)(`${options.path}/**/*.md`));
    const data = mdPaths
        .filter(md => options.test.test(md))
        .map(path => {
        const docPath = (0, path_1.dirname)(path);
        const kebabComponentName = options.tagPrefix + docPath.substring(docPath.lastIndexOf('/') + 1) || '';
        const componentName = (0, utils_1.getComponentName)(docPath.substring(docPath.lastIndexOf('/') + 1) || '');
        const fileContent = (0, fs_extra_1.readFileSync)(path, 'utf-8');
        return (0, formatter_1.formatter)((0, parser_1.mdParser)(fileContent), componentName, kebabComponentName, options.tagPrefix);
    })
        .filter(item => item);
    const tags = new Map();
    data.flatMap(item => item).forEach(mergedTag => mergeTag(tags, mergedTag));
    return tags;
}
function readTypings(options) {
    const tags = new Map();
    const fileContent = (0, fs_extra_1.readFileSync)(options.typingsPath, 'utf-8');
    fileContent
        .split('\n')
        .filter(line => line && line.includes('typeof'))
        .map(line => {
        const l = line.trim();
        return (0, utils_1.toKebabCase)(l.substring(0, l.indexOf(':')));
    })
        .forEach(tagName => tags.set(tagName, {
        name: tagName,
        slots: [],
        events: [],
        attributes: [],
    }));
    return tags;
}
function mergeTag(tags, mergedTag) {
    const tagName = mergedTag.name;
    const vueTag = tags.get(tagName);
    if (vueTag) {
        vueTag.slots = [...vueTag.slots, ...mergedTag.slots];
        vueTag.events = [...vueTag.events, ...mergedTag.events];
        vueTag.attributes = [...vueTag.attributes, ...mergedTag.attributes];
    }
    else {
        tags.set(tagName, mergedTag);
    }
}
function mergeTags(mergedTagsArr) {
    if (mergedTagsArr.length === 1)
        return [...mergedTagsArr[0].values()];
    const tags = new Map();
    if (mergedTagsArr.length === 0)
        return [];
    mergedTagsArr.forEach(mergedTags => {
        mergedTags.forEach(mergedTag => mergeTag(tags, mergedTag));
    });
    return [...tags.values()];
}
async function parseAndWrite(options) {
    if (!options.outputDir) {
        throw new Error('outputDir can not be empty.');
    }
    const tagsFromMarkdown = await readMarkdown(options);
    const tagsFromTypings = await readTypings(options);
    const tags = mergeTags([tagsFromMarkdown, tagsFromTypings]);
    const webTypes = (0, web_types_1.genWebTypes)(tags, options);
    const veturTags = (0, vetur_1.genVeturTags)(tags);
    const veturAttributes = (0, vetur_1.genVeturAttributes)(tags);
    (0, fs_extra_1.outputFileSync)((0, path_1.join)(options.outputDir, 'tags.json'), JSON.stringify(veturTags, null, 2));
    (0, fs_extra_1.outputFileSync)((0, path_1.join)(options.outputDir, 'attributes.json'), JSON.stringify(veturAttributes, null, 2));
    (0, fs_extra_1.outputFileSync)((0, path_1.join)(options.outputDir, 'web-types.json'), JSON.stringify(webTypes, null, 2));
    return tags.length;
}
exports.parseAndWrite = parseAndWrite;
exports.default = { parseAndWrite };
