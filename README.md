# TJW-MarkdownLint-Rules

The Jared Wilcurt's very agressive Markdown Linting rules for obsessives

## How to use this:

1. Not ready for general use yet. Still being set up

## Known issues:

**Improper indentation not flagged:**

```md
1. Text

    ![This should be flagged for starting with 4 spaces instead of 2](file.png)

1. Test
```

**Unable to enforce emphasis consistency:**

```md
_This should be flagged for using an underscore instead of asterisk for emphasis_
```
