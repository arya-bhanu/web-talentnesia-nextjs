const fs = require('fs');
const path = require('path');
const glob = require('glob');

const countUseQuery = (globPattern) => {
  let count = 0;
  let filesWithUseQuery = [];

  const files = glob.globSync(globPattern);
  files.forEach((file) => {
    const fileContent = fs.readFileSync(file, 'utf8');
    const useQueryMatches = fileContent.match(/useQuery\([^)]*\)/g);
    if (useQueryMatches) {
      count += useQueryMatches.length;
      filesWithUseQuery.push({
        file,
        fileCount: useQueryMatches.length,
      });
    }
  });

  return { count, filesWithUseQuery };
};

const dir = './src/backoffice/**/*.{js,jsx,ts,tsx}';
const result = countUseQuery(dir);

console.log(`Total useQuery count: ${result.count}`);
console.log(`Files with useQuery:`);
result.filesWithUseQuery.forEach((file) => console.log(file));
