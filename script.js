async function jsonQR() {
	document.getElementById("qr").classList.add("visible");

    const canvas = document.querySelector("canvas");
    await QRCode.toCanvas(canvas, document.querySelector("pre").innerText, {
        width: 400,
        margin: 2
    });
}
function jsonMinify() {
	document.querySelector("pre").innerText = JSON.stringify(JSON.parse(document.querySelector("pre").innerText));
}
function jsonPrettify() {
	document.querySelector("pre").innerText = JSON.stringify(JSON.parse(document.querySelector("pre").innerText), null, 2);
}
function jsonVisualise() {
	const jsonCrackEmbed = document.querySelector("iframe");

	const json = document.querySelector("pre").innerText;
	const options = {
		theme: "dark",
		direction: "RIGHT",
	};

	jsonCrackEmbed.contentWindow.postMessage({
		json,
		options
	}, "*");

	document.getElementById("visualise").classList.add("visible");
}
function jsonConvert() {
	if (document.getElementById("JSONConvertTo").value == "XML") {

		const xml = json2xml(JSON.parse(document.querySelector("pre").innerText), {
		  compact: true
		});

		const blob = new Blob([xml], { type: "application/xml" });
   		const url = URL.createObjectURL(blob);

		downloadFile("output.xml", url);

	}
	if (document.getElementById("JSONConvertTo").value == "YAML") {
		const yaml = stringify({
		  "title": "Lorem Ipsum Dolor",
		  "status": "success",
		  "code": 200,
		  "data": {
		    "header": "Lorem ipsum dolor sit amet",
		    "paragraphs": [
		      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
		    ]
		  }
		});

		const blob = new Blob([yaml], { type: "application/yaml" });
   		const url = URL.createObjectURL(blob);

		downloadFile("output.yaml", url);
	}

	document.querySelector("#jsonConversion").classList.remove("visible");
}

async function processValues() {
	const v1 = document.querySelector("textarea").value;
	const v2 = document.getElementById("main_file").value;
	if (!v2) {
		try {
			const json = JSON.parse(v1);

			document.getElementById("input_t").innerText = v1;

			document.getElementById("jsonQR").addEventListener("click", jsonQR);
			document.getElementById("jsonMinify").addEventListener("click", jsonMinify);
			document.getElementById("jsonPrettify").addEventListener("click", jsonPrettify);
			document.getElementById("jsonVisualise").addEventListener("click", jsonVisualise);
			document.getElementById("jsonConvert2").addEventListener("click", jsonConvert);
			document.getElementById("jsonConvert").addEventListener("click", () => {
				document.querySelector("#jsonConversion").classList.add("visible");
			});
		}
		catch (err) {
			console.log("Not JSON");
		}
	}
	else {
		if (v2.split(".").pop().toLowerCase() == "json") {
			try {

				const v2c = await document.getElementById("main_file").files[0].text();

				const json = JSON.parse(v2c);

				document.getElementById("input_t").innerText = v2c;

				document.getElementById("jsonQR").addEventListener("click", jsonQR);
				document.getElementById("jsonMinify").addEventListener("click", jsonMinify);
				document.getElementById("jsonPrettify").addEventListener("click", jsonPrettify);
				document.getElementById("jsonVisualise").addEventListener("click", jsonVisualise);
				document.getElementById("jsonConvert2").addEventListener("click", jsonConvert);
				document.getElementById("jsonConvert").addEventListener("click", () => {
					document.querySelector("#jsonConversion").classList.add("visible");
				});

			}
			catch (err) {
				console.log("Not JSON");
			}
		}
	}
}

function processFile() {
	document.getElementById("view2").classList.add("visible");
	setTimeout(() => {
		document.getElementById("loader").style.display = "none";
		processValues();
	}, 1000);
}

function downloadFile(fname, furl) {
	var link = document.createElement("a");
	link.setAttribute("download", fname)
	document.body.appendChild(link);
	link.href = furl;
	link.click();
}

document.getElementById("main_file").addEventListener("change", processFile);
document.querySelector("textarea").addEventListener("paste", processFile);

document.querySelectorAll(".close").forEach((el) => {
	el.addEventListener("click", () => {
		el.parentElement.classList.remove("visible");
	});
});
