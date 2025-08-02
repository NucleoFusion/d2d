<script lang="ts">
  import { onMount } from "svelte";
  import { writable, derived } from "svelte/store";

  /**
   * Represents the loading state and potential error messages for the post data.
   */
  let isLoading = writable(true);
  let errorMessage = "";

  /**
   * The interface for a Post object, matching the backend response.
   */
  interface Post {
    id: number;
    userId: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    tags: string[];
  }

  /**
   * A store to hold the expanded state for each post by its ID.
   * This is a simple object where keys are post IDs and values are booleans.
   */
  const expandedPosts = writable<Record<number, boolean>>({});

  /**
   * Toggles the expanded state of a specific post.
   * @param postId The ID of the post to toggle.
   */
  function toggleContentExpansion(postId: number) {
    expandedPosts.update((posts) => {
      posts[postId] = !posts[postId];
      return posts;
    });
  }

  /**
   * The Svelte store to hold the array of all posts.
   */
  let posts = writable<Post[]>([]);
  let selectedTag = writable<string | null>(null);

  /**
   * Derived store for a list of posts filtered by the currently selected tag.
   */
  const filteredPosts = derived(
    [posts, selectedTag],
    ([$posts, $selectedTag]) => {
      if (!$selectedTag) return $posts;
      return $posts.filter((post) => post.tags.includes($selectedTag));
    }
  );

  /**
   * Derived store for a list of the top 7 most frequent tags, sorted by count.
   */
  const trendingTags = derived(posts, ($posts) => {
    const tagCount: Record<string, number> = {};
    $posts.forEach((post) => {
      post.tags.forEach((tag) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });

    return Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7) // Select top 7 trending tags
      .map(([tag]) => tag);
  });

  /**
   * Asynchronously fetches post data with tags from the backend API.
   * Handles loading states and error messages.
   */
  async function fetchPostsWithTags() {
    isLoading.set(true);
    try {
      const res = await fetch("http://localhost:5555/posts/with-tags");
      if (!res.ok) throw new Error("Failed to fetch posts with tags");
      const data: Post[] = await res.json();
      posts.set(data);
    } catch (error: unknown) {
      errorMessage = (error as Error).message;
    } finally {
      isLoading.set(false);
    }
  }

  // Fetch posts when the component is first mounted to the DOM.
  onMount(() => {
    fetchPostsWithTags();
  });

  /**
   * Handles the click event on a tag button in the sidebar.
   * Toggles the selected tag on and off.
   */
  function handleTagClick(tag: string) {
    selectedTag.set(tag === $selectedTag ? null : tag);
  }

  /**
   * Helper function to truncate post content for display.
   * @param content The full post content string.
   * @param limit The character limit for truncation.
   * @returns The truncated content with an ellipsis.
   */
  function truncateContent(content: string, limit: number): string {
    if (content.length <= limit) return content;
    return content.substring(0, limit) + "...";
  }

  const contentTruncationLimit = 280;
</script>

