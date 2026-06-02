// boot.js — loads JSON content files, builds the nav, then renders the page.

(function () {
  function load(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error('Could not load ' + url);
      return r.json();
    });
  }

  var needs = window.PAGE_NEEDS || [];
  var has   = function (k) { return needs.indexOf(k) > -1; };

  var keys = ['nav'];
  var jobs = [load('data/nav.json')];
  function want(key, file) { if (has(key)) { keys.push(key); jobs.push(load('data/' + file)); } }

  want('frontpage',        'front-page.json');
  want('publications',     'publications.json');
  want('bio',              'research-bio.json');
  want('talks',            'talks.json');
  want('teaching',         'teaching.json');
  want('workshops',        'workshops.json');
  want('resources',        'teaching-resources.json');
  want('cv',               'cv.json');
  want('cv_order',         'cv-order.json');
  want('veni',             'veni.json');
  want('public_philosophy','public-philosophy.json');

  Promise.all(jobs).then(function (results) {
    var data = {};
    keys.forEach(function (k, i) { data[k] = results[i]; });

    window.NAV_ITEMS = (data.nav || {}).items || [];

    if (data.frontpage)        window.FRONT_PAGE         = data.frontpage;
    if (data.publications)     window.PUBLICATIONS       = data.publications.items || data.publications;
    if (data.publications)     window.WIP                = data.publications.wip   || [];
    if (data.bio)              window.RESEARCH_BIO       = data.bio.text || '';
    if (data.bio)              window.RESEARCH_BIO_JUSTIFY = data.bio.justify || false;
    if (data.talks)            window.TALKS              = data.talks.items || data.talks;
    if (data.teaching)         window.TEACHING           = data.teaching.items || data.teaching;
    if (data.workshops)        window.WORKSHOPS          = data.workshops.items || data.workshops;
    if (data.resources)        window.TEACHING_RESOURCES = data.resources;
    if (data.cv)               window.CV_DATA            = data.cv;
    if (data.cv_order)         window.CV_ORDER           = data.cv_order.sections || [];
    if (data.veni)             window.VENI_DATA          = data.veni;
    if (data.public_philosophy) window.PUBLIC_PHILOSOPHY = data.public_philosophy;

    if (typeof buildNav      === 'function') buildNav();
    if (typeof window.initPage === 'function') window.initPage();

    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }).catch(function (err) {
    console.error('Failed to load site data:', err);
  });
})();
