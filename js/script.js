const page = document.body.dataset.page;

function renderCasesInContainer(container) {
    const scope = container || document;
    const namespace =
        container?.getAttribute?.("data-barba-namespace") ||
        document.body.dataset.page;
    const cases = scope.querySelectorAll(".case");

    if (namespace === "main") {
        cases.forEach((caseItem) => {
            const cover = caseItem.dataset.cover;
            const company = caseItem.dataset.company;
            const des = caseItem.dataset.des;
            const href = caseItem.dataset.href;
            caseItem.innerHTML = `
    <a href="${href}">
      <div class="img">
        <div class="wip">
            <p>Кейс в разработке</p>
        </div>
        <img src="${cover}" alt="Сайт">
      </div>
    </a>
    <div class="case-d">
      <a href="${href}">
        <h3>${company}</h3>
      </a>
      <p class="lg">/</p>
      <p class="g">${des}</p>
    </div>`;
        });
    } else if (namespace === "topurok" || namespace === "tochka") {
        cases.forEach((caseItem) => {
            const cover = caseItem.dataset.cover;
            const company = caseItem.dataset.company;
            const href = caseItem.dataset.href;
            caseItem.innerHTML = `
    <a href="${href}">
      <div class="img">
        <div class="wip">
            <p>Кейс в разработке</p>
        </div>
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
}

if (page === "main") {
    renderCasesInContainer();

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
    renderCasesInContainer();

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

document.addEventListener(
    "click",
    (e) => {
        if (e.target.closest("a.lightbox")) {
            e.preventDefault();
        }
    },
    true,
);

let lastActiveSection = "";

function updateActiveSection() {
    const sections = document.querySelectorAll("main > div[id], footer[id]");
    const menuLinks = document.querySelectorAll(".sections a");
    const screenMiddle = window.scrollY + window.innerHeight / 2;

    lastActiveSection = "";
    sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        if (sectionTop <= screenMiddle) {
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

document.addEventListener("click", (e) => {
    const link = e.target.closest(".sections a");
    if (!link) return;

    const href = link.getAttribute("href");

    if (href.includes(".html")) return;

    e.preventDefault();

    const targetId = href.replace(" m-scroll", "").substring(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    const targetRect = target.getBoundingClientRect();
    const targetTop = targetRect.top + window.scrollY;

    let scrollTo;

    if (href.includes("m-scroll")) {
        const scrollMargin =
            parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
        scrollTo = targetTop - scrollMargin;
    } else {
        scrollTo = targetTop + target.offsetHeight / 2 - window.innerHeight / 2;
    }

    window.scrollTo({
        top: scrollTo,
        behavior: "smooth",
    });
});

window.addEventListener("scroll", updateActiveSection);
window.addEventListener("load", updateActiveSection);
updateActiveSection();

function copyEmail() {
    const email = "turbocapybara@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        const btn = document.getElementById("copyButton");
        btn.classList.add("copied");

        setTimeout(() => {
            btn.classList.remove("copied");
        }, 2000);
    });
}
