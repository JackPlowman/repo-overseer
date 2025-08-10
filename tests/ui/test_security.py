"""Tests for the Security tab visuals and sorting."""

from time import sleep

from playwright.sync_api import Page

from .utils.constants import DASHBOARD_URL


def test_security_code_scanning_badge_color_matches_value(page: Page) -> None:
    """Cells with code scanning alerts '0' should be green; others red."""
    # Arrange
    page.goto(DASHBOARD_URL)
    sleep(1)
    page.locator("text=Security").click()
    page.wait_for_selector("tbody tr")

    # Act
    rows = page.locator("tbody tr").all()[:5]

    # Assert
    assert rows, "Expected at least one row in security table"
    for row in rows:
        last_cell = row.locator("td").last
        text = (last_cell.text_content() or "").strip()
        classes = last_cell.locator("*").first.get_attribute("class") or ""
        if text == "0":
            assert "bg-green-400" in classes, (
                f"Expected green class for 0, got: {classes}"
            )
        else:
            assert "bg-red-400" in classes, (
                f"Expected red class for non-zero, got: {classes}"
            )


def test_security_sorting_changes_order(page: Page) -> None:
    """Toggling the 'Code Scanning Alerts' header should change row order."""
    # Arrange
    page.goto(DASHBOARD_URL)
    sleep(1)
    page.locator("text=Security").click()
    page.wait_for_selector("tbody tr")

    def first_repo_name() -> str:
        return (
            page.locator("tbody tr").first.locator("td").first.text_content() or ""
        ).strip()

    # Act
    before = first_repo_name()
    page.get_by_role("button", name="Code Scanning Alerts").click()
    page.wait_for_selector("tbody tr")
    mid = first_repo_name()
    page.get_by_role("button", name="Code Scanning Alerts").click()
    page.wait_for_selector("tbody tr")
    after = first_repo_name()

    # Assert: At least one of the clicks should change the first item
    assert before != mid or mid != after or before != after
