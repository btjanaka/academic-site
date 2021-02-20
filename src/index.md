---
layout: article
title: Bryon Tjanaka
use_page_title_as_title: true
---

<!-- Biography -->

<div class="card profile-pic">
  <div class="card__image">
    <img class="image" alt="Bryon Tjanaka" src="/assets/img/btjanaka.png"/>
  </div>
</div>

I am a PhD student in the [ICAROS Lab](http://icaros.usc.edu) at
[USC](https://www.usc.edu/), supervised by
[Stefanos Nikolaidis](https://stefanosnikolaidis.net). Previously, I studied at
[UCI](https://uci.edu/), where I worked with [Roy Fox](https://royf.org/) and
the [indylab](https://indylab.org/) on
[RL](https://en.wikipedia.org/wiki/Reinforcement_learning), and with the
[Mobley Lab](https://mobleylab.org/) on
[force fields](<https://en.wikipedia.org/wiki/Force_field_(chemistry)>).

My research focuses on robotics and AI, particularly applications of
[quality diversity optimization](https://quality-diversity.github.io) and
[evolutionary algorithms](https://en.wikipedia.org/wiki/Evolutionary_algorithm)
to reinforcement learning and
[human-robot collaboration](https://en.wikipedia.org/wiki/Human-robot_collaboration).

Outside research, I have spent time at [Google](https://google.com). Currently,
I am the webmaster of USC's [VGSA](http://vgsa.usc.edu). At UCI, I served as
[ACM@UCI](http://acm-uci.org/)'s Internal VP. During high school, I competed in
[VEX Robotics](https://en.wikipedia.org/wiki/VEX_Robotics_Competition) with
[The Resistance](/resistance) and won the
[World Championship](https://www.robotevents.com/robot-competitions/vex-robotics-competition/RE-VRC-17-4887.html).

[<i class="far fa-file-alt"></i> Resume](/btjanaka-resume.pdf){:.button.button--primary.button--pill}
[<i class="far fa-file-alt"></i> CV](/btjanaka-cv.pdf){:.button.button--primary.button--pill}

<!-- News -->

<div class="news-section">
  <h2>News</h2>

  <table class="news">
    {% assign reverse_events = site.data.news.events | reverse %}
    {% for event in reverse_events limit:site.data.news.limit %}
      <tr>
        <td class="date">{{ event.date }}</td>
        <td class="desc">{{ event.desc }}</td>
      </tr>
    {% endfor %}
  </table>

{% assign num_events = site.data.news.events | size %}
{% if num_events > site.data.news.limit %}

  <details class="show-more">
    <summary>Show More</summary>
    <table class="news">
      {% assign reverse_events = site.data.news.events | reverse %}
      {% for event in reverse_events offset:site.data.news.limit %}
        <tr>
          <td class="date">{{ event.date }}</td>
          <td class="desc">{{ event.desc }}</td>
        </tr>
      {% endfor %}
    </table>
  </details>
  {% endif %}
</div>

<!-- Konami Code -->
<script type="text/javascript" src="/assets/js/konami.js"></script>
<script>let konami = new Konami("https://art.btjanaka.net");</script>
