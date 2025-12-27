/**
 * Builds AI prompts for code migration
 */
class PromptBuilder {
  /**
   * Generates a prompt for code migration
   * @param {string} code - The source code to migrate
   * @param {string} target - Target language ("ES6" or "TypeScript")
   * @returns {string} - The complete prompt for the AI
   */
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

  /**
   * Generates a prompt for fixing broken migrated code
   * @param {string} code - The broken migrated code
   * @returns {string} - The prompt for fixing errors
   */
  static buildErrorFixPrompt(code) {
    return `The following migrated code contains syntax or type errors.

Fix the issues while:
- Preserving original logic
- Keeping modern ES6+ or TypeScript style
- Not introducing new functionality

Return ONLY corrected code.

BROKEN CODE:
\`\`\`
${code}
\`\`\``;
  }

  /**
   * Generates a diff-friendly prompt for minimal changes
   * @param {string} code - The source code to migrate
   * @param {string} target - Target language
   * @returns {string} - The minimal-change migration prompt
   */
  static buildMinimalChangePrompt(code, target) {
    return `Migrate the code to ${target} with MINIMAL changes.

Rules:
- Do not reformat unless required
- Keep original line order
- Keep function and variable names unchanged
- Modify only what is necessary for modernization
- Replace var with let/const
- Convert require/module.exports to import/export only

Return ONLY the code.

CODE:
\`\`\`javascript
${code}
\`\`\``;
  }
}

export default PromptBuilder;
