# Various helpful scripts.

help:
	@echo "install           -> Install everything"
	@echo "build-site        -> Build the site"
	@echo "serve-site        -> Serve the site with live reload"
	@echo "profile-site      -> Generate a profile of site build time"
	@echo "htmlproofer       -> Run html-proofer on the site"
	@echo "webpack           -> Build Webpack components"
	@echo "webpack-reload    -> Live reload Webpack components"

install:
	bundle install
	npm install

build-site:
	bundle exec jekyll build
serve-site:
	bundle exec jekyll serve --livereload-port 8001
profile-site:
	bundle exec jekyll build --profile
htmlproofer:
	bundle exec htmlproofer --assume-extension --check-html --check-favicon ./build

webpack:
	npm run build
webpack-reload:
	npm start
