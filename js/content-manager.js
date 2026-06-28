// js/content-manager.js

document.addEventListener("DOMContentLoaded", () => {
    if (!window.siteConfig) return;

    const config = window.siteConfig;

    // A simple function to safely set text content or href by query selector
    function setContent(selector, value, isHref = false) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (isHref) {
                el.href = value;
            } else {
                el.innerText = value;
            }
        });
    }

    // Populate Contact Info
    setContent('[data-config="contact.address"]', config.contact.address);
    setContent('[data-config="contact.email"]', config.contact.email);
    setContent('[data-config="contact.emailLink"]', `mailto:${config.contact.email}`, true);
    setContent('[data-config="contact.phone"]', config.contact.phoneFormatted);
    setContent('[data-config="contact.phoneLink"]', `tel:${config.contact.phone.replace(/[^0-9+]/g, '')}`, true);

    // Populate Metrics
    setContent('[data-config="metrics.yearsExperience"]', config.metrics.yearsExperience);
    setContent('[data-config="metrics.projectsDelivered"]', config.metrics.projectsDelivered);
    setContent('[data-config="metrics.clientSatisfaction"]', config.metrics.clientSatisfaction);

    // Populate Socials
    setContent('[data-config="socials.facebook"]', config.socials.facebook, true);
    setContent('[data-config="socials.instagram"]', config.socials.instagram, true);
    setContent('[data-config="socials.linkedin"]', config.socials.linkedin, true);
});
