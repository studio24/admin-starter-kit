/**
 * Password toggle web component
 */

customElements.define('amplify-pw-toggle', class extends HTMLElement {
    // Instantiate the web component
    constructor() {
        // Inherit parent class properties
        super();

        // insertAfter helper function
        function insertAfter(el, referenceNode) {
            referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
        }

        let passwordInput = this.querySelector('input[type="password"]');
        let showHideBtn = this.querySelector('button[aria-controls="password-input"]');

        showHideBtn.removeAttribute('hidden');

        // Create and append a status region for updating screen readers.
        // This is injected between the input and button for a sensible reading order when
        // moving through the page content linearly:
        // [password input] -> [your password is visible/hidden] -> [show/hide password]
        const screenReaderStatusMessage = document.createElement('div');
        screenReaderStatusMessage.setAttribute('class', 'visuallyhidden');
        screenReaderStatusMessage.setAttribute('aria-live', 'polite');

        insertAfter(screenReaderStatusMessage, passwordInput);

        function setType(type) {
            if (passwordInput.type === type) return;

            passwordInput.setAttribute('type', type);

            const isHidden = type === 'password';
            showHideBtn.innerText = isHidden ? 'Show' : 'Hide';
            screenReaderStatusMessage.innerText = isHidden
                ? 'Your password is hidden'
                : 'Your password is visible';
        }

        function hide() {
            setType('password');
        }

        function show() {
            setType('text');
        }

        function toggle(event) {
            event.preventDefault();
            passwordInput.type === 'password' ? show() : hide();
        }

        showHideBtn.addEventListener('click', toggle);

        if (passwordInput.form) {
            passwordInput.form.addEventListener('submit', hide);
        }

        window.addEventListener('pageshow', (event) => {
            if (event.persisted && passwordInput.type !== 'password') {
                hide();
            }
        })

        hide(); // Default to hidden
    }
});