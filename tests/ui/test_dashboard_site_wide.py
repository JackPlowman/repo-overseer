"""Tests for the dashboard site-wide elements."""

from playwright.sync_api import Page, expect
from requests import get

from .utils.constants import DASHBOARD_URL, ROBOTS_URL, SITEMAP_0_URL, SITEMAP_INDEX_URL


def test_has_title(page: Page) -> None:
    """Check that the dashboard has the correct title."""
    # Act
    page.goto(DASHBOARD_URL)
    # Assert
    expect(page).to_have_title("Repository Overview")


def test_sitemap_index() -> None:
    """Check that the sitemap index is accessible."""
    # Act
    response = get(SITEMAP_INDEX_URL, timeout=5)
    # Assert
    assert response.status_code == 200
    assert response.headers["Content-Type"] == "application/xml"
    assert response.text.startswith('<?xml version="1.0" encoding="UTF-8"?>')
    assert response.text.endswith("</sitemapindex>")


def test_sitemap() -> None:
    """Check that the sitemap is accessible."""
    # Act
    response = get(SITEMAP_0_URL, timeout=5)
    # Assert
    assert response.status_code == 200
    assert response.headers["Content-Type"] == "application/xml"
    assert response.text.startswith('<?xml version="1.0" encoding="UTF-8"?>')
    assert response.text.endswith("</urlset>")


def test_robots() -> None:
    """Check that the robots.txt is accessible."""
    # Act
    response = get(ROBOTS_URL, timeout=5)
    # Assert
    assert response.status_code == 200
    assert response.headers["Content-Type"] == "text/plain; charset=utf-8"
    assert response.text == f"User-agent: *\nAllow: /\nSitemap: {SITEMAP_INDEX_URL}\n"
