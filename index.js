const fs = require('fs');
const glob = require('glob');

const countFetchServer = (globPattern) => {
  let count = 0;
  let filesWithFetchServer = [];

  const files = glob.globSync(globPattern);
  files.forEach((file) => {
    const fileContent = fs.readFileSync(file, 'utf8');
    const useQueryMatches = fileContent.match(/fetch\([^)]*\)/g);
    const useServerMatches = fileContent.match(/use server/g);
    const useClientMatches = fileContent.match(/use client/g);
    const useFetchMathces = fileContent.match(/useFetch/g);
    const useStateMathces = fileContent.match(/useState/g);
    const useRefMatches = fileContent.match(/useRef/g);

    if (
      useQueryMatches &&
      (!useClientMatches || useServerMatches) &&
      !useFetchMathces &&
      !useStateMathces &&
      !useRefMatches
    ) {
      count += useQueryMatches.length;
      filesWithFetchServer.push(
        JSON.stringify({
          file,
          fileCount: useQueryMatches.length,
        }),
      );
    }
  });

  return { count, filesWithFetchServer };
};

const countUseQuery = (globPattern) => {
  let count = 0;
  let filesWithUseQuery = [];

  const files = glob.globSync(globPattern);
  files.forEach((file) => {
    const fileContent = fs.readFileSync(file, 'utf8');
    const useQueryMatches = fileContent.match(/useQuery\([^)]*\)/g);
    if (useQueryMatches) {
      count += useQueryMatches.length;
      filesWithUseQuery.push(
        JSON.stringify({
          file,
          fileCount: useQueryMatches.length,
        }),
      );
    }
  });

  return { count, filesWithUseQuery };
};

const dirBackoffice = './src/backoffice/**/*.{js,jsx,ts,tsx}';
const dirPortal = './src/portal/**/*.{js,jsx,ts,tsx}'

// backoffice
const result = countUseQuery(dirBackoffice);
const resultServer = countFetchServer(dirBackoffice);
let logContent = `Total useQuery count: ${result.count}\n`;
logContent += `Files with useQuery:\n`;
result.filesWithUseQuery.forEach((file) => (logContent += `${file}\n`));
logContent += `\nTotal fetchServer count: ${resultServer.count}\n`;
logContent += `Files with fetchServer:\n`;
resultServer.filesWithFetchServer.forEach(
  (file) => (logContent += `${file}\n`),
);
fs.writeFileSync('counter.backoffice.log', logContent);


// portal
const resultPortal = countUseQuery(dirPortal);
const resultServerPortal = countFetchServer(dirPortal);
let logContentPortal = `Total useQuery count: ${resultPortal.count}\n`;
logContentPortal += `Files with useQuery:\n`;
resultPortal.filesWithUseQuery.forEach((file) => (logContentPortal += `${file}\n`));
logContentPortal += `\nTotal fetchServer count: ${resultServerPortal.count}\n`;
logContentPortal += `Files with fetchServer:\n`;
resultServerPortal.filesWithFetchServer.forEach(
  (file) => (logContentPortal += `${file}\n`),
);
fs.writeFileSync('counter.portal.log', logContentPortal);
