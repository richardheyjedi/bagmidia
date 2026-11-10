import "./styles.css";

const whatsappNumber = "5544984483444";
const defaultMessage = "Olá, Eduardo! Conheci a BAG MÍDIA pelo site e gostaria de saber como anunciar minha empresa nos sacos de pão.";

const makeWhatsAppUrl = (message) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

const header = document.querySelector("header");
const menuButton = header?.querySelector('button[aria-label="Abrir menu"]');
const menuLinks = [
  ["Início", "#inicio"],
  ["Como Funciona", "#como-funciona"],
  ["Vantagens", "#vantagens"],
  ["Exemplos", "#exemplos"],
  ["Escolher Espaço", "#configurador"],
  ["Para Padarias", "#padarias"],
  ["Perguntas Frequentes", "#faq"],
  ["Contato", "#contato"],
];

if (header && menuButton) {
  const mobilePanel = document.createElement("div");
  mobilePanel.className = "mobile-panel";
  mobilePanel.innerHTML = menuLinks.map(([label, href]) => `<a href="${href}">${label}</a>`).join("");
  header.append(mobilePanel);

  const setMenu = (open) => {
    mobilePanel.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menuButton.innerHTML = open
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path></svg>';
  };
  menuButton.addEventListener("click", () => setMenu(!mobilePanel.classList.contains("is-open")));
  mobilePanel.addEventListener("click", () => setMenu(false));
}

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("header-scrolled", window.scrollY > 24);
};
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const revealItems = [...document.querySelectorAll("[data-reveal]")];
revealItems.forEach((item) => item.classList.add("reveal-hidden"));
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("reveal-visible"));
}

const faqAnswers = [
  "A empresa escolhe um espaço publicitário, aprova a arte e a mensagem é impressa nos sacos de pão distribuídos pelas padarias participantes.",
  "Os sacos são entregues nas padarias participantes da região atendida, acompanhando o fluxo normal de compra do pão.",
  "Sim. A logomarca e os materiais da sua empresa podem ser encaminhados para a preparação da campanha conforme o processo comercial.",
  "O investimento varia de acordo com o modelo, o espaço escolhido e o volume da campanha. Fale com a BAG MÍDIA para receber uma proposta.",
  "A duração é definida no planejamento comercial de cada campanha, considerando disponibilidade, região e quantidade de embalagens.",
  "Sim. Padarias podem participar para receber as embalagens publicitárias e fortalecer o relacionamento comercial com a BAG MÍDIA.",
  "Entre em contato pelo WhatsApp ou pelo formulário desta página para conversar diretamente com Eduardo.",
];

const faqItems = [...document.querySelectorAll('#faq [data-state="closed"][data-orientation="vertical"]')]
  .filter((item) => item.querySelector(":scope > h3 > button"));
faqItems.forEach((item, index) => {
  const button = item.querySelector("button");
  const panel = item.querySelector('[role="region"]');
  if (!button || !panel) return;
  panel.innerHTML = `<p class="px-0 pb-4 text-sm leading-relaxed text-muted-foreground">${faqAnswers[index] ?? faqAnswers.at(-1)}</p>`;
  panel.hidden = true;
  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") === "true";
    faqItems.forEach((other) => {
      other.dataset.state = "closed";
      other.querySelector("button")?.setAttribute("aria-expanded", "false");
      const otherPanel = other.querySelector('[role="region"]');
      if (otherPanel) { otherPanel.hidden = true; otherPanel.dataset.state = "closed"; }
    });
    if (!open) {
      item.dataset.state = "open";
      button.setAttribute("aria-expanded", "true");
      panel.hidden = false;
      panel.dataset.state = "open";
    }
  });
});

