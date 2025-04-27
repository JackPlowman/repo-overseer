set export := true

RERUN_CONFIG := "--reruns 2 --reruns-delay 1"

# ------------------------------------------------------------------------------
# Common Commands
# ------------------------------------------------------------------------------

# Install python dependencies
install:
    uv sync --extra dev

# Install playwright dependencies
playwright-install:
    uv run playwright install

# Install playwright minimum dependencies
playwright-install-minimum:
    uv run playwright install --with-deps --only-shell chromium

# Run ui playwright tests (headless)
ui-tests:
    uv run pytest ui

# Run ui playwright tests in headed mode
ui-tests-headed:
    uv run pytest ui --headed $RERUN_CONFIG

# Run ui playwright tests in headed mode with WIP
ui-tests-wip:
    uv run pytest ui --headed -k "wip"

# Validate uv locked
uv-lock-check:
    uv lock --check
# ------------------------------------------------------------------------------
# Ruff - Python Linting and Formatting
# Set up ruff red-knot when it's ready
# ------------------------------------------------------------------------------

# Fix all Ruff issues
ruff-fix:
    just tests::ruff-format-fix
    just tests::ruff-lint-fix

# Check for Ruff issues
ruff-lint-check:
    uv run ruff check .

# Fix Ruff lint issues
ruff-lint-fix:
    uv run ruff check . --fix

# Check for Ruff format issues
ruff-format-check:
    uv run ruff format --check .

# Fix Ruff format issues
ruff-format-fix:
    uv run ruff format .
