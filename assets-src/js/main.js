import {cardEnhancement} from "./main/cards.js";
import {collapsibles} from "./main/collapsibles.js";
import {disclosureWidget} from "./main/disclosure-widget.js";
import {formErrorSummary} from "./main/form-error-summary.js";
import {navDoubleLevel} from "./main/nav-double-level.js";

function domLoadedActions() {
	cardEnhancement();
	collapsibles();
	disclosureWidget();
	formErrorSummary();

	/* Create a navDoubleLevel object and initiate double-level navigation */
	const navExampleDoubleSimple = document.querySelector('[data-component="nav-double"]');

	if (navExampleDoubleSimple) {
		let siteNav = new navDoubleLevel(navExampleDoubleSimple,{});
		siteNav.init();
	}
}

if (document.readyState === 'loading') {
	// Loading hasn't finished yet
	document.addEventListener('DOMContentLoaded', domLoadedActions);
} else {
	// `DOMContentLoaded` has already fired
	domLoadedActions();
}
