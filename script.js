
function updateCountdown() {
    const birthday = new Date("November 20, 2026 00:00:00").getTime();
    const now = new Date().getTime();
    const difference = birthday - now;

    if (difference <= 0) {
        document.getElementById("countdown").innerHTML =
            "🎂 Happy Birthday, Harsha! 💗";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor(
        (difference % (1000 * 60)) / 1000
    );

    document.getElementById("countdown").innerHTML =
        days + " Days " + hours + " Hours " +
        minutes + " Minutes " + seconds + " Seconds 💕";
}

updateCountdown();
setInterval(updateCountdown, 1000);


// PAGE NAVIGATION
const welcomePage = document.getElementById("welcomePage");
const galleryPage = document.getElementById("galleryPage");
const storyPage = document.getElementById("storyPage");
const messagePage = document.getElementById("messagePage");
const birthdayPage = document.getElementById("birthdayPage");

function showPage(page) {
    welcomePage.hidden = true;
    galleryPage.hidden = true;
    storyPage.hidden = true;
    messagePage.hidden = true;
    birthdayPage.hidden = true;

    page.hidden = false;

    window.scrollTo(0, 0);
}

document.getElementById("openGallery").addEventListener("click", function () {
    showPage(galleryPage);
});

document.getElementById("backToWelcome").addEventListener("click", function () {
    showPage(welcomePage);
});

document.getElementById("backToGallery").addEventListener("click", function () {
    showPage(galleryPage);
});


// PHOTO STORIES
const photos = document.querySelectorAll(".memory-card img");
const storyPhoto = document.getElementById("storyPhoto");
const storyTitle = document.getElementById("storyTitle");
const storyDescription = document.getElementById("storyDescription");


const memories = [
    {
        title: "🌾 Our First Pongal in College",
        description: "Our first Pongal celebration in college was filled with happiness, beautiful decorations, and unforgettable moments with everyone. We decorated, celebrated together, and captured lovely pictures. But among all those pictures, the one with you holds a special place in my heart. It isn't just a photograph; it's a memory I'll always treasure. 💗"
    },
    {
        title: "🎉 Our Symposium Day",
        description: "This was a day we had been waiting for—a chance to enjoy ourselves, forget our worries for a while, and feel free and comfortable with everyone. The laughter, fun, and time spent together made the day memorable. The best college memories are often the moments when we can simply be ourselves and enjoy every second with our friends. ✨"
    },
    {
        title: "🌿 Kerala IV — An Unexpected Memory",
        description: "An unexpected picture from you, but one that became a lovely memory! Sometimes, the moments we don't plan turn out to be the most special ones. This picture reminds me that beautiful memories can come from the simplest surprises. It may have been unexpected, but it definitely made me smile. 💕"
    },
    {
        title: "🍃 Coorg IV — Something Special",
        description: "Some trips become special not only because of the places we visit, but also because of the people and moments we carry back with us. Coorg gave us another memory to keep close to our hearts. There may be many pictures from that trip, but this one means something special to me. 💗"
    },
    {
        title: "🚆 Our Journey to Chennai",
        description: "One of the most memorable days of my life! The journey to Chennai was more than just travelling from one place to another. It was about sharing stories, laughing together, and creating memories along the way. Sometimes, the journey itself becomes more memorable than the destination. This is a day I'll always look back on with a smile. 🥹💖"
    },
    {
        title: "🎂 A Birthday to Remember",
        description: "Your birthday was a special day because it gave us another reason to celebrate you and make you feel loved. Birthdays are not just about cakes, gifts, or celebrations; they're about the people who make the day meaningful. I'm happy to have this memory of your special day, and I hope it always brings a smile to your face. 🎀💕"
    },
    {
        title: "🦋 My Favourite Look",
        description: "One of my favourite looks of you! You look absolutely gorgeous in this picture. There's something about this look that makes it stand out from the others. Sometimes, a single photograph captures someone's beauty and personality in such a lovely way that it becomes unforgettable. This is definitely one of those pictures. ✨💗"
    },
    {
        title: "💻 Little Memories in the Lab",
        description: "Even in the middle of college life, classes, and lab sessions, we always find little moments to have fun. Taking pictures with friends turns an ordinary day into something worth remembering. These simple moments may seem small now, but one day, we'll look back at them and miss these days. I'm glad we captured this memory! 🌸"
    },
    {
        title: "🌷 My Little Angel",
        description: "You holding a flower makes this picture look even more beautiful. There's something so simple, gentle, and lovely about this moment. The flower adds a little charm, but your smile and the way you look in this picture make it truly special. A beautiful picture of someone who deserves to be appreciated. 🌷💖"
    }
];

photos.forEach(function (photo, index) {
    photo.addEventListener("dblclick", function () {
        storyPhoto.src = photo.src;
        storyTitle.textContent = memories[index].title;
        storyDescription.textContent = memories[index].description;

        showPage(storyPage);
    });
});



const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwLewhweU1XhnXrt_iUTQfV_8d4YsYNy-_3wehl485JiubTtmUCp8hv4Mz4PviyC7F0/exec";


const shareMemoryButton = document.getElementById("shareMemoryButton");
const memoryResponse = document.getElementById("memoryResponse");
const saveStatus = document.getElementById("saveStatus");
const continueToMessage = document.getElementById("continueToMessage");

let currentPhotoIndex = 0;

photos.forEach(function (photo, index) {
    photo.addEventListener("dblclick", function () {
        currentPhotoIndex = index;
        memoryResponse.value = "";
        saveStatus.textContent = "";

        continueToMessage.hidden = true;
        shareMemoryButton.disabled = false;
    });
});

shareMemoryButton.addEventListener("click", async function () {
    const response = memoryResponse.value.trim();

    if (response === "") {
        saveStatus.textContent = "Please write your memory first 💗";
        return;
    }

    shareMemoryButton.disabled = true;
    saveStatus.textContent = "Submitting your memory... 💌";

    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
                type: "memory",
                photoNumber: currentPhotoIndex + 1,
                photoTitle: memories[currentPhotoIndex].title,
                response: response
            })
        });

        if (currentPhotoIndex < photos.length - 1) {
            currentPhotoIndex++;

            storyPhoto.src = photos[currentPhotoIndex].src;
            storyTitle.textContent = memories[currentPhotoIndex].title;
            storyDescription.textContent = memories[currentPhotoIndex].description;
            memoryResponse.value = "";

            saveStatus.textContent = "Moving to the next memory 💗";
        }    else {
            saveStatus.textContent = "You've completed all nine memories! 💖";
            continueToMessage.hidden = false;
        }
    } catch (error) {
        saveStatus.textContent = "Something went wrong. Please try again.";
    } finally {
        shareMemoryButton.disabled = false;
    }
});

continueToMessage.addEventListener("click", function () {
    showPage(messagePage);
});
// PAGE 4: SUBMIT PERSONAL MESSAGE
const personalMessage = document.getElementById("personalMessage");
const submitPersonalMessage = document.getElementById("submitPersonalMessage");
const personalMessageStatus = document.getElementById("personalMessageStatus");

submitPersonalMessage.addEventListener("click", async function () {
    const message = personalMessage.value.trim();

    if (message === "") {
        personalMessageStatus.textContent =
            "Please write something for Gayu first 💗";
        return;
    }

    submitPersonalMessage.disabled = true;
    personalMessageStatus.textContent = "Sending your message... 💌";

    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
                type: "personal",
                message: message
            })
        });

        personalMessageStatus.textContent = "Thank you for sharing your heart! 💖";

        showPage(birthdayPage);
    } catch (error) {
        personalMessageStatus.textContent =
            "Something went wrong. Please try again.";
    } finally {
        submitPersonalMessage.disabled = false;
    }
});
