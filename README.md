# TimeMachine
The TimeMachine website project developed by Rahul Bairagi is built on the MERN stack, which stands for MongoDB, Express.js, React, and Node.js. This technology stack is widely used for building robust and scalable web applications.

Welcome to Time Machine, your ultimate destination for stylish and sophisticated timepieces. We are proud to offer a wide selection of watches that combine elegance, functionality, and craftsmanship to suit your personal style and enhance your everyday life.
                      
At Time Machine, we understand the significance of a watch as a timeless accessory that reflects your personality and complements your attire. Whether you're searching for a classic timepiece, a sports watch for an active lifestyle, or a fashion-forward statement piece, our curated collection has something for everyone.

### Manual Setup
1. Open your local CLI -

   ```
   mkdir TimeMachine

   cd TimeMachine
   ```

2. Setup the code -

   - Create a `.env` file and the format should be as given in `env.example`.
   - Clone the code-

     ```
     git clone <repo-link>

     cd TimeMachine
     ```

3. Setup the backend code -

   - Create a `config.env` file and the format should be as given in `env.example`.
   - "config.env" containes following Secrets

   ```
    MONGO_URL=
    PORT=
    DEV_MODE=
    JWT_SECRET=
    BRAINTREE_MERCHANT_ID=
    BRAINTREE_PUBLIC_KEY=
    BRAINTREE_PRIVATE_KEY=
   ```
   
   - install the modules-

   ```
   npm install
   ```

   - Open your Mongoose Client -

   ```
   CREATE DATABASE TimeMachine;
   ```

   NOTE: Don't forget to keep the database name same in the `.env` and here.

   - Run the server `npm run server`.

4. Open a new CLI terminal and goto the root `TimeMachine` folder you created in the first step.
5. Setup the Frontend code -

   - Goto client directory and install the modules-

     ```
     cd client

     npm install
     ```

   - Run the client index `npm start`.
   - To run both client and server concurrentyly use `npm run dev` command.
   
## Technologies Used

Some of the technologies used in the development of this web application are as follow:
-   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas): It provides a free cloud service to store MongoDB collections.
-   [React.js](https://reactjs.org/): A JavaScript library for building user interfaces.
-   [Node.js](https://nodejs.org/en/): A runtime environment to help build fast server applications using JS.
-   [Express.js](https://expressjs.com/): A popular Node.js framework to build scalable server-side for web applications.
-   [Mongoose](https://mongoosejs.com/): An ODM(Object Data Modelling)library for MongoDB and Node.js
-   [Braintree](https://www.braintreepayments.com/): Accept payments, and enable commerce for their users.

## Made By
### Rahul Bairagi | [📝 LinkedIn](https://www.linkedin.com/in/rahul3008/)

