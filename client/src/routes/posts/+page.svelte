<!-- <script lang="ts">
  import { onMount } from 'svelte';
  import { writable, get } from 'svelte/store';
  import { isAuthenticated as isLoggedIn, userId, token} from '../../lib/stores/auth';

console.log('AUTH TOKEN:', get(token));

console.log(token)
  interface Post {
    id: number;
    userId: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    
  }

 interface Tag {
  _id: string;
  tagId: string;
  name: string;
}

  let posts = writable<Post[]>([]);
  let tags = writable<Tag[]>([]);
  let errorMessage = '';
  let showCreateForm = false;
  let editingPostId: number | null = null;

  let title = '';
  let content = '';
  let tagId = '';

  async function fetchUserPosts() {
    try {
      if (!get(isLoggedIn)) {
        posts.set([]);
        return;
      }
    const res = await fetch('http://localhost:5555/posts/my', {
     
  headers: {
   Authorization: `Bearer ${get(token)}`
  }
});

      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      posts.set(data);
     
    } catch (error: unknown) {
      const err = error as Error;
      errorMessage = err.message;
    }
  }

  async function fetchTags() {
    try {
      const res = await fetch('http://localhost:5555/tags');
      if (!res.ok) throw new Error('Failed to fetch tags');
      const data = await res.json();
      tags.set(data);
    } catch (error: unknown) {
      const err = error as Error;
      errorMessage = err.message;
    }
  }

  function resetForm() {
    title = '';
    content = '';
    tagId = '';
    errorMessage = '';
    editingPostId = null;
  }

  function openCreateForm() {
    if (!get(isLoggedIn)) {
      alert('Please login to create a post.');
      return;
    }
    resetForm();
    showCreateForm = true;
  }

  function openEditForm(post: Post) {
    if (post.userId !== get(userId)) {
      alert('You can only edit your own posts.');
      return;
    }
    title = post.title;
    content = post.content;
    tagId = ''; // Optional: fetch and prefill the tag
    editingPostId = post.id;
    errorMessage = '';
    showCreateForm = true;
  }

  async function submitPost() {
    console.log('DEBUG:', { title, content, tagId });

    if (!title.trim() || !content.trim() || !tagId) {
      errorMessage = 'Please fill all fields.';
      return;
    }
    const method = editingPostId ? 'PUT' : 'POST';
    const url = editingPostId ? `http://localhost:5555/posts/${editingPostId}` : 'http://localhost:5555/posts';
    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${get(token)}`,
        },
        body: JSON.stringify({ title, content, tagId }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save post');
      }
      await fetchUserPosts();
      showCreateForm = false;
      resetForm();
    } catch (error: unknown) {
      const err = error as Error;
      errorMessage = err.message;
    }
  }

  async function deletePost(post: Post) {
    if (post.userId !== get(userId)) {
      alert('You can only delete your own posts.');
      return;
    }
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`http://localhost:5555/posts/${post.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${get(token)}`,
        },
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to delete post');
      }
      await fetchUserPosts();
    } catch (error: unknown) {
      const err = error as Error;
      alert(err.message);
    }
  }

  onMount(() => {
    fetchUserPosts();
    fetchTags();
  });
</script>

