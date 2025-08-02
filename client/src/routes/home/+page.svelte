<script lang="ts">
  import { onMount } from "svelte";
  import "../global.css";
  let typingWords = ["Designers", "Developers"];
  let typingText = ["", ""];
  let showWord = 0;

  // Typing effect for both words
  function typeWords() {
    let i = 0;
    let j = 0;
    typingText = ["", ""];
    function typeNext() {
      if (i < typingWords.length) {
        if (j <= typingWords[i].length) {
          typingText[i] = typingWords[i].slice(0, j);
          j++;
          setTimeout(typeNext, 100);
        } else {
          setTimeout(() => {
            j = 0;
            i++;
            typeNext();
          }, 1000);
        }
      } else {
        // Restart
        setTimeout(() => {
          i = 0;
          j = 0;
          typingText = ["", ""];
          typeNext();
        }, 1000);
      }
    }
    typeNext();
  }

  onMount(() => {
    typeWords();
  });

  //Second Section of the landing pagea
  interface Feature {
    icon: string;
    title: string;
    description: string;
    image: string;
  }

  const features: Feature[] = [
    {
      icon: "💬",
      title: "Smart Communication",
      description:
        "Connect instantly with team members through real-time messaging and collaborative tools.",
      image: "/feature-comm.png",
    },
    {
      icon: "<>",
      title: "Code Collaboration",
      description:
        "Share, review, and edit code together with built-in version control and live previews.",
      image: "/feature-comm.png",
    },
    {
      icon: "✏️",
      title: "Design Tools",
      description:
        "Access powerful design tools and share your work seamlessly with developers.",
      image: "/feature-comm.png",
    },
    {
      icon: "👥",
      title: "Team Management",
      description:
        "Organize your team, assign roles, and track progress efficiently.",
      image: "/feature-comm.png",
    },
  ];

  //third section of the landing page
  const highlights = [
    {
      icon: "👥",
      title: "15,000+ Community Members",
    },
    {
      icon: "💬",
      title: "24/7 Support Available",
    },
    {
      icon: "→",
      title: "Start for Free, Upgrade Anytime",
    },
  ];
</script>

<section class="banner-root">
  <div class="banner-content">
    <div class="banner-left">
      <h1>
        Where <span class="gradient-text">{typingText[0] || "Designers"}</span>
        and
        <br />
        <span class="gradient-text">{typingText[1] || "Developers"}</span> Connect
      </h1>
      <p class="subtitle">
        The ultimate platform for design and development professionals to
        collaborate, communicate, and create amazing projects together.
      </p>
      <div class="cta-row">
        <button class="btn-primary">Get Started Free</button>
        <button class="btn-secondary">See How It Works</button>
      </div>
      <div class="features-row">
        <span>👥 10K+ Users</span>
        <span>💬 24/7 Support</span>
        <span>⭐ 4.9/5 Rating</span>
      </div>
    </div>
    <div class="banner-right">
      <div class="card-group">
        <div class="main-card">
          <span class="icon">💬</span>
          <h2>Seamless Communication</h2>
          <p>Connect with professionals in real-time</p>
        </div>
        <div class="sub-cards">
          <div class="sub-card">
            <span class="icon">{"<"}/&gt;</span>
            <span>For Developers</span>
          </div>
          <div class="sub-card">
            <span class="icon">✈️</span>
            <span>For Designers</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- //Second section of the page  -->
