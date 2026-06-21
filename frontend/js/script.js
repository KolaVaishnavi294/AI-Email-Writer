async function generateEmail() {

    try {

        const purpose =
            document.getElementById("purpose").value;

        const details =
            document.getElementById("details").value;

        const tone =
            document.getElementById("tone").value;

        if (!purpose || !details) {

            alert("Please fill all fields");

            return;
        }

        document.getElementById("output")
            .textContent =
            "Generating Email...";

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
                .getElementById("output")
                .textContent =
                data.error;

            return;
        }

        document
            .getElementById("output")
            .textContent =
            data.email;

    }

    catch (error) {

        document
            .getElementById("output")
            .textContent =
            error;
    }
}


function copyEmail() {

    const text =
        document
            .getElementById("output")
            .textContent;

    navigator.clipboard.writeText(text);

    alert("Copied");
}


function downloadEmail() {

    const text =
        document
            .getElementById("output")
            .textContent;

    const blob =
        new Blob(
            [text],
            {
                type: "text/plain"
            }
        );

    const a =
        document.createElement("a");

    a.href =
        URL.createObjectURL(blob);

    a.download =
        "email.txt";

    a.click();
}