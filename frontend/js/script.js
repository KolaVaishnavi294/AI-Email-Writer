const loader =
    document.getElementById(
        "loader"
    );

const toast =
    document.getElementById(
        "toast"
    );

const detailsBox =
    document.getElementById(
        "details"
    );

const charCount =
    document.getElementById(
        "charCount"
    );

const output =
    document.getElementById(
        "output"
    );

const emptyState =
    document.getElementById(
        "empty-state"
    );


/* ======================
   CHARACTER COUNT
====================== */

detailsBox.addEventListener(
    "input",
    () => {

        charCount.textContent =
            "Characters: " +
            detailsBox.value.length;

    }
);


/* ======================
   TOAST MESSAGE
====================== */

function showToast(message){

    toast.textContent =
        message;

    toast.style.display =
        "block";

    setTimeout(() => {

        toast.style.display =
            "none";

    },2500);
}


/* ======================
   DARK MODE
====================== */

function toggleTheme(){

    document.body.classList.toggle(
        "dark"
    );

    localStorage.setItem(
        "theme",
        document.body.classList.contains(
            "dark"
        )
    );
}


/* ======================
   TYPEWRITER EFFECT
====================== */

function typeWriter(text){

    output.textContent = "";

    let i = 0;

    const timer =
    setInterval(() => {

        output.textContent +=
            text.charAt(i);

        i++;

        if(i >= text.length){

            clearInterval(
                timer
            );
        }

    },10);
}


/* ======================
   TONE SELECTION
====================== */

function setTone(card, tone){

    document
        .getElementById(
            "tone"
        )
        .value = tone;

    document
        .querySelectorAll(
            ".tone-card"
        )
        .forEach(item => {

            item.classList.remove(
                "active"
            );

        });

    card.classList.add(
        "active"
    );
}


/* ======================
   QUICK TEMPLATES
====================== */

function loadTemplate(type){

    if(type === "leave"){

        purpose.value =
        "Leave Request";

        recipient.value =
        "Manager";

        details.value =
        "Need leave for 2 days due to fever.";
    }

    else if(type === "job"){

        purpose.value =
        "Job Application";

        recipient.value =
        "HR Manager";

        details.value =
        "Applying for software developer internship.";
    }

    else if(type === "meeting"){

        purpose.value =
        "Meeting Request";

        recipient.value =
        "Project Manager";

        details.value =
        "Need a meeting regarding project discussion.";
    }

    else if(type === "thanks"){

        purpose.value =
        "Thank You";

        recipient.value =
        "Team Leader";

        details.value =
        "Thank you for your support and guidance.";
    }

    else if(type === "complaint"){

        purpose.value =
        "Complaint";

        recipient.value =
        "Customer Support";

        details.value =
        "Facing issue with purchased product.";
    }

    charCount.textContent =
        "Characters: " +
        details.value.length;

    showToast(
        "📄 Template Loaded"
    );
}


/* ======================
   GENERATE EMAIL
====================== */

async function generateEmail(){

    try{

        const purpose =
            document
            .getElementById(
                "purpose"
            )
            .value;

        const recipient =
            document
            .getElementById(
                "recipient"
            )
            .value;

        const details =
            document
            .getElementById(
                "details"
            )
            .value;

        const tone =
            document
            .getElementById(
                "tone"
            )
            .value;

        const length =
            document
            .getElementById(
                "length"
            )
            .value;

        if(
            purpose === "" ||
            details === ""
        ){

            showToast(
                "⚠ Fill all required fields"
            );

            return;
        }

        emptyState.style.display =
            "none";

        output.style.display =
            "none";

        loader.style.display =
            "flex";

        const response =
            await fetch(
                "http://127.0.0.1:5000/generate-email",
                {
                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },

                    body:JSON.stringify({

                        purpose,
                        recipient,
                        details,
                        tone,
                        length

                    })
                }
            );

        const data =
            await response.json();

        loader.style.display =
            "none";

        output.style.display =
            "block";

        if(data.error){

            output.textContent =
                data.error;

            return;
        }

        typeWriter(
            data.email
        );

        localStorage.setItem(
            "savedEmail",
            data.email
        );

        showToast(
            "✅ Email Generated"
        );
    }

    catch(error){

        loader.style.display =
            "none";

        output.style.display =
            "block";

        output.textContent =
            "❌ Error generating email.";

        console.log(error);
    }
}


/* ======================
   COPY EMAIL
====================== */

function copyEmail(){

    if(
        output.textContent === ""
    ){

        return;
    }

    navigator.clipboard.writeText(
        output.textContent
    );

    showToast(
        "📋 Email Copied"
    );
}

/* ======================
   Toggle Menu
====================== */

function toggleDownloadMenu(){

    const menu =
        document.getElementById(
            "downloadMenu"
        );

    if(menu.style.display === "block"){

        menu.style.display =
            "none";
    }
    else{

        menu.style.display =
            "block";
    }
}

/* ======================
   DOWNLOAD EMAIL
====================== */

function downloadEmail(type){

    document.getElementById(
        "downloadMenu"
    ).style.display = "none";

    if(output.textContent === ""){

        showToast(
            "No email available."
        );

        return;
    }

    let extension = type;
    let mime = "text/plain";

    if(type === "pdf"){
        mime = "application/pdf";
    }

    if(type === "doc"){
        mime = "application/msword";
    }

    const blob =
        new Blob(
            [output.textContent],
            {
                type:mime
            }
        );

    const a =
        document.createElement(
            "a"
        );

    a.href =
        URL.createObjectURL(
            blob
        );

    a.download =
        "AI_Email." + extension;

    a.click();

    showToast(
        "Downloaded as ." +
        extension
    );
}


/* ======================
   CLEAR FORM
====================== */

function clearForm(){

    document
        .getElementById(
            "purpose"
        )
        .value = "";

    document
        .getElementById(
            "recipient"
        )
        .value = "";

    document
        .getElementById(
            "details"
        )
        .value = "";

    document
        .getElementById(
            "length"
        )
        .value = 2;

    document
        .getElementById(
            "tone"
        )
        .value =
        "Professional";

    document
        .querySelectorAll(
            ".tone-card"
        )
        .forEach(item => {

            item.classList.remove(
                "active"
            );

        });

    document
        .querySelector(
            ".tone-card"
        )
        .classList.add(
            "active"
        );

    output.style.display =
        "none";

    loader.style.display =
        "none";

    emptyState.style.display =
        "flex";

    output.textContent =
        "";

    charCount.textContent =
        "Characters: 0";

    localStorage.removeItem(
        "savedEmail"
    );

    showToast(
        "🗑 Form Cleared"
    );
}


/* ======================
   PAGE LOAD
====================== */

window.onload = function(){

    const savedEmail =
        localStorage.getItem(
            "savedEmail"
        );

    const darkTheme =
        localStorage.getItem(
            "theme"
        );

    if(
        darkTheme === "true"
    ){

        document.body.classList.add(
            "dark"
        );
    }

    if(savedEmail){

        emptyState.style.display =
            "none";

        output.style.display =
            "block";

        output.textContent =
            savedEmail;
    }
};