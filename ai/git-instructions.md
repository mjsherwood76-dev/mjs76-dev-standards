# Git Instructions for AI Agents

## Critical Rules for Git Operations

### Never Commit node_modules or Build Artifacts

**IMPORTANT**: When working with git repositories, NEVER commit the following:

- `node_modules/` directories
- Build output directories (`.next/`, `dist/`, `build/`, `out/`)
- Package lock files from other package managers if not used (e.g., don't commit `yarn.lock` if using `npm`)
- Environment files containing secrets (`.env`, `.env.local`, etc.)
- IDE-specific files (`.vscode/`, `.idea/`, etc.)
- OS-specific files (`.DS_Store`, `Thumbs.db`, etc.)
- Log files (`*.log`, `npm-debug.log*`, etc.)

### Always Check .gitignore First

Before committing code:

1. Check if a `.gitignore` file exists
2. If it doesn't exist or is incomplete, create/update it with proper exclusions
3. Ensure the following patterns are in `.gitignore`:

```gitignore
# Dependencies
node_modules/
package-lock.json (only if not using npm)
yarn.lock (only if not using yarn)
pnpm-lock.yaml (only if not using pnpm)

# Build outputs
.next/
out/
build/
dist/

# Environment files
.env
.env*.local
.env.production

# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo
```

### If node_modules Was Accidentally Committed

If `node_modules` or other build artifacts were accidentally committed:

1. Remove from git tracking: `git rm -r --cached <directory>`
2. Update `.gitignore` to exclude them
3. Commit the changes
4. Force push if necessary (only if no one else has pulled the bad commit)

### Best Practices

1. **Always use .gitignore**: Set up `.gitignore` before the first commit
2. **Keep dependencies in package.json**: Dependencies should only be tracked via `package.json`, not the installed files
3. **Use git status**: Always check `git status` before committing to see what files are staged
4. **Small commits**: Make focused commits with clear messages
5. **Review before pushing**: Always review what you're about to push to avoid large unwanted files

### GitHub File Size Limits

- GitHub has a 100 MB file size limit
- Commits with files larger than 100 MB will be rejected
- `node_modules` often contain large binary files that exceed this limit
- If you encounter "file size limit" errors, it's likely because build artifacts or dependencies were included

### Recovery from Large File Push Failure

If a push fails due to large files:

1. Identify the problem: Check the error message for specific files
2. Remove from git: `git rm -r --cached <path>`
3. Update .gitignore: Ensure patterns exclude these files
4. Amend the commit: `git commit --amend --no-edit`
5. Force push if needed: `git push --force origin <branch>` (use cautiously)

Remember: **Dependencies and build artifacts should be regenerated from package.json, not committed to git.**
