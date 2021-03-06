# Personal Website

[![Build Status](https://travis-ci.com/btjanaka/academic-site.svg?branch=master)](https://travis-ci.com/btjanaka/academic-site)

Current version of [btjanaka.net](https://btjanaka.net).

Based on the [TeXt Theme](https://tianqi.name/jekyll-TeXt-theme/test/) for
Jekyll. [Modified](#modifications-to-text-theme), particularly to include
Webpack and React.

This site is built at https://travis-ci.com/btjanaka/academic-site, and hosted
from the `master` branch at https://github.com/btjanaka/btjanaka.github.io.

## Contents

<!-- vim-markdown-toc GFM -->

* [Instructions](#instructions)
  * [Installation](#installation)
  * [Makefile](#makefile)
  * [Adding a Page](#adding-a-page)
  * [Adding Quote Drawings to the Personal Page](#adding-quote-drawings-to-the-personal-page)
  * [Lighthouse](#lighthouse)
* [Modifications to TeXt-theme](#modifications-to-text-theme)
  * [Article / Page Configuration](#article--page-configuration)
  * [Webpack / React](#webpack--react)
  * [Jekyll Plugins](#jekyll-plugins)
  * [Archive](#archive)
  * [Article Lists](#article-lists)
  * [Dark Mode](#dark-mode)
  * [Katex](#katex)
* [License](#license)

<!-- vim-markdown-toc -->

## Instructions

More docs available
[here](https://tianqi.name/jekyll-TeXt-theme/docs/en/quick-start) and
[here](https://jekyllrb.com).

### Installation

Clone the repo, then run:

```bash
bundle install
npm install
```

Or just:

```bash
make install
```

The site uses Ruby 2.7.0. If you do not have that installed, consider using
[RVM (Ruby Version Manager)](https://rvm.io). If you do not have Node installed,
I recommend using [NVM (Node Version Manager](https://github.com/nvm-sh/nvm).

To get a live preview of the site, run the following commands at the same time
(e.g. in two different terminals, or with one or both in the background):

```bash
bundle exec jekyll serve --livereload-port 8001
npm start
```

The first command can also be replaced with `make serve-site`.

The site will now be available at http://localhost:8000.

### Makefile

The provided `Makefile` provides many useful commands. Run `make help` for more
info.

### Adding a Page

1. Create the file `<page>.md` in `src`. Consider simply copying the file
   `index.md` and modifying it.
1. Add content to the `<page>.md`.
1. Add the page in `_data/navigation.yml`, using the URL `/<page>.html` and the
   title `<page>`. Alternatively, if not listing this page on the header, put it
   in `miscpages.yml`.

### Adding Quote Drawings to the Personal Page

The Personal page (in `src/personal.md`) hosts quote drawings from the repo
https://github.com/btjanaka/art. To pull in a new drawing, run the
`tools/add_quote_drawing.py` script.

### Lighthouse

To run Lighthouse on https://btjanaka.net, use

```bash
make lighthouse
```

## Modifications to TeXt-theme

This site makes several modifications to the original TeXt-theme.

### Article / Page Configuration

- `show_section_navigator` allows one to show or hide the section navigator at
  the bottom of articles.
- `use_page_title_as_title` allows one to make the page title be the title shown
  in the `title` tag in the header (by default, the title is
  `page title - site title`)

### Webpack / React

This project uses Webpack to bundle JavaScript for certain components, as
inspired by
[this blog post](https://allizad.com/2016/05/02/using-webpack-with-jekyll/) by
Alli Zadrozny. In particular, this means React components can be inserted at
arbitrary points in the site. The JS and styles (scss/css) for these components
are stored in the `webpack` folder and built to `src/assets/bundle/`, where they
are picked up by Jekyll. To include this bundle on a Jekyll page, add
`use_webpack: true` to the front matter. During development, run `npm start` or
`npm run start` to continuously build the Webpack bundle, in addition to the
Jekyll command above.

To add a React component, implement it in `webpack/components`. Then, register
it under some `ID` in the `REACT_COMPONENTS` object in `webpack/index.js`.
Finally, on a Jekyll page, add `<div class="react" id=ID></div>` to indicate
where the component should mount. Note that multiple components can be mounted
on a page, by adding multiple `div`'s.

### Jekyll Plugins

- [Jekyll-Scholar](https://github.com/inukshuk/jekyll-scholar)

### Archive

Modified to include a list of pages as well as the posts. The provided `archive`
layout is no longer used on the `archive` page.

### Article Lists

Added a `use_h3` option -- when making an article list with `brief` type,
passing `use_h3=true` will cause h3 to be used instead of h2 for the titles. See
`archive.html` for an example.

### Dark Mode

A button at the top of the page controls whether the page is displayed in dark
mode. The `dark_text_skin` and `dark_highlight_theme` options in `_config.yml`
control the skin and highlight theme, respectively, used in this dark mode. The
user's choice of dark mode is stored persistently in
[localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

### Katex

Instead of Mathjax, I use [Katex](https://katex.org). Instead of
`mathjax: true`, use `katex: true` in YAML front matter.

## License

The content of this project itself is licensed under the
[Creative Commons Attribution-NonCommercial 4.0 International license](https://creativecommons.org/licenses/by-nc/4.0/),
and the underlying source code used to format and display that content is
licensed under the [MIT license](https://en.wikipedia.org/wiki/MIT_License).
