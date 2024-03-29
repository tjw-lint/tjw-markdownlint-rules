// IMPORTS

const path = require('path');
const spawn = require('child_process').spawnSync;

/////////////////////////////////////////////////////////////////////////////////////

// EXECUTABLE AND ARGS

let extension = '';

if (process.platform === 'win32') {
  extension = '.cmd';
}

let executable = path.join('.', 'node_modules', '.bin', 'markdownlint') + extension;

let args = [
  // ignore node_modules
  '-i', './node_modules/**/*',
  // config file
  '-c', './tjwmarkdownlint.yml',
  // files to test
  './test-files/*.md'
];


// RUN AND GET RESULTS

let results;

try {
  results = spawn(executable, args);
  results = results.stderr;
} catch (err) {
  if (err && err.stdout) {
    results = err.stdout;
  }
}


results = String(results).trim().split('\n');

/////////////////////////////////////////////////////////////////////////////////////

let testPassed = true;

let expectedResults = [
  './test-files/md001.md:4 MD001/heading-increment/header-increment Heading levels should only increment by one level at a time [Expected: h2; Actual: h3]',

  './test-files/md003.md:1 MD003/heading-style/header-style Heading style [Expected: atx; Actual: atx_closed]',

  './test-files/md004.md:1:1 MD004/ul-style Unordered list style [Expected: asterisk; Actual: dash]',
  './test-files/md004.md:2:1 MD004/ul-style Unordered list style [Expected: asterisk; Actual: dash]',
  './test-files/md004.md:4:1 MD004/ul-style Unordered list style [Expected: asterisk; Actual: plus]',
  './test-files/md004.md:5:1 MD004/ul-style Unordered list style [Expected: asterisk; Actual: plus]',

  './test-files/md005.md:3:1 MD005/list-indent Inconsistent indentation for list items at the same level [Expected: 4; Actual: 5]',
  './test-files/md005.md:3:1 MD007/ul-indent Unordered list indentation [Expected: 4; Actual: 5]',

  './test-files/md006.md:1:1 MD006/ul-start-left Consider starting bulleted lists at the beginning of the line [Expected: 0; Actual: 2]',
  './test-files/md006.md:1:1 MD007/ul-indent Unordered list indentation [Expected: 0; Actual: 2]',

  './test-files/md007.md:2:1 MD007/ul-indent Unordered list indentation [Expected: 4; Actual: 2]',
  './test-files/md007.md:5:1 MD007/ul-indent Unordered list indentation [Expected: 4; Actual: 3]',

  './test-files/md009.md:1:19 MD009/no-trailing-spaces Trailing spaces [Expected: 0 or 2; Actual: 1]',
  './test-files/md009.md:3:19 MD009/no-trailing-spaces Trailing spaces [Expected: 0 or 2; Actual: 3]',
  './test-files/md009.md:4:19 MD009/no-trailing-spaces Trailing spaces [Expected: 0 or 2; Actual: 4]',
  './test-files/md009.md:7:1 MD009/no-trailing-spaces Trailing spaces [Expected: 0 or 2; Actual: 1]',
  './test-files/md009.md:13:1 MD009/no-trailing-spaces Trailing spaces [Expected: 0 or 2; Actual: 3]',

  './test-files/md010.md:2:1 MD010/no-hard-tabs Hard tabs [Column: 1]',

  './test-files/md011.md:1:1 MD011/no-reversed-links Reversed link syntax [(https://google.com)[Google]]',

  './test-files/md014.md:4:1 MD014/commands-show-output Dollar signs used before commands without showing output [Context: "$ ls"]',
  './test-files/md014.md:5:1 MD014/commands-show-output Dollar signs used before commands without showing output [Context: "$ git branch"]',

  './test-files/md018.md:1:1 MD018/no-missing-space-atx No space after hash on atx style heading [Context: "#No space after hash on atx st..."]',

  './test-files/md019.md:1:1 MD019/no-multiple-space-atx Multiple spaces after hash on atx style heading [Context: "#  Multiple spaces after hash ..."]',

  './test-files/md020.md:1:1 MD020/no-missing-space-closed-atx No space inside hashes on closed atx style heading [Context: "#No space insid... style heading#"]',

  './test-files/md021.md:1 MD003/heading-style/header-style Heading style [Expected: atx; Actual: atx_closed]',
  './test-files/md021.md:1:1 MD021/no-multiple-space-closed-atx Multiple spaces inside hashes on closed atx style heading [Context: "#  Multiple spa...tyle heading  #"]',

  './test-files/md022.md:1 MD022/blanks-around-headings/blanks-around-headers Headings should be surrounded by blank lines [Expected: 1; Actual: 0; Below] [Context: "# Headings should be surrounded by blank lines"]',
  './test-files/md022.md:2 MD022/blanks-around-headings/blanks-around-headers Headings should be surrounded by blank lines [Expected: 2; Actual: 1; Above] [Context: "## lines_above: 2, lines_below: 1"]',

  './test-files/md023.md:1:1 MD023/heading-start-left/header-start-left Headings must start at the beginning of the line [Context: "  # Headings must start at the..."]',

  './test-files/md024.md:10 MD024/no-duplicate-heading/no-duplicate-header Multiple headings with the same content [Context: "## no-duplicate-heading"]',

  './test-files/md025.md:4 MD025/single-title/single-h1 Multiple top-level headings in the same document [Context: "# single-h1: true"]',

  './test-files/md026.md:1:34 MD026/no-trailing-punctuation Trailing punctuation in heading [Punctuation: \':\']',
  './test-files/md026.md:4:33 MD026/no-trailing-punctuation Trailing punctuation in heading [Punctuation: \'!\']',
  './test-files/md026.md:7:34 MD026/no-trailing-punctuation Trailing punctuation in heading [Punctuation: \'.\']',

  './test-files/md027.md:1:1 MD027/no-multiple-space-blockquote Multiple spaces after blockquote symbol [Context: ">  Multiple spaces after block..."]',

  './test-files/md028.md:2 MD028/no-blanks-blockquote Blank line inside blockquote',

  './test-files/md029.md:2:1 MD029/ol-prefix Ordered list item prefix [Expected: 1; Actual: 2; Style: 1/1/1]',
  './test-files/md029.md:3:1 MD029/ol-prefix Ordered list item prefix [Expected: 1; Actual: 3; Style: 1/1/1]',
  './test-files/md029.md:5:1 MD029/ol-prefix Ordered list item prefix [Expected: 1; Actual: 0; Style: 1/1/1]',
  './test-files/md029.md:6:1 MD029/ol-prefix Ordered list item prefix [Expected: 1; Actual: 0; Style: 1/1/1]',
  './test-files/md029.md:7:1 MD029/ol-prefix Ordered list item prefix [Expected: 1; Actual: 0; Style: 1/1/1]',
  './test-files/md029.md:14:1 MD029/ol-prefix Ordered list item prefix [Expected: 1; Actual: 3; Style: 1/1/1]',

  './test-files/md030.md:3:1 MD030/list-marker-space Spaces after list markers [Expected: 1; Actual: 2]',
  './test-files/md030.md:5:1 MD030/list-marker-space Spaces after list markers [Expected: 1; Actual: 2]',
  './test-files/md030.md:10:1 MD030/list-marker-space Spaces after list markers [Expected: 1; Actual: 3]',
  './test-files/md030.md:14:1 MD030/list-marker-space Spaces after list markers [Expected: 1; Actual: 3]',
  './test-files/md030.md:19:1 MD030/list-marker-space Spaces after list markers [Expected: 1; Actual: 3]',
  './test-files/md030.md:21:1 MD030/list-marker-space Spaces after list markers [Expected: 1; Actual: 3]',
  './test-files/md030.md:23:1 MD030/list-marker-space Spaces after list markers [Expected: 1; Actual: 2]',
  './test-files/md030.md:27:1 MD030/list-marker-space Spaces after list markers [Expected: 1; Actual: 2]',

  './test-files/md031.md:2 MD031/blanks-around-fences Fenced code blocks should be surrounded by blank lines [Context: "```md"]',
  './test-files/md031.md:4 MD031/blanks-around-fences Fenced code blocks should be surrounded by blank lines [Context: "```"]',

  './test-files/md032.md:2 MD032/blanks-around-lists Lists should be surrounded by blank lines [Context: "* blanks-around-lists:"]',
  './test-files/md032.md:3 MD032/blanks-around-lists Lists should be surrounded by blank lines [Context: "true"]',
  './test-files/md032.md:4 MD032/blanks-around-lists Lists should be surrounded by blank lines [Context: "1. blanks-around-lists:"]',

  './test-files/md033.md:1:1 MD033/no-inline-html Inline HTML [Element: h1]',
  './test-files/md033.md:3:1 MD033/no-inline-html Inline HTML [Element: em]',
  './test-files/md033.md:5:13 MD033/no-inline-html Inline HTML [Element: strong]',

  './test-files/md035.md:3 MD035/hr-style Horizontal rule style [Expected: * * *; Actual: ---]',
  './test-files/md035.md:7 MD035/hr-style Horizontal rule style [Expected: * * *; Actual: - - -]',
  './test-files/md035.md:11 MD035/hr-style Horizontal rule style [Expected: * * *; Actual: ***]',
  './test-files/md035.md:15 MD035/hr-style Horizontal rule style [Expected: * * *; Actual: ----]',
  './test-files/md035.md:19 MD035/hr-style Horizontal rule style [Expected: * * *; Actual: ****]',
  './test-files/md035.md:23 MD035/hr-style Horizontal rule style [Expected: * * *; Actual: * * * *]',

  './test-files/md037.md:3:9 MD037/no-space-in-emphasis Spaces inside emphasis markers [Context: "* em *"]',
  './test-files/md037.md:5:9 MD037/no-space-in-emphasis Spaces inside emphasis markers [Context: "** strong **"]',
  './test-files/md037.md:7:9 MD037/no-space-in-emphasis Spaces inside emphasis markers [Context: "*** em and strong ***"]',

  './test-files/md038.md:3:19 MD038/no-space-in-code Spaces inside code span elements [Context: "` true`"]',
  './test-files/md038.md:5:19 MD038/no-space-in-code Spaces inside code span elements [Context: "`true `"]',

  './test-files/md039.md:1:1 MD039/no-space-in-links Spaces inside link text [Context: "[ Spaces inside link text]"]',
  './test-files/md039.md:3:1 MD039/no-space-in-links Spaces inside link text [Context: "[Spaces inside link text ]"]',
  './test-files/md039.md:5:1 MD039/no-space-in-links Spaces inside link text [Context: "[ Spaces inside link text ]"]',

  './test-files/md040.md:3 MD040/fenced-code-language Fenced code blocks should have a language specified [Context: "```"]',

  './test-files/md042.md:1:1 MD042/no-empty-links No empty links [Context: "[No empty links]()"]',
  './test-files/md042.md:3:1 MD042/no-empty-links No empty links [Context: "[No empty links](#)"]',
  './test-files/md042.md:5:1 MD051/link-fragments Link fragments should be valid [Context: "[No empty links](#example)"]',

  './test-files/md044.md:3:11 MD044/proper-names Proper names should have the correct capitalization [Expected: JavaScript; Actual: javascript]',
  './test-files/md044.md:5:11 MD044/proper-names Proper names should have the correct capitalization [Expected: JavaScript; Actual: javaScript]',
  './test-files/md044.md:7:11 MD044/proper-names Proper names should have the correct capitalization [Expected: JavaScript; Actual: Javascript]',

  './test-files/md045.md:1 MD045/no-alt-text Images should have alternate text (alt text)',
  './test-files/md045.md:3 MD045/no-alt-text Images should have alternate text (alt text)',

  './test-files/md046.md:3 MD046/code-block-style Code block style [Expected: fenced; Actual: indented]',

  './test-files/md047.md:3:29 MD047/single-trailing-newline Files should end with a single newline character',

  './test-files/md048.md:8 MD048/code-fence-style Code fence style [Expected: backtick; Actual: tilde]',

  './test-files/md049.md:5:9 MD049/emphasis-style Emphasis style should be consistent [Expected: asterisk; Actual: underscore]',

  './test-files/md050.md:5:9 MD050/strong-style Strong style should be consistent [Expected: asterisk; Actual: underscore]',

  './test-files/md051.md:5:1 MD051/link-fragments Link fragments should be valid [Context: "[Link does not exist](#fragment)"]',

  './test-files/md052.md:14:7 MD052/reference-links-images Reference links and images should use a label that is defined [Missing link or image reference definition: "content"] [Context: "[Words][content]"]',
  './test-files/md052.md:15:12 MD052/reference-links-images Reference links and images should use a label that is defined [Missing link or image reference definition: "content"] [Context: "[content][]"]',
  './test-files/md052.md:18:7 MD052/reference-links-images Reference links and images should use a label that is defined [Missing link or image reference definition: "picture"] [Context: "![Words][picture]"]',
  './test-files/md052.md:19:12 MD052/reference-links-images Reference links and images should use a label that is defined [Missing link or image reference definition: "picture"] [Context: "![picture][]"]',

  './test-files/md053.md:12:1 MD053/link-image-reference-definitions Link and image reference definitions should be needed [Unused link or image reference definition: "content"] [Context: "[content]: https://exampl.com/..."]',
  './test-files/md053.md:13:1 MD053/link-image-reference-definitions Link and image reference definitions should be needed [Unused link or image reference definition: "picture"] [Context: "[picture]: https://exampl.com/..."]'
];

if (JSON.stringify(results) !== JSON.stringify(expectedResults)) {
  testPassed = false;
  let diffResults = results.filter(function (result) {
    return !expectedResults.includes(result);
  });
  let diffExpectations = expectedResults.filter(function (expectation) {
    return !results.includes(expectation);
  });
  if (diffResults.length) {
    console.log('Unexpected errors:')
    console.log(diffResults);
  }
  if (diffExpectations.length) {
    console.log('These should have occurred, but didn\'t:')
    console.log(diffExpectations);
  }
  if (diffResults.length) {
    console.log('Total Unexpected: ' + diffResults.length);
  }
  if (diffExpectations.length) {
    console.log('Total Missing that were Expected: ' + diffExpectations.length);
  }
}

/////////////////////////////////////////////////////////////////////////////////////

if (testPassed) {
  console.log('Lint ran successfully.');
} else {
  throw 'TEST FAILED';
}
