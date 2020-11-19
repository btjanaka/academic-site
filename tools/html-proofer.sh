# Runs HTML proofer on the built website. This is a separate script from the
# Makefile because it needs to be called by Travis CI.
#
# Usage:
#   tools/html-proofer.sh

bundle exec htmlproofer \
  --assume-extension \
  --check-favicon \
  --check-opengraph \
  --only-4xx \
  --url-ignore "/instagram.com/" \
  ./build
