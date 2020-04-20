---
layout: article
title: Bryon Tjanaka
---

<div class="card profile-pic">
  <div class="card__image">
    <img class="image" src="/assets/img/btjanaka.jpg"/>
  </div>
</div>

I am an undergraduate computer science major at [UC Irvine](https://uci.edu/). I
work with [Roy Fox](https://royf.org/) and the Intelligent Dynamics Lab on
hierarchical reinforcement learning, and with David Mobley, Jessica Maat, and
the [Mobley Lab](https://mobleylab.org/) on molecular dynamics force fields. I
have also served as Internal Vice President of [ACM@UCI](http://acm-uci.org/),
and I have interned at [Google](https://google.com) for two summers. This Fall,
I will be joining the [ICAROS Lab](http://icaros.usc.edu) at USC as I pursue a
PhD in Computer Science under the supervision of
[Stefanos Nikolaidis](https://stefanosnikolaidis.net).

My main interests are in robotics and AI, particularly hierarchical
reinforcement and imitation learning, clustering, and human-robot collaboration.
I have also explored computational chemistry, competitive programming, and web
development.

During high school, I competed in the
[VEX Robotics Competition](https://en.wikipedia.org/wiki/VEX_Robotics_Competition)
with team 86868: The Resistance and won the 2017 VEX Robotics High School World
Championship.

[Resume](/assets/pdf/btjanaka-resume.pdf){:.button.button--primary.button--pill}
[CV](/assets/pdf/btjanaka-cv.pdf){:.button.button--primary.button--pill}

<div class="news">
  <h2>News</h2>
  <table>
    {% assign reverse_events = site.data.news.events | reverse %}
    {% for event in reverse_events limit:site.data.news.limit %}
      <tr>
        <td class="date">{{ event.date }}</td>
        <td class="desc">{{ event.desc }}</td>
      </tr>
    {% endfor %}
  </table>
</div>

<!-- [> Konami Code <] -->
<script type="text/javascript" src="/assets/js/konami.js"></script>
<script type="text/javascript">
let konami = new Konami(function() { alert('Konami Code!')});
</script>
