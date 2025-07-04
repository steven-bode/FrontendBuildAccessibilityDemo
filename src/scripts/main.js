/**
 * Hauptskript für barrierefreie Formularvalidierung
 * Implementiert clientseitige Validierung mit WCAG-konformen Fehlermeldungen
 */

(function() {
    'use strict';
    const form = document.querySelector('.form');
    const inputs = form.querySelectorAll('input, textarea');
    const submitButton = form.querySelector('button[type="submit"]');
    const successAlert = document.getElementById('form-success');
    const errorAlert = document.getElementById('form-error');

    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            message: 'Bitte geben Sie Ihren Namen ein (mindestens 2 Zeichen).'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
        },
        subject: {
            required: true,
            minLength: 3,
            message: 'Bitte geben Sie einen Betreff ein (mindestens 3 Zeichen).'
        },
        message: {
            required: true,
            minLength: 10,
            message: 'Bitte geben Sie Ihre Nachricht ein (mindestens 10 Zeichen).'
        }
    };

    function init() {
        if (!form) return;

        form.addEventListener('submit', handleSubmit);
        form.addEventListener('reset', handleReset);

        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });

        console.log('Formularvalidierung initialisiert');
    }

    /**
     * Validiert ein einzelnes Feld
     * @param {HTMLElement} field - Das zu validierende Feld
     * @returns {boolean} - True wenn gültig
     */

    function validateField(field) {
        const fieldName = field.name;
        const rules = validationRules[fieldName];
        const value = field.value.trim();
        
        if (!rules) return true;

        if (rules.required && !value) {
            showFieldError(field, rules.message);
            return false;
        }

        if (rules.minLength && value.length < rules.minLength) {
            showFieldError(field, rules.message);
            return false;
        }

        if (rules.pattern && value && !rules.pattern.test(value)) {
            showFieldError(field, rules.message);
            return false;
        }

        showFieldSuccess(field);
        return true;
    }

    /**
     * Zeigt Fehlermeldung für ein Feld an
     * @param {HTMLElement} field - Das Feld mit Fehler
     * @param {string} message - Die Fehlermeldung
     */

    function showFieldError(field, message) {
        const errorElement = document.getElementById(field.name + '-error');
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('form__error--hidden');
        }
        
        field.classList.add('form__input--error');
        field.classList.remove('form__input--success');
        field.setAttribute('aria-invalid', 'true');
    }

    function showFieldSuccess(field) {
        const errorElement = document.getElementById(field.name + '-error');
        
        if (errorElement) {
            errorElement.classList.add('form__error--hidden');
        }
        
        field.classList.remove('form__input--error');
        field.classList.add('form__input--success');
        field.setAttribute('aria-invalid', 'false');
    }

    /**
     * Entfernt Fehlermeldung während der Eingabe
     * @param {HTMLElement} field - Das Feld
     */
    function clearFieldError(field) {
        const errorElement = document.getElementById(field.name + '-error');
        
        if (errorElement && !errorElement.classList.contains('form__error--hidden')) {
            field.classList.remove('form__input--error');
            field.removeAttribute('aria-invalid');
        }
    }

    /**
     * Behandelt das Absenden des Formulars
     * @param {Event} event - Das Submit-Event
     */
    function handleSubmit(event) {
        event.preventDefault();
        
        let isFormValid = true;
        hideAlerts();

        // Felder validieren
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            showSuccessMessage();
            form.reset();
            
            // Fokus auf Erfolgsmel dung setzen für Screenreader
            successAlert.focus();
        } else {
            showErrorMessage();
            
            const firstError = form.querySelector('.form__input--error');
            if (firstError) {
                firstError.focus();
            }
        }
    }

    /**
     * Behandelt das Zurücksetzen des Formulars
     * @param {Event} event - Das Reset-Event
     */
    function handleReset(event) {
        // Kleine Verzögerung, damit das Reset wirksam wird
        setTimeout(() => {
            inputs.forEach(input => {
                input.classList.remove('form__input--error', 'form__input--success');
                input.removeAttribute('aria-invalid');
                
                const errorElement = document.getElementById(input.name + '-error');
                if (errorElement) {
                    errorElement.classList.add('form__error--hidden');
                }
            });
            
            hideAlerts();
        }, 10);
    }


    function showSuccessMessage() {
        successAlert.classList.remove('alert--hidden');
        errorAlert.classList.add('alert--hidden');
    }

    function showErrorMessage() {
        errorAlert.classList.remove('alert--hidden');
        successAlert.classList.add('alert--hidden');
    }


    function hideAlerts() {
        successAlert.classList.add('alert--hidden');
        errorAlert.classList.add('alert--hidden');
    }

    /**
     * Smooth Scroll für interne Links (Accessibility-Feature)
     */
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (event) => {
                const target = document.querySelector(link.getAttribute('href'));
                
                if (target) {
                    event.preventDefault();
                    
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Fokus setzen für Screenreader
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            });
        });
    }

    function initKeyboardNavigation() {
        // Escape-Taste schließt Fehlermeldungen
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                hideAlerts();
            }
        });
    }

    // Initialisierung ausführen, wenn DOM geladen ist
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init();
            initSmoothScroll();
            initKeyboardNavigation();
        });
    } else {
        init();
        initSmoothScroll();
        initKeyboardNavigation();
    }

})(); 