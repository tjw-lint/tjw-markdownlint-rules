# TJW-MarkdownLint-Rules

The Jared Wilcurt's very agressive Markdown Linting rules for obsessives

## How to use this:

1. Not ready for general use yet. Still being set up

## Known issues:

**Improper indentation not flagged:**

May be covered by: [#138](https://github.com/DavidAnson/markdownlint/issues/138)

```md
1. Text

    ![This should be flagged for starting with 4 spaces instead of 2](file.png)

1. Test
```

**Unable to enforce emphasis consistency:**

Will be fixed by: [#150](https://github.com/DavidAnson/markdownlint/issues/150)

```md
_This should be flagged for using an underscore instead of asterisk for emphasis_
```

**Trailing whitespace not caught in unordered list empty line:**

[#216](https://github.com/DavidAnson/markdownlint/issues/216)

```md
* asdf
  * There are two spaces on the next line
  
  * The line above this should be flagged for trailing whitespace
```
