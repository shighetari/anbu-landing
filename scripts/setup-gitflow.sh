#!/bin/bash

# ANBU Solutions - Git Flow Setup Script
# This script sets up the Git Flow branching strategy for the project

echo "🚀 Setting up Git Flow for ANBU Landing Page..."

# Create and switch to develop branch
git checkout -b develop 2>/dev/null || git checkout develop

echo "✅ Created/switched to develop branch"

# Set up branch protection rules reminder
echo ""
echo "📋 Next Steps - Set up branch protection on GitHub:"
echo "----------------------------------------"
echo "1. Go to Settings > Branches in your GitHub repository"
echo "2. Add branch protection rules for 'main' branch:"
echo "   - Require pull request reviews before merging"
echo "   - Require status checks to pass before merging"
echo "   - Require branches to be up to date before merging"
echo "   - Include administrators"
echo "3. Add branch protection rules for 'develop' branch:"
echo "   - Require pull request reviews before merging"
echo "   - Require status checks to pass before merging"
echo ""
echo "🌳 Git Flow Branch Structure:"
echo "   main (production)"
echo "   └── develop (development)"
echo "       ├── feature/* (new features)"
echo "       ├── release/* (release preparation)"
echo "       └── hotfix/* (production fixes)"
echo ""
echo "📝 Example Git Flow Commands:"
echo "   Create feature:  git checkout -b feature/your-feature develop"
echo "   Create release:  git checkout -b release/v1.0.0 develop"
echo "   Create hotfix:   git checkout -b hotfix/critical-fix main"
echo ""
echo "✨ Git Flow setup complete!"