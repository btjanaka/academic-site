---
layout: archive
---

## Project Pages

{% for project in site.projects %}
  <a class="item__header" href="{{ project.url }}">{{ project.title }}</a>
{% endfor %}

## Other Pages

{% for page in site.data.miscpages %}
  <a class="item__header" href="{{ page.url }}">{{ page.title }}</a>
{% endfor %}
