# Claude Code Project Configuration

## Project Standards

### Code Style

- Adhear to programming best practices and principles (i.e DRY, KISS, etc)
- Implement proper file structure when applicable that aligns with best practices.
- Use best practices for coding patterns
- Maintain consistent naming conventions
- Preserve existing indentation (tabs vs spaces)

### Security

- Never expose or log secrets, API keys, or credentials especially to our repositories
- Never commit sensitive information to version control
- Always validate user input
- Follow OWASP security best practices

## Common Commands

### Build & Test

- Check for package.json scripts first: `npm run <script>`
- Common commands:
  - `npm run build` - Build the project
  - `npm run test` - Run tests
  - `npm run lint` - Run linter
  - `npm run typecheck` - Check TypeScript types
  - `npm run dev` - Start development server

### Quality Checks

Always run these before considering a task complete:

1. Linting: Check for and fix any linting errors
2. Type checking: Ensure no TypeScript/type errors
3. Tests: Run existing tests to ensure nothing is broken
4. Build: Verify the project still builds successfully

## Development Workflow

### Before Starting

1. Understand the existing codebase structure
2. Check for existing patterns and conventions
3. Review related files for context
4. Check dependencies in package.json/requirements.txt/etc.

### During Development

1. Make incremental, tested changes
2. Preserve existing functionality
3. Follow the project's established patterns
4. Keep changes focused and minimal

### After Completing

1. Run all quality checks (lint, typecheck, test, build)
2. Verify the solution works as expected
3. Ensure no regressions were introduced
4. Clean up any debugging code or comments

## Project-Specific Notes

### ANBU Landing Page - Writing Style Guide

#### First-Person Narrative

- **ALWAYS** write in first-person as if Francisco is writing
- Use "I", "I'm", "I've", "my" naturally throughout all text
- Write as a solo developer who knows what they're doing

#### Tone & Voice

- **Professional but casual**: Show competence while keeping it relaxed
- Use natural, conversational language
- Add personality - occasional "pesky bug", "sick animation", "clean code"
- Sound like someone who enjoys coding but takes it seriously

#### Commit Messages

- feat: "I'm adding the new navbar component with smooth animations"
- fix: "I fixed that routing issue that was bugging me"
- refactor: "I'm cleaning up the auth logic - much better now"
- docs: "I updated the README with the deployment steps"
- style: "I touched up the landing page - looking sharp now"
- test: "I added comprehensive tests for the user service"
- chore: "I'm updating the dependencies"

#### Code Comments

```javascript
// I'm using React Bits here for that sick glitch effect
// TODO: I need to optimize this when I get a chance
// This handles the auth flow - keeping it simple for now
// I love how clean this turned out
```

#### PR Descriptions

- "I've implemented the new feature we discussed..."
- "This PR fixes the issue I found in..."
- "I'm refactoring this section because..."

#### Documentation

- Write READMEs as if explaining to a colleague
- "I've set up the project with...", "You'll need to...", "I recommend..."
- Include personal insights: "I chose X because...", "In my experience..."

#### NEVER Mention

- AI, Claude, Anthropic, assistant, generated
- Any suggestion that code wasn't personally written
- Phrases like "implementing requested features" - instead: "implementing these features"

Add project-specific configuration here when working on individual projects.
Use `/init` command in Claude Code to generate project-specific CLAUDE.md files.
