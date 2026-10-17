const CONTACT_EMAIL = "";

const samplePages = [
  {
    page: "02",
    image: "assets/sample-page-02.jpg",
    alt: "Page 2: illustrated American toad and belted kingfisher profiles, with their abilities, weaknesses, and life stages",
    title: "Meet the locals.",
    description: "American toad and belted kingfisher profiles, complete with abilities, weaknesses, and life-stage forms."
  },
  {
    page: "03",
    image: "assets/sample-page-03.jpg",
    alt: "Page 3: big dipper firefly and bold jumping spider profiles, with glowing larva, life stages, abilities, and weaknesses",
    title: "Small heroes. Big moves.",
    description: "A firefly’s glowing larva and a jumping spider’s precision pounce make for two very different local superpowers."
  },
  {
    page: "14",
    image: "assets/sample-page-14.jpg",
    alt: "Page 14: close-look and catch-and-release kits with binoculars, a hand lens, mirror, soft net, viewing cup, card, and brush",
    title: "Tools for a closer look.",
    description: "Field kits pair useful gear with guidance on careful observation and when to leave wildlife undisturbed."
  },
  {
    page: "16",
    image: "assets/sample-page-16.jpg",
    alt: "Page 16: illustrated local field sites at Ryerson Conservation Area and Heller Nature Center, with habitats and access notes",
    title: "Take the long way home.",
    description: "Ryerson Conservation Area and Heller Nature Center are two of six featured places to look for local life."
  },
  {
    page: "19",
    image: "assets/sample-page-19.jpg",
    alt: "Page 19: Creature Finder table with 24 Deerfield-area species, places, seasons, times, and suggested observation tools",
    title: "Find your next field note.",
    description: "The Creature Finder brings the book together with a quick index of 24 creatures, places, seasons, times, and tools."
  }
];

const gallery = document.getElementById("sample-gallery");
const sampleImage = document.getElementById("sample-image");
const galleryPageBadge = document.getElementById("gallery-page-badge");
const galleryIndexCurrent = document.getElementById("gallery-index-current");
const galleryTitle = document.getElementById("gallery-title");
const galleryDescription = document.getElementById("gallery-description");
const pageButtons = Array.from(document.querySelectorAll(".gallery-pages [data-slide]"));
let activeSlide = 0;

function showSlide(index, focusPageButton = false) {
  activeSlide = (index + samplePages.length) % samplePages.length;
  const slide = samplePages[activeSlide];

  sampleImage.src = slide.image;
  sampleImage.alt = slide.alt;
  galleryPageBadge.textContent = `PAGE ${slide.page}`;
  galleryIndexCurrent.textContent = String(activeSlide + 1).padStart(2, "0");
  galleryTitle.textContent = slide.title;
  galleryDescription.textContent = slide.description;

  pageButtons.forEach((button, buttonIndex) => {
    if (buttonIndex === activeSlide) {
      button.setAttribute("aria-current", "true");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  if (focusPageButton) pageButtons[activeSlide].focus();
}

document.getElementById("gallery-prev").addEventListener("click", () => showSlide(activeSlide - 1));
document.getElementById("gallery-next").addEventListener("click", () => showSlide(activeSlide + 1));

pageButtons.forEach((button) => {
  button.addEventListener("click", () => showSlide(Number(button.dataset.slide)));
});

gallery.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.target.matches("input, textarea")) return;

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    showSlide(activeSlide - 1, true);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    showSlide(activeSlide + 1, true);
  } else if (event.key === "Home") {
    event.preventDefault();
    showSlide(0, true);
  } else if (event.key === "End") {
    event.preventDefault();
    showSlide(samplePages.length - 1, true);
  }
});

const requestForm = document.getElementById("request-form");
const reviewPanel = document.getElementById("request-review");
const reviewTitle = document.getElementById("review-title");
const reviewPlace = document.getElementById("review-place");
const requestMessage = document.getElementById("request-message");
const copyStatus = document.getElementById("copy-status");
const copyRequestButton = document.getElementById("copy-request");
const openEmailDraftButton = document.getElementById("open-email-draft");
const reviewHint = document.getElementById("review-hint");

requestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!requestForm.reportValidity()) return;

  const formData = new FormData(requestForm);
  const city = String(formData.get("city")).trim();
  const region = String(formData.get("region")).trim();
  const email = String(formData.get("email")).trim();
  const neighborhood = String(formData.get("neighborhood")).trim();
  const notes = String(formData.get("notes")).trim();
  const messageLines = [
    "Hello,",
    "",
    "I’d like to ask about a Creature Handbook for:",
    `City or town: ${city}`,
    `State, region or country: ${region}`,
    `Reply email: ${email}`
  ];

  if (neighborhood) messageLines.push(`Neighborhood or ZIP: ${neighborhood}`);
  if (notes) messageLines.push("", "What I’d love to see:", notes);

  messageLines.push("", "I’d be glad to hear more about exploring this place in a handbook.");
  requestMessage.value = messageLines.join("\n");
  reviewPlace.textContent = neighborhood ? `${city}, ${region} · ${neighborhood}` : `${city}, ${region}`;
  copyStatus.textContent = "";
  reviewPanel.hidden = false;
  reviewTitle.setAttribute("tabindex", "-1");
  reviewTitle.focus();
});

copyRequestButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(requestMessage.value);
    copyStatus.textContent = "Copied. Your request text is ready to paste.";
    return;
  } catch {
    requestMessage.focus();
    requestMessage.select();
    const copied = document.queryCommandSupported?.("copy") && document.execCommand("copy");
    copyStatus.textContent = copied
      ? "Copied. Your request text is ready to paste."
      : "Select the request text above and copy it to your clipboard.";
  }
});

if (CONTACT_EMAIL.trim()) {
  openEmailDraftButton.disabled = false;
  reviewHint.textContent = "Your email app will open with this request as a draft. Review it there before you send.";
  openEmailDraftButton.addEventListener("click", () => {
    const subject = `Creature Handbooks request — ${reviewPlace.textContent}`;
    const query = new URLSearchParams({
      subject,
      body: requestMessage.value
    });
    window.location.href = `mailto:${CONTACT_EMAIL}?${query.toString()}`;
  });
}

document.getElementById("year").textContent = String(new Date().getFullYear());
