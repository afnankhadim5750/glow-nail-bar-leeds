document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-mobile-menu]');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }
  // Scroll-spy: highlight the nav link for the section in view.
  var links = document.querySelectorAll('.mainnav a[href^="#"]');
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        links.forEach(function (a) { a.classList.remove('active'); });
        var a = map[e.target.id];
        if (a) a.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  ['about', 'prices', 'services', 'gallery', 'visit'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) spy.observe(el);
  });
  // Lightbox.
  var items = Array.prototype.slice.call(document.querySelectorAll('.g-item'));
  var box = document.getElementById('lightbox');
  var img = document.getElementById('lb-img');
  var idx = 0;
  function show(i) {
    idx = (i + items.length) % items.length;
    img.src = items[idx].getAttribute('data-full');
    img.alt = items[idx].querySelector('img').alt;
  }
  function open(i) { if (!box) return; box.hidden = false; show(i); document.querySelector('.lb-close').focus(); }
  function close() { if (box) box.hidden = true; }
  items.forEach(function (b, i) { b.addEventListener('click', function () { open(i); }); });
  if (box) {
    box.querySelector('.lb-close').addEventListener('click', close);
    box.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(idx - 1); });
    box.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(idx + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    document.addEventListener('keydown', function (e) {
      if (box.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }
  // Booking form opens the visitor's email app addressed to the salon.
  var form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('bk-name').value;
      var service = document.getElementById('bk-service').value;
      var note = document.getElementById('bk-note').value;
      var subject = encodeURIComponent('Booking request: ' + service);
      var body = encodeURIComponent('Hi Glow Nail Bar,\n\nI would like to book: ' + service + '\nName: ' + name + '\nPreferred day/time and notes: ' + note + '\n\nThank you!');
      window.location.href = 'mailto:glow.nailbar@yahoo.com?subject=' + subject + '&body=' + body;
    });
  }
});
