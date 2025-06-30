<script lang="ts">
  // Social links (replace with your actual URLs)
  const socials = [
    { icon: "🐦", label: "Twitter", url: "https://twitter.com/" },
    { icon: "🐙", label: "GitHub", url: "https://github.com/" },
    { icon: "🔗", label: "LinkedIn", url: "https://linkedin.com/" },
  ];

  // Quick links
  const quickLinks = [
    { name: "Posts", url: "/posts" },
    { name: "About", url: "/about" },
    { name: "Login", url: "/login" },
  ];
</script>

<footer class="footer">
  <div class="footer__main">
    <div class="footer__col footer__brand">
      <div class="footer__logo-row">
        <span class="footer__logo-icon">{"<"}</span>
        <span class="footer__logo-icon">✏️</span>
        <span class="footer__logo-text">
          <b>D2<span class="footer__logo-accent">D</span></b></span
        >
      </div>
      <div class="footer__desc">
        Empowering creators with modern tools for seamless design-to-development
        workflows.
      </div>
      <div class="footer__socials">
        {#each socials as s}
          <a
            href={s.url}
            target="_blank"
            rel="noopener"
            aria-label={s.label}
            class="footer__social-link">{s.icon}</a
          >
        {/each}
      </div>
    </div>
    <div class="footer__col footer__links">
      <div class="footer__col-title">Quick Links</div>
      <ul>
        {#each quickLinks as link}
          <li><a href={link.url}>{link.name}</a></li>
        {/each}
      </ul>
    </div>
    <div class="footer__col footer__contact">
      <div class="footer__col-title">Contact</div>
      <div>
        <a href="mailto:hello@d2d.dev" class="footer__contact-link"
          >hello@d2d.dev</a
        >
      </div>
      <div>
        123 Design Street,<br />
        Development City, DC 12345
      </div>
    </div>
  </div>
  <div class="footer__bottom">
    <span>© 2025 D2D. All rights reserved.</span>
    <span class="footer__credit">
      Made with <span class="footer__heart">♥</span> for creators
    </span>
  </div>
</footer>

<style>
  .footer {
    width: 100%;
    background: var(--color-bg-tertiary);
    color: var(--color-text-secondary);
    padding: 2.5rem 2vw 1.2rem 2vw;
    box-sizing: border-box;
    border-top: 1px solid var(--color-border);
    font-size: 1rem;
    bottom: 0;
  }

  .footer__main {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 1400px;
    margin: 0 auto 1.5rem auto;
    gap: 2vw;
    flex-wrap: wrap;
  }

  .footer__col {
    flex: 1 1 220px;
    min-width: 200px;
    margin-bottom: 1.2rem;
  }

  .footer__brand {
    max-width: 340px;
  }

  .footer__logo-row {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    margin-bottom: 0.7rem;
  }
  .footer__logo-icon {
    font-size: 1.3rem;
    color: var(--color-accent-secondary);
    background: var(--color-bg-secondary);
    border-radius: 50%;
    padding: 0.2rem 0.4rem;
    box-shadow: 0 2px 8px 0 var(--color-shadow);
  }
  .footer__logo-text {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text-primary);
    letter-spacing: 1px;
  }
  .footer__logo-accent {
    color: var(--color-accent-secondary);
  }

  .footer__desc {
    margin-bottom: 1.1rem;
    color: var(--color-text-secondary);
    font-size: 1rem;
  }

  .footer__socials {
    display: flex;
    gap: 0.7rem;
    margin-top: 0.2rem;
  }
  .footer__social-link {
    font-size: 1.25rem;
    color: var(--color-accent-secondary);
    background: var(--color-bg-secondary);
    border-radius: 50%;
    padding: 0.3rem 0.5rem;
    transition:
      background 0.2s,
      color 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .footer__social-link:hover {
    background: var(--color-accent-secondary);
    color: var(--color-bg-primary);
  }

  .footer__col-title {
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: 0.7rem;
  }

  .footer__links ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .footer__links li {
    margin-bottom: 0.5rem;
  }
  .footer__links a {
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color 0.2s;
  }
  .footer__links a:hover {
    color: var(--color-accent-secondary);
  }

  .footer__contact-link {
    color: var(--color-accent-secondary);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }
  .footer__contact-link:hover {
    color: var(--color-accent-primary);
  }

  .footer__bottom {
    border-top: 1px solid var(--color-border);
    padding-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
    font-size: 0.97rem;
    color: var(--color-text-secondary);
    flex-wrap: wrap;
    gap: 1rem;
  }
  .footer__credit {
    color: var(--color-text-secondary);
    font-size: 0.97rem;
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }
  .footer__heart {
    color: var(--color-accent-primary);
    font-size: 1.1em;
    margin: 0 0.1em;
  }

  @media (max-width: 900px) {
    .footer__main {
      flex-direction: column;
      align-items: flex-start;
      gap: 1.5rem;
    }
    .footer__bottom {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.7rem;
    }
  }
  @media (max-width: 600px) {
    .footer {
      padding: 2rem 1vw 1rem 1vw;
      font-size: 0.97rem;
    }
    .footer__main {
      gap: 1rem;
    }
    .footer__col {
      min-width: 0;
      width: 100%;
    }
  }
</style>
