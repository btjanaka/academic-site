---
layout: article
title: Projects
articles:
  data_source: site.projects
  show_excerpt: true
  show_readmore: true
---

{% for proj in site.data.projects %}
<article class="item" style="margin-top: 20px">
  <div class="item__image">
    <img
      class="image image--md image--shadow image--round-corners"
      style="margin-top: 0px;margin-bottom: 20px"
      alt="{{ proj.name }}"
      src="{{ proj.img }}"
    />
  </div>
  <div class="item__content">
    <header>
      <h2 itemprop="headline" class="item__header">{{ proj.name }}</h2>
    </header>
    <div class="item__description">
      <p>{{ proj.description }}</p>
      {% for link in proj.links %}
      <a class="button button--primary button--pill" href="{{ link.url }}">{{ link.name }}</a>
      {% endfor %}
    </div>
  </div>
</article>
{% endfor %}
