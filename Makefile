# Various helpful scripts.

help:
	@echo "install        -> Install everything"
	@echo "build-site     -> Build the site"
	@echo "serve-site     -> Serve the site with live reload"
	@echo "profile-site   -> Generate a profile of site build time"
	@echo "html-proofer   -> Run html-proofer on the site"
	@echo "webpack        -> Build Webpack components"
	@echo "webpack-reload -> Live reload Webpack components"
	@echo "lighthouse     -> Run lighthouse on btjanaka.net"
	@echo "docker         -> Build the site in a Docker container"

install:
	bundle install
	npm install

build-site:
	bundle exec jekyll build
serve-site:
	bundle exec jekyll serve --livereload-port 8001
profile-site:
	bundle exec jekyll build --profile
html-proofer:
	tools/html-proofer.sh

webpack:
	npm run build
webpack-reload:
	npm start

lighthouse:
	npm run lighthouse

docker:
	docker run --rm \
		--volume="$(PWD):/srv/jekyll" \
		-it jekyll/jekyll:4.1.0 \
		/bin/bash -c "npm install && npm run build && jekyll build"
