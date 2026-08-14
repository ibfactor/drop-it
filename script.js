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


function processValues() {
	const v1 = document.querySelector("textarea").value;
	const v2 = document.getElementById("main_file").value;
	if (!v2) {
		try {
			const json = JSON.parse(v1);

			document.getElementById("input_t").innerText = v1;

			document.getElementById("jsonQR").addEventListener("click", jsonQR);
			document.getElementById("jsonMinify").addEventListener("click", jsonMinify);
			document.getElementById("jsonPrettify").addEventListener("click", jsonPrettify);
		}
		catch (err) {
			console.log("Not JSON");
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

document.getElementById("main_file").addEventListener("change", processFile);
document.querySelector("textarea").addEventListener("paste", processFile);

processFile();

document.querySelectorAll(".close").forEach((el) => {
	el.addEventListener("click", () => {
		el.parentElement.classList.remove("visible");
	});
});