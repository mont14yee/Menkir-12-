const fs = require('fs');
const path = require('path');

const iconsToExtract = [
    {name: 'shield-check', file: 'shield-check'}, 
    {name: 'target', file: 'target'}, 
    {name: 'leaf', file: 'leaf'}, 
    {name: 'map', file: 'map'}, 
    {name: 'activity', file: 'activity'}, 
    {name: 'layers', file: 'layers'}, 
    {name: 'arrow-right', file: 'arrow-right'}, 
    {name: 'check-circle-2', file: 'circle-check'}, 
    {name: 'info', file: 'info'}, 
    {name: 'bar-chart-3', file: 'chart-column'}, 
    {name: 'droplet', file: 'droplet'},
    {name: 'zap', file: 'zap'}, 
    {name: 'file-text', file: 'file-text'}, 
    {name: 'cpu', file: 'cpu'},
    {name: 'user', file: 'user'}, 
    {name: 'briefcase', file: 'briefcase'}, 
    {name: 'award', file: 'award'}, 
    {name: 'graduation-cap', file: 'graduation-cap'}, 
    {name: 'mail', file: 'mail'}, 
    {name: 'map-pin', file: 'map-pin'}, 
    {name: 'phone', file: 'phone'}, 
    {name: 'chevron-right', file: 'chevron-right'}, 
    {name: 'menu', file: 'menu'}, 
    {name: 'x', file: 'x'}, 
    {name: 'arrow-left', file: 'arrow-left'}
];

let output = `import React from 'react';\n\n`;

for (let iconObj of iconsToExtract) {
    let icon = iconObj.file;
    let originalName = iconObj.name;
    try {
        const filePath = path.join(__dirname, 'node_modules', 'lucide-react', 'dist', 'esm', 'icons', icon + '.mjs');
        const content = fs.readFileSync(filePath, 'utf8');
        // Extract the iconNode array
        const match = content.match(/const __iconNode = (\[.*?\]);/s) || content.match(/const [A-Za-z0-9_]+ = (\[.*?\]);/s);
        if (match) {
            let nodeStr = match[1].trim().replace(/;$/, '');
            const nodes = eval(nodeStr);
            const componentName = originalName.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
            let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className || "w-5 h-5"} {...props}>\n`;
            for (let node of nodes) {
                const [tag, attrs] = node;
                let attrStr = Object.entries(attrs).map(([k, v]) => {
                    let reactKey = k;
                    if (k === 'class') reactKey = 'className';
                    if (k === 'stroke-width') reactKey = 'strokeWidth';
                    if (k === 'stroke-linecap') reactKey = 'strokeLinecap';
                    if (k === 'stroke-linejoin') reactKey = 'strokeLinejoin';
                    return `${reactKey}="${v}"`;
                }).join(' ');
                svgContent += `  <${tag} ${attrStr} />\n`;
            }
            svgContent += `</svg>`;
            output += `export const ${componentName} = ({ className, ...props }: any) => (\n${svgContent}\n);\n\n`;
        } else {
            console.error("Match not found for", originalName);
        }
    } catch (e) {
        console.error("Error for icon", originalName, e.message);
    }
}

fs.writeFileSync('components/ExtractedIcons.tsx', output);
console.log("Done");
