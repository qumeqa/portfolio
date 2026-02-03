const page = document.body.dataset.page;

if (page === "main") {
    document.querySelectorAll(".case").forEach((caseItem) => {
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

    new Typed("#changing-word", {
        strings: ["интерфейсы", "продукты", "приложения", "сервисы"],
        typeSpeed: 40,
        backSpeed: 40,
        backDelay: 1400,
        loop: true,
        showCursor: false,
        smartBackspace: false,
    });

    new Typed("#changing-words", {
        strings: ["интерфейсы", "продукты", "приложения", "сервисы"],
        typeSpeed: 40,
        backSpeed: 40,
        backDelay: 1400,
        loop: true,
        showCursor: false,
        smartBackspace: false,
    });
}

if (page === "topurok" || page === "tochka") {
    document.querySelectorAll(".case").forEach((caseItem) => {
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

    const scrollToTopBtn = document.getElementById("scrollToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            scrollToTopBtn.classList.add("visible");
        } else {
            scrollToTopBtn.classList.remove("visible");
        }
    });

    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
}

document.querySelectorAll(".off").forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
});

let lastActiveSection = "";

function updateActiveSection() {
    const sections = document.querySelectorAll("main > div[id], footer[id]");
    const menuLinks = document.querySelectorAll(".sections a");
    const screenMiddle = window.scrollY + window.innerHeight / 2;

    // Блок становится активным, когда его верх уже выше середины экрана
    sections.forEach((section) => {
        if (section.offsetTop <= screenMiddle) {
            lastActiveSection = section.id;
        }
    });

    menuLinks.forEach((link) => {
        const href = link
            .getAttribute("href")
            .replace(" m-scroll", "")
            .substring(1);
        link.classList.toggle("g", href !== lastActiveSection);
    });
}

document.querySelectorAll(".sections a").forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const href = link.getAttribute("href");
        const targetId = href.replace(" m-scroll", "").substring(1);
        const target = document.getElementById(targetId);
        if (!target) return;

        let scrollTo;

        if (href.includes("m-scroll")) {
            // Скролл на позицию с учётом scroll-margin-top из CSS
            const scrollMargin =
                parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
            scrollTo = target.offsetTop - scrollMargin;
        } else {
            // Центр блока в центр экрана
            scrollTo =
                target.offsetTop +
                target.offsetHeight / 2 -
                window.innerHeight / 2;
        }

        window.scrollTo({ top: scrollTo, behavior: "smooth" });
    });
});

window.addEventListener("scroll", updateActiveSection);
window.addEventListener("load", updateActiveSection);
updateActiveSection();