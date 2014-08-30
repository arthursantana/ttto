all: client server

client: scss

scss:	client/scss/main.scss dependencies
	node node_modules/node-sass-cli/bin/sass-cli.js client/scss/main.scss --output-style compressed -o client/css/main.css

server: dependencies

dependencies: package.json
	npm install

run:	client server
	node server/index.js
