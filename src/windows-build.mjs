import * as msi from 'electron-wix-msi';
import * as path from 'path';

// Step 1: Instantiate the MSICreator
const msiCreator = new msi.MSICreator({
    appDirectory: path.resolve('./dist/gas-win32-x64'), // result from electron-builder
    description: 'Gas point of sales',
    exe: 'gas',
    name: 'Gas point of sales',
    manufacturer: 'covie',
    version: '0.5.0',
    appIconPath: path.resolve('src/assets/icon.ico'),
    language: 1033,
    arch: 'x86',
    outputDirectory: path.resolve('./dist/msi/'),
    ui:{
        chooseDirectory: true
    }
});

async function createMsi() {
    // Step 2: Create a .wxs template file
    await msiCreator.create();

    // Step 3: Compile the template to a .msi file
    await msiCreator.compile();
}
console.log('Invoke MSI Builder');
createMsi();