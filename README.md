# Northcoders News (or, Have I got NC For You?)

The website can be found [here](https://have-i-got-nc-for-you.netlify.com). The backend can be found [here](https://have-i-got-nc-for-you.herokuapp.com/api/) ([source code](https://github.com/daffodil11/nc-news)).

## Getting Started
These instructions will get you set up to test and develop this project on your local machine. See [deployment](#deployment) for notes on how to deploy the project.

### Prerequisites
You will need to install Node. It is best to do this through [Node Verison Manager](https://github.com/nvm-sh/nvm). You will also need a JavaScript-capable browser to view the website.

### Installation
Clone this repository. Navigate into the created folder and install the dependencies using `npm install`.

### Testing
The testing files can be found in the cypress directory. JSON resources for request stubbing belong in the fixtures directory, specification files belong in the integration directory and files that customise the behaviour of Cypress belong in the plugins and support directories. To run Cypress, use `npm run cy:open`. Cypress will open a new window, from which tests can be run. For more information on testing with Cypress, please see the [official website](https://www.cypress.io/).

## Deployment
I recommend [this excellent guide](https://facebook.github.io/create-react-app/docs/deployment) on deploying React apps. There are no unique deployment requirements of this app. However, it is advised that you set your deployment environment to production mode (usually by setting NODE_ENV to production) in order to prevent development dependencies being installed.

## Built with
* Runtime environment: [node](https://nodejs.org/en/)
* Package manager: [npm](https://www.npmjs.com/)
* UI framework: [react](https://reactjs.org/)
* Router: [reach router](https://reach.tech/router)
* Testing framework: [Cypress](https://www.cypress.io/)

## Contributing
This project is a portfolio piece and is not accepting contributions.

##Authors
Simon Davey

## Acknowledgements
This project was developed under the tuition of [Northcoders](https://northcoders.com/).

## License
This project is licensed under the ISC License - see the [LICENSE.txt](LICENSE.txt) file for details
