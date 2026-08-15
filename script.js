


function showExif() {
	document.getElementById("exif_data").classList.toggle("visible");
}

async function convertWEBP() {
	const img = new Image();
	img.src = document.querySelector("img").src;
	await img.decode();

	document.querySelector("canvas").width = img.naturalWidth;
	document.querySelector("canvas").height = img.naturalHeight;

	const ctx = document.querySelector("canvas").getContext("2d");
	ctx.drawImage(img, 0, 0);

	if (document.getElementById("WEBPConvertTo").value == "PNG") {
		const blob = await new Promise(resolve =>
			document.querySelector("canvas").toBlob(resolve, "image/png")
		);
		const url = URL.createObjectURL(blob);
		downloadFile("output.png", url);
	}
	else {
		const blob = await new Promise(resolve =>
			document.querySelector("canvas").toBlob(resolve, "image/jpeg", 1.0)
		);
		const url = URL.createObjectURL(blob);
		downloadFile("output.jpg", url);
	}
}
async function compressWEBP() {
	const img = new Image();
	img.src = document.querySelector("img").src;
	await img.decode();

	document.querySelector("canvas").width = img.naturalWidth;
	document.querySelector("canvas").height = img.naturalHeight;

	const ctx = document.querySelector("canvas").getContext("2d");
	ctx.drawImage(img, 0, 0);
	const imageData = ctx.getImageData(0, 0, document.querySelector("canvas").width, document.querySelector("canvas").height);

	const blob = await new Promise(resolve => document.querySelector("canvas").toBlob(resolve, "image/webp", 0.82));
	const url = URL.createObjectURL(blob);
	downloadFile("output.webp", url);
}
async function resizeWEBP() {
	document.getElementById("webp_resize").classList.add("visible");
	document.getElementById("imgwidth3").outerHTML = document.getElementById("imgwidth3").outerHTML;
	document.getElementById("imgheight3").outerHTML = document.getElementById("imgheight3").outerHTML;

	const img = new Image();
	img.src = document.querySelector("img").src;
	await img.decode();

	var canvas = document.querySelectorAll("canvas")[3];
	var ctx = canvas.getContext("2d");

	document.getElementById("imgwidth3").value = img.width;
	document.getElementById("imgheight3").value = img.height;

	canvas.width = document.getElementById("imgwidth3").value;
	canvas.height = document.getElementById("imgheight3").value;
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

	document.getElementById("imgwidth3").addEventListener("keyup", () => {
		if (document.getElementById("preserve_ar3").checked) {
			document.getElementById("imgheight3").value = (img.height / img.width) * document.getElementById("imgwidth3").value;
		}
		canvas.width = document.getElementById("imgwidth3").value;
		canvas.height = document.getElementById("imgheight3").value;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	});
	document.getElementById("imgheight3").addEventListener("keyup", () => {
		if (document.getElementById("preserve_ar3").checked) {
			document.getElementById("imgwidth3").value = (img.width / img.height) * document.getElementById("imgheight3").value;
		}
		canvas.width = document.getElementById("imgwidth3").value;
		canvas.height = document.getElementById("imgheight3").value;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	});
}


