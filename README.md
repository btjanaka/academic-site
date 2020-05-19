# Personal Website

Current version of [btjanaka.net](https://btjanaka.net).

Based on the [TeXt Theme](https://tianqi.name/jekyll-TeXt-theme/test/).

This site is built at https://travis-ci.com/btjanaka/academic-site, and hosted
from the `master` branch at https://github.com/btjanaka/btjanaka.github.io.

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

## Modifications to TeXt-theme

This site makes several modifications to the original TeXt-theme.

### Article / Page Configuration

- `show_section_navigator` allows one to show or hide the section navigator at
  the bottom of articles.
- `use_page_title_as_title` allows one to make the page title be the title shown
  in the `title` tag in the header (by default, the title is
  `page title - site title`)

### Plugins

- [Jekyll-Scholar](https://github.com/inukshuk/jekyll-scholar)

## License

The content of this project itself is licensed under the
[Creative Commons Attribution-NonCommercial 4.0 International license](https://creativecommons.org/licenses/by-nc/4.0/),
and the underlying source code used to format and display that content is
licensed under the [MIT license](https://en.wikipedia.org/wiki/MIT_License).
