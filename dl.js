function handle () {
	document.body.removeEventListener("click", handle);
	const client = new WebTorrent();
	
	client.on('error', err => {
        console.error('ERROR: ' + err.message)
    });


	client.add("magnet:" + location.href.split("/dl")[1], torrent => {
		document.getElementById("dle").innerText = "Client is downloading: " + torrent.infoHash;


		torrent.on('done', function () {
			const file = torrent.files[0]
			file.getBlobURL(function (err, url) {
				const a = document.createElement('a')
				a.download = file.name
				a.href = url
				document.body.appendChild(a);
				a.click();
			})
		})

	});
}
document.body.addEventListener("click", handle);