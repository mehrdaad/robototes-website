# robototes-website

The official Node.js website for the Robototes 2412 team.

### <a id="setup">Setting up the server</a>

##### Installing the environment

Before downloading the server code, ensure your server environment is prepared by installing the following

* ```node.js``` version 6.5.0
* ```npm``` version 3.10.6 (installed with node)
* ```nvm``` version 0.31.0 (installed with node)

##### Preparing the server

After the above dependencies are installed, download the server code and test it

* ```git clone -b production git@github.com:robototes/robototes-website.git --depth 1```
* ```cd robototes-website```
* ```npm install```
* [```mocha code/tests/module_tests```](#runningtests)
* ```npm install``` the missing modules as described by failed tests

(If the ```mocha``` command is not found, run ```NODE_ENV=development``` and ```npm install``` again)

A list of modules that must be included can be found below.

##### Required node modules

These modules should be auto-installed by ```npm install```, but make sure to run [```mocha code/tests/module_tests```](#runningtests)
and check that all the modules are there and match the below table. All of these modules are readily available on [npm](//www.npmjs.com)

| Library                                                               | License                                                           | Reason                                                                                                        |
|-----------------------------------------------------------------------|-------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| [ExpressJS](//expressjs.com/)                                         | [MIT](//github.com/expressjs/express/blob/master/LICENSE)         | Simple HTTP routing                                                                                           |
| [cookie-parser middleware](//github.com/expressjs/cookie-parser)      | [MIT](//github.com/expressjs/cookie-parser/blob/master/LICENSE)   | Enables us to interact with browser cookies                                                                   |
| [express-minify middleware](//github.com/SummerWish/express-minify)   | [MIT](//github.com/SummerWish/express-minify/blob/master/LICENSE) | Decreases file size by removing unnecessary whitespace and obfuscating variables, decreasing page load time   |
| [helmetjs middleware](//github.com/helmetjs/helmet)                   | [MIT](//github.com/helmetjs/helmet/blob/master/LICENSE)           | Security library with features such as CSP, noSniff, and frameguard                                           |
| [naught](//github.com/andrewrk/naught)                                | [MIT](//github.com/andrewrk/naught/blob/master/LICENSE)           | Enables zero-downtime deployment solutions and multi-worker server setups                                     |
| [mochajs](//mochajs.org/)                                             | [MIT](//github.com/mochajs/mocha/blob/master/LICENSE)             | Complete Unit testing library that allows us to test our code in various situations, reducing bug density     |
| [chaijs](//chaijs.com/)                                               | [MIT](//github.com/chaijs/chai#license)                           | Testing assertion library                                                                                     |
| [supertest](//github.com/visionmedia/supertest)                       | [MIT](//github.com/andrewrk/naught/blob/master/LICENSE)           | Run simple HTTP requests                                                                                      |
| [nsp](//github.com/nodesecurity/nsp)                                  | [Apache 2.0](//www.apache.org/licenses/LICENSE-2.0)               | Scans node modules for vulnerabilities                                                                        |
| [retire.js](//github.com/RetireJS/retire.js)                          | [Apache 2.0](//www.apache.org/licenses/LICENSE-2.0)               | Identifying code security vulnerabilities.                                                                    |

After running the commands and installing the required modules, follow the instructions in [Starting the server](#startserver).

### <a id="startserver">Starting the server</a>

##### Production mode

```javascript
npm run start-server // Runs the server on 8 workers
```

This will run several automated tests, and start the server if they succeed. The server uses [naught](//www.npmjs.com/package/naught) for zero-downtime deployment, and as such
the server runs on a daemon and logs are not printed to the console. Instead, you can find ```stdout.log``` and ```stderr.log``` files inside the ```server``` and ```server/dev```
folders, depending on how you are running the server.

##### Development mode

```javascript
npm run start-server-dev // Runs the server in development mode
```



It is recommended that you run the server in developer mode before running it in production, to ensure the code is stable. It is also recommended that you run client-side unit tests
in all major browsers ([Internet Explorer/Edge](//www.microsoft.com/en-us/download/internet-explorer.aspx), [Chrome](//www.google.com/chrome/browser/desktop/), and [Firefox](//mozilla.org)) before deploying
to production, if you have made any changes to client side files.

The production server runs on port 8080, while the development server runs on 8081 to allow both environments to run at the same time. When running the server, consider a few best practices:
* DO NOT run the server as ```root```, this is a serious security risk that could allow for attacks with root privileges
* DO follow this procedure for starting the server:
    * Run [```npm run tests```](#runningtests) and ensure ALL tests pass
    * Run the server in development mode
    * Run client side tests and ensure ALL tests pass
    * [Shut down](#specialcommands) the development server
    * Run the server in production mode

### <a id="runningtests">Running tests</a>

##### Server side

```javascript
npm run tests
```

We use [mocha](//www.npmjs.com/package/mocha) and [chai](//www.npmjs.com/package/chai) to unit test on both the server and the client. At the moment,
the above code runs all server tests in ```code/tests``` and prints the results. This command is also run by [```npm run start-server```](#startserver) and will only start the
server if all tests pass.

The following tests are available (to run them by themselves, use ```mocha code/tests/{test}```):
* ```module_tests``` Makes sure all modules are installed and up to date (may take a while to finish)
* ```server_tests``` Ensures the server responds correctly to predictable input

##### Client side

As long as the server is run in development mode, our unit testing suite will be included in the client. The tests are automatically fetched from ```views/js/tests``` and can
be run by clicking the "Run tests" button fixed to the bottom of the page or the Run again button on the shown modal.

### <a id="specialcommands">Special commands</a>

While the server is running, the following commands can be run:

```javascript
npm run deploy // Initiates a zero downtime deploy
npm run abort-deploy // Aborts hanging deployments (when a worker is stuck open)
npm run status // Displays the current server status
npm run stop // Shuts all workers down
```

All commands except [```tests```](#runningtests) have a development counterpart that can be run by adding ```-dev``` to the end of the command. Ex.:

```javascript
npm run stop-dev // Stops the development server
```

In addition to being a different server instance from the production server, which allows for live testing, there are a few command differences:

* ```npm run start-server-dev```([starting the server](#startserver)) ignores all tests and starts the server on only 2 workers as opposed to 8
* ```npm run deploy-dev``` ignores all tests and deploys to running threads

### Best practices

We follow some rules to make code consistent, future proof, and easy to debug.

##### Keeping the server updated

It is recommended to regularly maintain the server, following this checklist:

* Keep ```node```, ```npm```, and ```nvm``` updated. After updating to the latest stable version (DO NOT use unstable versions in production), [run all test](#runningtests), and then
redeploy
* Keep all node modules updated. As modules are deprecated, update to their latest stable release and [run relevant tests](#runningtests), modifying code as necessary
* Run [```npm run tests```](#runningtests) even if no changes are made, simply to ensure the server is stable
* Review server logs for errors

##### Development best practices

* Comment your code so that future programmers know what your code is supposed to do
* Update this README as necessary so that programmers that come after you can easily start developing
* Follow the Test-Driven-Development workflow:
    * Create a git branch with a descriptive name for what you are planning on creating
    * Write tests for the results you want from your code (as many as needed, for as many situations as possible, no matter how unlikely)
    * Write the actual code (with comments)
    * Make the code pass the tests
    * Optimize the code
    * Have at least one experienced programmer review your changes
    * Commit to the git repository with a detailed commit message
    * Once a feature is stable and production-ready, push it to the git repo on the ```production``` branch

### License

Copyright (C) 2016 Sammamish Robotics <robototes2412@gmail.com> All rights reserved

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium of this project without the express permission of Robotics Leadership is strictly prohibited