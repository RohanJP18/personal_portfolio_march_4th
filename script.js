// Home page name typing animation
(function () {
  var el = document.getElementById('typed-name');
  if (!el) return;

  var name = 'Sai Rohan Jayaprakash';
  var h1 = el.closest('h1');
  var i = 0;

  function type() {
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

// Jobs page typing animation (content)
(function () {
  var jobsEl = document.getElementById('jobs-typed');
  if (!jobsEl) return;

  var cursor = jobsEl.nextElementSibling;
  var text = [
    'Abundant (YC F24): AI Research Intern. August - Present.',
    'Abundant (YC F24): SWE Intern. Jun 2025 - August 2025.',
    'Rayfield Systems: SWE Intern. Jun 2025 - August 2025.',
    'Cognizant: Gen AI Intern. May 2025 - June 2025.',
    'Demian Design: SWE Intern. April 2025 - June 2025.',
    'Cratus Technology. AI Intern. May 2020 - Aug 2020.'
  ].join('\n\n');

  var i = 0;

  function startJobsTyping() {
    function step() {
      if (i <= text.length) {
        jobsEl.textContent = text.slice(0, i);
        i++;
        setTimeout(step, 35);
      } else if (cursor && cursor.classList) {
        cursor.classList.add('done');
      }
    }
    setTimeout(step, 300);
  }

  window.__startJobsTyping = startJobsTyping;
})();

// Research page typing animation (content)
(function () {
  var researchEl = document.getElementById('research-typed');
  if (!researchEl) return;

  var cursor = researchEl.nextElementSibling;
  var text = [
    'Harvard University (T.H. Chan School of Public Health): Applied AI Researcher.',
    'Neuromorphic Computing Group: AI Researcher.',
    'Artificial Intelligence Explainability Accountability Lab: AI Researcher.',
    'Reality AI Lab: Gen AI Researcher.'
  ].join('\n\n');

  var i = 0;

  function startResearchTyping() {
    function step() {
      if (i <= text.length) {
        researchEl.textContent = text.slice(0, i);
        i++;
        setTimeout(step, 40);
      } else if (cursor && cursor.classList) {
        cursor.classList.add('done');
      }
    }
    setTimeout(step, 300);
  }

  window.__startResearchTyping = startResearchTyping;
})();

// Page heading typing animations (Jobs, Research, Built, Building)
(function () {
  function typeHeading(id, text, onDone) {
    var el = document.getElementById(id);
    if (!el) return;
    var cursor = el.nextElementSibling;
    var i = 0;

    function step() {
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