async function resizeJPG() {
	document.getElementById("jpg_resize").classList.add("visible");
	document.getElementById("imgwidth2").outerHTML = document.getElementById("imgwidth2").outerHTML;
	document.getElementById("imgheight2").outerHTML = document.getElementById("imgheight2").outerHTML;

	const img = new Image();
	img.src = document.querySelector("img").src;
	await img.decode();

	var canvas = document.querySelectorAll("canvas")[2];
	var ctx = canvas.getContext("2d");

	document.getElementById("imgwidth2").value = img.width;
	document.getElementById("imgheight2").value = img.height;

	canvas.width = document.getElementById("imgwidth2").value;
	canvas.height = document.getElementById("imgheight2").value;
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

	document.getElementById("imgwidth2").addEventListener("keyup", () => {
		if (document.getElementById("preserve_ar2").checked) {
			document.getElementById("imgheight2").value = (img.height / img.width) * document.getElementById("imgwidth2").value;
		}
		canvas.width = document.getElementById("imgwidth2").value;
		canvas.height = document.getElementById("imgheight2").value;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	});
	document.getElementById("imgheight2").addEventListener("keyup", () => {
		if (document.getElementById("preserve_ar2").checked) {
			document.getElementById("imgwidth2").value = (img.width / img.height) * document.getElementById("imgheight2").value;
		}
		canvas.width = document.getElementById("imgwidth2").value;
		canvas.height = document.getElementById("imgheight2").value;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	});
}
async function compressJPG() {
	const img = new Image();
	img.src = document.querySelector("img").src;
	await img.decode();

	document.querySelector("canvas").width = img.naturalWidth;
	document.querySelector("canvas").height = img.naturalHeight;

	const ctx = document.querySelector("canvas").getContext("2d");
	ctx.drawImage(img, 0, 0);
	const imageData = ctx.getImageData(0, 0, document.querySelector("canvas").width, document.querySelector("canvas").height);

	const blob = await new Promise(resolve => document.querySelector("canvas").toBlob(resolve, "image/jpeg", 0.7));
	const url = URL.createObjectURL(blob);
	downloadFile("output.jpg", url);
}
async function convertJPG() {
	const img = new Image();
	img.src = document.querySelector("img").src;
	await img.decode();

	document.querySelector("canvas").width = img.naturalWidth;
	document.querySelector("canvas").height = img.naturalHeight;

	const ctx = document.querySelector("canvas").getContext("2d");
	ctx.drawImage(img, 0, 0);

	if (document.getElementById("JPGConvertTo").value == "PNG") {
		const blob = await new Promise(resolve =>
			document.querySelector("canvas").toBlob(resolve, "image/png")
		);
		const url = URL.createObjectURL(blob);
		downloadFile("output.png", url);
	}
	else {
		const blob = await new Promise(resolve =>
			document.querySelector("canvas").toBlob(resolve, "image/webp", 1.0)
		);
		const url = URL.createObjectURL(blob);
		downloadFile("output.webp", url);
	}
}


function cropImage(x, y, width, height) {
    const img = document.querySelector("img");

    document.querySelector("canvas").width = Math.round(width);
    document.querySelector("canvas").height = Math.round(height);
    const ctx = document.querySelector("canvas").getContext("2d");

    ctx.drawImage(img, Math.round(x), Math.round(y), Math.round(width), Math.round(height), 0, 0, Math.round(width), Math.round(height));

    document.querySelector("canvas").toBlob(blob => {
    	console.log(blob);
        downloadFile("output.png", URL.createObjectURL(blob));
    }, "image/png");
}
async function convertPNG() {
	const img = new Image();
	img.src = document.querySelector("img").src;
	await img.decode();

	document.querySelector("canvas").width = img.naturalWidth;
	document.querySelector("canvas").height = img.naturalHeight;

	const ctx = document.querySelector("canvas").getContext("2d");
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, document.querySelector("canvas").width, document.querySelector("canvas").height);
	ctx.drawImage(img, 0, 0);

	if (document.getElementById("PNGConvertTo").value == "JPEG") {
		const blob = await new Promise(resolve =>
			document.querySelector("canvas").toBlob(resolve, "image/jpeg", 1.0)
		);
		const url = URL.createObjectURL(blob);
		downloadFile("output.jpg", url);
	}
	else {
		const blob = await new Promise(resolve =>
			document.querySelector("canvas").toBlob(resolve, "image/webp", 1.0)
		);
		const url = URL.createObjectURL(blob);
		downloadFile("output.webp", url);
	}
}
async function compressPNG() {
	const img = new Image();
	img.src = document.querySelector("img").src;
	await img.decode();

	document.querySelector("canvas").width = img.naturalWidth;
	document.querySelector("canvas").height = img.naturalHeight;

	const ctx = document.querySelector("canvas").getContext("2d");
	ctx.drawImage(img, 0, 0);
	const imageData = ctx.getImageData(0, 0, document.querySelector("canvas").width, document.querySelector("canvas").height);
	const png = UPNG.encode([imageData.data.buffer], document.querySelector("canvas").width, document.querySelector("canvas").height, 0);

	const blob = new Blob([png], { type: "image/png" });
	const url = URL.createObjectURL(blob);
	downloadFile("output.png", url);
}
async function resizePNG() {
	document.getElementById("png_resize").classList.add("visible");
	document.getElementById("imgwidth").outerHTML = document.getElementById("imgwidth").outerHTML;
	document.getElementById("imgheight").outerHTML = document.getElementById("imgheight").outerHTML;

	const img = new Image();
	img.src = document.querySelector("img").src;
	await img.decode();

	var canvas = document.querySelectorAll("canvas")[1];
	var ctx = canvas.getContext("2d");

	document.getElementById("imgwidth").value = img.width;
	document.getElementById("imgheight").value = img.height;

	canvas.width = document.getElementById("imgwidth").value;
	canvas.height = document.getElementById("imgheight").value;
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

	document.getElementById("imgwidth").addEventListener("keyup", () => {
		if (document.getElementById("preserve_ar").checked) {
			document.getElementById("imgheight").value = (img.height / img.width) * document.getElementById("imgwidth").value;
		}
		canvas.width = document.getElementById("imgwidth").value;
		canvas.height = document.getElementById("imgheight").value;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	});
	document.getElementById("imgheight").addEventListener("keyup", () => {
		if (document.getElementById("preserve_ar").checked) {
			document.getElementById("imgwidth").value = (img.width / img.height) * document.getElementById("imgheight").value;
		}
		canvas.width = document.getElementById("imgwidth").value;
		canvas.height = document.getElementById("imgheight").value;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	});
}
function cropImg() {
	const rsz = document.querySelector("#rsz");
	const img = document.querySelector("img");

	const rect = rsz.getBoundingClientRect();
	const box = img.getBoundingClientRect();

	const scale = Math.min(
	    box.width / img.naturalWidth,
	    box.height / img.naturalHeight
	);

	const imgWidth = img.naturalWidth * scale;
	const imgHeight = img.naturalHeight * scale;

	const imgRect = {
	    left: box.left + (box.width - imgWidth) / 2,
	    top: box.top + (box.height - imgHeight) / 2,
	};

	cropImage((rect.left - imgRect.left) / scale, (rect.top - imgRect.top) / scale, rect.width / scale, rect.height / scale);
}

