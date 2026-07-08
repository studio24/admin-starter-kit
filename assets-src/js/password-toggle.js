/**
 * Password toggle web component
 */

customElements.define('amplify-pw-toggle', class extends HTMLElement {
    // Declare private instance properties
    /** @type HTMLInputElement */ #passwordInput;
    /** @type HTMLButtonElement */ #showHideBtn;
    /** @type HTMLDivElement */ #screenReaderStatusMessage;

    /**
     * Initialize on connect
     * Checks for DOM status first, ensuring code doesn't run before required
     * elements exist in the DOM.
     */
    connectedCallback() {
        if (document.readyState !== 'loading') {
            this.init();
            return;
        }
        document.addEventListener('DOMContentLoaded', () => this.init(), {
            once: true,
        });
    }

    /**
     * Cleanup global event listeners on disconnect
     */
    disconnectedCallback() {
        this.#passwordInput.form?.removeEventListener('submit', this);
        window.removeEventListener('pageshow', this);
    }

    /**
     * Set up the component
     */
    init() {
        this.#passwordInput = this.querySelector('input[type="password"]');
        this.#showHideBtn = this.querySelector(
            'button[aria-controls="password-input"]'
        );

        this.#showHideBtn.removeAttribute('hidden');

        // Create and append a status region for updating screen readers.
        // This is injected between the input and button for a sensible reading order when
        // moving through the page content linearly:
        // [password input] -> [your password is visible/hidden] -> [show/hide password]
        this.#screenReaderStatusMessage = document.createElement('div');
        this.#screenReaderStatusMessage.setAttribute('class', 'visuallyhidden');
        this.#screenReaderStatusMessage.setAttribute('aria-live', 'polite');
        this.#insertAfter(this.#screenReaderStatusMessage, this.#passwordInput);

        // Attach event listeners
        this.#showHideBtn.addEventListener('click', this);
        this.#passwordInput.form?.addEventListener('submit', this);
        window.addEventListener('pageshow', this);

        this.#hide(); // Default to hidden
    }

    /**
     * Handle events for the web component
     * @param {Event} event
     */
    handleEvent(event) {
        if (event.type === 'click') {
            this.#toggle(event);
            return;
        }

        if (event.type === 'submit') {
            this.#hide();
            return;
        }

        if (event.type === 'pageshow') {
            if (event.persisted && this.#passwordInput.type !== 'password') {
                this.#hide();
            }
        }
    }

    /**
     * Insert an element immediately after a reference node
     * @param {Element} el - element to insert
     * @param {Element} referenceNode - node to insert after
     */
    #insertAfter(el, referenceNode) {
        referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
    }

    /**
     * Set the password input's type and update the button/status text to match
     * @param {'password' | 'text'} type
     */
    #setType(type) {
        if (this.#passwordInput.type === type) return;

        this.#passwordInput.setAttribute('type', type);

        const isHidden = type === 'password';
        this.#showHideBtn.innerText = isHidden ? 'Show' : 'Hide';
        this.#screenReaderStatusMessage.innerText = isHidden
            ? 'Your password is hidden'
            : 'Your password is visible';
    }

    /**
     * Hide the password (mask input as type="password")
     */
    #hide() {
        this.#setType('password');
    }

    /**
     * Show the password (reveal input as type="text")
     */
    #show() {
        this.#setType('text');
    }

    /**
     * Toggle the password's visibility
     * @param {MouseEvent} event
     */
    #toggle(event) {
        event.preventDefault();
        this.#passwordInput.type === 'password' ? this.#show() : this.#hide();
    }
});