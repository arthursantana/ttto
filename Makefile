all: client server

client: scss client_dep

server: base_dep

scss:	client/scss/main.scss base_dep
	if [ ! -d client/css ]; then mkdir client/css; fi
	node node_modules/node-sass-cli/bin/sass-cli.js client/scss/main.scss --output-style compressed -o client/css/main.css

client_dep: client/bower.json
	cd client; bower install; cd ..

base_dep: package.json
	npm install

run: client server
	node server/index.js
