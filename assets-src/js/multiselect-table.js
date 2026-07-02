/**
 * Multiselect table web component
 */

customElements.define('amplify-table-multiselect', class extends HTMLElement {
    // Declare private instance properties
    /** @type HTMLTableElement | null */ #table;
    /** @type string */ #rowSelector;
    /** @type HTMLInputElement */ #mainCheck;

    /**
     * Initialize on connect
     * Checks DOM status first, so we don't query for elements before they exist
     */
    connectedCallback () {
        if (document.readyState !== 'loading') {
            this.#init();
            return;
        }
        document.addEventListener('DOMContentLoaded', () => this.#init(), { once: true });
    }

    /**
     * Set up the component: find the table, build the main checkbox, wire events
     */
    #init () {
        // Get the table
        this.#table = this.querySelector('table');
        if (!this.#table) return;

        // The selector used to find row checkboxes inside the table
        this.#rowSelector = this.getAttribute('row-selector') || 'td input[type="checkbox"]';

        // Build and inject the main "select all" checkbox
        this.#mainCheck = this.#createMainCheck();

        // Listen for change events on the whole component
        this.addEventListener('change', this);
    }

    /**
     * Create the main "select all" checkbox and label, insert before table
     */
    #createMainCheck () {
        let labelText = this.getAttribute('data-multiselect-label') || 'Select all';
        let id = `checkbox-table-all-${crypto.randomUUID()}`;

        let wrapper = document.createElement('div');

        let mainCheck = document.createElement('input');
        mainCheck.type = 'checkbox';
        mainCheck.id = id;

        let label = document.createElement('label');
        label.setAttribute('for', id);
        label.textContent = labelText;

        wrapper.append(mainCheck, label);
        this.prepend(wrapper);

        return mainCheck;
    }

    /**
     * Get the current row checkboxes
     */
    #getRowBoxes () {
        return Array.from(this.#table.querySelectorAll(this.#rowSelector));
    }

    /**
     * Handle events for the web component
     * @param {Event} event The Event object
     */
    handleEvent (event) {
        if (event.type === 'change') {
            this.#onChange(event);
        }
    }

    /**
     * Route a change event to the right handler
     * @param {Event} event The Event object
     */
    #onChange (event) {
        if (event.target === this.#mainCheck) {
            this.#toggleAll();
        } else if (event.target.matches(this.#rowSelector)) {
            this.#syncMainCheck();
        }
    }

    /**
     * Check or uncheck every row to match the main "select all" checkbox
     */
    #toggleAll () {
        let checked = this.#mainCheck.checked;
        for (let box of this.#getRowBoxes()) {
            box.checked = checked;
        }
        this.#dispatch();
    }

    /**
     * Update the main "select all" checkbox to reflect the current row states
     */
    #syncMainCheck () {
        let boxes = this.#getRowBoxes();
        let checkedCount = boxes.filter((box) => box.checked).length;

        if (checkedCount === 0) {
            this.#mainCheck.checked = false;
            this.#mainCheck.indeterminate = false;
        } else if (checkedCount === boxes.length) {
            this.#mainCheck.checked = true;
            this.#mainCheck.indeterminate = false;
        } else {
            this.#mainCheck.checked = false;
            this.#mainCheck.indeterminate = true;
        }

        this.#dispatch();
    }

    /**
     * Emit a selection-change event with the currently checked rows
     */
    #dispatch () {
        this.dispatchEvent(new CustomEvent('selection-change', {
            bubbles: true,
            detail: { selected: this.#getRowBoxes().filter((box) => box.checked) }
        }));
    }
});