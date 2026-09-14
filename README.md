JS
====

{% for file in site.static_files %}
  {% assign suffix = file.name | split: "." | slice: -2, 2 | unshift: "" | join: "." %}
  {% if file.path contains '/js/' and suffix == '.user.js' %}
## [{{ file.name }}]({{ file.path | relative_url }})
  {% endif %}
{% endfor %}

----

CSS
=====
{% for file in site.static_files %}
  {% assign suffix = file.name | split: "." | slice: -2, 2 | unshift: "" | join: "." %}
  {% if file.path contains '/css/' and suffix == '.user.css' %}
## [{{ file.name }}]({{ file.path | relative_url }})
  {% endif %}
{% endfor %}
