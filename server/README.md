# node backend
## macos based local env setup

download mongoDB from https://www.mongodb.com/
``` bash
# start mongo
cd mongodb/mongodb-macos-x86_64-4.4.0/bin
./mongod --dbpath dbpath --port=27017
./mongo -port 27017

# download project code
git clone https://github.com/jcqiao/node_login.git
    
# install dependencies
cd node_login/server
npm install

# start
npm start
```