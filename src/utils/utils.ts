export const getLocation = (url: any, uuid: any) => {
  require('dotenv').config()
  const { platform } = require('os');
  const { exec } = require('child_process');
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  const fs = require('fs');


  if (url === undefined) {
    console.error('Please enter a URL, e.g. "http://www.opencanvas.co.uk"');
    process.exit(0);
  }

  let command;
  command = '"' + process.env.CHROME_PATH + '"' + ` --headless --dump-dom "${url}"`;

  console.log(`executing command: ${command}`);

  let process1 = exec(command);
  process1.stdout.on('data', (data: any) => {
    //console.log('stdout: ' + data.toString())
    const dom = new JSDOM(data.toString());
    fs.writeFile(`./src/public/json/${uuid}.json`, dom.window.document.body.textContent, (err: any) => {
      if (err) {
        console.error(err);
      }
    });
  })

  process1.stderr.on('data', (data: any) => {
    console.log('stderr: ' + data.toString())
  })

  process1.on('exit', (code: any) => {
    console.log('child process exited with code ' + code.toString())
  })
}