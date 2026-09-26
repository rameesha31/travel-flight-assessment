# Public Page Audit

## Page Audited

Travel.pk — Karachi to Dubai Flights

```text
https://travel.pk/air/flights/karachi-to-dubai
```

## Tool Used

Chrome Lighthouse

The audit was performed on the public Travel.pk page. The live website was only inspected and was not modified.

## Lighthouse Summary

| Category | Score |
|---|---:|
| Performance | 63 |
| Accessibility | 96 |

Selected performance metrics:

| Metric | Result |
|---|---:|
| First Contentful Paint (FCP) | 1.3 s |
| Largest Contentful Paint (LCP) | 3.3 s |
| Total Blocking Time (TBT) | 2,400 ms |
| Cumulative Layout Shift (CLS) | 0 |
| Speed Index | 3.2 s |

---

## Finding 1 — High Total Blocking Time

### Evidence

Lighthouse reported a **Total Blocking Time of 2,400 ms**.

This indicates that the browser's main thread is blocked for a significant amount of time while the page is loading.

### Who it hurts

Users on slower phones or lower-powered devices may experience delayed interaction. Buttons, links, and other controls may feel unresponsive while the main thread is busy.

### Severity

High

### One-line fix

Reduce long-running JavaScript tasks and split heavy work into smaller tasks so the main thread becomes available sooner.

---

## Finding 2 — Heavy Main-Thread Work

### Evidence

Lighthouse reported approximately **8.4 seconds of main-thread work**.

The report showed time being spent on areas including:

- Script evaluation
- Style and layout
- Script parsing and compilation
- Rendering
- HTML and CSS parsing

Script evaluation alone accounted for approximately **4,181 ms**.

### Who it hurts

Users on slower devices are likely to experience delayed page interaction and slower overall responsiveness.

### Severity

High

### One-line fix

Reduce the amount of JavaScript executed during initial page load and defer non-critical work until it is needed.

---

## Finding 3 — JavaScript Execution Time

### Evidence

Lighthouse reported approximately **4.2 seconds of JavaScript execution time**.

The report also showed significant CPU time being spent on first-party Travel.pk JavaScript resources.

### Who it hurts

Users on mobile or lower-powered devices may wait longer before the page becomes responsive.

### Severity

High

### One-line fix

Split large JavaScript bundles and load non-critical functionality only when required.

---

## Finding 4 — Unused JavaScript

### Evidence

Lighthouse reported approximately **75 KiB of potential savings** from reducing unused JavaScript.

The report showed approximately:

```text
Transfer size: 132.8 KiB
Estimated savings: 75.2 KiB
```

for the highlighted first-party resources.

### Who it hurts

Users on slower or limited network connections download JavaScript that is not needed for the initial experience, increasing data usage and potentially slowing page loading.

### Severity

Medium

### One-line fix

Remove unused code and use code splitting or deferred loading for JavaScript that is not required during the initial render.

---

## Finding 5 — Insufficient Color Contrast

### Evidence

The Lighthouse accessibility audit reported:

> Background and foreground colors do not have a sufficient contrast ratio.

A failing element was shown in the audit report.

### Who it hurts

Low-contrast text can be difficult to read for users with low vision, color-vision differences, or users viewing the page in difficult lighting conditions.

### Severity

Medium

### One-line fix

Increase the contrast between foreground text and its background so the affected elements meet WCAG contrast requirements.

---

## Finding 6 — Identical Links Have Different Purposes

### Evidence

Lighthouse reported:

> Identical links have the same purpose.

The audit identified a failing link element in the page navigation/breadcrumb area.

This means links that appear identical or have the same accessible description may not consistently represent the same destination or purpose.

### Who it hurts

Screen-reader and keyboard users may find navigation less predictable because links with the same description can behave differently.

### Severity

Medium

### One-line fix

Give links clear and consistent accessible names so links with the same description represent the same purpose or destination.

---

## Positive Observations

The audit also showed several positive results.

The page received an **Accessibility score of 96**, and several accessibility audits passed, including:

- ARIA attributes matching their roles
- Required ARIA attributes being present
- Valid ARIA role values
- Valid ARIA attribute values
- Buttons having accessible names
- Form elements having associated labels

The page also achieved a **Cumulative Layout Shift score of 0**, indicating good visual stability during the tested page load.

---

## Conclusion

The public Travel.pk Karachi-to-Dubai page performed strongly in the Lighthouse accessibility audit with a score of **96**, but the performance score of **56** shows opportunities for improvement.

The most significant performance concerns observed in this audit were high Total Blocking Time, heavy main-thread work, and JavaScript execution cost. Reducing unnecessary JavaScript and deferring non-critical work would likely improve responsiveness, particularly for users on slower mobile devices.

The accessibility audit was generally strong, with the main observed issue being insufficient color contrast on a failing element.