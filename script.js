// Home page name typing animation
(function () {
  var el = document.getElementById('typed-name');
  if (!el) return;

  var name = 'Sai Rohan Jayaprakash';
  var h1 = el.closest('h1');
  var i = 0;

  function type() {
    if (window.__skipAllAnimations) return;
    if (i < name.length) {
      el.textContent += name[i];
      i++;
      setTimeout(type, 90);
    } else if (h1) {
      h1.classList.add('done');
      document.body.classList.add('typing-done');
      document.body.setAttribute('data-typing-done', 'true');
    }
  }

  setTimeout(type, 600);
})();

// Jobs page typing animation (content, with logos)
(function () {
  var lines = Array.prototype.slice.call(document.querySelectorAll('.jobs-line'));
  if (!lines.length) return;

  var texts = lines.map(function (el) { return el.getAttribute('data-text') || ''; });
  var cursor = document.querySelector('.jobs-typing .cursor');

  var logos = Array.prototype.slice.call(document.querySelectorAll('.jobs-row .jobs-logo'));
  var lineIndex = 0;
  var charIndex = 0;
  var detailBox = document.getElementById('jobs-detail-text');
  var detailWrapper = document.querySelector('.jobs-detail');

  function startJobsTyping() {
    function step() {
      if (window.__skipAllAnimations) return;
      if (lines[0].dataset.skip === '1') return;

      var currentText = texts[lineIndex] || '';
      if (charIndex === 0 && logos[lineIndex]) {
        logos[lineIndex].classList.add('logo-visible');
      }
      lines[lineIndex].textContent = currentText.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex < currentText.length) {
        setTimeout(step, 35);
      } else {
        lineIndex++;
        charIndex = 0;
        if (lineIndex < lines.length) {
          setTimeout(step, 260);
        } else {
          if (cursor && cursor.classList) {
            cursor.classList.add('done');
          }
          if (detailBox && !detailBox.textContent) {
            detailBox.textContent = 'Hover over a role to see description.';
          }
          if (detailWrapper) {
            detailWrapper.classList.add('detail-visible');
          }
        }
      }
    }

    setTimeout(step, 300);
  }

  window.__startJobsTyping = startJobsTyping;

  // Hover descriptions for jobs
  if (detailBox) {
    lines.forEach(function (el) {
      function setDesc() {
        var desc = el.getAttribute('data-description') || '';
        detailBox.textContent = desc;
      }
      el.addEventListener('mouseenter', setDesc);
      el.addEventListener('focus', setDesc);
    });
  }
})();

// Research page typing animation (content, with logos)
(function () {
  var lines = Array.prototype.slice.call(document.querySelectorAll('.research-line'));
  if (!lines.length) return;

  var texts = lines.map(function (el) { return el.getAttribute('data-text') || ''; });
  var cursor = document.querySelector('.research-typing .cursor');

  var logos = Array.prototype.slice.call(document.querySelectorAll('.research-row .research-logo'));
  var lineIndex = 0;
  var charIndex = 0;
  var detailBox = document.getElementById('research-detail-text');
  var detailWrapper = document.querySelector('.research-detail');

  function startResearchTyping() {
    function step() {
      if (window.__skipAllAnimations) return;
      if (lines[0].dataset.skip === '1') return;

      var currentText = texts[lineIndex] || '';
      if (charIndex === 0 && logos[lineIndex]) {
        logos[lineIndex].classList.add('logo-visible');
      }
      lines[lineIndex].textContent = currentText.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex < currentText.length) {
        setTimeout(step, 40);
      } else {
        lineIndex++;
        charIndex = 0;
        if (lineIndex < lines.length) {
          setTimeout(step, 260);
        } else {
          if (cursor && cursor.classList) {
            cursor.classList.add('done');
          }
          if (detailBox && !detailBox.textContent) {
            detailBox.textContent = 'Hover over a role to see description.';
          }
          if (detailWrapper) {
            detailWrapper.classList.add('detail-visible');
          }
        }
      }
    }

    setTimeout(step, 300);
  }

  window.__startResearchTyping = startResearchTyping;

  // Hover descriptions for research entries
  if (detailBox) {
    lines.forEach(function (el) {
      function setDesc() {
        var desc = el.getAttribute('data-description') || '';
        detailBox.textContent = desc;
      }
      el.addEventListener('mouseenter', setDesc);
      el.addEventListener('focus', setDesc);
    });
  }
})();

