// --- CONFIGURATION ---
// IMPORTANT: Set the target date: MONTH (0=Jan, 11=Dec) and DAY (1-31).
// Example: Birthday on Oct 15th -> BIRTHDAY_MONTH = 9, BIRTHDAY_DAY = 15
const BIRTHDAY_MONTH = 8; // **CHANGE THIS** (0-indexed: 0=Jan, 8=Sept)
const BIRTHDAY_DAY = 30;  // **CHANGE THIS** (e.g., 30)

// The array of your love letters. Use \n for line breaks.
// You can include HTML tags like <img> or <audio> in the content for media.
const lettersData = [
    { 
        title: "Day 1: My Heart's First Whisper", 
        content: "My Darling,\n\nI want you to know how much I love you. This first letter is just to say, Happy Birthday. You are the beginning and the end of all my best thoughts. I can't wait to see your smile today.", 
        media: '<p class="small-note">No photo for this one, just my words.</p>' 
    },
    { 
        title: "Day 2: The Night We Danced", 
        content: "I've been thinking about our trip to [Place] and that night under the stars. That moment, right then, is a perfect time-capsule of happiness for me. Thank you for that memory, and every one since.", 
        media: '<p class="small-note">I wish I could dance with you again right now.</p>'
    },
    { 
        title: "Day 3: The Promise of Tomorrow", 
        content: "My love for you isn't just about the past; it's a blueprint for our future. I promise we will [insert a specific, sweet future plan] very soon. Holding onto that thought helps me every day.", 
        media: '' 
    },
    { 
        title: "Day 4: Your Quiet Strengths", 
        content: "People see your kindness, but I see your strength. The way you [mention a specific quality] inspires me to be a better person. You are effortlessly wonderful.", 
        media: '<p class="small-note">You are my hero.</p>' 
    },
    { 
        title: "Day 5: A Song Dedicated to You", 
        content: "I found this song, and the lyrics are everything I feel but can't quite say. Please listen to it: [Link to Spotify/YouTube song]. Turn it up and imagine I'm singing it to you.", 
        media: '<p class="small-note">This one is best listened to with headphones.</p>' 
    },
    { 
        title: "Day 6: A Photo Story", 
        content: "Remember this photo? [Describe the photo you'll show her outside the archive, or upload an image to your 'assets' folder and link it here]. It was taken right after we...", 
        // Example of adding an image if you put it in an 'assets' folder
        media: '<img src="assets/our_memory_photo.jpg" alt="A photo from our trip" style="max-width:100%; height:auto; border-radius:8px; margin-top:15px;">' 
    },
    { 
        title: "Day 7: A Lifetime of Love", 
        content: "Seven days have passed, but my love only deepens. You are the most incredible person I know. This archive is just a tiny fraction of my feelings. Now, check your email (or phone!) for the final, biggest surprise I've been planning. I love you, always.", 
        media: '<p class="small-note">Forever yours, Yuvaan.</p>'
    }
];
// --- END CONFIGURATION ---

const container = document.getElementById('letters-container');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalMedia = document.getElementById('modal-media');
const closeButton = document.querySelector('.close-button');

// Function to calculate which letters should be unlocked
function checkUnlockStatus() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const targetDate = new Date(currentYear, BIRTHDAY_MONTH, BIRTHDAY_DAY);
    
    // Check if the current date is before the start date (in the current year)
    if (today < targetDate) {
        // If the birthday hasn't happened yet this year, unlock 0 letters.
        return 0; 
    }
    
    // Calculate the difference in days
    const diffTime = today.getTime() - targetDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // The number of letters to unlock is 1 (for day 1) + daysPassed
    const lettersToUnlock = Math.min(lettersData.length, 1 + diffDays);

    for (let i = 0; i < lettersToUnlock; i++) {
        lettersData[i].unlocked = true;
    }
}

// Function to create and render the letter envelopes
function renderLetters() {
    container.innerHTML = ''; // Clear existing content
    checkUnlockStatus(); // Update status before rendering

    lettersData.forEach((letter, index) => {
        const envelope = document.createElement('div');
        envelope.classList.add('letter-envelope');
        
        const dayNumber = index + 1;
        const lockIcon = `<i class="fa-solid fa-lock envelope-icon"></i>`;
        const mailIcon = `<i class="fa-solid fa-envelope-open-text envelope-icon"></i>`;
        
        if (letter.unlocked) {
            envelope.innerHTML = `
                ${mailIcon}
                <h3 class="envelope-title">${letter.title}</h3>
                <p class="envelope-status">Click to Read</p>
            `;
            envelope.addEventListener('click', () => openLetter(letter));
        } else {
            envelope.classList.add('locked');
            envelope.innerHTML = `
                ${lockIcon}
                <h3 class="envelope-title">Day ${dayNumber}</h3>
                <p class="envelope-status">Unlocks on Day ${dayNumber}</p>
            `;
            envelope.addEventListener('click', () => alert(`Patience, my love! This letter unlocks on Day ${dayNumber}.`));
        }

        container.appendChild(envelope);
    });
}

// Function to open the letter modal
function openLetter(letter) {
    modalTitle.textContent = letter.title;
    // Set text content for the body
    modalBody.textContent = letter.content;
    
    // Set innerHTML for the media (to allow images/audio)
    modalMedia.innerHTML = letter.media; 
    
    modal.classList.remove('hidden');
}

// Function to close the modal
function closeModal() {
    modal.classList.add('hidden');
}

// Event listeners for closing the modal
closeButton.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Initialize the archive
renderLetters();