"""Tests for the details table on the page."""

import pytest
from playwright.sync_api import Page

from .utils.constants import DASHBOARD_URL


@pytest.mark.parametrize(
    ("column_position", "link_suffix"), [(2, "pulls"), (3, "issues")]
)
def test_values_have_link(column_position: int, link_suffix: str, page: Page) -> None:
    """Test that the details table values have the correct link."""
    # Arrange
    page.goto(DASHBOARD_URL)
    # Wait for table to be loaded initially
    page.wait_for_selector("tbody tr")
    # Select the details tab
    page.locator("text=Details").click()
    # Wait for table to be loaded initially
    page.wait_for_selector("tbody tr")
    # Get the first cell in the column
    first_row_repository = page.locator("tbody tr td").first
    first_cell = page.locator(f"tbody tr td:nth-child({column_position})").first
    # Get the first link in the cell
    link = first_cell.locator("a").first
    # Act
    href = link.get_attribute("href")
    expected_url = f"https://github.com/JackPlowman/{first_row_repository.text_content()}/{link_suffix}"
    # Assert
    assert expected_url == href, f"Expected {expected_url} but got {href}"
