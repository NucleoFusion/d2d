<script lang="ts">
  import { onMount } from "svelte";

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

<style>
  @import "./global.css";

  .banner-root {
    width: 100%;
    min-height: 90vh;
    background: none;
    color: var(--color-text-primary);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
    padding: 0;
    margin: 0;

    margin-top: 10vh;
  }

  .banner-content {
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    padding: 4vw 3vw;
    gap: 3vw;
    box-sizing: border-box;
  }

  .banner-left {
    flex: 1.1;
    min-width: 50%;
    max-width: 650px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h1 {
    font-size: 3.8rem;
    font-weight: 800;
    line-height: 1.1;
    margin: 0;
    word-break: break-word;
  }

  .gradient-text {
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

  .subtitle {
    color: var(--color-text-secondary);
    font-size: 1.6rem;
    margin-bottom: 2rem;
    max-width: 90%;
  }

  .cta-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .btn-primary {
    background: var(--color-accent-primary);
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
  .btn-primary:hover {
    background: var(--color-accent-secondary);
  }

  .btn-secondary {
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
  .btn-secondary:hover {
    background: var(--color-accent-primary);
    color: #fff;
  }

  .features-row {
    display: flex;
    gap: 2rem;
    color: var(--color-text-secondary);
    font-size: 1rem;
    margin-top: 1rem;
    flex-wrap: wrap;
  }

  .banner-right {
    flex: 1;
    min-width: 320px;
    max-width: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 2vw 0;
  }

  .card-group {
    width: 100%;

    animation: floatY 3.5s ease-in-out infinite alternate;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @keyframes floatY {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-30px);
    }
  }

  .main-card {
    background: var(--color-bg-secondary);
    border-radius: 18px;
    padding: 2.5rem 2rem 2rem 2rem;
    box-shadow: 0 4px 32px 0 var(--color-shadow);
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 320px;
    width: 100%;
    min-height: 50vh;
    margin-bottom: 0.5rem;
    border: 1px solid var(--color-border);
  }
  .main-card .icon {
    font-size: 2.5rem;
    color: var(--color-accent-primary);
    margin-bottom: 1rem;
  }
  .main-card h2 {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--color-text-primary);
  }
  .main-card p {
    color: var(--color-text-secondary);
    font-size: 1rem;
    text-align: center;
  }

  .sub-cards {
    display: flex;
    gap: 1.2rem;
    width: 100%;
    justify-content: center;
  }
  .sub-card {
    background: var(--color-bg-secondary);
    border-radius: 12px;
    padding: 1.2rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid var(--color-border);
    box-shadow: 0 2px 12px 0 var(--color-shadow);
    font-size: 1rem;
    color: var(--color-accent-primary);
    min-width: 120px;
    width: 100%;
    transition: background 0.2s;
  }
  .sub-card .icon {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  .sub-card span:last-child {
    color: var(--color-text-primary);
    font-size: 1rem;
    font-weight: 600;
  }
  .sub-card:hover {
    background: var(--color-accent-primary);
    color: #fff;
  }

  /* Responsive styles */
  @media (max-width: 1100px) {
    .banner-content {
      flex-direction: column;
      align-items: center;
      gap: 2vw;
    }
    .banner-left,
    .banner-right {
      max-width: 100vw;
      min-width: 0;
      width: 100%;
      padding: 2vw 0;
    }
    .main-card,
    .sub-card {
      min-width: 0;
      width: 90vw;
      max-width: 100vw;
    }
    .sub-cards {
      flex-direction: column;
      gap: 1rem;
    }
  }

  @media (max-width: 600px) {
    .banner-content {
      padding: 2vw 1vw;
    }
    h1 {
      font-size: 2rem;
    }
    .main-card {
      padding: 1.5rem 1rem 1rem 1rem;
    }
  }
</style>
