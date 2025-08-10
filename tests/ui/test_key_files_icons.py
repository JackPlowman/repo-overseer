"""Tests for Key Files tab icons and sorting behavior."""

from time import sleep

import pytest
from playwright.sync_api import Locator, Page

from .utils.constants import DASHBOARD_URL


def _cell_has_green_check(cell_selector: Locator) -> bool:
    # Badge contains an SVG with class indicating color
    # For true values icons have 'text-green-500'
    classes = cell_selector.locator("svg").first.get_attribute("class") or ""
    return "text-green-500" in classes


def _cell_has_red_cross(cell_selector: Locator) -> bool:
    classes = cell_selector.locator("svg").first.get_attribute("class") or ""
    return "text-red-500" in classes


def test_key_files_icons_match_boolean_values(page: Page) -> None:
    """Each key-file boolean should render a green check or red cross."""
    # Arrange
    page.goto(DASHBOARD_URL)
    sleep(1)
    page.locator("text=Key Files").click()
    page.wait_for_selector("tbody tr")

    # Act
    first_row = page.locator("tbody tr").first

    # Assert: Check several boolean columns by position
    for idx in range(2, 8):  # columns 2..7 are booleans
        cell = first_row.locator(f"td:nth-child({idx})")
        assert _cell_has_green_check(cell) or _cell_has_red_cross(cell)


@pytest.mark.skip("TODO: Fix this test")
def test_key_files_sorting_changes_order(page: Page) -> None:
    """Toggling the License header should change ordering."""
    # Arrange
    page.goto(DASHBOARD_URL)
    sleep(1)
    page.locator("text=Key Files").click()
    page.wait_for_selector("tbody tr")

    def first_repo_name() -> str:
        return (
            page.locator("tbody tr").first.locator("td").first.text_content() or ""
        ).strip()

    # Act
    before = first_repo_name()
    page.get_by_test_id("has-license").click()
    page.wait_for_selector("tbody tr")
    mid = first_repo_name()
    page.get_by_test_id("has-license").click()
    page.wait_for_selector("tbody tr")
    after = first_repo_name()

    # Assert
    assert before != mid or mid != after or before != after
