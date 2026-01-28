document.addEventListener("DOMContentLoaded", () => {
	const target = document.getElementById("typewriter");
	if (!target) return;

	const words = ["Data Analyst", "Web Development", "Data Structure and Algorithms", "Machine Learning"];
	let wordIndex = 0;
	let charIndex = 0;
	let isDeleting = false;

	const typeSpeed = 90;
	const deleteSpeed = 50;
	const pauseAfterType = 1200;
	const pauseAfterDelete = 300;

	const tick = () => {
		const currentWord = words[wordIndex];

		if (isDeleting) {
			charIndex--;
		} else {
			charIndex++;
		}

		const nextText = currentWord.substring(0, charIndex);
		target.textContent = nextText.length === 0 ? "\u00A0" : nextText;

		if (!isDeleting && charIndex === currentWord.length) {
			isDeleting = true;
			setTimeout(tick, pauseAfterType);
			return;
		}

		if (isDeleting && charIndex === 0) {
			isDeleting = false;
			wordIndex = (wordIndex + 1) % words.length;
			setTimeout(tick, pauseAfterDelete);
			return;
		}

		setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed);
	};

	tick();
});

document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("contact-form");
	const toast = document.getElementById("toast");
	if (!form || !toast || typeof emailjs === "undefined") return;

	const serviceId = "service_x2q8ngm";
	const ownerTemplateId = "template_htgb8lr";
	const replyTemplateId = "template_z0qb1vm";
	const publicKey = "yKnngsumtmPCVIZ2L";

	emailjs.init({ publicKey });

	let toastTimer;
	const showToast = (message, type = "success") => {
		toast.textContent = message;
		toast.classList.remove("success", "error", "show");
		toast.classList.add(type, "show");
		clearTimeout(toastTimer);
		toastTimer = setTimeout(() => {
			toast.classList.remove("show");
		}, 2500);
	};

	form.addEventListener("submit", async (event) => {
		event.preventDefault();

		const formData = new FormData(form);
		const templateParams = {
			from_name: formData.get("from_name"),
			from_email: formData.get("from_email"),
			to_email: formData.get("from_email"),
			reply_to: formData.get("from_email"),
			message: formData.get("message"),
		};

		showToast("Sending...", "success");

		try {
			await emailjs.send(serviceId, ownerTemplateId, templateParams);
			await emailjs.send(serviceId, replyTemplateId, templateParams);
			showToast("Thanks! Your message has been sent.", "success");
			form.reset();
		} catch (error) {
			showToast("Sorry, something went wrong. Please try again.", "error");
		}
	});
});
