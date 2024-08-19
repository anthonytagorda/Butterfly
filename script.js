function toggleBookmark(button) {
    if (button.style.color === "red") {
        button.style.color = "#ff5252"; // Unbookmark
    } else {
        button.style.color = "red"; // Bookmark
    }

    const moodOptions = document.querySelectorAll('.mood-option');
let selectedMood = null;

moodOptions.forEach(option => {
    option.addEventListener('click', () => {
        moodOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        selectedMood = option.getAttribute('data-mood');
    });
});

document.querySelector('.submit-btn').addEventListener('click', () => {
    if (selectedMood) {
        // Hide the mood selection page and show the success page
        document.getElementById('mood-selection').style.display = 'none';
        document.getElementById('success-page').style.display = 'flex';

        // Set the selected mood text and message
        const moodText = selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1);
        document.getElementById('selected-mood-text').textContent = moodText;

        // Set the content based on the selected mood
        let successIcon = document.getElementById('success-icon');
        let successMessage = document.getElementById('success-message');
        if (selectedMood === 'joyful') {
            successIcon.style.backgroundImage = "url('/mnt/data/image.png')"; // Replace with the correct path
            successMessage.textContent = "You’re doing great! Follow your dreams and have a good day.";
        } else if (selectedMood === 'sadness') {
            successIcon.style.backgroundImage = "url('path_to_sad_image.png')";
            successMessage.textContent = "It's okay to feel sad. Take care of yourself today.";
        } else if (selectedMood === 'angry') {
            successIcon.style.backgroundImage = "url('path_to_angry_image.png')";
            successMessage.textContent = "Take a deep breath. It's important to stay calm.";
        } else {
            successIcon.style.backgroundImage = "url('path_to_other_image.png')";
            successMessage.textContent = "We're here for you. Take it one step at a time.";
        }
    } else {
        alert('Please select a mood.');
    }
});

document.querySelector('.done-btn').addEventListener('click', () => {
    location.reload(); // This will reset the page
});

}
