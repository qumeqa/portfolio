if (document.body.dataset.page === 'main') {
  document.querySelectorAll('.case').forEach(caseItem => {
    const cover = caseItem.dataset.cover;
    const company = caseItem.dataset.company;
    const des = caseItem.dataset.des;
    const href = caseItem.dataset.href;
    caseItem.innerHTML = `
    <a href="${href}">
      <div class="img">
        <img src="${cover}" alt="Сайт">
      </div>
    </a>
    <div class="case-d">
      <a href="${href}">
        <h3>${company}</h3>
      </a>
      <p class="g">${des}</p>
    </div>`;
  });
}

if (document.body.dataset.page === 'topurok') {
  document.querySelectorAll('.case').forEach(caseItem => {
    const cover = caseItem.dataset.cover;
    const company = caseItem.dataset.company;
    const href = caseItem.dataset.href;
    caseItem.innerHTML = `
    <a href="${href}">
      <div class="img">
        <img src="${cover}" alt="Сайт">
      </div>
    </a>
    <div class="case-d">
      <a href="${href}">
        <h3>${company}</h3>
      </a>
    </div>`;
  });
}

document.querySelectorAll('.off').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
  });
});

function updateActiveSection() {
  const sections = document.querySelectorAll('main > div[id], footer[id]');
  const menuLinks = document.querySelectorAll('.sections a');
  const middleOfScreen = window.scrollY + window.innerHeight / 2;

  let currentSection = '';
  let minDistance = Infinity;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionBottom = sectionTop + sectionHeight;
    const sectionMiddle = sectionTop + sectionHeight / 2;

    if (middleOfScreen >= sectionTop && middleOfScreen <= sectionBottom) {
      currentSection = section.id;
    }

    const distance = Math.abs(middleOfScreen - sectionMiddle);
    if (distance < minDistance) {
      minDistance = distance;
      if (!currentSection) currentSection = section.id;
    }
  });

  menuLinks.forEach(link => {
    const href = link.getAttribute('href').replace(' m-scroll', '').substring(1);
    link.classList.toggle('g', href !== currentSection);
  });
}

document.querySelectorAll('.sections a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const href = link.getAttribute('href');
    const hasMarginScroll = href.includes('m-scroll');
    const targetId = href.replace(' m-scroll', '').substring(1);
    const targetSection = document.getElementById(targetId);

    if (!targetSection) return;

    const sectionTop = targetSection.offsetTop;

    if (hasMarginScroll) {
      const scrollMargin = parseFloat(getComputedStyle(targetSection).scrollMarginTop) || 0;
      window.scrollTo({ top: sectionTop - scrollMargin, behavior: 'smooth' });
    } else {
      const scrollPosition = sectionTop - window.innerHeight / 2 + targetSection.offsetHeight / 2;
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }
  });
});

window.addEventListener('scroll', updateActiveSection);
window.addEventListener('load', updateActiveSection);
updateActiveSection();