// Page heading typing animations (Jobs, Research, Built, Building)
(function () {
  function typeHeading(id, text, onDone) {
    var el = document.getElementById(id);
    if (!el) return;
    var cursor = el.nextElementSibling;
    var i = 0;

    function step() {
      if (el.dataset.skip === '1') return;
      if (i < text.length) {
        el.textContent += text[i];
        i++;
        setTimeout(step, 90);
      } else {
        if (cursor && cursor.classList) {
          cursor.classList.add('done');
        }
        if (typeof onDone === 'function') onDone();
      }
    }

    setTimeout(step, 400);
  }

  // Jobs page
  if (document.getElementById('jobs-heading')) {
    var jobsBody = document.querySelector('.jobs-page-body');
    typeHeading('jobs-heading', 'Jobs', function () {
      if (jobsBody) jobsBody.classList.add('page-body-visible');
      if (window.__startJobsTyping) window.__startJobsTyping();
    });
  }

  // Research page
  if (document.getElementById('research-heading')) {
    var researchBody = document.querySelector('.research-page-body');
    typeHeading('research-heading', 'Research', function () {
      if (researchBody) researchBody.classList.add('page-body-visible');
      if (window.__startResearchTyping) window.__startResearchTyping();
    });
  }

  // Built page
  if (document.getElementById('built-heading')) {
    var builtBody = document.querySelector('.built-page-body');
    typeHeading('built-heading', 'Built', function () {
      if (builtBody) builtBody.classList.add('page-body-visible');
    });
  }

  // Building page
  if (document.getElementById('building-heading')) {
    var buildingBody = document.querySelector('.building-page-body');
    typeHeading('building-heading', 'Building', function () {
      if (buildingBody) buildingBody.classList.add('page-body-visible');
    });
  }
})();