<div>
  <h1>Your Posts</h1>
  <button on:click={openCreateForm}>Create New Post</button>

  {#if showCreateForm}
    <div class="create-form">
      <h2>{editingPostId ? 'Edit Post' : 'Create Post'}</h2>
      {#if errorMessage}
        <div class="error-message">{errorMessage}</div>
      {/if}
      <div class="form-field">
        <label for="title">Title</label>
        <input id="title" type="text" bind:value={title} />
      </div>
      <div class="form-field">
        <label for="content">Content</label>
        <textarea id="content" bind:value={content}></textarea>
      </div>
      <div class="form-field">
        <label for="tagId">Select Tag</label>
        <select bind:value={tagId} required>
  <option value="" disabled selected={tagId === ''}>Select a tag</option>
  {#each $tags as tag}
    <option value={tag.tagId}>{tag.name}</option>
  {/each}
</select>

      </div>
      <button on:click={submitPost}>{editingPostId ? 'Update' : 'Create'}</button>
      <button class="button-secondary" on:click={() => { showCreateForm = false; resetForm(); }}>Cancel</button>
    </div>
  {/if}

  <div class="posts-container">
    {#each $posts as post (post.id)}
      <div class="post-card">
        <div class="post-title">{post.title}</div>
        <div class="post-content">{post.content}</div>
        <div class="post-meta">
          <small>By User ID: {post.userId}</small><br />
          <small>Created: {new Date(post.createdAt).toLocaleString()}</small>
        </div>
        <div class="actions">
          <button on:click={() => openEditForm(post)}>Edit</button>
          <button class="button-secondary" on:click={() => deletePost(post)}>Delete</button>
        </div>
      </div>
    {/each}
  </div>
</div>




<style>
  @import '../global.css';

  .posts-container {
    max-width: 900px;
    margin: 2rem auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
  }
  .post-card {
    background-color: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px var(--color-shadow);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }
  .post-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 24px var(--color-shadow);
  }
  .post-title {
    font-weight: 700;
    font-size: 1.4rem;
    margin-bottom: 0.75rem;
    color: var(--color-accent-primary);
  }
  .post-content {
    font-size: 1.1rem;
    color: var(--color-text-primary);
    margin-bottom: 1rem;
    line-height: 1.4;
  }
  .post-meta {
    font-size: 0.85rem;
    color: var(--color-text-secondary);
  }
  .error-message {
    color: var(--color-accent-primary);
    text-align: center;
    margin-top: 1rem;
    font-weight: 600;
  }
  .create-form {
    max-width: 600px;
    margin: 1rem auto 2rem auto;
    padding: 1rem;
    border: 1px solid var(--color-border);
    border-radius: 12px;
    background-color: var(--color-bg-primary);
    box-shadow: 0 4px 12px var(--color-shadow);
  }
  .form-field {
    margin-bottom: 1rem;
  }
  label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.3rem;
    color: var(--color-text-primary);
  }
  input[type="text"],
  textarea {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    background-color: var(--color-bg-secondary);
    color: var(--color-text-primary);
  }
  textarea {
    height: 100px;
    resize: vertical;
  }
  button {
    background-color: var(--color-accent-primary);
    color: white;
    border: none;
    padding: 0.7rem 1.2rem;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  button:hover {
    background-color: var(--color-accent-secondary);
  }
  .button-secondary {
    background-color: var(--color-bg-secondary);
    color: var(--color-text-primary);
    border: 1px solid var(--color-border);
    margin-left: 0.5rem;
  }
  .button-secondary:hover {
    background-color: var(--color-bg-tertiary);
  }
  .actions {
    margin-top: 1rem;
  }
</style>
 -->


 <script lang="ts">
  import { onMount } from 'svelte';
  import { writable, get } from 'svelte/store';
  import { isAuthenticated as isLoggedIn, userId, token} from '../../lib/stores/auth';

console.log('AUTH TOKEN:', get(token));

console.log(token)
  interface Post {
    id: number;
    userId: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    
  }

 interface Tag {
  _id: string;
  tagId: string;
  name: string;
}

  let posts = writable<Post[]>([]);
  let tags = writable<Tag[]>([]);
  let errorMessage = '';
  let showCreateForm = false;
  let editingPostId: number | null = null;

  let title = '';
  let content = '';
  let tagId = '';

  async function fetchUserPosts() {
    try {
      if (!get(isLoggedIn)) {
        posts.set([]);
        return;
      }
    const res = await fetch('http://localhost:5555/posts/my', {
      
  headers: {
    Authorization: `Bearer ${get(token)}`
  }
});

      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      posts.set(data);
      
    } catch (error: unknown) {
      const err = error as Error;
      errorMessage = err.message;
    }
  }

  async function fetchTags() {
    try {
      const res = await fetch('http://localhost:5555/tags');
      if (!res.ok) throw new Error('Failed to fetch tags');
      const data = await res.json();
      tags.set(data);
    } catch (error: unknown) {
      const err = error as Error;
      errorMessage = err.message;
    }
  }

  function resetForm() {
    title = '';
    content = '';
    tagId = '';
    errorMessage = '';
    editingPostId = null;
  }

  function openCreateForm() {
    if (!get(isLoggedIn)) {
      alert('Please login to create a post.');
      return;
    }
    resetForm();
    showCreateForm = true;
  }

  function openEditForm(post: Post) {
    if (post.userId !== get(userId)) {
      alert('You can only edit your own posts.');
      return;
    }
    title = post.title;
    content = post.content;
    tagId = ''; // Optional: fetch and prefill the tag
    editingPostId = post.id;
    errorMessage = '';
    showCreateForm = true;
  }

  async function submitPost() {
    console.log('DEBUG:', { title, content, tagId });

    if (!title.trim() || !content.trim() || !tagId) {
      errorMessage = 'Please fill all fields.';
      return;
    }
    const method = editingPostId ? 'PUT' : 'POST';
    const url = editingPostId ? `http://localhost:5555/posts/${editingPostId}` : 'http://localhost:5555/posts';
    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${get(token)}`,
        },
        body: JSON.stringify({ title, content, tagId }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save post');
      }
      await fetchUserPosts();
      showCreateForm = false;
      resetForm();
    } catch (error: unknown) {
      const err = error as Error;
      errorMessage = err.message;
    }
  }

  async function deletePost(post: Post) {
    if (post.userId !== get(userId)) {
      alert('You can only delete your own posts.');
      return;
    }
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`http://localhost:5555/posts/${post.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${get(token)}`,
        },
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to delete post');
      }
      await fetchUserPosts();
    } catch (error: unknown) {
      const err = error as Error;
      alert(err.message);
    }
  }

  onMount(() => {
    fetchUserPosts();
    fetchTags();
  });
