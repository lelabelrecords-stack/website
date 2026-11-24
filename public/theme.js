try {
  if (localStorage.getItem('theme') === 'mono') {
    document.documentElement.dataset.theme = 'mono'
  }
} catch (e) {}
