Study Helper App
---
## Development Setup
```bash
sh setup.sh
```
This script installs necessary tools to use and develop this app. It includes <br />
[Ruby](https://www.ruby-lang.org/en/)<br />
[Homebrew](http://brew.sh/)<br />
[Node](https://nodejs.org/en/)<br />
as well as npm packages as declared in package.json

After setup,
```
node app.js
```
to run the app at localhost:3000

## App Structure
All of front end components are rendered server side using React and Webpack
When one runs
```bash
pm2 start app.js
```
It starts off webpack which automates bundling and compilation of ES6 into
plain javascript. The mount page just calls the javascript render code
to display appropriate contents

## Developers
[Howon Byun](https://github.com/Howon) <br />
[Ken Aizawa](https://github.com/aizawak) <br />
[Kevin Lin](https://github.com/kl2806) <br />
[David Lee](https://github.com/davidlee1435)