[![Coverage Status](https://coveralls.io/repos/github/Joyce-O/politico/badge.svg?branch=ch-setup-server-dummydata-163462653)](https://coveralls.io/github/Joyce-O/politico?branch=ch-setup-server-dummydata-163462653)[![Build Status](https://travis-ci.com/Joyce-O/politico.svg?branch=develop)](https://travis-ci.com/Joyce-O/politico)[![Maintainability](https://api.codeclimate.com/v1/badges/007dee6ff633b33dc8ca/maintainability)](https://codeclimate.com/github/Joyce-O/politico/maintainability)

# politico
Politico enables citizens give their mandate to politicians running for different government offices while building trust in the process through transparency.

## Proposed Features
- Users can sign up <br>
- Users can login <br>
- Admin (electoral body) can create political parties<br>
- Admin (electoral body) can delete a political party<br>
- Admin (electoral body) can create different ​ political offices<br>
- Users can vote for only one politician per ​ political office<br>
- Users can see the results of election<br/>
- User can reset password<br>
- A politician can create a ​ petition​ against a concluded political office election<br>
<br/>

## API Infomormation
https://ng-politico.herokuapp.com/api/v1/

<table>

<tr><th>HTTP VERB</th><th>API ENDPOINT</th><th>DESCRIPTION</th><th>INPUT</th><th>OUTPUT</th></tr>

<tr>
<td>POST</td> <td>api/v1/signup</td>  <td>Signup user</td>
<td>
{<br> firstname: "string",<br> lastname: "string",<br> othername: "string",<br>email: "string",<br>phoneNumber: "string",<br> passportUrl: "string",<br>password: "string"<br>}
</td>
<td>
{<br> message: "string"}
</td>
</tr>

<tr>
<td>POST</td> <td>api/v1/login</td>  <td>Login user</td>
<td>
{<br> email: "string",<br>password: "string"<br>}
</td>
<td>
{<br> message: "string"}
</td>
</tr>

<tr>
<td>POST</td> <td>/api/v1/parties</td>  <td>Create a political party</td>
<td>
{<br> name: "string",<br>hqAddress: "string",<br>logoUrl: "string",<br>email: "string",<br>phoneNumber: "string"<br>}
</td>
<td>{<br>message: "string"<br>party: {object}<br>}</td>
</tr>

<tr>
<td>GET</td> <td>/api/v1/parties/:partyId</td>  <td>Fetch a specific ​ political party​ record</td>
<td>{<br>message: "string",<br>party: {object}}</td>
</tr>

<tr>
<td>GET</td> <td>/api/v1/parties/</td>  <td>Fetch all ​ political parties​ records</td>
<td>{<br>message: "string",<br>allParties: {object}<br>}</td>
</tr>

<tr>
<td>PATCH</td> <td>/api/v1/parties/:partyId/name</td>  <td>Edit the name of a specific ​ political party</td>
<td>partyId: "Number"</td>
<td>{<br>message: "string",<br>foundParty: {object}<br>}</td>
</tr>

<tr>
<td>DELETE</td> <td>/api/v1/parties/:partyId></td>  <td>Delete a specific ​ political party</td>
<td>partyId: "Number"</td>
<td>{message: {object}}</td>
</tr>

<tr>
<td>POST</td> <td>/api/v1/offices</td>  <td>Create a ​ political office</td>
<td>
{<br> name: "string",<br>type: "string",<br>candidateAge: "string",<br>qualification: "string"}
</td>
<td>{<br>message: "string,"<br>office: {object}<br>}</td>
</tr>

<tr>
<td>GET</td> <td>api/v1/offices</td>  <td>Fetch all ​ political offices​ records</td>
<td>{<br>message: "string"<br>allOffices: {object}<br>}</td>
</tr>

<tr>
<td>GET</td> <td>api/v1/offices/:officeId</td>  <td>Fetch a specific political office record</td>
<td>officeId: "Number"</td>
<td>{<br>message: "string",<br>office: {object}}</td>
</tr>

<tr>

</table>

## Templates
UI templates are hosted on Github pages [here](https://joyce-o.github.io/politico/pages/index.html)

## Technologies Used
* [Node.js](https://nodejs.org) - A runtime environment based off of Chrome's V8 Engine for writing Javascript code on the server.
* [Babel](https://babeljs.io) - Javascript transpiler.
* [Eslint](https://eslint.org/) - Javascript linter. 
* [Express.js](https://expressjs.com) - Web framework based on Node.js.
* [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) and style [guide](https://github.com/airbnb/javascript) was followed.

## Testing tools
* [Mocha](https://mochajs.org/) - A Javascript test framework.
* [Chai](http://chaijs.com) - Assertion library.


### Installation

1. Install [NodeJs](https://nodejs.org/en/download/)
```
npm install node
```
2. Clone this repository using
```
git clone https://github.com/Joyce-O/politico.git
```
3. Open the repository in terminal and Install dependencies by running:
```
npm install
```
4. Run "npm start" to start the app

5. Navigate to
Navigate to [`localhost:5700/api/v1`](localhost:3000/api/v1) in your browser to access the application

6. Use Postman to test all endpoints


## Tests

* The tests were written using Mocha and Mocha-http
* To run tests, navigate to the project's root directory
* After installation, run the following command
    - `npm run test`
    
## Author
* Joyce Obi
