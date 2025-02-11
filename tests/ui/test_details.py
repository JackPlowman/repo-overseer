"""Tests for the details table on the dashboard page."""

from typing import Self
from time import sleep
import pytest
from playwright.sync_api import Page

from .utils.constants import DASHBOARD_URL


class TestDetailsTable:
    """Tests for the details table on the dashboard page."""

    @pytest.mark.wip
    @pytest.mark.parametrize(
        ("column", "column_position"), [("Pull Requests", 0), ("Issues", 1)]
    )
    def test_column_sort(
        self: Self, column: str, column_position: int, page: Page
    ) -> None:
        """Check that the column can be sorted."""
        # Arrange
        page.goto(DASHBOARD_URL)
        # Wait for table to be loaded initially
        page.wait_for_selector("tbody tr")
        # Select the details tab
        page.locator("text=Details").click()
        # Wait for table to be loaded initially
        page.wait_for_selector("tbody tr")
        # Get the repository column header button
        page.get_by_role("button", name="Pull Requests").click()
        sleep(60)

        # Act & Assert - First click (ascending)
        # sort_button.click()
        # # Wait for the table to be sorted
        # sleep(1)
        # # Get all rows in the table
        # rows = page.locator("tbody tr")
        # # Iterate through the rows and compare values
        # first_value = rows.nth(0).locator("td").nth(column_position).text_content()
        # second_value = rows.nth(1).locator("td").nth(column_position).text_content()
        # raise Exception(first_value, second_value)
        # for i in range(rows.count() - 1):
        #     first_value = rows.nth(i).locator("td").nth(column_position).text_content()
        #     # first_value = rows.nth(i).locator("td").nth(column_position).text_content()
        #     # second_value = (
        #     #     rows.nth(i + 1).locator("td").nth(column_position).text_content()
        #     # )
        #     # assert first_value >= second_value, (
        #     #     f"Row {i} value {first_value} is not less than or equal to "
        #     #     f"row {i + 1} value {second_value}"
        #     # )
