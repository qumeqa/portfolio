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

// Функция для обновления активного пункта меню
function updateActiveSection() {
  const sections = document.querySelectorAll('main > div[id], footer[id]');
  const menuLinks = document.querySelectorAll('.sections a');

  // Получаем середину экрана
  const middleOfScreen = window.scrollY + (window.innerHeight / 2);

  let currentSection = '';
  let foundIntersection = false;
  let minDistance = Infinity;
  let closestSection = '';

  // Находим секцию, которая пересекает середину экрана
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionBottom = sectionTop + sectionHeight;
    const sectionMiddle = sectionTop + (sectionHeight / 2);

    // Проверяем, что середина экрана находится внутри секции
    if (middleOfScreen >= sectionTop && middleOfScreen <= sectionBottom) {
      currentSection = section.getAttribute('id');
      foundIntersection = true;
    }

    // На всякий случай запоминаем ближайшую секцию
    const distance = Math.abs(middleOfScreen - sectionMiddle);
    if (distance < minDistance) {
      minDistance = distance;
      closestSection = section.getAttribute('id');
    }
  });

  // Если ни одна секция не пересекает середину (мы в gap), используем ближайшую
  if (!foundIntersection) {
    currentSection = closestSection;
  }

  // Обновляем классы у ссылок меню
  menuLinks.forEach(link => {
    const href = link.getAttribute('href').substring(1); // Убираем # из href

    if (href === currentSection) {
      // Текущая секция - оставляем черным (без класса .g)
      link.classList.remove('g');
    } else {
      // Остальные - делаем серыми
      link.classList.add('g');
    }
  });
}

// Обработка кликов по ссылкам меню
const menuLinks = document.querySelectorAll('.sections a');
menuLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // Отменяем стандартное поведение

    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      // Если это контакты, скроллим в самый низ страницы
      if (targetId === 'contacts') {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      } else {
        // Получаем scroll-margin-top из CSS
        const styles = window.getComputedStyle(targetSection);
        const scrollMargin = parseFloat(styles.scrollMarginTop) || 0;

        // Вычисляем позицию с учетом scroll-margin-top
        const sectionTop = targetSection.offsetTop;

        // Скроллим к началу секции минус scroll-margin
        window.scrollTo({
          top: sectionTop - scrollMargin,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Вызываем функцию при скролле
window.addEventListener('scroll', updateActiveSection);

// Вызываем функцию при загрузке страницы
window.addEventListener('load', updateActiveSection);

// Также вызываем сразу на случай, если страница уже загружена
updateActiveSection();