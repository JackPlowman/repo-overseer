# ------------------------------------------------------------------------------
# General Commands
# ------------------------------------------------------------------------------

# Install dependencies
install:
    npm install

# Install CI dependencies
install-ci:
    npm ci

# Dev server
dev:
    npm run dev

# Build
build:
    npm run build

# Preview production build
preview:
    npm run preview

# Lint typescript code with ESLint
lint:
    npx eslint .

# Lint typescript code with ESLint and generate a SARIF file
eslint-with-sarif:
    npx eslint . --format @microsoft/eslint-formatter-sarif --output-file eslint-results.sarif

# ------------------------------------------------------------------------------
# Prettier
# ------------------------------------------------------------------------------

# Check if code is formatted correctly
prettier-check:
    npx prettier . --check

# Format code with Prettier
prettier-format:
    npx prettier . --check --write
