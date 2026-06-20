const generateBtn =
document.getElementById(
    "generateBtn"
);

const loader =
document.getElementById(
    "loader"
);

const output =
document.getElementById(
    "output"
);

const copyBtn =
document.getElementById(
    "copyBtn"
);

const downloadBtn =
document.getElementById(
    "downloadBtn"
);

generateBtn.addEventListener(
    "click",
    async () => {

        const purpose =
        document.getElementById(
            "purpose"
        ).value.trim();

        const details =
        document.getElementById(
            "details"
        ).value.trim();

        const tone =
        document.getElementById(
            "tone"
        ).value;

        if(
            !purpose ||
            !details
        ){
            alert(
                "Please fill all fields"
            );
            return;
        }

        loader.classList.remove(
            "hidden"
        );

        output.textContent =
        "Generating...";

        try{

            const response =
            await fetch(
                "http://127.0.0.1:5000/generate",
                {
                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },

                    body:JSON.stringify({
                        purpose,
                        details,
                        tone
                    })
                }
            );

            const data =
            await response.json();

            if(data.error){

                output.textContent =
                data.error;

            }else{

                output.textContent =
                data.email;

            }

        }
        catch(error){

            output.textContent =
            "Unable to connect to backend.";

        }

        loader.classList.add(
            "hidden"
        );

    }
);

copyBtn.addEventListener(
    "click",
    () => {

        navigator.clipboard.writeText(
            output.textContent
        );

        alert(
            "Email copied successfully"
        );

    }
);

downloadBtn.addEventListener(
    "click",
    () => {

        const blob =
        new Blob(
            [output.textContent],
            {
                type:"text/plain"
            }
        );

        const link =
        document.createElement(
            "a"
        );

        link.href =
        URL.createObjectURL(
            blob
        );

        link.download =
        "generated_email.txt";

        link.click();

    }
);