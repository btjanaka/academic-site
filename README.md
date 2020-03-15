# Personal Website

Current version of [btjanaka.net](https://btjanaka.net).

Based on the [TeXt Theme](https://tianqi.name/jekyll-TeXt-theme/test/).

This site is built at https://travis-ci.com/btjanaka/academic-site, and hosted
from the master branch at https://github.com/btjanaka/btjanaka.github.io.

## Instructions

Full docs available
[here](https://tianqi.name/jekyll-TeXt-theme/docs/en/quick-start) and
[here](https://jekyllrb.com).

### Installation

Clone the repo, then run:

```
bundle install --path vendor/bundle
```

To get a live preview of the site, run:

```
bundle exec jekyll serve
```

The site will now be available at http://localhost:8686.

### Adding a Page

1. Create the file `<page>.md` in `src`. Consider simply copying the file
   `index.md` and modifying it.
1. Add content to the `<page>.md`.
1. Add the page in `_data/navigation.yml`, using the URL `/<page>.html` and the
   title `<page>`.
