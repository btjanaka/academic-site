---
layout: article
title: Projects
articles:
  data_source: site.projects
  show_excerpt: true
  show_readmore: true
---

{% for category in site.data.projects %}

## {{ category.category_name }}

  {% for proj in category.projects %}
  <article class="item" style="margin-top: 20px">
    <div class="item__image">
      <img
        class="image image--md image--shadow image--round-corners"
        style="margin-top: 8px;margin-bottom: 15px"
        alt="{{ proj.name }}"
        src="{{ proj.img }}"
      />
    </div>
    <div class="item__content">
      <header>
        <h3 itemprop="headline" class="item__header project-header">
          {{ proj.name }}
        </h3>
      </header>
      <div class="item__description">
        <p class="project-date">
          <b>{{ proj.date }}</b>
        </p>
        <p>{{ proj.description }}</p>
        {% for link in proj.links %}
          <a class="button button--primary button--pill" href="{{ link.url }}">
            {% case link.name %}
              {% when "GitHub" %}
                <i class="fab fa-github"></i>
              {% when "PyPI" %}
                <i class="fab fa-python"></i>
              {% when "DevPost" %}
                <i class="far fa-file-code"></i>
              {% when "Documentation" %}
                <i class="fas fa-book"></i>
              {% when "Report" %}
                <i class="far fa-file-alt"></i>
              {% else %}
                <i class="fas fa-link"></i>
            {% endcase %}
            {{ link.name }}
          </a>
        {% endfor %}
      </div>
    </div>
  </article>
  {% endfor %}
{% endfor %}
