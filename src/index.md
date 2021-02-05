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

I am a computer science PhD student in the [ICAROS Lab](http://icaros.usc.edu)
at [USC](https://www.usc.edu/), supervised by
[Stefanos Nikolaidis](https://stefanosnikolaidis.net). I also serve as the
webmaster of USC's [VGSA](http://vgsa.usc.edu), and as a senator representing
the Viterbi School in [GSG](https://gsg.usc.edu). Previously, I was an
undergraduate in computer science at [UC Irvine](https://uci.edu/), where I
worked with [Roy Fox](https://royf.org/) and the
[Intelligent Dynamics Lab](https://indylab.org/) on hierarchical reinforcement
learning, and with [David Mobley](https://mobleylab.org/people/david-mobley/),
[Jessica Maat](https://www.linkedin.com/in/jessica-maat-2a1875119/), and the
[Mobley Lab](https://mobleylab.org/) on molecular dynamics force fields.
Additionally, I was the Internal Vice President of
[ACM@UCI](http://acm-uci.org/). Outside of academia, I have interned at
[Google](https://google.com) for three summers.

My main interests are in robotics and AI, particularly quality diversity
algorithms, evolutionary algorithms, reinforcement learning, and human-robot
collaboration. I have also explored clustering, computational chemistry,
competitive programming, and web development.

During high school, I competed in the
[VEX Robotics Competition](https://en.wikipedia.org/wiki/VEX_Robotics_Competition)
with [86868: The Resistance](/resistance) and won the
[2017 VEX Robotics High School World Championship](https://www.robotevents.com/robot-competitions/vex-robotics-competition/RE-VRC-17-4887.html).

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
