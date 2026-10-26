"""Tests for the common table components."""

from time import sleep

import pytest
from playwright.sync_api import Page, expect

from .utils.constants import DASHBOARD_URL


@pytest.mark.parametrize("column", ["Details", "Security", "Key Files"])
def test_table_sorting__repository_column(column: str, page: Page) -> None:
    """Test that the repository column can be sorted in asc and dsc order."""
    # Arrange
    page.goto(DASHBOARD_URL)
    sleep(1)
    # Wait for table to be loaded initially
    page.wait_for_selector("tbody tr")
    # Select the tab
    page.locator(f"text={column}").click()
    # Wait for table to be loaded initially
    page.wait_for_selector("tbody tr")
    # Get the repository column header button
    # Act & Assert - First click (ascending)
    page.get_by_role("button", name="Repository").click()
    # Wait for sort to complete and get first cell
    first_repo = page.locator("tbody tr").first.locator("td").first
    first_repo.wait_for(state="visible")
    ascending_names = page.locator("tbody tr td:first-child").all_text_contents()
    assert ascending_names == sorted(ascending_names, key=str.casefold)
    # Act & Assert - Second click (descending)
    page.get_by_role("button", name="Repository").click()
    # Wait for sort to complete and get first cell
    first_repo = page.locator("tbody tr").first.locator("td").first
    first_repo.wait_for(state="visible")
    descending_names = page.locator("tbody tr td:first-child").all_text_contents()
    assert descending_names == sorted(descending_names, key=str.casefold, reverse=True)
    if len(ascending_names) > 1:
        assert descending_names != ascending_names


@pytest.mark.parametrize("column", ["Details", "Security", "Key Files"])
def test_details_table_pagination(column: str, page: Page) -> None:
    """Test that the table can be paginated."""
    # Arrange
    page.goto(DASHBOARD_URL)
    sleep(1)
    # Wait for table to be loaded initially
    page.wait_for_selector("tbody tr")
    # Select the details tab
    page.locator(f"text={column}").click()
    # Wait for table to be loaded initially
    page.wait_for_selector("tbody tr")
    # Get the next page button
    first_page = page.locator("tbody tr td:first-child").all_text_contents()
    visited_pages = [first_page]
    while page.get_by_role("button", name="Next").get_attribute("disabled") is None:
        next_page_button = page.get_by_role("button", name="Next")
        next_page_button.click()
        # Wait for pagination to complete
        page.wait_for_selector("tbody tr")
        names = page.locator("tbody tr td:first-child").all_text_contents()
        assert names not in visited_pages
        visited_pages.append(names)
    # Assert
    expect(page.get_by_role("button", name="Next")).to_be_disabled()
    for _ in visited_pages[1:]:
        page.get_by_role("button", name="Previous").click()
    expect(page.get_by_role("button", name="Previous")).to_be_disabled()
    assert page.locator("tbody tr td:first-child").all_text_contents() == first_page
