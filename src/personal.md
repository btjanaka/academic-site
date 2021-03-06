---
layout: article
title: Personal
aside:
  toc: true
---

## Hobbies

### Graphic Design

I typically use [Inkscape](https://inkscape.org) to draw these. Refer to this
[GitHub repo](https://github.com/btjanaka/art) for the SVG sources. See
[here](https://art.btjanaka.net) for more art.

{% for collection in site.data.personal.graphic_design %}

#### {{ collection.name }}

{% if collection.description %}{{ collection.description }}{% endif %}

  <div class="swiper swiper-{{ collection.name | downcase | replace: ' ', '-' }}">
    <div class="swiper__wrapper">
      {% for img in collection.items %}
        <div class="swiper__slide">
          <img
            class="image {%if img.vertical %}image--vertical{%else%}image--full{%endif%}"
            alt="{{ img.caption }}"
            title="{{ img.caption }}"
            src="{{ img.img }}"
          />
        </div>
      {% endfor %}
    </div>
    <div class="swiper__button swiper__button--prev fas fa-chevron-left"></div>
    <div class="swiper__button swiper__button--next fas fa-chevron-right"></div>
  </div>
{% endfor %}

#### Abstract Art

This was generated with a
[CPPN](https://en.wikipedia.org/wiki/Compositional_pattern-producing_network). I
have created an online [CPPN image generator](cppn), as well as a
[Python notebook](https://github.com/btjanaka/ai-practice/blob/master/vision/abstract_cppn.ipynb).
This video was made with the notebook. The video shown below is a lower-quality
version. For the original video (or if the video is not showing up for you),
click [here](assets/img/graphic-design/abstract-original.mp4).

<video width="300" height="300" style="margin: 10px auto; display: block"
autoplay loop muted controls="true" playsinline

>

  <source src="assets/img/graphic-design/abstract.mp4" type="video/mp4" />
  <source src="assets/img/graphic-design/abstract.webm" type="video/webm" />
  <source src="assets/img/graphic-design/abstract.ogg" type="video/ogg" />
  <p>Your browser does not support the video tag.</p>
</video>

Here is a video using the same kind of CPPN to generate abstract art for the
song "Blue Jeans" by Lana Del Rey. Source code is available
[here](https://github.com/btjanaka/ai-practice/blob/master/vision/abstract_cppn_video.py).

<div>{%- include extensions/youtube.html id='O9qnrEp8miQ' -%}</div>

### Drone

Filmed with a [DJI Spark](https://www.dji.com/spark).

<div>{%- include extensions/youtube.html id='ocbqDGYMGUA' -%}</div>

<div>{%- include extensions/youtube.html id='Ha7Hr26Xjdc' -%}</div>

### Modular Origami

Each object is composed of up to several hundred pieces of paper.

<div class="swiper swiper-origami">
  <div class="swiper__wrapper">
    {% for img in site.data.personal.origami %}
      <div class="swiper__slide">
        <img
          alt="{{ img.caption }}"
          title="{{ img.caption }}"
          src="{{ img.img }}"
        />
      </div>
    {% endfor %}
  </div>
  <div class="swiper__button swiper__button--prev fas fa-chevron-left"></div>
  <div class="swiper__button swiper__button--next fas fa-chevron-right"></div>
</div>

### Competitive Programming

I have used these sites when practicing for competitions such as
[ICPC](https://icpc.baylor.edu/).

- [uHunt profile](https://uhunt.onlinejudge.org/id/945356)
- [Kattis profile](https://open.kattis.com/users/btjanaka)
- [LeetCode profile](https://leetcode.com/btjanaka/)
- [HackerRank profile](https://www.hackerrank.com/btjanaka)

### TypeRacer

<a href="https://data.typeracer.com/pit/profile?user=btjanaka&ref=badge" target="_top">
<img
  src="https://data.typeracer.com/misc/badge?user=btjanaka"
  class="image image--md"
  border="0"
  style="width: 150px;"
  alt="TypeRacer.com scorecard for user btjanaka"
/>
</a>

## Musings

### Pronouncing My Name

**Bryon** is pronounced exactly the same as _Brian_. Notably, my name has been
known to magically change its ordering to _Byron_ from time to time.

**Tjanaka** is pronounced like _chuh-NAH-kah_. Just imagine the _tj_ as a _ch_,
and you'll be well on your way.

### Quotes

{% for quote in site.data.personal.quotes %}

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

## Varia

[Random Widgets](/widgets)

<!-- Swiper script - all swipers should be initialized here. -->
<script>
{%- include scripts/lib/swiper.js -%}
var SOURCES = window.TEXT_VARIABLES.sources;
window.Lazyload.js(SOURCES.jquery, function() {
  {% for collection in site.data.personal.graphic_design %}
    $(".swiper-{{ collection.name | downcase | replace: ' ', '-' }}").swiper();
  {% endfor %}

  $('.swiper-origami').swiper();
});
</script>
