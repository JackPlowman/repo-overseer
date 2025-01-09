from playwright.sync_api import Page, expect
from .utils.constants import DASHBOARD_URL


def test_has_title(page: Page) -> None:
    # Act
    page.goto(DASHBOARD_URL)
    # Assert
    expect(page).to_have_title("Astro Basics")