// Global skip animations handler + button wiring
(function () {
  function skipAll() {
    window.__skipAllAnimations = true;

    // Home page name
    var nameSpan = document.getElementById('typed-name');
    if (nameSpan) {
      var fullName = 'Sai Rohan Jayaprakash';
      nameSpan.textContent = fullName;
      var homeH1 = nameSpan.closest('h1');
      if (homeH1) homeH1.classList.add('done');
      var homeCursor = nameSpan.nextElementSibling;
      if (homeCursor && homeCursor.classList) homeCursor.classList.add('done');
      document.body.classList.add('typing-done');
      document.body.setAttribute('data-typing-done', 'true');
    }

    // Helper to finalize heading and show body
    function finishSection(headingId, label, bodySelector) {
      var hSpan = document.getElementById(headingId);
      if (hSpan) {
        hSpan.dataset.skip = '1';
        hSpan.textContent = label;
        var hCursor = hSpan.nextElementSibling;
        if (hCursor && hCursor.classList) hCursor.classList.add('done');
      }
      if (bodySelector) {
        var body = document.querySelector(bodySelector);
        if (body) body.classList.add('page-body-visible');
      }
    }

    // Jobs section
    finishSection('jobs-heading', 'Jobs', '.jobs-page-body');
    var jobLines = document.querySelectorAll('.jobs-line');
    if (jobLines.length) {
      jobLines.forEach(function (el) {
        el.dataset.skip = '1';
        var full = el.getAttribute('data-text') || '';
        el.textContent = full;
      });
      var jobsCursor = document.querySelector('.jobs-typing .cursor');
      if (jobsCursor && jobsCursor.classList) jobsCursor.classList.add('done');
      var jobLogos = document.querySelectorAll('.jobs-logo');
      jobLogos.forEach(function (logo) {
        logo.classList.add('logo-visible');
      });
      var detailBox = document.getElementById('jobs-detail-text');
      var detailWrapper = document.querySelector('.jobs-detail');
      if (detailBox) {
        detailBox.textContent = 'Hover over a role to see description.';
      }
      if (detailWrapper) {
        detailWrapper.classList.add('detail-visible');
      }
    }

    // Research section
    finishSection('research-heading', 'Research', '.research-page-body');
    var researchLines = document.querySelectorAll('.research-line');
    if (researchLines.length) {
      researchLines.forEach(function (el) {
        el.dataset.skip = '1';
        var full = el.getAttribute('data-text') || '';
        el.textContent = full;
      });
      var researchCursor = document.querySelector('.research-typing .cursor');
      if (researchCursor && researchCursor.classList) researchCursor.classList.add('done');
      var researchLogos = document.querySelectorAll('.research-logo');
      researchLogos.forEach(function (logo) {
        logo.classList.add('logo-visible');
      });
      var rBox = document.getElementById('research-detail-text');
      var rWrapper = document.querySelector('.research-detail');
      if (rBox) {
        rBox.textContent = 'Hover over a role to see description.';
      }
      if (rWrapper) {
        rWrapper.classList.add('detail-visible');
      }
    }

    // Built + Building sections (headings + bodies only)
    finishSection('built-heading', 'Built', '.built-page-body');
    finishSection('building-heading', 'Building', '.building-page-body');
  }

  window.__skipAllAnimations = false;
  window.__skipAnimations = skipAll;

  var btn = document.querySelector('.skip-button');
  if (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      skipAll();
    });
  }
})();

// Corner mascot animation (bottom + top copy)
(function () {
  var bottomDude = document.querySelector('.corner-dude');
  var topDude = document.querySelector('.corner-dude-top');
  if (!bottomDude) return;

  // Bottom order: bottom-left → bottom-right
  var positions = ['pos-bottom-left', 'pos-bottom-right'];
  var currentIndex = -1;
  var bottomVisible = false;

  var allPosClasses = ['pos-bottom-left', 'pos-bottom-right', 'pos-top-left', 'pos-top-right'];

  function resetPosition(el, cls) {
    if (!el) return;
    allPosClasses.forEach(function (c) { el.classList.remove(c); });
    el.classList.remove('visible', 'leaving');
    if (cls) el.classList.add(cls);
  }

  function applyBottom(idx) {
    var pos = positions[idx];
    resetPosition(bottomDude, pos);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        bottomDude.classList.add('visible');
        bottomVisible = true;
      });
    });
  }

  function showTopFor(bottomPos) {
    if (!topDude) return;
    // Map: bottom-right → top-left, bottom-left → top-right
    var topPos = bottomPos === 'pos-bottom-right' ? 'pos-top-left' : 'pos-top-right';
    resetPosition(topDude, topPos);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        topDude.classList.add('visible');
      });
    });

    // Hide top copy after a short delay
    setTimeout(function () {
      topDude.classList.add('leaving');
      topDude.classList.remove('visible');
    }, 1400);
  }

  function cycle() {
    if (bottomVisible) {
      // Bottom leaves, then trigger the corresponding top copy
      bottomDude.classList.add('leaving');
      bottomDude.classList.remove('visible');
      bottomVisible = false;

      var lastBottomPos = positions[currentIndex];

      setTimeout(function () {
        showTopFor(lastBottomPos);
      }, 750);
    } else {
      currentIndex = (currentIndex + 1) % positions.length;
      applyBottom(currentIndex);
    }
  }

  setTimeout(cycle, 800);
  setInterval(cycle, 10000);
})();
