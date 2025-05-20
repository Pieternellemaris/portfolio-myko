window.addEventListener('scroll', function() {
    if(window.scrollY > 699) {
        var element = document.getElementById("back-up");
        element.classList.add("mystyle");
        console.log(element.className);
    }
});

    document.addEventListener("DOMContentLoaded", () => {
      // Vul automatisch data-title & data-caption
      document.querySelectorAll("li").forEach(li => {
        const img = li.querySelector("img.lightbox-item");
        const hoverBox = li.querySelector(".hover-box");
        if (img && hoverBox) {
          const titleEl = hoverBox.querySelector(".title");
          const captionEl = hoverBox.querySelector("p1");
          if (titleEl) img.dataset.title = titleEl.textContent.trim();
          if (captionEl) img.dataset.caption = captionEl.textContent.trim();
        }
      });

      const overlay = document.getElementById("lightbox-overlay");
      const overlayImg = document.getElementById("lightbox-img");
      const overlayTitle = document.getElementById("lightbox-title");
      const overlayCaption = document.getElementById("lightbox-caption");
      const nextBtn = document.getElementById("lightbox-next");
      const prevBtn = document.getElementById("lightbox-prev");

      const items = Array.from(document.querySelectorAll("li"));
      let currentIndex = 0;

      items.forEach((li, index) => {
        li.addEventListener("click", () => {
          const img = li.querySelector("img.lightbox-item");
          if (!img) return;
          currentIndex = index;
          overlayImg.src = img.src;
          overlayTitle.textContent = img.dataset.title || "";
          overlayCaption.textContent = img.dataset.caption || "";
          overlay.classList.add("active");
        });
      });

      function closeOverlay() {
        overlay.classList.remove("active");
        overlayImg.src = "";
        overlayTitle.textContent = "";
        overlayCaption.textContent = "";
      }

      function showNext() {
        currentIndex = (currentIndex + 1) % items.length;
        const img = items[currentIndex].querySelector("img.lightbox-item");
        overlayImg.src = img.src;
        overlayTitle.textContent = img.dataset.title || "";
        overlayCaption.textContent = img.dataset.caption || "";
      }

      function showPrev() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        const img = items[currentIndex].querySelector("img.lightbox-item");
        overlayImg.src = img.src;
        overlayTitle.textContent = img.dataset.title || "";
        overlayCaption.textContent = img.dataset.caption || "";
      }

      nextBtn.addEventListener("click", e => {
        e.stopPropagation();
        showNext();
      });

      prevBtn.addEventListener("click", e => {
        e.stopPropagation();
        showPrev();
      });

      overlay.addEventListener("click", e => {
        if (e.target === overlay) closeOverlay();
      });

      document.addEventListener("keydown", e => {
        if (!overlay.classList.contains("active")) return;
        if (e.key === "Escape") closeOverlay();
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
      });
    });