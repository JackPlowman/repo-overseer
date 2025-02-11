"""Tests for the details table on the dashboard page."""

from time import sleep
from typing import Self

import pytest
from playwright.sync_api import Page

from .utils.constants import DASHBOARD_URL


class TestDetailsTable:
    """Tests for the details table on the dashboard page."""

    @pytest.mark.wip
    @pytest.mark.parametrize(
        ("test_id", "column_position"), [("pull-requests", 1), ("issues", 2)]
    )
    def test_column_sort(
        self: Self, test_id: str, column_position: int, page: Page
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
        # Get the repository column header button and click it
        page.get_by_test_id("pull-requests").click()
        page.wait_for_selector("tbody tr")
        # Wait for the table to be sorted
        sleep(1)
        rows = page.locator("tbody tr")

        for i in range(rows.count() - 1):
            first_row_value = int(
                rows.nth(i).locator("td").nth(column_position).text_content()
            )
            second_row_value = int(
                rows.nth(i + 1).locator("td").nth(column_position).text_content()
            )
            print(first_row_value, second_row_value)
            assert first_row_value >= second_row_value, (
                f"Failed at row {i} and {i + 1}, {first_row_value=} and {second_row_value=}"
            )

