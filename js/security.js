// Disable right-click
document.addEventListener('contextmenu', e => e.preventDefault());

// Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
document.addEventListener('keydown', e => {
  if (e.key === 'F12' ||
     (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key)) ||
     (e.ctrlKey && e.key === 'U')) {
    e.preventDefault();
  }
});

// Disable text selection
document.addEventListener('selectstart', e => e.preventDefault());
document.addEventListener('dragstart', e => e.preventDefault());
