
## Back-end 
- [Node.js](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express.js](https://expressjs.com/) - Minimal and flexible Node.js web application framework.
- [Mongoose](https://mongoosejs.com/) - Elegant mongodb object modeling for node.js 
- [Stripe](https://stripe.com/docs/js) - Payments infrastructure for the internet
- [celebrate](https://github.com/arb/celebrate) - A joi validation middleware for Express.
- [JsonWebToken](https://github.com/auth0/node-jsonwebtoken) - An implementation of JSON Web Tokens for Node.js

## Database
- [Monogodb](https://www.mongodb.com/) - Cross-platform document-oriented NoSQL database.

---
## Run yourself
> Make sure you have [mongodb](https://www.mongodb.com/try/download/community) & [nodejs](https://nodejs.org/) installed on your system before proceeding.

1. Clone this repo
```bash
git clone https://github.com/nimone/Fashion-Store && cd Fashion-Store
```
2. Install project dependecies
```bash
cd ./api && npm install
cd ./client && npm install
```
3. Start development servers (api & client) with the provided script `rundev.sh`
```bash
bash rundev.sh
```
> Or, start them manually by `npm run dev`