<section class="features-section" id="features-section">
  <div class="features-section__header">
    <h2>
      <span class="features-section__highlight">
        <span>Powerful Features</span></span
      >
      for Modern Collaboration
    </h2>
    <p class="features-section__subtitle">
      Everything you need to build amazing projects together in one place.
    </p>
  </div>
  <div class="features-section__cards">
    {#each features as feature}
      <div class="features-section__card">
        <img
          class="features-section__image"
          src={feature.image}
          alt={feature.title}
        />
        <div class="features-section__icon">{feature.icon}</div>
        <h3 class="features-section__title">{feature.title}</h3>
        <p class="features-section__desc">{feature.description}</p>
      </div>
    {/each}
  </div>
</section>
<!-- Third section of the landing page -->
<section class="cta-section" id="cta-section">
  <div class="cta-bubble cta-bubble--one"></div>
  <div class="cta-bubble cta-bubble--two"></div>
  <div class="cta-bubble cta-bubble--three"></div>
  <!-- <div class="cta-section__icon-row">
    <span class="cta-section__icon">{"<"}</span>
    <span class="cta-section__icon">✏️</span>
  </div> -->
  <h2 class="cta-section__title">
    Ready to <span class="cta-section__gradient">Bridge the Gap</span>
    Between<br />
    Design and Development?
  </h2>
  <p class="cta-section__subtitle">
    Join our community today and experience seamless collaboration, meaningful
    connections, and opportunities to showcase your skills to the world.
  </p>
  <div class="cta-section__buttons">
    <button class="cta-section__btn cta-section__btn--primary"
      >Get Started Free</button
    >
    <button class="cta-section__btn cta-section__btn--secondary"
      >Schedule a Demo</button
    >
  </div>
  <div class="cta-section__highlights">
    {#each highlights as h}
      <div class="cta-section__highlight-card">
        <span class="cta-section__highlight-icon">{h.icon}</span>
        <span class="cta-section__highlight-title">{h.title}</span>
      </div>
    {/each}
  </div>
</section>

<style>
  .banner-root {
    width: 100vw;
    min-height: 70vh;
    background: none;
    color: var(--color-text-primary);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;

    margin: 0;
    padding: 4rem 2vw 2rem 2vw;
    box-sizing: border-box;
  }

  .banner-root .banner-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    max-width: 1400px;
    width: 100%;
    gap: 3rem;
  }

  .banner-left {
    flex: 1 1 420px;
    min-width: 260px;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .banner-root h1 {
    font-size: 2.7rem;
    font-weight: 800;
    line-height: 1.15;
    margin-bottom: 1.2rem;
    word-break: break-word;
  }

  .banner-root .gradient-text {
    background: linear-gradient(
      90deg,
      var(--color-accent-primary),
      var(--color-accent-secondary)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    font-weight: 900;
    letter-spacing: 1px;
    transition: color 0.3s;
  }

  .banner-root .subtitle {
    color: var(--color-text-secondary);
    font-size: 1.15rem;
    margin-bottom: 2rem;
    max-width: 480px;
  }

  .banner-root .cta-row {
    display: flex;
    gap: 1.2rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .banner-root .btn-primary {
    background: var(--color-accent-primary);
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 1.9rem 2rem;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 2px 12px 0 var(--color-shadow);
    transition:
      background 0.2s,
      color 0.2s;
  }
  .banner-root .btn-primary:hover {
    background: var(--color-accent-secondary);
  }

  .banner-root .btn-secondary {
    background: #111;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 1.9rem 2rem;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 2px 12px 0 var(--color-shadow);
    transition: background 0.2s;
  }
  .banner-root .btn-secondary:hover {
    background: var(--color-bg-secondary);
    color: #fff;
  }

  .banner-root .features-row {
    display: flex;
    gap: 1.5rem;
    color: var(--color-text-secondary);
    font-size: 1.05rem;
    margin-top: 1.2rem;
    flex-wrap: wrap;
  }

  .banner-root .banner-right {
    flex: 1 1 340px;
    min-width: 260px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .banner-root .card-group {
    border-radius: 18px;
    animation: floatY 3.5s ease-in-out infinite alternate;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 10px;
    border: 1px solid var(--color-border);
    background: var(--color-border);
  }

  @keyframes floatY {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-30px);
    }
  }

  .banner-root .main-card {
    background: var(--color-bg-secondary);
    border-radius: 18px;
    box-shadow: 0 4px 24px 0 var(--color-shadow);
    padding: 2rem 2.5rem;
    min-width: 260px;
    max-width: 340px;
    text-align: center;
    margin-bottom: 0.7rem;
    z-index: 1;
  }
  .banner-root .main-card .icon {
    font-size: 2.2rem;
    color: var(--color-accent-primary);
    margin-bottom: 0.7rem;
    display: block;
  }
  .banner-root .main-card h2 {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0.5rem 0 0.7rem 0;
    color: var(--color-text-primary);
  }
  .banner-root .main-card p {
    color: var(--color-text-secondary);
    font-size: 1rem;
    text-align: center;
    margin: 0;
  }

  .banner-root .sub-cards {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .banner-root .sub-card {
    background: var(--color-bg-secondary);
    border-radius: 12px;
    padding: 0.5rem 1.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-size: 1rem;
    color: var(--color-accent-primary);
    min-width: 110px;
    width: 48%;
  }
  .banner-root .sub-card .icon {
    font-size: 1.3rem;
    margin-bottom: 0.3rem;
  }
  .banner-root .sub-card span:last-child {
    color: var(--color-text-primary);
    font-size: 1rem;
    font-weight: 600;
  }
  .banner-root .sub-card:hover {
    background: var(--color-accent-primary);
    color: #fff;
  }

  /* /Bib Screen Desktop? */
  @media (min-width: 1600px) {
    .banner-root {
      min-height: 95vh;
    }

    .banner-root .banner-content {
      max-width: 1400px;
      gap: 0rem;
      width: 90%;
      margin: 0 auto;
    }

    .banner-left {
      flex: 1 1 420px;
      min-width: 260px;
      max-width: 600px;
    }

    .banner-root .banner-right {
      flex: 1 1 340px;
      min-width: 260px;
    }

    .banner-root h1 {
      font-size: 3rem;
      margin-bottom: 0;
    }

    .banner-root .subtitle {
      font-size: 1.05rem;
      line-height: 1.75rem;
    }

    .banner-root .card-group {
      width: 95%;
      padding: 20px;
    }

    .banner-root .main-card {
      max-width: 100%;
      width: 100%;
      height: 40vh;
    }
  }

  /* /desktop css? */
  @media (min-width: 1024px) and (max-width: 1599.98px) {
    .banner-root {
      min-height: 95vh;
    }

    .banner-root .banner-content {
      max-width: 1400px;
      gap: 0rem;
      width: 90%;
    }

    .banner-left {
      flex: 1 1 420px;
      min-width: 260px;
      max-width: 600px;
    }
    .banner-root .banner-right {
      flex: 1 1 340px;
      min-width: 260px;
    }
    .banner-root h1 {
      font-size: 3rem;
      margin-bottom: 0;
    }
    .banner-root .subtitle {
      font-size: 1.05rem;
      line-height: 1.75rem;
    }
    .banner-root .card-group {
      width: 95%;
      padding: 20px;
    }
    .banner-root .main-card {
      max-width: 100%;
      width: 100%;
      min-height: 50vh;
    }
  }

  /* Tablet and below */
  @media (max-width: 1024px) {
    .banner-content {
      flex-direction: column;
      align-items: flex-start;
      gap: 2.5rem;
    }
    .banner-left,
    .banner-right {
      max-width: 100%;
      min-width: 0;
      width: 100%;
    }
    .card-group {
      align-items: flex-start;
    }
  }

  /* Mobile */
  @media (max-width: 720px) {
    .banner-root {
      padding: 2rem 1vw 1rem 1vw;
      min-height: 60vh;

      margin: 0;
      padding: 0;
    }
    .banner-root .banner-content {
      gap: 1.5rem;

      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .banner-left {
      flex: 1 1 10px;
    }

    .banner-left h1 {
      font-size: 1.5rem;
    }
    .subtitle {
      font-size: 1rem;
      margin-bottom: 1.2rem;
    }
    .cta-row {
      flex-direction: row;
      padding: 0 1rem;
    }

    .banner-root .features-row {
      gap: 0.7rem;

      font-size: 0.97rem;
      margin-top: 0;
    }
    .main-card {
      padding: 1.2rem 1rem;
      min-width: 0;
      max-width: 100%;
    }
    .sub-cards {
      gap: 0.5rem;
    }
    .sub-card {
      padding: 0.7rem 0.7rem;
      font-size: 0.97rem;
    }
    .banner-root .banner-right {
      width: 100%;
    }

    .banner-root .card-group {
      width: 100%;
      margin: 10px;
      padding: 10px;
      gap: 10px;
    }
    .banner-root .main-card {
      max-width: 100%;
      width: 100%;
      margin: 0;
    }
    .banner-root .sub-cards {
      justify-content: space-between;
      width: 100%;
      margin: 0;
      padding: 0;
      gap: 0;
    }
    .banner-root .sub-card {
      background: var(--color-bg-secondary);
      border-radius: 12px;
      padding: 1rem 1.2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      font-size: 1rem;
      color: var(--color-accent-primary);
      min-width: 110px;
      width: 48%;
    }
    .banner-root .btn-primary {
      padding: 1.1rem 1rem;
      font-size: 1rem;
    }
    .banner-root .btn-secondary {
      padding: 1.1rem 1rem;
      font-size: 1rem;
    }
  }
  /* Second Section of the landing page */
  .features-section {
    width: 100%;
    background: var(--color-bg-tertiary);
    padding: 4vw 0 5vw 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
  }

  .features-section__header {
    text-align: center;
    margin-bottom: 3rem;
  }
  .features-section__header h2 {
    font-weight: 800;
    font-size: 2.2rem;
    color: var(--color-text-primary);
    letter-spacing: 0.5px;
  }
  .features-section__highlight {
    font-weight: 800;
    font-size: 2.2rem;

    letter-spacing: 0.5px;
  }
  .features-section__highlight span {
    font-weight: 800;
    background: linear-gradient(
      90deg,
      var(--color-accent-primary),
      var(--color-accent-secondary)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .features-section__subtitle {
    color: var(--color-text-secondary);
    font-size: 1.1rem;
    margin-top: 0.7rem;
    margin-bottom: 0;
  }

  .features-section__cards {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    width: 100%;
    max-width: 1400px;
  }

  .features-section__card {
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    box-shadow: 0 4px 24px 0 var(--color-shadow);
    width: 300px;
    min-height: 370px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1.5rem 1.2rem 1.2rem 1.2rem;
    transition:
      box-shadow 0.2s,
      transform 0.2s;
    position: relative;
  }
  .features-section__card:hover {
    box-shadow: 0 8px 32px 0 var(--color-shadow);
    transform: translateY(-6px) scale(1.03);
  }

  .features-section__image {
    width: 100%;
    height: 140px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 1.1rem;
  }

  .features-section__icon {
    font-size: 1.5rem;
    color: var(--color-accent-primary);
    margin-bottom: 0.7rem;
  }

  .features-section__title {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: 0.4rem;
  }

  .features-section__desc {
    color: var(--color-text-secondary);
    font-size: 1rem;
    margin-bottom: 0;
  }

  @media (max-width: 1100px) {
    .features-section__cards {
      gap: 1.2rem;
    }
    .features-section__card {
      width: 90vw;
      max-width: 350px;
    }
  }
  @media (max-width: 700px) {
    .features-section__cards {
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
    .features-section__card {
      width: 95vw;
      max-width: 98vw;
    }
    .features-section {
      padding: 7vw 0 7vw 0;
    }
  }

  /* //third section of the landing page */
  .cta-section {
    width: 100%;
    background: var(--color-bg-tertiary);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2vw 1vw 7vw 1vw;
    box-sizing: border-box;
    position: relative; /* Needed for absolute bubbles */
    overflow: hidden;
  }
  .cta-bubble {
    position: absolute;
    border-radius: 50%;

    pointer-events: none;
    z-index: 0;
    filter: blur(100px);
  }
  .cta-bubble--one {
    width: 220px;
    height: 220px;
    background: var(--color-text-accent);
    top: 10%;
    left: 10px;
  }
  .cta-bubble--two {
    width: 180px;
    height: 180px;
    background: var(--color-text-accent);
    bottom: 5%;
    right: 5%;
  }
  .cta-bubble--three {
    width: 180px;
    height: 180px;
    background: var(--color-text-accent);
    bottom: 35%;
    right: 30%;
  }
  /* Make sure your main content is above the bubbles */
  .cta-section > *:not(.cta-bubble) {
    position: relative;
    z-index: 1;
  }

  .cta-section__icon-row {
    display: flex;
    gap: 0.7rem;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  .cta-section__icon {
    font-size: 2rem;
    color: var(--color-accent-secondary);
    background: var(--color-bg-secondary);
    border-radius: 50%;
    padding: 0.5rem 0.7rem;
    box-shadow: 0 2px 12px 0 var(--color-shadow);
  }

  .cta-section__title {
    text-align: center;
    font-size: 2.7rem;
    font-weight: 800;
    color: var(--color-text-primary);
    margin-bottom: 0rem;
    line-height: 1.15;
  }
  .cta-section__gradient {
    background: linear-gradient(
      90deg,
      var(--color-accent-primary),
      var(--color-accent-secondary)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    font-weight: 900;
  }

  .cta-section__subtitle {
    color: var(--color-text-secondary);
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 2rem;
    max-width: 600px;
  }

  .cta-section__buttons {
    display: flex;
    gap: 1.2rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  .cta-section__btn {
    font-size: 1.1rem;
    font-weight: 700;
    border-radius: 8px;
    padding: 1.6rem 2.2rem;
    border: none;
    cursor: pointer;
    transition:
      background 0.2s,
      color 0.2s;
    box-shadow: 0 2px 12px 0 var(--color-shadow);
  }
  .cta-section__btn--primary {
    background: var(--color-accent-primary);
    color: #fff;
  }
  .cta-section__btn--primary:hover {
    background: var(--color-accent-secondary);
  }
  .cta-section__btn--secondary {
    background: #111;
    color: #fff;
  }
  .cta-section__btn--secondary:hover {
    background: var(--color-bg-secondary);
    color: #fff;
  }

  .cta-section__highlights {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1100px;
  }
  .cta-section__highlight-card {
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    box-shadow: 0 4px 24px 0 var(--color-shadow);
    min-width: 260px;
    max-width: 340px;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1.2rem;
    transition:
      box-shadow 0.2s,
      transform 0.2s;
    text-align: center;
  }
  .cta-section__highlight-card:hover {
    box-shadow: 0 8px 32px 0 var(--color-shadow);
    transform: translateY(-6px) scale(1.03);
  }
  .cta-section__highlight-icon {
    font-size: 1.7rem;
    color: var(--color-accent-primary);
    margin-bottom: 0.7rem;
  }
  .cta-section__highlight-title {
    color: var(--color-text-primary);
    font-size: 1.08rem;
    font-weight: 700;
    margin-bottom: 0;
    margin-top: 0.2rem;
  }

  @media (max-width: 900px) {
    .cta-section__title {
      font-size: 1.7rem;
    }
    .cta-section__highlights {
      gap: 1rem;
    }
    .cta-section__highlight-card {
      min-width: 180px;
      max-width: 98vw;
      padding: 1rem 0.5rem;
    }
  }
  @media (max-width: 600px) {
    .cta-section {
      padding: 7vw 1vw 7vw 1vw;
    }
    .cta-section__highlights {
      flex-direction: column;
      align-items: center;
      gap: 1.2rem;
    }
    .cta-section__highlight-card {
      width: 95vw;
      min-width: 0;
      max-width: 98vw;
    }
    .cta-section__title {
      font-size: 1.2rem;
    }
  }
</style>
