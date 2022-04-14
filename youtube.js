window.onload = () => {
	setTimeout(() => {
		let container = document.querySelectorAll(
            "#info h1.ytd-video-primary-info-renderer"
		)[0];

		let btn = document.createElement("button");
		btn.id = "downloadVideo";
		btn.setAttribute("role", "button");
		btn.innerText = "PLEASE WORK";

		container.appendChild(btn);
		// console.log("Download button appended");
	}, 5000)
}