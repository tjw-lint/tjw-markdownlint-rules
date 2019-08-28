# TJW-MarkdownLint-Rules

[![Build Status](https://travis-ci.org/TheJaredWilcurt/tjw-markdownlint-rules.svg?branch=master)](https://travis-ci.org/TheJaredWilcurt/tjw-markdownlint-rules)


***The Jared Wilcurt's very agressive Markdown Linting rules for obsessives.***


## How to use this

1. Create a file called `.markdown-lint.yml` and set it up like so:

   ```yml
   ---
   extends: ./node_modules/tjw-markdown-lint-rules/tjwmarkdownlint.yml
   # Override the proper-names rule to enforce capitalization of your project's name and other proper nouns
   proper-names:
     names:
       - JavaScript
       - Your Project Name
   ```

1. Put the `.markdown-lint.yml` file in your project root (next to `package.json`)
1. `npm install --save-dev markdownlint-cli tjw-markdownlint-rules`
1. In the `"scripts":` section of your `package.json` add in these two lines:
    * `"markdown-lint": "markdownlint -i ./node_modules/**/* --config ./.markdown-lint.yml ./**/*.md"`
        * **Note:** You can change the `./**/*.md` to be specific to your project's folder structure. Example: `docs/**/*.md`
1. `npm run markdown-lint` - This will list the lines of each file that are in violation of the linting rules for you to manually correct.


## Customizing rules

1. Edit the `.markdownlint.yml` file
1. Add in rules you want to override
    * In the example above, we are overriding the `proper-names` rule
1. All rules are documented here:
    * [MarkdownLint Rule Documentation](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md)


## Known issues

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
* Example
  * There are two spaces on the next line

  * The line above this should be flagged for trailing whitespace
```
