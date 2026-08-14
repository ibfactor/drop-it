function processValues() {
	const v1 = document.querySelector("textarea").value;
	const v2 = document.getElementById("main_file").value;
	if (!v2) {
		try {
			const json = JSON.parse(v1);

			document.getElementById("input_t").innerText = v1;
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