const TRACKING_PARAMS = [
  // UTM
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "utm_source_platform",
  "utm_creative_format",
  "utm_marketing_tactic",

  // Google
  "gclid",
  "dclid",
  "gbraid",
  "wbraid",
  "gclsrc",
  "gad_source",
  "gad_campaignid",

  // Meta / Facebook / Instagram
  "fbclid",
  "fb_action_ids",
  "fb_action_types",
  "fb_source",
  "fb_ref",
  "fbc",
  "fbp",
  "igshid",
  "igsh",

  // Microsoft / Bing
  "msclkid",

  // TikTok
  "ttclid",

  // Twitter / X
  "twclid",

  // LinkedIn
  "li_fat_id",
  "liap",
  "lipi",

  // Pinterest
  "epik",

  // Yandex
  "yclid",
  "ymclid",

  // Mailchimp
  "mc_cid",
  "mc_eid",

  // Adobe / marketing
  "mkt_tok",

  // Generic tracking
  "ref",
  "ref_src",
  "referrer",
  "referer",
  "source",
  "src",
  "campaign",
  "campaign_id",
  "campaignid",
  "ad_id",
  "adid",
  "adset_id",
  "adsetid",
  "creative_id",
  "creativeid",
  "placement_id",
  "click_id",
  "clickid",
  "click_token",
  "tracking_id",
  "trackingid",
  "track",
  "tracking",
  "trk",
  "trk_id",

  // Affiliate
  "aff_id",
  "affid",
  "affiliate",
  "affiliate_id",
  "affiliateid",
  "partner_id",
  "ref_id",
  "refid"
];
async function urlQR() {
	document.getElementById("qr").classList.add("visible");

    const canvas = document.querySelector("canvas");
    await QRCode.toCanvas(canvas, document.querySelector("pre").innerText, {
        width: 400,
        margin: 2
    });
}
function cleanURL() {
	const urls = document.querySelector("pre").innerText;
	var clean_urls = "";
	urls.split("\n").forEach((url) => {
		if (url.includes("?")) {
		    var cleanURL = `${url.split("?")[0]}?`;
		    url.split("?")[1].split("&").forEach((item) => {
		        if (TRACKING_PARAMS.includes(item.split("=")[0].toLowerCase())) return;
		        cleanURL += item + "&";
		    });
		    cleanURL = cleanURL.trim("&");
		}
		else {
			var cleanURL = url;
		}

		clean_urls += cleanURL + "\n";
	});
	document.querySelector("pre").innerText = clean_urls.trim("\n");
}
async function shortenURL() {
	const urls = document.querySelector("pre").innerText.split("\n");
	var shortened = [];
	for (var i = urls.length - 1; i >= 0; i--) {
		if (!urls[i].startsWith("http")) continue;
		const f1 = await fetch("https://zip1.io/api/create", {
		  method: "POST",
		  headers: {
		    "Content-Type": "application/json"
		  },
		  body: JSON.stringify({
		    "url": urls[i],
		  })
		});
		const f2 = await f1.json();
		shortened.push(f2.short_url);
	}
	document.querySelector("pre").innerText = "";
	shortened.forEach((item) => {
		document.querySelector("pre").innerText += item + "\n";
	});
}

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

			document.getElementById("jsonActions").style.display = "block";

			document.getElementById("input_t").innerText = v1;

			document.getElementById("jsonQR").addEventListener("click", jsonQR);
			document.getElementById("jsonMinify").addEventListener("click", jsonMinify);
			document.getElementById("jsonPrettify").addEventListener("click", jsonPrettify);
			document.getElementById("jsonVisualise").addEventListener("click", jsonVisualise);
			document.getElementById("jsonConvert2").addEventListener("click", jsonConvert);
			document.getElementById("jsonConvert").addEventListener("click", () => {
				document.querySelector("#jsonConversion").classList.add("visible");
			});
			return;
		}
		catch (err) {
			console.log("Not JSON");
		}

		if (v1.startsWith("https://") || v1.startsWith("http://")) {
			document.getElementById("input_t").innerText = v1;
			document.getElementById("urlActions").style.display = "block";
			document.getElementById("urlQR").addEventListener("click", urlQR);
			document.getElementById("urlClean").addEventListener("click", cleanURL);
			document.getElementById("urlShorten").addEventListener("click", shortenURL);
		}
	}
	else {
		const file_ext = v2.split(".").pop().toLowerCase();

		if (file_ext == "json") {
			try {

				const v2c = await document.getElementById("main_file").files[0].text();

				const json = JSON.parse(v2c);

				document.getElementById("input_t").innerText = v2c;

				document.getElementById("jsonActions").style.display = "block";

				document.getElementById("jsonQR").addEventListener("click", jsonQR);
				document.getElementById("jsonMinify").addEventListener("click", jsonMinify);
				document.getElementById("jsonPrettify").addEventListener("click", jsonPrettify);
				document.getElementById("jsonVisualise").addEventListener("click", jsonVisualise);
				document.getElementById("jsonConvert2").addEventListener("click", jsonConvert);
				document.getElementById("jsonConvert").addEventListener("click", () => {
					document.querySelector("#jsonConversion").classList.add("visible");
				});
				return;

			}
			catch (err) {
				console.log("Not JSON");
			}
		}
		else if (file_ext == "png") {
			const v2c = await document.getElementById("main_file").files[0];
			document.querySelector("pre").innerHTML = `<img src="${URL.createObjectURL(v2c)}"><div id="crop"><div id="overlayc"></div><div id="rsz"></div></div><button id="exif"><i class="fas fa-info"></i></button>`;
			
			const tags = JSON.stringify(await ExifReader.load(await document.getElementById("main_file").files[0]), null, 8);
			document.getElementById("exift").value = tags;
			document.getElementById("exif").addEventListener("click", showExif);

			document.getElementById("pngActions").style.display = "block";
			document.getElementById("pngCompress").addEventListener("click", compressPNG);
			document.getElementById("pngResize").addEventListener("click", resizePNG);
			document.getElementById("pngCrop").addEventListener("click", cropImg);

			document.getElementById("pngConvert2").addEventListener("click", convertPNG);
			document.getElementById("pngConvert").addEventListener("click", () => {
				document.querySelector("#pngConversion").classList.add("visible");
			});


			document.querySelector("#rsz").addEventListener("mousedown", function(e) {

				const rect = document.querySelector("#rsz").getBoundingClientRect();
			    const onResizeHandle =
			        e.clientX >= rect.right - 10 &&
			        e.clientY >= rect.bottom - 10;

			    if (onResizeHandle) return;

			    document.onmousemove = function(e) {
			        document.querySelector("#rsz").style.left = (e.clientX - 30 - (document.querySelector("#rsz").offsetWidth / 2)) + "px";
			        document.querySelector("#rsz").style.top = (e.clientY - 30 - (document.querySelector("#rsz").offsetHeight / 2)) + "px";
			    };
			});

			document.addEventListener("mouseup", function() {
			    document.onmousemove = null;
			});

		}
		else if (file_ext == "jpg" || file_ext == "jpeg") {
			const v2c = await document.getElementById("main_file").files[0];
			document.querySelector("pre").innerHTML = `<img src="${URL.createObjectURL(v2c)}"><div id="crop"><div id="overlayc"></div><div id="rsz"></div></div><button id="exif"><i class="fas fa-info"></i></button>`;
			
			const tags = JSON.stringify(await ExifReader.load(await document.getElementById("main_file").files[0]), null, 8);
			document.getElementById("exift").value = tags;
			document.getElementById("exif").addEventListener("click", showExif);

			document.getElementById("jpegActions").style.display = "block";

			document.getElementById("jpgResize").addEventListener("click", resizeJPG);
			document.getElementById("jpgCompress").addEventListener("click", compressJPG);
		
			document.querySelector("#rsz").addEventListener("mousedown", function(e) {

				const rect = document.querySelector("#rsz").getBoundingClientRect();
			    const onResizeHandle =
			        e.clientX >= rect.right - 10 &&
			        e.clientY >= rect.bottom - 10;

			    if (onResizeHandle) return;

			    document.onmousemove = function(e) {
			        document.querySelector("#rsz").style.left = (e.clientX - 30 - (document.querySelector("#rsz").offsetWidth / 2)) + "px";
			        document.querySelector("#rsz").style.top = (e.clientY - 30 - (document.querySelector("#rsz").offsetHeight / 2)) + "px";
			    };
			});

			document.addEventListener("mouseup", function() {
			    document.onmousemove = null;
			});

			document.getElementById("jpgCrop").addEventListener("click", cropImg);

			document.getElementById("jpgConvert2").addEventListener("click", convertJPG);
			document.getElementById("jpgConvert").addEventListener("click", () => {
				document.querySelector("#jpgConversion").classList.add("visible");
			});

		}
		else if (file_ext == "webp") {
			const v2c = await document.getElementById("main_file").files[0];
			document.querySelector("pre").innerHTML = `<img src="${URL.createObjectURL(v2c)}"><div id="crop"><div id="overlayc"></div><div id="rsz"></div></div><button id="exif"><i class="fas fa-info"></i></button>`;
			
			const tags = JSON.stringify(await ExifReader.load(await document.getElementById("main_file").files[0]), null, 8);
			document.getElementById("exift").value = tags;
			document.getElementById("exif").addEventListener("click", showExif);

			document.getElementById("webpActions").style.display = "block";

			document.getElementById("webpResize").addEventListener("click", resizeWEBP);
			document.getElementById("webpCompress").addEventListener("click", compressWEBP);
		
			document.querySelector("#rsz").addEventListener("mousedown", function(e) {

				const rect = document.querySelector("#rsz").getBoundingClientRect();
			    const onResizeHandle =
			        e.clientX >= rect.right - 10 &&
			        e.clientY >= rect.bottom - 10;

			    if (onResizeHandle) return;

			    document.onmousemove = function(e) {
			        document.querySelector("#rsz").style.left = (e.clientX - 30 - (document.querySelector("#rsz").offsetWidth / 2)) + "px";
			        document.querySelector("#rsz").style.top = (e.clientY - 30 - (document.querySelector("#rsz").offsetHeight / 2)) + "px";
			    };
			});

			document.addEventListener("mouseup", function() {
			    document.onmousemove = null;
			});

			document.getElementById("webpCrop").addEventListener("click", cropImg);

			document.getElementById("webpConvert2").addEventListener("click", convertWEBP);
			document.getElementById("webpConvert").addEventListener("click", () => {
				document.querySelector("#webpConversion").classList.add("visible");
			});

		}
		else if (file_ext == "mp4") {
			const v2c = await document.getElementById("main_file").files[0];
			document.querySelector("pre").innerHTML = `<video src="${URL.createObjectURL(v2c)}" controls></video>`;
			document.getElementById("mp4Actions").style.display = "block";
		}
		else {
			const v2c = await document.getElementById("main_file").files[0].text();
			if (v2c.startsWith("https://") || v2c.startsWith("http://")) {
				document.getElementById("input_t").innerText = v2c;
				document.getElementById("urlActions").style.display = "block";
				document.getElementById("urlQR").addEventListener("click", urlQR);
				document.getElementById("urlClean").addEventListener("click", cleanURL);
				document.getElementById("urlShorten").addEventListener("click", shortenURL);
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
