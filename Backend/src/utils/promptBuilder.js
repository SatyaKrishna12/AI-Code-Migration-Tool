class PromptBuilder {

  static buildMigrationPrompt(code, target) {
    const prompt = `Convert the following legacy JavaScript code to ${target}.

Migration requirements:
- Preserve behavior exactly
- Use modern ES6+ syntax
- Replace var with let/const
- Convert require/module.exports to import/export
- Use arrow functions where applicable
- Remove unused code
- Ensure best practices
- Do NOT add explanations or comments unless present in original code

${target === 'TypeScript' ? `If TypeScript:
- Add precise type annotations
- Use interfaces/types when appropriate
- Avoid the 'any' type
- Infer types accurately` : ''}

Return ONLY the migrated code.

LEGACY CODE:
\`\`\`javascript
${code}
\`\`\``;

    return prompt;
  } 
}

export default PromptBuilder;
