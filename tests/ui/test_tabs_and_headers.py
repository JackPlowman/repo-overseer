"""UI tests covering tab switching and expected headers/links appear."""

from time import sleep

import pytest
from playwright.sync_api import Page, expect

from .utils.constants import DASHBOARD_URL


@pytest.mark.skip("TODO: Fix this test")
def test_tabs_render_expected_headers(page: Page) -> None:
    """Verify each tab renders its expected header controls."""
    # Arrange
    page.goto(DASHBOARD_URL)
    sleep(1)
    page.wait_for_selector("tbody tr")

    # Act: Land on Details tab (default)
    # Assert
    expect(page.get_by_role("button", name="Repository")).to_be_visible()
    expect(page.get_by_test_id("pull-requests")).to_be_visible()
    expect(page.get_by_test_id("issues")).to_be_visible()

    # Act: Switch to Key Files tab
    page.locator("text=Key Files").click()
    page.wait_for_selector("tbody tr")
    # Assert: All expected headers visible
    for test_id in [
        "has-license",
        "has-readme",
        "has-security-policy",
        "has-code-of-conduct",
        "has-contributing",
        "has-project-technologies",
    ]:
        expect(page.get_by_test_id(test_id)).to_be_visible()

    # Act: Switch to Security tab
    page.locator("text=Security").click()
    page.wait_for_selector("tbody tr")
    # Assert: All expected headers visible
    for test_id in [
        "secret-scanning-push-protection",
        "secret-scanning",
        "dependabot-security-updates",
        "private-vulnerability-disclosures",
        "code-scanning-alerts",
    ]:
        expect(page.get_by_test_id(test_id)).to_be_visible()


def test_repository_cell_has_correct_link_format(page: Page) -> None:
    """Repository names should link to the GitHub repo (starts with owner's URL)."""
    # Arrange
    page.goto(DASHBOARD_URL)
    sleep(1)
    page.wait_for_selector("tbody tr")

    # Act
    first_repo_cell = page.locator("tbody tr").first.locator("td").first
    first_link = first_repo_cell.locator("a").first
    href = first_link.get_attribute("href") or ""

    # Assert
    assert href.startswith("https://github.com/JackPlowman/"), href
