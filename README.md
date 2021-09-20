A web tool to list one item multi time.

# Usage:

You can visit https://blackkeyz.github.io/opensea-tool/

Or you can use it locally. If so, because MetaMask should connect to a domain name, you must run a http server on localhost, and then open the main page.

## Step:
1. install node.js from https://nodejs.org/en/download/

2. install http-server, run this command in your terminal: `npm install --global http-server`

3. cd to this project folder, run this command: `http-server dist` , it will show message like this
```
Available on:
  http://127.0.0.1:8080
  http://192.168.1.2:8080
  http://172.30.0.17:8080
```

4. open your browser, paste this address


## Compile
You can re build this project. I assume you are a developer and installed node and yarn
run `yarn install && yarn run build`
then the static files are under dist folder.
