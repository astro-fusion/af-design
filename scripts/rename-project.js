const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const WORKING_DIR = path.resolve(__dirname, '..');
const EXCLUDE_DIRS = ['node_modules', '.git', 'dist', 'build'];

const oldScope = '@astrofusion';
const oldBrand = 'AstroFusion';
const oldPackagePrefix = 'astrofusion';

console.log(`
🚀  AstroFusion Design System Template Setup
-------------------------------------------
This script will rename the project to match your brand.
It will replace:
- Scope: ${oldScope} -> @yourscope
- Brand: ${oldBrand} -> YourBrand
- Prefix: ${oldPackagePrefix} -> yourprefix
`);

rl.question('Enter your new NPM Scope (e.g. @acme): ', (newScope) => {
  if (!newScope.startsWith('@')) {
    console.error('Scope must start with @');
    rl.close();
    return;
  }

  rl.question('Enter your Brand Name (e.g. Acme Corp): ', (newBrand) => {
    rl.question('Enter your Package Prefix (e.g. acme): ', (newPrefix) => {
      
      console.log('\nProcessing...');
      processDirectory(WORKING_DIR, newScope, newBrand, newPrefix);
      console.log('\n✅ Setup complete! run "pnpm install" to finalize.');
      rl.close();
    });
  });
});

function processDirectory(directory, newScope, newBrand, newPrefix) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (EXCLUDE_DIRS.includes(file)) continue;

    if (stat.isDirectory()) {
      processDirectory(fullPath, newScope, newBrand, newPrefix);
    } else {
      if (file.endsWith('.js') && file === 'rename-project.js') continue;
      
      if (['.json', '.md', '.ts', '.tsx', '.js'].some(ext => file.endsWith(ext))) {
        replaceInFile(fullPath, newScope, newBrand, newPrefix);
      }
    }
  }
}

function replaceInFile(filePath, newScope, newBrand, newPrefix) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    // Replace Scope (@astrofusion -> @newscope)
    if (content.includes(oldScope)) {
      content = content.split(oldScope).join(newScope);
      hasChanges = true;
    }

    // Replace Brand Name (AstroFusion -> NewName)
    if (content.includes(oldBrand)) {
      content = content.split(oldBrand).join(newBrand);
      hasChanges = true;
    }
    
    // Replace Package Prefix (astrofusion- -> newprefix-)
    // Doing this carefully to avoid over-matching
    const oldPrefixHyphen = `${oldPackagePrefix}-`;
    const newPrefixHyphen = `${newPrefix}-`;
    
    if (content.includes(oldPrefixHyphen)) {
      content = content.split(oldPrefixHyphen).join(newPrefixHyphen);
      hasChanges = true;
    }

    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Modified: ${path.relative(WORKING_DIR, filePath)}`);
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}
