"""Helper utilities for Claude skills."""


def format_output(text: str) -> str:
    """Format output text for display."""
    return text.strip()


def parse_file_list(files: str) -> list[str]:
    """Parse a newline-separated file list."""
    return [f.strip() for f in files.splitlines() if f.strip()]
