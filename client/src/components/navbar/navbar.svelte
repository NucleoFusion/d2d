<script lang="ts">
  import { fly } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { isAuthenticated, checkAuth, logout } from '$lib/stores/auth';
  import { get } from 'svelte/store';

  onMount(() => {
    checkAuth(); // ✅ check token once when navbar mounts
  });

  const navLinks = [
    {
      icon: '💬',
      label: 'Posts',
      action: () => {
        if (!get(isAuthenticated)) {
          goto('/auth?redirect=/posts');
        } else {
          goto('/posts');
        }
      }
    },
    {
      label: 'About',
      url: '/about'
    }
  ];

  const handleLogout = () => {
    logout();
    goto('/');
  };
</script>

<nav class="main-navbar" transition:fly={{ y: -60, duration: 600 }}>
  <div class="main-navbar__content">
    <!-- Logo -->
    <a href="/" class="main-navbar__logo">
      <span class="main-navbar__logo-text">
        <b>D2<span class="main-navbar__logo-accent">D</span></b>
      </span>
    </a>

    <!-- Navigation Links -->
    <ul class="main-navbar__links">
      {#each navLinks as link}
        <li>
          {#if link.action}
            <a href="#" class="main-navbar__link" on:click|preventDefault={link.action}>
              {#if link.icon}
                <span class="main-navbar__icon">{link.icon}</span>
              {/if}
              {link.label}
            </a>
          {:else}
            <a href={link.url} class="main-navbar__link">{link.label}</a>
          {/if}
        </li>
      {/each}

      <li>
        {#if $isAuthenticated}
          <a href="#" class="main-navbar__login-btn" on:click|preventDefault={handleLogout}>Logout</a>
        {:else}
          <a href="/auth" class="main-navbar__login-btn">Login</a>
        {/if}
      </li>
    </ul>
  </div>
</nav>




<style>
  .main-navbar {
    top: 0;
    left: 0;
    width: 100%;
    box-shadow: 0 2px 16px 0 var(--color-shadow);
    padding: 0.5rem 1rem;
    transition: background 0.2s;
    background: none;
    backdrop-filter: blur(10px);
  }

  .main-navbar__content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2vw;
  }

  .main-navbar__logo {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    text-decoration: none;
  }

  .main-navbar__logo-text {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--color-text-primary);
    letter-spacing: 1px;
  }

  .main-navbar__logo-accent {
    color: var(--color-accent-secondary);
  }

  .main-navbar__links {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .main-navbar__link {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    padding: 0.3rem 0.7rem;
    border-radius: 6px;
    transition: background 0.2s, color 0.2s;
  }

  .main-navbar__link:hover {
    background: var(--color-bg-tertiary);
    color: var(--color-accent-secondary);
  }

  .main-navbar__icon {
    font-size: 1.1rem;
    color: var(--color-text-secondary);
  }

  .main-navbar__login-btn {
    background: var(--color-accent-primary);
    color: #fff;
    font-weight: 700;
    border-radius: 10px;
    padding: 0.45rem 1.2rem;
    text-decoration: none;
    margin-left: 0.7rem;
    font-size: 1rem;
    transition: background 0.2s, color 0.2s;
    box-shadow: 0 2px 12px 0 var(--color-shadow);
    display: inline-block;
  }

  .main-navbar__login-btn:hover {
    background: var(--color-accent-secondary);
    color: #fff;
  }

  @media (max-width: 700px) {
    .main-navbar__content {
      flex-direction: column;
      align-items: center;
      gap: 0.7rem;
      padding: 0 1vw;
    }

    .main-navbar__links {
      gap: 0.7rem;
    }

    .main-navbar__login-btn {
      padding: 0.4rem 1rem;
      font-size: 0.97rem;
    }
  }
</style>
