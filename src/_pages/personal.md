---
layout: page
title: personal
permalink: /personal/
# description:
order: 2
---

[Graphic Design](#graphic-design) \| [Quotes](#quotes) \|
[Modular Origami](#modular-origami) \| [Miscellaneous](#miscellaneous)

## Graphic Design

I typically use [Inkscape](https://inkscape.org) to draw these. Refer to this
[GitHub repo](https://github.com/btjanaka/art) for the sources.

<img style="width:35%" alt="hero drawing" src="{{ site.baseurl }}/assets/img/hero-drawing.png">
_phone wallpaper_

![mountain explorer]({{ site.baseurl }}/assets/img/mountain-explorer-blue.png)
_laptop wallpaper_

![explosion]({{ site.baseurl }}/assets/img/explosion-drawing.png) _an
explosion?_

![tower]({{ site.baseurl }}/assets/img/tower-drawing.png) _perspective drawing
of a tower_

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

<a href="https://data.typeracer.com/pit/profile?user=btjanaka&ref=badge" target="_top">
<img
  src="https://data.typeracer.com/misc/badge?user=btjanaka"
  border="0"
  style="width: 150px;"
  alt="TypeRacer.com scorecard for user btjanaka"
/>
</a>
