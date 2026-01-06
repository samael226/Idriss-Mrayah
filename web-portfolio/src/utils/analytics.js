// src/utils/analytics.js
export const trackEvent = (category, action, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackPageView = (path) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'YOUR_GA_MEASUREMENT_ID', {
      page_path: path,
    });
  }
};

// Track time on page
export const trackTimeOnPage = (path, timeSpent) => {
  trackEvent('Engagement', 'time_spent', path, Math.round(timeSpent));
};

// Track achievement unlock
export const trackAchievement = (achievementId) => {
  trackEvent('Achievement', 'unlock', achievementId);
};