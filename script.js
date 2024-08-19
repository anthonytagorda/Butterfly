function toggleBookmark(button) {
    if (button.style.color === "red") {
        button.style.color = "#ff5252"; // Unbookmark
    } else {
        button.style.color = "red"; // Bookmark
    }

    const moodOptions = document.querySelectorAll('.mood-option');
    let selectedMood = null;
    
    // Add click event listeners to each mood option
    moodOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove 'selected' class from all options
            moodOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add 'selected' class to the clicked option
            option.classList.add('selected');
            
            // Get the data-mood attribute value of the clicked option
            selectedMood = option.getAttribute('data-mood');
        });
    });
    
    // Add click event listener to the submit button
    document.querySelector('.submit-btn').addEventListener('click', () => {
        if (selectedMood) {
            // Store the selected mood in localStorage
            localStorage.setItem('selectedMood', selectedMood);
    
            // Redirect to the result page
            window.location.href = 'result.html';
        } else {
            // Alert the user if no mood is selected
            alert('Please select a mood.');
        }
    });

}
