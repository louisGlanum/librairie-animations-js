window.addEventListener("DOMContentLoaded", () => {
  videosHomeInit();
  handlePopupvideo();
});

const videosHomeInit = () => {
  videojs("#my-video", {}).ready(function () {
    this.controls(false);
  });
  videojs("#my-video2", {}).ready(function () {
    this.controls(false);
  });
};

const handlePopupvideo = () => {
  const wrapper = document.querySelector(".popup-video_wrapper");
  const container = document.querySelector(".popup-video_container");
  const videos = document.querySelectorAll(".video_container");
  const closeButton = document.querySelector(".close-button");

  const tl = gsap
    .timeline({ paused: true })
    .to(wrapper, { opacity: 1, duration: 0.5, ease: "power3.inOut" })
    .to(container, { opacity: 1, duration: 0.5, ease: "power3.inOut" });

  const player = videojs("my-video3", {});

  videos.forEach((video) => {
    video.addEventListener("click", function () {
      popupIn(this, player, tl);
    });
    closeButton.addEventListener("click", function () {
      popupOut(player, tl);
    });
  });

  function popupIn(videoElement, player, tl) {
    const newSource = {
      src: videoElement.dataset.videofull,
      type: "video/mp4",
    };
    player.src(newSource);
    player.load();
    player.play();
    player.muted(false);
    tl.play();
    wrapper.style.pointerEvents = "all";
  }
  function popupOut(player, tl) {
    tl.reverse();
    player.muted(true);
    wrapper.style.pointerEvents = "none";
  }
};
