import { MSICreator } from 'electron-wix-msi';

// Step 1: Instantiate the MSICreator
const msiCreator = new MSICreator({
  appDirectory: '/dist/gas-win32-x64',
  description: 'gas plant app',
  exe: 'gas',
  name: 'gas',
  manufacturer: 'covie Technologies',
  version: '1.1.2',
  outputDirectory: '/dist/to/',
  appIconPath: '/src/assets/icon.ico'
});

// Step 2: Create a .wxs template file
const supportBinaries = await msiCreator.create();

// 🆕 Step 2a: optionally sign support binaries if you
// sign you binaries as part of of your packaging script
supportBinaries.forEach(async (binary) => {
  // Binaries are the new stub executable and optionally
  // the Squirrel auto updater.
  await signFile(binary);
});

// Step 3: Compile the template to a .msi file
await msiCreator.compile();