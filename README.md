# Beet API

The Beet API attends a little project that I needed at work, where we used google sheets to mantain/update info about customers and now we can do it via API using a database. 

It's my first API and i'm really proud of my progress. 
For the future, I'd like to use the ejs package to build an interface. 

## Installation

**NPM**

I used the package manager [npm](https://www.npmjs.com/). That beeing said, let's start with a `npm install` command. After that, we'll need a `npm init` to create a *package.json* who lists the packages we're using.

**EXPRESS**

Web framework for node. Installation is done using the `npm install express` command. For more info, click [here](https://www.npmjs.com/package/express).

**BODY-PARSER**

Node.js body parsing middleware. You can find more info about it [here](https://www.npmjs.com/package/body-parser). We're gonna use it to check the request bodies before handling it. We'll use this package to expect a JSON request. Just go with a `npm install body-parser` to install it. 

**CORS**

[CORS](https://www.npmjs.com/package/cors) is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options. As we only have the methods *GET*, *PUT*, *POST* and *DELETE* I used CORS to be sure that any other options are allowed. We could also use it to define the domain(s) that we'll be able to call the api after it's in production. To install it, use `npm install cors`.


**MONGODB**

Our database. If you want more info, just check their page [here](https://www.mongodb.com/).

**MONGOOSE**

With [mongoose](https://mongoosejs.com/) we'll have a translator for the database to work with JS objects so they can be used by the application. We'll use `npm install mongoose` to install it. 

**JSONWEBTOKEN**

Responsible for the tokens we're going to use at authentication. We'll use `npm install jsonwebtoken ` to install it. If you need more info about how to use it, click [here](https://www.npmjs.com/package/jsonwebtoken).

**BCRYPT**

A library that we'll use to hash passwords. As simples as that, we'll use `npm install bcrypt` and be done with it. For more info, click [here](https://www.npmjs.com/package/bcrypt).

**NODEMON**

Let me start saying that this is optional but very - very - helpful. [Nodemon](https://www.npmjs.com/package/nodemon) restarts the node application when file changes in the directory are detected. Basically, everytime that we CTRL+S, the server restarts and we do not need to run it manually again. It's a real beauty if I may say. To install it, we'll use a `npm install --save-dev nodemon`. Notice that we'll add it as a dev dependency. 


## Usage

To start the app, run `nodemon app.js`.

Using postman or insomnia, try the methods below.

### Controllers

#### Auth

`
[POST]
/auth/register
`

Look at the {email} and if it doensn't exists, create a new user already with a token. 

`
[POST]
/auth/authenticate 
`

Post the email and password and if both are correct, a token is returned. 

`
[GET]
/auth/register/{userId}
`

Get user by Id. 

``
[DELETE]
/auth/register/{userId}
``

Delete user by Id. 
Now... This is complex. I know that it may be a security flaw and I also know that the best practice here would be a recover by e-mail flow. I'm in a rush to present this app as a MVP and I totally want to go further at it, but right now this isn't a concern. 

#### Company

`
[POST]
/core/companies
`

Create a company and return the info about the token used and the req.body. 

`
[GET]
/core/companies
`

List all companies. 

`
[GET]
/core/companies/{companyId}
`

Get company by Id. 

``
[PUT]
/core/companies/{companyId}
``

Edit company by Id. 

``
[DELETE]
/core/companies/{companyId}
``

Delete company by Id.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.