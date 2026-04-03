const fs = require('fs');
const glob = require('glob');
const path = require('path');

const files = glob.sync('backend/src/**/*.js');

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  // Match aiappsy-erp_ NOT immediately preceded or followed by a quote
  // However, things like { aiappsy-erp_app_email } or const aiappsy-erp_
  // We can just find all occurrences and if they are not in quotes, replace them.
  let newContent = content;
  
  // Replace references on the left side of equal signs, in const declarations, in object properties, etc.
  // We'll just replace \baiappsy-erp_ but since hyphen removes word boundary, we can replace:
  // aiappsy-erp_ (where it's a variable)
  
  // It's much safer to replace only specific known broken variables:
  newContent = newContent.replaceAll('const aiappsy-erp_app_email', 'const aiappsy_erp_app_email');
  newContent = newContent.replaceAll('const aiappsy-erp_base_url', 'const aiappsy_erp_base_url');
  newContent = newContent.replaceAll('{ aiappsy-erp_app_email', '{ aiappsy_erp_app_email');
  newContent = newContent.replaceAll('aiappsy-erp_app_email,', 'aiappsy_erp_app_email,');
  newContent = newContent.replaceAll('checkAndCorrectURL(aiappsy-erp_base_url)', 'checkAndCorrectURL(aiappsy_erp_base_url)');
  newContent = newContent.replaceAll('from: aiappsy-erp_app_email', 'from: aiappsy_erp_app_email');
  
  if (newContent !== content) {
    fs.writeFileSync(file, newContent);
    console.log(`Fixed: ${file}`);
  }
}
