---
layout: article
key: 2019-12-24-website-history
title: Website History
date: 2019-12-24 16:00:00-0800
tags: Website Jekyll React
---

My personal website has gone through several iterations. Here, I will briefly
describe the motivation and technologies behind each major
version.<!--excerpt-separator-->

## v1 - Jekyll

Inspired by several friends, I began investigating web development in
December 2018. Using [Jekyll](https://jekyllrb.com/) with a
[Moon](https://github.com/TaylanTatli/Moon) theme, I eventually built a personal
website and hosted it on [GitHub Pages](https://pages.github.com). Though I
thought the website looked good, I hardly knew how it all worked, so I decided
to explore further.

## v2 - "Vanilla"

To better understand basic web technologies, I built a new website from the
ground up, using raw/vanilla HTML, CSS, and JavaScript. Eventually, I used
[Browserify](http://browserify.org) to modularize my JavaScript code. I also
used [liquidjs](https://www.npmjs.com/package/liquidjs) to essentially build a
primitive static site generator, similar to Jekyll. Overall, I learned much
about web development from this project. I especially saw how web development is
full of an endless, ever-changing list of libraries and tools.

## v3 - React

To gain more experience with higher-level frameworks, I used
[React](https://reactjs.org) to build the next version of my website. In the
end, though I enjoyed the flexibility React provided, I also found it a bit
overkill for a personal website. React is tailored for large, interactive
websites, but my personal website was small and static. Furthermore, using pure
React on the client-side meant that JavaScript had to be executed before any
content was rendered, so search engines had a harder time indexing my content.
Some search engines, like Google, did execute the JavaScript and analyze the
result, but others, like DuckDuckGo, did not, and so my website did not show up.
Hence, I concluded that I should use a static site framework like Jekyll, while
plugging in small React components if needed.

## v4 - Jekyll (again)

Thus, I have come full circle and decided to use Jekyll once more, initially
with the [al-folio](https://github.com/alshedivat/al-folio) theme, and then with
the [TeXt](https://github.com/kitian616/jekyll-TeXt-theme) theme -- with
numerous custom tweaks, of course. Furthermore, I have integrated React into
this theme, allowing me to add interactive components if need be. Now that I
have a better understanding of both how Jekyll works and why it exists, I will
be able to better leverage it in the future.

[<i class="far fa-file-code"></i> Source Code](https://github.com/btjanaka/academic-site){:.button.button--primary.button--pill}
