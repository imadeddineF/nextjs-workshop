import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import Highlight from "reveal.js/plugin/highlight/highlight.esm.js";

// External slides loader function
async function loadExternalSlides() {
	const sections = document.querySelectorAll("section[data-external]");
	const promises = Array.from(sections).map(async (section) => {
		const url = section.getAttribute("data-external");
		if (url) {
			try {
				const response = await fetch(url);
				const html = await response.text();

				// Create a temporary container to parse the HTML
				const temp = document.createElement("div");
				temp.innerHTML = html;

				// Find the section element in the loaded HTML
				const imported = temp.querySelector("section");
				if (imported) {
					// Copy all attributes from the original section
					Array.from(section.attributes).forEach((attr) => {
						if (attr.name !== "data-external") {
							imported.setAttribute(attr.name, attr.value);
						}
					});

					// Replace the placeholder section with the loaded content
					section.parentNode.replaceChild(imported, section);
				}
			} catch (error) {
				console.error(`Failed to load slide: ${url}`, error);
				// Keep the original section as fallback
				section.innerHTML = `<h2>Error loading slide</h2><p>Could not load: ${url}</p>`;
			}
		}
	});

	await Promise.all(promises);
}

const deck = new Reveal({
	plugins: [Markdown, Highlight],
	transition: "slide",
	slideNumber: true,
	controlsBackArrows: "faded",
	progress: true,
	center: true,
});

loadExternalSlides().then(() => {
	deck.initialize();
});
