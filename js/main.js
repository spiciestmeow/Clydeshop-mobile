function createCarousel() {
  const slidesContainer = document.getElementById("carousel-slides");
  const dotsContainer = document.getElementById("carousel-dots");

  slidesContainer.innerHTML = "";
  dotsContainer.innerHTML = "";

  carouselSlides.forEach((slide, index) => {
    const slideElement = document.createElement("div");
    slideElement.className = "carousel-slide";
    slideElement.innerHTML = `
        <img class="carousel-image" src="${slide.image}" alt="Promotion ${
      index + 1
    }">
      `;
    slidesContainer.appendChild(slideElement);

    if (carouselSlides > 1) {
      const dot = document.createElement("div");
      dot.className = "carousel-dot" + (index === 0 ? " active" : "");
      dot.dataset.index = index;
      dotsContainer.appendChild(dot);
    }
  });

  if (carouselSlides <= 1) {
    dotsContainer.style.slide = "none";
  }

  let currentIndex = 0;
  const slideCount = carouselSlides.length;
  let slideInterval;
  let touchStartX = 0;
  let touchEndX = 0;

  function updateCarousel() {
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    const dots = dotsContainer.querySelectorAll(".carousel-dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateCarousel();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
    resetInterval();
  }

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3000);
  }

  function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    clearInterval(slideInterval);
  }

  function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
  }

  function handleTouchEnd() {
    const swipeDistance = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (swipeDistance > minSwipeDistance) {
      nextSlide();
    } else if (swipeDistance < -minSwipeDistance) {
      prevSlide();
    }
    resetInterval();
  }

  const carousel = document.querySelector(".banner-carousel");
  carousel.addEventListener("touchstart", handleTouchStart);
  carousel.addEventListener("touchmove", handleTouchMove);
  carousel.addEventListener("touchend", handleTouchEnd);

  const dots = dotsContainer.querySelectorAll(".carousel-dot");
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      goToSlide(parseInt(dot.dataset.index));
    });
  });

  carousel.addEventListener("mouseenter", () => clearInterval(slideInterval));
  carousel.addEventListener("mouseleave", resetInterval);

  slideInterval = setInterval(nextSlide, 3000);
  updateCarousel();
}

function createProductCard(product, isWeekly = false) {
  const card = document.createElement("div");
  card.className = isWeekly ? "weekly-card" : "product-card";

  card.innerHTML = isWeekly
    ? `
      <div class="weekly-image-container">
        <img class="weekly-image" src="${product.image}" alt="Game token" />
        ${
          product.bonus
            ? `<div class="weekly-bonus-badge">${product.bonus}</div>`
            : ""
        }
      </div>
      ${
        product.tokenAmount || product.price
          ? `
          <div class="weekly-details-container">
            <div class="product-info-container">
              ${
                product.tokenAmount
                  ? `
                  <div class="weekly-details">
                    <span class="weekly-token-amount">${product.tokenAmount.replace(
                      /\+(\d+)/,
                      '<span class="weekly-token-bonus">+$1</span>'
                    )}</span>
                  </div>
                `
                  : ""
              }
              ${
                product.price
                  ? `<div class="weekly-price">${product.price}</div>`
                  : ""
              }
            </div>
          </div>
        `
          : ""
      }
    `
    : `
      <img class="product-image" src="${product.image}" alt="Game token" />
      ${product.bonus ? `<div class="bonus-badge">${product.bonus}</div>` : ""}
      ${
        product.tokenAmount || product.price
          ? `
          <div class="product-info-container">
            ${
              product.tokenAmount
                ? `
                <div class="product-details">
                  <img class="token-icon" src="${
                    product.tokenIcon
                  }" alt="Token" />
                  <span class="token-amount">${product.tokenAmount.replace(
                    /\+(\d+)/,
                    '<span class="token-bonus">+$1</span>'
                  )}</span>
                </div>
              `
                : ""
            }
            ${
              product.price
                ? `<div class="product-price">${product.price}</div>`
                : ""
            }
          </div>
        `
          : ""
      }
    `;

  return card;
}

function renderProducts(productList, isWeekly = false) {
  const productGrid = document.getElementById("product-grid");
  productGrid.innerHTML = "";

  productList.forEach((product) => {
    const card = createProductCard(product, isWeekly);
    productGrid.appendChild(card);
  });
}

document.querySelectorAll(".nav-tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    document.querySelectorAll(".nav-tab").forEach((t) => {
      t.classList.remove("active");
    });
    this.classList.add("active");

    if (this.textContent === "TOKENS") {
      renderProducts(tokenProducts, false);
    } else if (this.textContent === "WEEKLY CARD") {
      renderProducts(weeklyCardProducts, true);
    }
  });
});

document.querySelector(".nav-tab").classList.add("active");

function isMobile() {
  return window.innerWidth < 768;
}

function updateMobileNotice() {
  const notice = document.querySelector(".mobile-only-notice");
  notice.style.display = isMobile() ? "none" : "block";
}

document.addEventListener("DOMContentLoaded", () => {
  updateMobileNotice();
  renderProducts(tokenProducts, false);
  createCarousel();
});

window.addEventListener("resize", updateMobileNotice);

function toggleWhatsAppPopup() {
  const popup = document.getElementById("whatsappPopup");
  popup.style.display = popup.style.display === "block" ? "none" : "block";
}

function openMessenger() {
  const messengerId = "clybustamante";
  const url = `https://m.me/${messengerId}`;
  window.open(url, "_blank");
  document.getElementById("whatsappPopup").style.display = "none";
}

function openWhatsApp() {
  const phoneNumber = "+639956274340";
  const message = encodeURIComponent(
    "Hello, I'm interested in ClydeShop tokens and weekly cards!"
  );
  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, "_blank");

  document.getElementById("whatsappPopup").style.display = "none";
}

document.addEventListener("click", function (event) {
  const popup = document.getElementById("whatsappPopup");
  const whatsappButton = document.querySelector(".whatsapp-button");
  if (
    !popup.contains(event.target) &&
    !whatsappButton.contains(event.target) &&
    popup.style.display === "block"
  ) {
    popup.style.display = "none";
  }
});
