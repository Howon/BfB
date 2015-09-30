Study Helper App
---
## Development Setup
```bash
sh setup.sh
```
This script installs necessary tools to use and develop this app. It includes <br />
[Ruby](https://www.ruby-lang.org/en/)<br />
[Homebrew](http://brew.sh/)
[MongoDB](https://www.mongodb.org/)
[Node](https://nodejs.org/en/)
as well as npm packages as declared in package.json

With the above script running, do
```bash
sh run.sh
```
to run the app at localhost:3000

## App Structure
All of front end components are rendered server side using React and Webpack
When one runs 
```bash
sh run.sh
```
It starts off webpack which automates bundling and compilation of ES6 into 
plain javascript. The mount page just calls the javascript render code
to display appropriate contents

## Developers
Howon Byun <br />
Ken Aizawa <br />
Kevin Lin <br />
