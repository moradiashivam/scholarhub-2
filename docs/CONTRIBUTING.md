# Contributing Guide

## Creating a Pull Request

### 1. Fork the Repository
- Go to the original repository on GitHub
- Click the "Fork" button in the top-right corner
- This creates a copy of the repository in your GitHub account

### 2. Clone Your Fork
```bash
# Clone your forked repository
git clone https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git

# Navigate to the project directory
cd REPOSITORY_NAME

# Add the original repository as a remote called "upstream"
git remote add upstream https://github.com/ORIGINAL_OWNER/REPOSITORY_NAME.git
```

### 3. Create a Branch
```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or use the newer syntax
git switch -c feature/your-feature-name
```

### 4. Make Your Changes
- Make your code changes
- Commit them with clear, descriptive messages:
```bash
git add .
git commit -m "feat: add new feature"
```

### 5. Keep Your Fork Updated
```bash
# Fetch upstream changes
git fetch upstream

# Merge upstream changes into your main branch
git checkout main
git merge upstream/main

# Update your feature branch
git checkout feature/your-feature-name
git rebase main
```

### 6. Push Changes
```bash
git push origin feature/your-feature-name
```

### 7. Create Pull Request
1. Go to your fork on GitHub
2. Click "Pull Request"
3. Click "New Pull Request"
4. Select:
   - Base repository: original repository
   - Base branch: main
   - Head repository: your fork
   - Compare branch: your feature branch
5. Fill in the PR template:
   - Title: Brief description of changes
   - Description: Detailed explanation of changes
   - Reference related issues
6. Click "Create Pull Request"

### PR Best Practices
- Keep PRs focused and small
- Write clear descriptions
- Include screenshots for UI changes
- Reference related issues
- Respond to review comments promptly
- Keep your branch updated with the main branch

### After PR Creation
1. Wait for code review
2. Make requested changes if any
3. Push new commits to your branch
4. PR will update automatically
5. Once approved, maintainers will merge your PR

## Commit Message Format
Follow conventional commits:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Tests
- chore: Maintenance

Example:
```
feat(auth): add login with GitHub

Implements OAuth flow with GitHub for user authentication.
Closes #123
```