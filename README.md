# TJW-MarkdownLint-Rules

[![Build Status](https://travis-ci.org/tjw-lint/tjw-markdownlint-rules.svg?branch=master)](https://travis-ci.org/tjw-lint/tjw-markdownlint-rules)


***The Jared Wilcurt's very agressive Markdown Linting rules for obsessives.***


## How to use this

1. Create a file called `.markdown-lint.yml` and set it up like so:

   ```yml
   ---
   extends: ./node_modules/tjw-markdownlint-rules/tjwmarkdownlint.yml
   # Override the proper-names rule to enforce capitalization of your project's name and other proper nouns
   proper-names:
     names:
       - JavaScript
       - Your Project Name
   ```

1. Put the `.markdownlint.yml` file in your project root (next to `package.json`)
1. `npm install --save-dev markdownlint-cli tjw-markdownlint-rules`
1. In the `"scripts":` section of your `package.json` add in these two lines:
    * `"markdownlint": "markdownlint -i \"./node_modules/**/*\" --config ./.markdownlint.yml ./**/*.md"`
        * **Note:** You can change the `./**/*.md` to be specific to your project's folder structure. Example: `docs/**/*.md`
1. `npm run markdownlint` - This will list the lines of each file that are in violation of the linting rules for you to manually correct.


## Customizing rules

1. Edit the `.markdownlint.yml` file
1. Add in rules you want to override
    * In the example above, we are overriding the `proper-names` rule
1. All rules are documented here:
    * [MarkdownLint Rule Documentation](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md)


## Known issues

**Improper indentation not flagged:**

May be covered by: [#138](https://github.com/DavidAnson/markdownlint/issues/138)

```markdown
1. Text

    ![This should be flagged for starting with 4 spaces instead of 2](file.png)

1. Test
```

**Unable to enforce emphasis consistency:**

Will be fixed by: [#150](https://github.com/DavidAnson/markdownlint/issues/150)

```markdown
_This should be flagged for using an underscore instead of asterisk for emphasis_
```

**Trailing whitespace not caught in unordered list empty line:**

[#216](https://github.com/DavidAnson/markdownlint/issues/216)

```markdown
* Example
  * There are two spaces on the next line

  * The line above this should be flagged for trailing whitespace
```

* * *


## Unfixible issues

**Random indentation forced by CommonMark for sublists**

The complete morons over at CommonMark, have decided to incorrectly parse list items because "[reasons](https://spec.commonmark.org/0.29/#motivation)" (read: opinions, of which, that are the type of "bad").

```markdown
1. Top level ordered list

  * Sublist with 2 space indentation
  * CommonMark only parses this as a sublist if it starts with 3 spaces.
```

```markdown
25. Top level ordered list

  * Sublist with 2 space indentation
  * CommonMark only parses this as a sublist if it starts with 4 spaces.
```

```markdown
116. Top level ordered list

  * Sublist with 2 space indentation
  * CommonMark only parses this as a sublist if it starts with 5 spaces.
```

Since MarkdownLint relies on [markdown-it](https://markdown-it.github.io), which is built on top of the horrible "CommonMark" version of markdown, you are stuck with this shitty bullshit. I have enabled the MD006 to catch this if your code uses shitty CommonMark to be processed to HTML. However if you use a *good* markdown interpreter, then you should turn MD006 off, because it will try to make you over-indent to satisfy MarkdownLint's internal interpretter (markdown-it).

To disable it, add this to your `.markdownlint.yml`:

```yml
# MD006 - Consider starting bulleted lists at the beginning of the line.
# Thankfully, we do not use CommonMark. Unfortunately MarkdownLint does,
# so we have to disable this so it doesn't freak out about bullets inside numbered lists.
ul-start-left: false
```