</script>

<style>
  /* Base Styles & Root Colors */
  :root {
    --color-bg-primary: #121212;
    --color-bg-secondary: #1e1e1e;
    --color-bg-tertiary: #2a2a2a;
    --color-text-primary: #ffffff;
    --color-text-secondary: #a0a0a0;
    --color-border: #333333;
    --color-accent-primary: #8aa9ff; /* Adjusted accent color for a cool tone */
    --color-accent-secondary: #5c7cfa; /* Darker shade for hover */
    --color-danger: #ef476f; /* A more vibrant red for danger */
    --color-success: #06d6a0; /* A pleasant green for success */
    --color-shadow: rgba(0, 0, 0, 0.4);
  }

  body {
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.6;
    margin: 0;
  }

  /* Main Container */
  .page-container {
    max-width: 900px;
    margin: 4rem auto;
    padding: 0 2rem;
    animation: fadeIn 0.8s ease-in-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    color: var(--color-accent-primary);
    margin-bottom: 2rem;
    text-shadow: 0 2px 4px rgba(0,0,0,0.4);
  }

  /* General Button Styling */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    font-size: 1rem;
    margin-right: 0.5rem;
  }

  .btn-primary {
    background-color: var(--color-accent-primary);
    color: var(--color-text-primary);
    box-shadow: 0 4px 15px rgba(138, 169, 255, 0.2);
  }

  .btn-primary:hover {
    background-color: var(--color-accent-secondary);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(92, 124, 250, 0.3);
  }

  .btn-secondary {
    background-color: var(--color-bg-tertiary);
    color: var(--color-text-primary);
    border: 1px solid var(--color-border);
  }

  .btn-secondary:hover {
    background-color: var(--color-bg-secondary);
    border-color: var(--color-accent-primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .btn-edit {
    background-color: var(--color-success);
    color: var(--color-text-primary);
  }
  
  .btn-edit:hover {
    background-color: #04a57b;
  }

  .btn-delete {
    background-color: var(--color-danger);
    color: var(--color-text-primary);
  }

  .btn-delete:hover {
    background-color: #bf345c;
  }
  
  /* Create New Post Button specific styling */
  .create-post-container {
    text-align: center;
    margin-bottom: 2rem;
  }

  /* Form Container */
  .create-form {
    max-width: 600px;
    margin: 1rem auto 3rem auto;
    padding: 2rem;
    border: 1px solid var(--color-border);
    border-radius: 12px;
    background-color: var(--color-bg-secondary);
    box-shadow: 0 8px 20px var(--color-shadow);
  }

  .create-form h2 {
    font-size: 1.8rem;
    color: var(--color-accent-primary);
    margin-bottom: 1.5rem;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 1rem;
  }

  .form-field {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--color-text-primary);
  }

  input[type="text"],
  textarea,
  select {
    width: 100%;
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background-color: var(--color-bg-tertiary);
    color: var(--color-text-primary);
    box-sizing: border-box;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  input[type="text"]:focus,
  textarea:focus,
  select:focus {
    outline: none;
    border-color: var(--color-accent-primary);
    box-shadow: 0 0 0 3px rgba(138, 169, 255, 0.25);
  }

  textarea {
    min-height: 150px;
    resize: vertical;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  /* Error Message */
  .error-message {
    color: var(--color-danger);
    background-color: rgba(239, 71, 111, 0.1);
    border: 1px solid var(--color-danger);
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }

  /* Posts Container - Single Column Layout */
  .posts-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--color-border);
  }

  /* Post Card */
  .post-card {
    background: linear-gradient(145deg, var(--color-bg-secondary), var(--color-bg-tertiary));
    border: 1px solid var(--color-border);
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 6px 18px var(--color-shadow);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .post-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 28px var(--color-shadow);
  }

  .post-title {
    font-weight: 700;
    font-size: 1.8rem;
    margin-bottom: 0.75rem;
    color: var(--color-accent-primary);
    line-height: 1.2;
  }

  .post-content {
    font-size: 1rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin-bottom: 1.5rem;
    flex-grow: 1;
  }

  .post-meta {
    font-size: 0.85rem;
    color: var(--color-text-secondary);
    border-top: 1px solid var(--color-border);
    padding-top: 1rem;
    margin-top: auto;
  }
  
  .post-meta small {
    display: block;
    margin-top: 0.2rem;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1.5rem;
  }
  
  .actions button {
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
    font-weight: 500;
  }

  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .page-container {
      padding: 0 1rem;
    }

    h1 {
      font-size: 2rem;
    }
  }
