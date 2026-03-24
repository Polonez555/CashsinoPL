# SonarQube Integration Setup Guide

This guide walks you through setting up SonarCloud for the CashsinoPL project.

## What is SonarCloud?

SonarCloud is a cloud-based code quality and security analysis service that helps you:
- Detect bugs, vulnerabilities, and code smells
- Track code coverage metrics
- Enforce code quality standards
- Review technical debt

## Prerequisites

- A GitHub account
- Admin access to the CashsinoPL repository

## Step 1: Create a SonarCloud Account

1. Visit https://sonarcloud.io/
2. Click **"Sign Up"** in the top-right corner
3. Sign up using one of the following methods:
   - **GitHub** (recommended - easiest integration)
   - **Google account**
   - **Microsoft account**
   - Or create an account with email

4. Complete your profile setup if prompted

## Step 2: Create a New Project

1. After logging in to SonarCloud, click **"Create new project"**
2. Choose **"Analyze new project on GitHub"**
3. SonarCloud will redirect you to authorize GitHub access
4. Click **"Authorize SonarSource"** to grant access
5. Select the **CashsinoPL** repository from the list
6. Configure your project:
   - **Organization**: `polonez555`
   - **Project Key**: `CashsinoPL`
   - **Display Name**: `CashsinoPL`
7. Click **"Set Up"**

## Step 3: Generate Your SonarCloud Token

1. After creating the project, you'll be prompted to set up analysis
2. SonarCloud will guide you to generate a security token
3. Choose **"Generate a token"**
4. Provide a token name (e.g., `CashsinoPL-token`)
5. **Important**: Copy the generated token immediately
   - It will look like: `sqp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - Save it securely - you won't be able to see it again!

## Step 4: Add the Token to GitHub Secrets

1. Navigate to your GitHub repository: https://github.com/Polonez555/CashsinoPL
2. Click **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **"New repository secret"**
5. Create the following secret:
   - **Name**: `SONAR_TOKEN`
   - **Value**: Paste your SonarCloud token from Step 3
6. Click **"Add secret"**

Note: `GITHUB_TOKEN` is automatically provided by GitHub Actions and doesn't need to be configured.

## Step 5: Verify the Configuration

Your repository already has:
- ✅ `sonar-project.properties` file with project configuration
- ✅ GitHub Actions workflow with SonarCloud scan step
- ✅ Coverage report generation in the CI pipeline

The configuration includes:
```properties
sonar.projectKey=CashsinoPL
sonar.organization=polonez555
sonar.sources=lib,app
sonar.tests=tests
sonar.typescript.lcov.reportPaths=coverage/lcov.info
```

## Step 6: Trigger Your First Analysis

The SonarCloud analysis will automatically run when:
- You push code to the `main` or `develop` branches
- You create a pull request
- The scheduled pipeline runs (every Monday at 09:30)

To manually trigger an analysis:
1. Make a small change to any file (e.g., add a comment)
2. Commit and push the change:
   ```bash
   git add .
   git commit -m "test: trigger sonarqube analysis"
   git push
   ```
3. Go to the **Actions** tab in GitHub to see the workflow running
4. Wait for the **SonarCloud Scan** step to complete

## Step 7: View Analysis Results

1. Go to your SonarCloud dashboard: https://sonarcloud.io/
2. Click on the **CashsinoPL** project
3. You'll see:
   - **Quality Gate status** (passed/failed)
   - **Code coverage** percentage
   - **Bugs, vulnerabilities, and code smells**
   - **Technical debt** metrics
   - **Security hotspots**

## Understanding the Metrics

### Quality Gate
A set of threshold conditions that must be met for code to be considered production-ready:
- Coverage on New Code: ≥ 80%
- Duplicated Lines on New Code: < 3%
- Maintainability Rating on New Code: A
- Reliability Rating on New Code: A
- Security Rating on New Code: A

### Code Coverage
- Percentage of code covered by tests
- Higher is better (aim for > 80%)

### Bugs
- Coding errors that could cause the application to behave incorrectly
- Should be fixed before merging

### Vulnerabilities
- Security-related issues that could be exploited
- Should be fixed immediately

### Code Smells
- Maintainability issues that make code harder to understand or modify
- Should be refactored when time permits

### Technical Debt
- Estimated time required to fix all quality issues
- Measured in minutes/hours

## Troubleshooting

### Analysis fails with "Unauthorized" error
- Verify your `SONAR_TOKEN` secret is correctly set in GitHub
- Regenerate the token if necessary and update the secret

### Coverage report not found
- Ensure tests are generating the `coverage/lcov.info` file
- Check that the `--coverage` flag is included in the test command

### Project not found
- Verify `sonar.projectKey` matches your SonarCloud project key
- Verify `sonar.organization` matches your SonarCloud organization

### Quality Gate fails
- Review the issues in SonarCloud dashboard
- Fix critical bugs and vulnerabilities first
- Address code smells incrementally

## Best Practices

1. **Fix critical issues immediately**: Focus on bugs and vulnerabilities first
2. **Monitor coverage regularly**: Aim for > 80% coverage on new code
3. **Review code smells**: Refactor technical debt incrementally
4. **Set branch policies**: Require Quality Gate to pass before merging
5. **Use SonarLint**: Install the SonarLint extension in your IDE for real-time feedback

## Installing SonarLint (Optional)

For real-time code quality feedback in your IDE:

### VS Code
1. Install the **SonarLint** extension from the marketplace
2. Connect to SonarCloud with your account
3. Bind your workspace to the CashsinoPL project
4. Issues will be highlighted directly in your code

### IntelliJ IDEA
1. Install the **SonarLint** plugin
2. Configure SonarCloud connection
3. Bind your project to get real-time analysis

## Resources

- [SonarCloud Documentation](https://docs.sonarcloud.io/)
- [SonarCloud for GitHub Actions](https://docs.sonarcloud.io/analyzing-source-code/scanners/sonarscanner-for-github-actions/)
- [Quality Gate Documentation](https://docs.sonarcloud.io/delve-deeper/quality-gates/)
- [Coverage Configuration](https://docs.sonarcloud.io/analyzing-source-code/test-coverage/)

## Next Steps

Once SonarCloud is set up:
1. ✅ Review and fix initial issues
2. ✅ Set up branch protection rules requiring Quality Gate to pass
3. ✅ Monitor technical debt and plan refactoring
4. ✅ Integrate SonarLint in your IDE for real-time feedback

Your code quality metrics will now be tracked automatically with every commit!