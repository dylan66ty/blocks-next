"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mdParser = void 0;
/* eslint-disable no-cond-assign */
const TITLE_REG = /^(#+)\s+([^\n]*)/;
const TABLE_REG = /^\|.+\r?\n\|\s*-+/;
const TD_REG = /\s*`[^`]+`\s*|([^|`]+)/g;
const TABLE_SPLIT_LINE_REG = /^\|\s*-/;
function readLine(input) {
    const end = input.indexOf('\n');
    return input.substr(0, end !== -1 ? end : input.length);
}
function splitTableLine(line) {
    line = line.replace(/\\\|/g, 'JOIN');
    const items = line.split('|').map(item => item.trim().replaceAll('JOIN', '|'));
    // remove pipe character on both sides
    items.pop();
    items.shift();
    return items;
}
function tableParse(input) {
    let start = 0;
    let isHead = true;
    const end = input.length;
    const table = {
        head: [],
        body: [],
    };
    while (start < end) {
        const target = input.substr(start);
        const line = readLine(target);
        if (!/^\|/.test(target)) {
            break;
        }
        if (TABLE_SPLIT_LINE_REG.test(target)) {
            isHead = false;
        }
        else if (!isHead && line.includes('|')) {
            const matched = line.trim().match(TD_REG);
            if (matched) {
                table.body.push(splitTableLine(line));
            }
        }
        start += line.length + 1;
    }
    return {
        table,
        usedLength: start,
    };
}
function mdParser(input) {
    const artical = [];
    let start = 0;
    const end = input.length;
    while (start < end) {
        const target = input.substr(start);
        let match;
        if ((match = TITLE_REG.exec(target))) {
            artical.push({
                type: 'title',
                content: match[2].replace('\r', ''),
                level: match[1].length,
            });
            start += match.index + match[0].length;
        }
        else if ((match = TABLE_REG.exec(target))) {
            const { table, usedLength } = tableParse(target.substr(match.index));
            artical.push({
                type: 'table',
                table,
            });
            start += match.index + usedLength;
        }
        else {
            start += readLine(target).length + 1;
        }
    }
    return artical;
}
exports.mdParser = mdParser;