const modal = document.createElement("div");
modal.className = "image-modal";
modal.innerHTML = '<div class="image-modal-backdrop" data-close-modal></div><div class="image-modal-card" role="dialog" aria-modal="true"><button class="image-modal-close" type="button" data-close-modal aria-label="Fechar">×</button><img alt="" /></div>';
document.body.append(modal);
const closeModal = () => modal.classList.remove("is-open");
modal.addEventListener("click", (event) => { if (event.target.closest("[data-close-modal]")) closeModal(); });
document.querySelectorAll('#exemplos button[aria-label^="Ampliar"]').forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    const modalImage = modal.querySelector("img");
    if (!image || !modalImage) return;
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modal.classList.add("is-open");
  });
});
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModal(); });

const configurator = document.querySelector("#configurador");
if (configurator) {
  const modelButtons = [...configurator.querySelectorAll('button[aria-pressed]')].slice(0, 2);
  modelButtons.forEach((button) => button.addEventListener("click", () => {
    modelButtons.forEach((other) => {
      const selected = other === button;
      other.setAttribute("aria-pressed", String(selected));
      other.classList.toggle("ring-2", selected);
      other.classList.toggle("ring-navy", selected);
    });
  }));

  const spaceButtons = [...configurator.querySelectorAll('[role="button"][aria-label^="Espaço"]')];
  const countLabel = [...configurator.querySelectorAll("p, span")].find((node) => node.textContent.trim().startsWith("0 espaços selecionados"));
  const continueButton = [...configurator.querySelectorAll("button")].find((button) => button.textContent.includes("CONTINUAR"));
  const selectedSpaces = new Set();
  const updateSelection = () => {
    if (countLabel) countLabel.textContent = `${selectedSpaces.size} espaços selecionados`;
    if (continueButton) continueButton.textContent = selectedSpaces.size ? "CONTINUAR COM A SELEÇÃO" : "CONTINUAR";
  };
  spaceButtons.forEach((button) => button.addEventListener("click", () => {
    const key = button.getAttribute("aria-label") ?? "";
    if (selectedSpaces.has(key)) {
      selectedSpaces.delete(key);
      button.classList.remove("space-selected");
    } else {
      selectedSpaces.add(key);
      button.classList.add("space-selected");
    }
    updateSelection();
  }));
  continueButton?.addEventListener("click", () => {
    if (!selectedSpaces.size) return;
    document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });
  });
}

const contactForm = document.querySelector("#contato form");
if (contactForm) {
  const roleButtons = [...contactForm.querySelectorAll('button[type="button"]')];
  const submitButton = contactForm.querySelector('button[type="submit"]');
  let role = "anunciante";
  roleButtons.forEach((button, index) => button.addEventListener("click", () => {
    role = index === 0 ? "anunciante" : "padaria";
    roleButtons.forEach((other, otherIndex) => {
      const selected = otherIndex === index;
      other.setAttribute("aria-pressed", String(selected));
      other.classList.toggle("bg-navy", selected);
      other.classList.toggle("text-sun", selected);
    });
    if (submitButton) submitButton.firstChild.textContent = role === "padaria" ? "ENVIAR PELO WHATSAPP " : "ENVIAR PELO WHATSAPP ";
  }));
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const values = [...contactForm.querySelectorAll("input, textarea")].map((input) => input.value.trim());
    const [name, company, phone, email, message] = values;
    const intro = role === "padaria" ? "Olá, Eduardo! Tenho uma padaria e gostaria de saber como participar da BAG MÍDIA." : defaultMessage;
    const details = [`Nome: ${name || "não informado"}`, company && `Empresa: ${company}`, `Telefone: ${phone || "não informado"}`, email && `E-mail: ${email}`, message && `Mensagem: ${message}`].filter(Boolean).join("\n");
    window.open(makeWhatsAppUrl(`${intro}\n\n${details}`), "_blank", "noopener,noreferrer");
  });
}

document.querySelectorAll('a[href^="https://wa.me/"]').forEach((link) => {
  if (!link.href.includes("text=")) link.href = makeWhatsAppUrl(defaultMessage);
});
