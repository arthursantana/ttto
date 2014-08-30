all: client server

client: scss client_dep

scss:	client/scss/main.scss server_dep
	node node_modules/node-sass-cli/bin/sass-cli.js client/scss/main.scss --output-style compressed -o client/css/main.css

server: server_dep

server_dep: package.json
	npm install

client_dep: client/bower.json
	cd client; bower install; cd ..

run:	client server
	node server/index.js
