---
layout: page
title: personal
permalink: /personal/
# description:
order: 2
---

1. TOC
{:toc}

## Graphic Design

I typically use [Inkscape](https://inkscape.org) to draw these. Refer to this
[GitHub repo](https://github.com/btjanaka/art) for the sources.

<img class="vertical" alt="hero drawing" src="{{ site.baseurl }}/assets/img/hero-drawing.png">
_phone wallpaper_

![mountain explorer]({{ site.baseurl }}/assets/img/mountain-explorer-blue.png)
_laptop wallpaper_

![explosion]({{ site.baseurl }}/assets/img/explosion-drawing.png) _an
explosion?_

![tower]({{ site.baseurl }}/assets/img/tower-drawing.png) _perspective drawing
of a tower_

## Drone

Filmed with a DJI Spark.

<iframe width="560" height="315" style="max-width:100%;display:block;margin:auto;" src="https://www.youtube.com/embed/ocbqDGYMGUA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Quotes

{% for quote in site.data.quotes %}

  <blockquote id="quote-{% increment quote_counter %}">
  <p>{{ quote.quote }}</p>
  {%- if quote.speaker -%}
  <div class="speaker">{{ quote.speaker }}</div>
  {% endif %}
  </blockquote>
{% endfor %}

<blockquote id="quote-{% increment quote_counter %}">
<p>Nature's first green is gold,</p>
<p>Her hardest hue to hold.</p>
<p>Her early leaf's a flower;</p>
<p>But only so an hour.</p>
<p>Then leaf subsides to leaf.</p>
<p>So Eden sank to grief,</p>
<p>So dawn goes down to day.</p>
<p>Nothing gold can stay.</p>
<div class="speaker">Robert Frost</div>
</blockquote>

## Modular Origami

Each piece is composed of up to several hundred pieces of paper.

![menger sponge]({{ site.baseurl }}/assets/img/menger.jpg)
_[menger sponge](https://en.wikipedia.org/wiki/Menger_sponge), n=1_

![origami assortment]({{ site.baseurl }}/assets/img/origami-assortment.jpg) _an
assortment of modular origami_

![ACM@UCI cube]({{ site.baseurl }}/assets/img/acm-cube.jpg) _a small cube for
ACM@UCI_

## Miscellaneous

### Competitive Programming Profiles

I use these sites when practicing for competitions like
[ICPC](https://icpc.baylor.edu/).

- [UVa profile](https://uhunt.onlinejudge.org/id/945356)
- [Kattis profile](https://open.kattis.com/users/btjanaka)
- [LeetCode profile](https://leetcode.com/btjanaka/)
- [HackerRank profile](https://www.hackerrank.com/btjanaka)

### TypeRacer Profile

<a href="https://data.typeracer.com/pit/profile?user=btjanaka&ref=badge" target="_top">
<img
  src="https://data.typeracer.com/misc/badge?user=btjanaka"
  border="0"
  style="width: 150px;"
  alt="TypeRacer.com scorecard for user btjanaka"
/>
</a>
