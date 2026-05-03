# Skill: Audit Code

Act as the QA Engineer. Perform a rigorous audit on the generated code:
1. **Security:** Check if API keys are exposed or if `dangerouslySetInnerHTML` is used without sanitization.
2. **Accessibility:** Verify all buttons have `aria-labels` and colors meet WCAG contrast ratios.
3. **Logic:** Ensure election dates are parsed correctly using a library like `date-fns` to avoid timezone errors.
4. **Performance:** Check for unnecessary re-renders in the interactive timeline.
