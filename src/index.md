---
layout: article
title: Bryon Tjanaka
use_page_title_as_title: true
---

<!-- Biography -->

<div class="card profile-pic">
  <div class="card__image">
    <img class="image" src="/assets/img/btjanaka.jpg"/>
  </div>
</div>

I am an undergraduate computer science major at [UC Irvine](https://uci.edu/). I
work with [Roy Fox](https://royf.org/) and the Intelligent Dynamics Lab on
hierarchical reinforcement learning, and with
[David Mobley](https://mobleylab.org/people/david-mobley/),
[Jessica Maat](https://www.linkedin.com/in/jessica-maat-2a1875119/), and the
[Mobley Lab](https://mobleylab.org/) on molecular dynamics force fields. I have
also served as Internal Vice President of [ACM@UCI](http://acm-uci.org/), and I
have interned at [Google](https://google.com) for two summers. This Fall, I will
be joining the [ICAROS Lab](http://icaros.usc.edu) at
[USC](https://www.usc.edu/) as I pursue a PhD in Computer Science under the
supervision of [Stefanos Nikolaidis](https://stefanosnikolaidis.net).

My main interests are in robotics and AI, particularly hierarchical
reinforcement and imitation learning, clustering, and human-robot collaboration.
I have also explored computational chemistry, competitive programming, and web
development.

During high school, I competed in the
[VEX Robotics Competition](https://en.wikipedia.org/wiki/VEX_Robotics_Competition)
with 86868: The Resistance and won the
[2017 VEX Robotics High School World Championship](https://www.robotevents.com/robot-competitions/vex-robotics-competition/RE-VRC-17-4887.html).

[<i class="far fa-file-alt"></i> Resume](/assets/pdf/btjanaka-resume.pdf){:.button.button--primary.button--pill}
[<i class="far fa-file-alt"></i> CV](/assets/pdf/btjanaka-cv.pdf){:.button.button--primary.button--pill}

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

<!-- Konami Code and Car Animation -->
<!-- See also https://www.w3schools.com/howto/howto_css_modals.asp -->

<!-- A modal that displays the animation. It starts out hidden. -->
<div id="modal" class="custom__modal">
  <div class="custom__modal-content">
    <span id="close" class="custom__modal-close">&times;</span>
    <h2>Konami Code!</h2>
    {% include projects/car/car.html %}
  </div>
</div>

<script type="text/javascript" src="/assets/js/konami.js"></script>

<script type="text/javascript">
  let modal = document.getElementById("modal");

  // Clicking on the close button or outside the window closes the modal.
  let close = document.getElementById("close");
  close.onclick = function() {
    window.showing_car = false;
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if(event.target == modal) {
      window.showing_car = false;
      modal.style.display = "none";
    }
  }

  // Konami code activates the modal.
  let konami = new Konami(function() {
    window.showing_car = true; // Global variable for activating the car.
    modal.style.display = "block";
  });
</script>
