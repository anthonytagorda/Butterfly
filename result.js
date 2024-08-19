document.addEventListener('DOMContentLoaded', () => {
    const selectedMood = localStorage.getItem('selectedMood');

    if (selectedMood) {
        // Set the content based on the selected mood
        let resultIcon = document.getElementById('result-icon');
        let resultMoodText = document.getElementById('result-mood-text');
        let resultMessage = document.getElementById('result-message');

        const moodText = selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1);
        resultMoodText.textContent = moodText;

        if (selectedMood === 'joyful') {
            resultIcon.style.backgroundImage = "url('/mnt/data/image.png')"; // Replace with the correct path
            resultMessage.textContent = "You’re doing great! Follow your dreams and have a good day.";
        } else if (selectedMood === 'sadness') {
            resultIcon.style.backgroundImage = "url('path_to_sad_image.png')";
            resultMessage.textContent = "It's okay to feel sad. Take care of yourself today.";
        } else if (selectedMood === 'angry') {
            resultIcon.style.backgroundImage = "url('path_to_angry_image.png')";
            resultMessage.textContent = "Take a deep breath. It's important to stay calm.";
        } else {
            resultIcon.style.backgroundImage = "url('path_to_other_image.png')";
            resultMessage.textContent = "We're here for you. Take it one step at a time.";
        }
    }

    // Clear the selection and go back to the mood selection page when "DONE" is clicked
    document.querySelector('.done-btn').addEventListener('click', () => {
        localStorage.removeItem('selectedMood');
        window.location.href = 'index.html'; // Adjust the path if necessary
    });
});
