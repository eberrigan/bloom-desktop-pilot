const { spawn } = require('node:child_process');

const python = 'C:\\Users\\PBIOB-GH.PBIOB-GH-05\\.conda\\envs\\pylon\\python.exe'
const pylon = 'C:\\Users\\PBIOB-GH.PBIOB-GH-05\\Documents\\bloom\\pylon\\pylon.py'

const grab_frames = spawn(python, [
    pylon,
    'C:\\Users\\PBIOB-GH.PBIOB-GH-05\\Documents\\scans\\' + 'foobar'
])
grab_frames.stdout.on('data', (data) => {
    console.log('printing')
    console.log(data.toString())
})

grab_frames.on('error', (err) => {
  console.error('Failed to start subprocess.');
});