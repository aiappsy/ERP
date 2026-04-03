const fs = require('fs');
const path = require('path');

const searchRegex = /IDURAR/gi; // case insensitive search
const exactReplace = "Aiappsy-ERP";

const ignoreDirs = ['node_modules', '.git', 'dist', 'build', '.DS_Store'];

function walkAndReplace(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (ignoreDirs.includes(file)) continue;
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walkAndReplace(filePath);
        } else {
            // Only process text files like js, jsx, html, md, json
            if (!filePath.match(/\.(js|jsx|ts|tsx|html|md|json|env|txt)$/)) continue;
            
            let content = fs.readFileSync(filePath, 'utf8');
            if (content.match(searchRegex)) {
                // simple replacement: Idurar -> Aiappsy-ERP, IDURAR -> Aiappsy-ERP, idurar -> aiappsy-erp
                let newContent = content.replace(/IDURAR/g, "Aiappsy-ERP")
                                        .replace(/Idurar/g, "Aiappsy-ERP")
                                        .replace(/idurar/g, "aiappsy-erp");
                fs.writeFileSync(filePath, newContent, 'utf8');
                console.log(`Rebranded ${filePath}`);
            }
        }
    }
}

walkAndReplace(path.join(__dirname, 'frontend'));
walkAndReplace(path.join(__dirname, 'backend'));
console.log("Rebranding complete.");
