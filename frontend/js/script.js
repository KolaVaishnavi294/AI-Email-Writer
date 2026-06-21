const detailsBox =
    document.getElementById("details");

const charCount =
    document.getElementById("charCount");

detailsBox.addEventListener(
    "input",
    () => {

        charCount.textContent =
            "Characters: " +
            detailsBox.value.length;
    }
);

async function generateEmail() {

    try {

        const purpose =
            document.getElementById(
                "purpose"
            ).value;

        const details =
            document.getElementById(
                "details"
            ).value;

        const tone =
            document.getElementById(
                "tone"
            ).value;

        if (!purpose || !details) {

            alert(
                "Please fill all fields"
            );

            return;
        }

        document
            .getElementById(
                "output"
            )
            .textContent =
            `⏳ Generating Email... 
            Please wait while AI writes your email...`;

        const response =
            await fetch(
                "http://127.0.0.1:5000/generate-email",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify({
                        purpose,
                        details,
                        tone
                    })
                }
            );

        const data =
            await response.json();

        if (data.error) {

            document
                .getElementById(
                    "output"
                )
                .textContent =
                data.error;

            return;
        }

        document
            .getElementById(
                "output"
            )
            .textContent =
            data.email;

    }

    catch (error) {

        document
            .getElementById(
                "output"
            )
            .textContent =
            "Error generating email";
    }
}

function copyEmail() {

    const text =
        document
            .getElementById(
                "output"
            )
            .textContent;

    navigator.clipboard
        .writeText(text);

    alert(
        "Email Copied Successfully!"
    );
}

function downloadEmail() {

    const text =
        document
            .getElementById(
                "output"
            )
            .textContent;

    const blob =
        new Blob(
            [text],
            {
                type:
                "text/plain"
            }
        );

    const a =
        document
            .createElement("a");

    a.href =
        URL.createObjectURL(
            blob
        );

    a.download =
        "generated_email.txt";

    a.click();
}

function clearForm() {

    document
        .getElementById(
            "purpose"
        )
        .value = "";

    document
        .getElementById(
            "details"
        )
        .value = "";

    document
        .getElementById(
            "tone"
        )
        .selectedIndex = 0;

    document
        .getElementById(
            "output"
        )
        .textContent =
        "🚀 Your AI-generated email will appear here...";

    charCount.textContent =
        "Characters: 0";
}