<main class="page-wrapper">
  <div class="page-title">Post Showcase</div>
  <div class="subtitle">
    {#if $selectedTag}
      Showing posts tagged with <span class="active-tag-name"
        >"{$selectedTag}"</span
      >
    {:else}
      A curated feed of the latest content.
    {/if}
  </div>

  <div class="main-layout">
    <div class="posts-column">
      {#if $isLoading}
        <div class="loader">Loading...</div>
      {:else if errorMessage}
        <div class="error-message">{errorMessage}</div>
      {:else if $filteredPosts.length === 0}
        <p class="no-posts-found">No posts found for the selected tag.</p>
      {:else}
        <div class="posts-container">
          {#each $filteredPosts as post (post.id)}
            <article class="post-card">
              <header class="post-header">
                <h2 class="post-title">{post.title}</h2>
                <div class="user-info">
                  <div class="user-avatar">
                    <span>{post.userId}</span>
                  </div>
                </div>
              </header>
              <div
                class="post-content-wrapper"
                class:truncated={post.content.length > contentTruncationLimit &&
                  !$expandedPosts[post.id]}
              >
                <div class="post-content">
                  <p>
                    {#if post.content.length > contentTruncationLimit && !$expandedPosts[post.id]}
                      {truncateContent(post.content, contentTruncationLimit)}
                    {:else}
                      {post.content}
                    {/if}
                  </p>
                </div>
                <!-- Only show the read more/show less button if content is long -->
                {#if post.content.length > contentTruncationLimit}
                  <div class="button-container">
                    <button
                      class="read-more-button"
                      on:click={() => toggleContentExpansion(post.id)}
                    >
                      {#if $expandedPosts[post.id]}
                        Show less
                      {:else}
                        Read more
                      {/if}
                    </button>
                  </div>
                {/if}
              </div>

              {#if post.tags.length}
                <div class="post-tags-wrapper">
                  {#each post.tags as tagName}
                    <span class="tag">{tagName}</span>
                  {/each}
                </div>
              {/if}

              <footer class="post-meta">
                <span class="meta-item">
                  <span class="icon">🗓️</span> Posted: {new Date(
                    post.createdAt
                  ).toLocaleDateString()}
                </span>
                <span class="meta-item">
                  <span class="icon">🔄</span> Updated: {new Date(
                    post.updatedAt
                  ).toLocaleDateString()}
                </span>
              </footer>
            </article>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Trending Tags Sidebar -->
    <aside class="sidebar">
      <h3>Trending Topics</h3>
      {#each $trendingTags as tag}
        <button
          class="tag-button {tag === $selectedTag ? 'active' : ''}"
          on:click={() => handleTagClick(tag)}
        >
          #{tag}
        </button>
      {/each}
    </aside>
  </div>
</main>

<style>
  /*
    * This CSS uses the variables from your provided :root block.
    * It builds on the previous design with more advanced effects and responsive design.
  */

  .page-wrapper {
    max-width: 1280px;
    margin: 4rem auto;
    padding: 0 2rem;
    color: var(--color-text-primary);
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
      sans-serif;
    animation: fadeIn 0.8s ease-in-out;
  }

  .main-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  /* Media query for desktop layout */
  @media (min-width: 992px) {
    .main-layout {
      grid-template-columns: 3fr 1fr;
      gap: 3rem;
    }
  }

  .page-title {
    font-size: 2.8rem;
    font-weight: 800;
    margin-bottom: 2rem;
    text-align: center;
    color: var(--color-accent-primary);
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
    letter-spacing: -1px;
  }

  .subtitle {
    text-align: center;
    color: var(--color-text-secondary);
    font-weight: 500;
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--color-border);
  }

  .posts-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  /* --- Post Card Styling --- */
  .post-card {
    background: linear-gradient(
      145deg,
      var(--color-bg-secondary),
      var(--color-bg-tertiary)
    );
    border-radius: 16px;
    padding: 2.5rem;
    border: 1px solid var(--color-border);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
  }

  .post-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 45px rgba(0, 0, 0, 0.5);
    border-color: var(--color-accent-secondary);
  }

  .post-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-noise);
    opacity: 0.05;
    pointer-events: none;
    z-index: 0;
  }

  .post-card > * {
    position: relative;
    z-index: 1;
  }

  .post-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .post-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--color-accent-secondary);
    text-transform: capitalize;
    line-height: 1.2;
    margin: 0;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .user-avatar {
    width: 40px;
    height: 40px;
    background: linear-gradient(
      45deg,
      var(--color-accent-primary),
      var(--color-accent-secondary)
    );
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text-primary);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .post-content-wrapper {
    position: relative;
  }

  .post-content {
    font-size: 1rem;
    line-height: 1.8;
    color: var(--color-text-secondary);
    margin-bottom: 2rem;
  }

  /* Gradient mask for truncated content */
  .post-content-wrapper.truncated .post-content::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6rem; /* Increased height for better fade-out */
    background: linear-gradient(
      to top,
      var(--color-bg-secondary) 10%,
      transparent
    );
    pointer-events: none; /* Allows clicks to pass through */
  }

  .post-tags-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .tag {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 0.4rem 0.9rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--color-text-primary);
    border: 1px solid var(--color-border);
    white-space: nowrap;
    transition:
      background-color 0.2s ease,
      transform 0.2s ease;
  }
  .tag:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  .post-meta {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
    display: flex;
    justify-content: space-between;
    border-top: 1px solid var(--color-border);
    padding-top: 1rem;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .read-more-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--color-accent-primary);
    border: none;
    color: var(--color-bg-primary);
    font-weight: 600;
    cursor: pointer;
    text-align: center;
    padding: 0.6rem 1.2rem;
    border-radius: 9999px; /* Pill shape */
    margin-top: 1rem;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .read-more-button:hover {
    background: var(--color-accent-secondary);
    color: var(--color-text-primary);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  .button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: -3rem; /* Pull it up to sit on top of the content */
    margin-bottom: 2rem;
    position: relative;
    z-index: 2;
  }

  /* --- Sidebar Styling --- */
  .sidebar {
    background: var(--color-bg-tertiary);
    border-radius: 16px;
    padding: 2rem;
    border: 1px solid var(--color-border);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    align-self: start;
    position: sticky;
    top: 2rem; /* Stick to top of the viewport */
    transition: all 0.3s ease;
  }

  .sidebar h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-accent-primary);
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--color-border);
  }

  .tag-button {
    display: block;
    width: 100%;
    text-align: left;
    margin-bottom: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 12px;
    background: var(--color-bg-secondary);
    color: var(--color-text-primary);
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid transparent;
    font-weight: 500;
  }

  .tag-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  .tag-button.active {
    background: var(--color-accent-secondary);
    color: var(--color-text-primary);
    font-weight: 700;
    border-color: var(--color-accent-primary);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  /* --- Utility and Animation --- */
  .loader,
  .error-message,
  .no-posts-found {
    text-align: center;
    font-size: 1.5rem;
    color: var(--color-text-secondary);
    margin-top: 5rem;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
