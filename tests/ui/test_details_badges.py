"""Tests for the Details tab badge color logic and sorting behaviour."""

from time import sleep

import pytest
from playwright.sync_api import Page

from .utils.constants import DASHBOARD_URL


@pytest.mark.skip("TODO: Fix this test")
def test_details_badge_color_follows_threshold(page: Page) -> None:
    """Values > 3 should have amber badge; <= 3 should be green."""
    # Arrange
    page.goto(DASHBOARD_URL)
    sleep(1)
    page.locator("text=Details").click()
    page.wait_for_selector("tbody tr")

    # Act
    first_row = page.locator("tbody tr").first
    pr_badge = first_row.locator("td:nth-child(2) span")
    pr_value = int((pr_badge.text_content() or "0").strip())
    pr_classes = pr_badge.get_attribute("class") or ""
    issues_badge = first_row.locator("td:nth-child(3) span")
    issues_value = int((issues_badge.text_content() or "0").strip())
    issues_classes = issues_badge.get_attribute("class") or ""

    # Assert
    if pr_value > 3:
        assert "bg-amber-600" in pr_classes
    else:
        assert "bg-green-600" in pr_classes
    if issues_value > 3:
        assert "bg-amber-600" in issues_classes
    else:
        assert "bg-green-600" in issues_classes


def test_details_sorting_by_repository_changes_order(page: Page) -> None:
    """Clicking the Repository header should toggle sort order and change top row."""
    # Arrange
    page.goto(DASHBOARD_URL)
    sleep(1)
    page.locator("text=Details").click()
    page.wait_for_selector("tbody tr")

    def top_repo() -> str:
        return (
            page.locator("tbody tr").first.locator("td").first.text_content() or ""
        ).strip()

    # Act
    before = top_repo()
    page.get_by_role("button", name="Repository").click()
    page.wait_for_selector("tbody tr")
    mid = top_repo()
    page.get_by_role("button", name="Repository").click()
    page.wait_for_selector("tbody tr")
    after = top_repo()

    # Assert
    assert before != mid or mid != after or before != after
