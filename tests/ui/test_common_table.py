"""Tests for the common table components."""

import pytest
from playwright.sync_api import Page, expect

from .utils.constants import DASHBOARD_URL


@pytest.mark.parametrize("column", ["Details", "Security", "Key Files"])
def test_table_sorting__repository_column(column: str, page: Page) -> None:
    """Test that the repository column can be sorted in asc and dsc order."""
    # Arrange
    page.goto(DASHBOARD_URL)
    # Wait for table to be loaded initially
    page.wait_for_selector("tbody tr")
    # Select the tab
    page.locator(f"text={column}").click()
    # Wait for table to be loaded initially
    page.wait_for_selector("tbody tr")
    # Get the repository column header button
    sort_button = page.get_by_role("button", name="Repository")
    # Act & Assert - First click (ascending)
    sort_button.click()
    # Wait for sort to complete and get first cell
    first_repo = page.locator("tbody tr").first.locator("td").first
    first_repo.wait_for(state="visible")
    expect(first_repo).to_contain_text("aws-timing-scripts", timeout=5000)
    # Act & Assert - Second click (descending)
    sort_button.click()
    # Wait for sort to complete and get first cell
    first_repo = page.locator("tbody tr").first.locator("td").first
    first_repo.wait_for(state="visible")
    expect(first_repo).to_contain_text("useful-commands", timeout=5000)


@pytest.mark.parametrize("column", ["Details", "Security", "Key Files"])
def test_details_table_pagination(column: str, page: Page) -> None:
    """Test that the table can be paginated."""
    # Arrange
    page.goto(DASHBOARD_URL)
    # Wait for table to be loaded initially
    page.wait_for_selector("tbody tr")
    # Select the details tab
    page.locator(f"text={column}").click()
    # Wait for table to be loaded initially
    page.wait_for_selector("tbody tr")
    # Get the next page button
    count = 0
    while page.locator("text=Next").first.is_enabled():
        next_page_button = page.get_by_role("button", name="Next")
        count += 1
        next_page_button.click()
        # Wait for pagination to complete
        page.wait_for_selector("tbody tr")
    # Assert
    assert count >= 1
