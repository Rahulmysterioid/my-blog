const blogContainer = document.getElementById('blogContainer');
const adminPosts = document.getElementById('adminPosts');
let posts = JSON.parse(localStorage.getItem('posts')) || [];

// Quill Editor Initialization (Only on admin page)
let quill;
if (document.getElementById('editor')) {
  quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['image', 'code-block']
      ]
    }
  });
}

function renderPosts() {
  if (blogContainer) {
    blogContainer.innerHTML = '';
    posts.forEach(post => {
      blogContainer.innerHTML += `
        <div class="blog-post">
          <h2>${post.title}</h2>
          <div>${post.content}</div>
        </div>
      `;
    });
  }

  if (adminPosts) {
    adminPosts.innerHTML = '';
    posts.forEach((post, index) => {
      adminPosts.innerHTML += `
        <div class="blog-post">
          <h2>${post.title}</h2>
          <div>${post.content}</div>
          <button onclick="deletePost(${index})">Delete</button>
        </div>
      `;
    });
  }
}

function addPost() {
  const title = document.getElementById('titleInput').value;
  const content = quill.root.innerHTML;

  if (!title || !content) {
    alert('Title aur Content dono chahiye');
    return;
  }

  posts.push({ title, content });
  localStorage.setItem('posts', JSON.stringify(posts));
  document.getElementById('titleInput').value = '';
  quill.setContents([]);
  renderPosts();
}

function deletePost(index) {
  if (confirm('Delete karna hai?')) {
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
  }
}

renderPosts();
