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
