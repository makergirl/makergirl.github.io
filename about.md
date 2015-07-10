---
layout: page
title: About
permalink: /about/
---

<div class="container-fluid about">

  {% for member in site.data.members %}
    {% assign loopindex = forloop.index | modulo: 3 %}

    {% if loopindex == 1 %}
      <div class="row">
    {% endif %}

    <div class="col-md-4">
      <h1>{{ member.name }}</h1>
      <div>
        <img src="/public/img/{{ member.name | downcase }}.png" class="img img-responsive full-width"/>
      </div>
      <p>{{ member.email }}</p>
      <p>{{ member.bio }}</p>
    </div>

    {% if loopindex == 0 %}
      </div>
    {% endif %}
  {% endfor %}
</div>
