document.getElementById('createPostBtn').addEventListener('click', () => {
    document.getElementById('postModal').classList.remove('hidden');
});

document.getElementById('closeBtn').addEventListener('click', () => {
    document.getElementById('postModal').classList.add('hidden');
});

document.getElementById('cancelBtn').addEventListener('click', () => {
    document.getElementById('postModal').classList.add('hidden');
});
