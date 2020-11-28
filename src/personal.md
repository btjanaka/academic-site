---
layout: article
title: Personal
aside:
  toc: true
---

## Hobbies

### Graphic Design

I typically use [Inkscape](https://inkscape.org) to draw these. Refer to this
[GitHub repo](https://github.com/btjanaka/art) for the SVG sources.

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

<blockquote class="twitter-tweet tw-align-center">
  <p lang="en" dir="ltr">
    Re: Mispronouncing my name
    <br>
    <br>
    ~~ Phone conversation excerpt ~~
    <br>
    A: Hi, is this Byron Tanaka?
    <br>
    Me: Yes, this is __Bryon Tjanaka (pronounced like Brian chuh-NAH-kah)__
    <br>
    A: Ok Byron, I&#39;m calling about...
    <br>
    Me:
    <a href="https://t.co/cjhHBIfjqH">
      pic.twitter.com/cjhHBIfjqH
    </a>
  </p>
  &mdash; Bryon Tjanaka (@btjanaka)
  <a href="https://twitter.com/btjanaka/status/1296674265018793984?ref_src=twsrc%5Etfw">
    August 21, 2020
  </a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

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
