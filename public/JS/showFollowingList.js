
const followingShow = document.querySelector('#followingShow');
const followingList = document.querySelector('#followingList');

followingShow.addEventListener('click', function(e) {
    e.preventDefault()
    followingList.classList.toggle('hidden');
});
