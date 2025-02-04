"""Test the security tab on the dashboard page."""

from playwright.sync_api import Page, expect

from .utils.constants import DASHBOARD_URL


def test_table_sorting__details(page: Page) -> None:
    """Test that the repository table can be sorted in asc and dsc order."""
    # Arrange
    page.goto(DASHBOARD_URL)
    # Wait for table to be loaded initially
    page.wait_for_selector("tbody tr")
    # Select the details tab
    page.locator("text=Security").click()
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
