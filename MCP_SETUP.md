# MCP Configuration Setup

## Current MCP Services

This project has the following MCP (Model Context Protocol) servers configured:

### 1. **Playwright** - Browser Automation

- Test web applications
- Automate browser interactions
- Take screenshots and recordings

### 2. **Context7** - Documentation Lookup

- Access library documentation
- Get framework references
- Find code examples

### 3. **Tavily** - Web Search

- Real-time web search capabilities
- Current information retrieval
- Research and fact-checking

### 4. **Notion** - Workspace Integration

- Access Notion databases
- Create and update pages
- Query workspace content

## Configuration Files

### `.mcp.json` (Active Configuration)

Contains the actual API keys and tokens. This file is:

- ✅ Gitignored (won't be committed)
- ✅ Contains working credentials
- ✅ Used by Claude Code

### `.mcp.json.example` (Template)

Template file for other developers. This file:

- ✅ Safe to commit to Git
- ✅ Shows required structure
- ✅ Has placeholder values

## Environment Variables

The following API keys are configured:

### In Project `.mcp.json`:

- `NOTION_TOKEN` - Your Notion integration token
- `TAVILY_API_KEY` - Tavily search API key

### In Global Claude Settings (`~/.claude/settings.json`):

All API keys are also stored globally, making them available to any Claude Code session:

- `NOTION_TOKEN`
- `TAVILY_API_KEY`
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `GROQ_API_KEY`
- `CONTEXT7_API_KEY`

### In Shell Environment (`~/.config/zshrc/10-secrets`):

All keys are exported as environment variables for use in any terminal session or application.

## Usage

1. **Restart Claude Code** in this project directory to load MCP servers
2. MCP servers will be available automatically
3. Use the respective tools as they become available in Claude

## Security Notes

- Never commit `.mcp.json` with real API keys
- Keep `.mcp.json` in `.gitignore`
- Use `.mcp.json.example` for sharing configuration structure
- API keys are stored in three places for maximum flexibility:
  1. Project-specific MCP config
  2. Global Claude settings
  3. Shell environment variables

## Adding New MCP Servers

To add a new MCP server:

1. Update `.mcp.json` with the server configuration
2. Update `.mcp.json.example` with placeholder
3. Add API key to `~/.config/zshrc/10-secrets` if needed
4. Optionally add to global Claude settings

## Testing API Keys

```bash
# Check all configured secrets
secrets

# Show specific keys (truncated)
show-notion
show-tavily
show-groq

# Test API connections
test-groq
test-openai
```
