## Code Challenge - Address Form

This is the result of my code challenge, it is one react app with router
to handle the communication between those two pages.
My major focus during the creation of this challenge was to provide
100% of test coverage with well written tests. The layout was made using
the react-material just to make it more presentable.

Basically the challenge is divided into those files:
Pages/Address: Holds all form fields and its validations and autocompletion;
Pages/Success: Displays the success message for the user, with a really simple layout;
Services/Address: Execute the autocompletion and the postalCode validation;

### Dependencies:
nodejs v13.13.0
yarn v1.22.4

### Installing the application:
Run on the root level of the app the following command:
`yarn install`

### Running the application and its tests
The command `yarn start` will run the application and you will be able
to access it on <http://localhost:3000>.

The command `yarn test` will run all tests. The tests results will appear on
console and the coverage report can be accessed on this file: `coverage/index.html`.


Created with love, by Marcelo.