</style>


<div class="page-container">
  <div class="create-post-container">
    <h1>Your Posts</h1>
    <button class="btn btn-primary" on:click={openCreateForm}>Create New Post</button>
  </div>

  {#if showCreateForm}
    <div class="create-form">
      <h2>{editingPostId ? 'Edit Post' : 'Create Post'}</h2>
      {#if errorMessage}
        <div class="error-message">{errorMessage}</div>
      {/if}
      <div class="form-field">
        <label for="title">Title</label>
        <input id="title" type="text" bind:value={title} />
      </div>
      <div class="form-field">
        <label for="content">Content</label>
        <textarea id="content" bind:value={content}></textarea>
      </div>
      <div class="form-field">
        <label for="tagId">Select Tag</label>
        <select bind:value={tagId} required>
          <option value="" disabled selected={tagId === ''}>Select a tag</option>
          {#each $tags as tag}
            <option value={tag.tagId}>{tag.name}</option>
          {/each}
        </select>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" on:click={submitPost}>{editingPostId ? 'Update' : 'Create'}</button>
        <button class="btn btn-secondary" on:click={() => { showCreateForm = false; resetForm(); }}>Cancel</button>
      </div>
    </div>
  {/if}

  <div class="posts-container">
    {#each $posts as post (post.id)}
      <div class="post-card">
        <div class="post-title">{post.title}</div>
        <div class="post-content">{post.content}</div>
        <div class="post-meta">
          <small>By User ID: {post.userId}</small>
          <small>Created: {new Date(post.createdAt).toLocaleString()}</small>
        </div>
        <div class="actions">
          <button class="btn btn-edit" on:click={() => openEditForm(post)}>Edit</button>
          <button class="btn btn-delete" on:click={() => deletePost(post)}>Delete</button>
        </div>
      </div>
    {/each}
  </div>
</div>
