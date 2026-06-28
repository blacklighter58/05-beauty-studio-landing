const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-list");
const navLinks = document.querySelectorAll(".nav-list a");
const faqItems = document.querySelectorAll(".faq-item");
const revealSections = document.querySelectorAll(".section-reveal");
const priceOptions = document.querySelectorAll(".price-option");
const bookingChoice = document.querySelector("#booking-choice");
const bookingLink = document.querySelector("#booking-link");
const contactSection = document.querySelector("#contact");

if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("is-open");

        menuButton.classList.toggle("is-open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("menu-open", isOpen);
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("is-open");
            menuButton.classList.remove("is-open");
            menuButton.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");
        });
    });
}

faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) {
        return;
    }

    question.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");

        faqItems.forEach((currentItem) => {
            const currentQuestion = currentItem.querySelector(".faq-question");
            const currentAnswer = currentItem.querySelector(".faq-answer");

            currentItem.classList.remove("is-open");
            currentQuestion?.setAttribute("aria-expanded", "false");

            if (currentAnswer) {
                currentAnswer.style.maxHeight = null;
            }
        });

        if (!isOpen) {
            item.classList.add("is-open");
            question.setAttribute("aria-expanded", "true");
            answer.style.maxHeight = `${answer.scrollHeight}px`;
        }
    });
});

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.03,
        rootMargin: "0px 0px -20px 0px",
    }
);

revealSections.forEach((section) => {
    revealObserver.observe(section);
});

priceOptions.forEach((option) => {
    option.addEventListener("click", () => {
        const service = option.dataset.service;
        const price = option.dataset.price;

        priceOptions.forEach((currentOption) => {
            currentOption.classList.remove("is-selected");
            currentOption.setAttribute("aria-pressed", "false");
        });

        option.classList.add("is-selected");
        option.setAttribute("aria-pressed", "true");

        if (bookingChoice && service && price) {
            bookingChoice.hidden = false;
            bookingChoice.textContent = `Выбрана услуга: ${service} — ${price}`;
        }

        if (bookingLink && service && price) {
            const subject = encodeURIComponent(`Запись на услугу: ${service}`);
            const body = encodeURIComponent(`Здравствуйте! Хочу записаться на услугу "${service}" (${price}).`);

            bookingLink.textContent = "Оформить запись";
            bookingLink.setAttribute("href", `mailto:hello@example.com?subject=${subject}&body=${body}`);
        }

        contactSection?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    });
});
