from playwright.sync_api import Page, expect

from .utils.constants import DASHBOARD_URL


def test_dashboard_has_title(page: Page) -> None:
    """Check that the dashboard has the correct title."""
    # Act
    page.goto(DASHBOARD_URL)
    # Assert
    expect(page).to_have_title("Astro Basics")
