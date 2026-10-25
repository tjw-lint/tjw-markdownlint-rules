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
  'test-files/md001.md:4 error MD001/heading-increment Heading levels should only increment by one level at a time [Expected: h2; Actual: h3]',

  'test-files/md003.md:1 error MD003/heading-style Heading style [Expected: atx; Actual: atx_closed]',

  'test-files/md004.md:1:1 error MD004/ul-style Unordered list style [Expected: asterisk; Actual: dash]',
  'test-files/md004.md:2:5 error MD004/ul-style Unordered list style [Expected: asterisk; Actual: dash]',
  'test-files/md004.md:4:1 error MD004/ul-style Unordered list style [Expected: asterisk; Actual: plus]',
  'test-files/md004.md:5:5 error MD004/ul-style Unordered list style [Expected: asterisk; Actual: plus]',

  'test-files/md005.md:3:1 error MD005/list-indent Inconsistent indentation for list items at the same level [Expected: 4; Actual: 5]',
  'test-files/md005.md:3:1 error MD007/ul-indent Unordered list indentation [Expected: 4; Actual: 5]',

  'test-files/md006.md:1:1 error MD007/ul-indent Unordered list indentation [Expected: 0; Actual: 2]',

  'test-files/md007.md:2:1 error MD007/ul-indent Unordered list indentation [Expected: 4; Actual: 2]',
  'test-files/md007.md:5:1 error MD007/ul-indent Unordered list indentation [Expected: 4; Actual: 3]',

  'test-files/md009.md:1:19 error MD009/no-trailing-spaces Trailing spaces [Expected: 0 or 2; Actual: 1]',
  'test-files/md009.md:3:19 error MD009/no-trailing-spaces Trailing spaces [Expected: 0 or 2; Actual: 3]',
  'test-files/md009.md:4:19 error MD009/no-trailing-spaces Trailing spaces [Expected: 0 or 2; Actual: 4]',
  'test-files/md009.md:7:1 error MD009/no-trailing-spaces Trailing spaces [Expected: 0 or 2; Actual: 1]',
  'test-files/md009.md:13:1 error MD009/no-trailing-spaces Trailing spaces [Expected: 0 or 2; Actual: 3]',

  'test-files/md010.md:2:1 error MD010/no-hard-tabs Hard tabs [Column: 1]',

  'test-files/md011.md:1:1 error MD011/no-reversed-links Reversed link syntax [(https://google.com)[Google]]',

  'test-files/md014.md:4:1 error MD014/commands-show-output Dollar signs used before commands without showing output [Context: "$ ls"]',
  'test-files/md014.md:5:1 error MD014/commands-show-output Dollar signs used before commands without showing output [Context: "$ git branch"]',

  'test-files/md018.md:1:1 error MD018/no-missing-space-atx No space after hash on atx style heading [Context: "#No space after hash on atx st..."]',

  'test-files/md019.md:1:3 error MD019/no-multiple-space-atx Multiple spaces after hash on atx style heading [Context: "#  Multiple spaces after hash ..."]',

  'test-files/md020.md:1:1 error MD020/no-missing-space-closed-atx No space inside hashes on closed atx style heading [Context: "#No space insid... style heading#"]',

  'test-files/md021.md:1 error MD003/heading-style Heading style [Expected: atx; Actual: atx_closed]',
  'test-files/md021.md:1:62 error MD021/no-multiple-space-closed-atx Multiple spaces inside hashes on closed atx style heading [Context: "...on closed atx style heading  #"]',
  'test-files/md021.md:1:3 error MD021/no-multiple-space-closed-atx Multiple spaces inside hashes on closed atx style heading [Context: "#  Multiple spaces inside hash..."]',

  'test-files/md022.md:1 error MD022/blanks-around-headings Headings should be surrounded by blank lines [Expected: 1; Actual: 0; Below] [Context: "# Headings should be surrounded by blank lines"]',
  'test-files/md022.md:2 error MD022/blanks-around-headings Headings should be surrounded by blank lines [Expected: 2; Actual: 0; Above] [Context: "## lines_above: 2, lines_below: 1"]',

  'test-files/md023.md:1:1 error MD023/heading-start-left Headings must start at the beginning of the line [Context: "  # Headings must start at the..."]',

  'test-files/md024.md:10 error MD024/no-duplicate-heading Multiple headings with the same content [Context: "no-duplicate-heading"]',

  'test-files/md025.md:4 error MD025/single-title/single-h1 Multiple top-level headings in the same document [Context: "single-h1: true"]',

  'test-files/md026.md:1:34 error MD026/no-trailing-punctuation Trailing punctuation in heading [Punctuation: \':\']',
  'test-files/md026.md:4:33 error MD026/no-trailing-punctuation Trailing punctuation in heading [Punctuation: \'!\']',
  'test-files/md026.md:7:34 error MD026/no-trailing-punctuation Trailing punctuation in heading [Punctuation: \'.\']',

  'test-files/md027.md:1:3 error MD027/no-multiple-space-blockquote Multiple spaces after blockquote symbol [Context: ">  Multiple spaces after block..."]',

  'test-files/md028.md:2 error MD028/no-blanks-blockquote Blank line inside blockquote',

  'test-files/md029.md:2:1 error MD029/ol-prefix Ordered list item prefix [Expected: 1; Actual: 2; Style: 1/1/1]',
  'test-files/md029.md:3:1 error MD029/ol-prefix Ordered list item prefix [Expected: 1; Actual: 3; Style: 1/1/1]',
  'test-files/md029.md:5:1 error MD029/ol-prefix Ordered list item prefix [Expected: 1; Actual: 0; Style: 1/1/1]',
  'test-files/md029.md:6:1 error MD029/ol-prefix Ordered list item prefix [Expected: 1; Actual: 0; Style: 1/1/1]',
  'test-files/md029.md:7:1 error MD029/ol-prefix Ordered list item prefix [Expected: 1; Actual: 0; Style: 1/1/1]',
  'test-files/md029.md:14:1 error MD029/ol-prefix Ordered list item prefix [Expected: 1; Actual: 3; Style: 1/1/1]',

  'test-files/md030.md:3:1 error MD030/list-marker-space Spaces after list markers [Expected: 1; Actual: 2]',
  'test-files/md030.md:5:1 error MD030/list-marker-space Spaces after list markers [Expected: 1; Actual: 2]',
  'test-files/md030.md:10:1 error MD030/list-marker-space Spaces after list markers [Expected: 1; Actual: 3]',
  'test-files/md030.md:14:1 error MD030/list-marker-space Spaces after list markers [Expected: 1; Actual: 3]',
  'test-files/md030.md:19:1 error MD030/list-marker-space Spaces after list markers [Expected: 1; Actual: 3]',
  'test-files/md030.md:21:1 error MD030/list-marker-space Spaces after list markers [Expected: 1; Actual: 3]',
  'test-files/md030.md:23:1 error MD030/list-marker-space Spaces after list markers [Expected: 1; Actual: 2]',
  'test-files/md030.md:27:1 error MD030/list-marker-space Spaces after list markers [Expected: 1; Actual: 2]',

  'test-files/md031.md:2 error MD031/blanks-around-fences Fenced code blocks should be surrounded by blank lines [Context: "```md"]',
  'test-files/md031.md:4 error MD031/blanks-around-fences Fenced code blocks should be surrounded by blank lines [Context: "```"]',

  'test-files/md032.md:2 error MD032/blanks-around-lists Lists should be surrounded by blank lines [Context: "* blanks-around-lists:"]',
  'test-files/md032.md:3 error MD032/blanks-around-lists Lists should be surrounded by blank lines [Context: "true"]',
  'test-files/md032.md:4 error MD032/blanks-around-lists Lists should be surrounded by blank lines [Context: "1. blanks-around-lists:"]',

  'test-files/md033.md:1:1 error MD033/no-inline-html Inline HTML [Element: h1]',
  'test-files/md033.md:3:1 error MD033/no-inline-html Inline HTML [Element: em]',
  'test-files/md033.md:5:13 error MD033/no-inline-html Inline HTML [Element: strong]',

  'test-files/md034.md:3:20 error MD054/link-image-style Link and image style [Context: "<https://www.example.com>"]',

  'test-files/md035.md:3 error MD035/hr-style Horizontal rule style [Expected: * * *; Actual: ---]',
  'test-files/md035.md:7 error MD035/hr-style Horizontal rule style [Expected: * * *; Actual: - - -]',
  'test-files/md035.md:11 error MD035/hr-style Horizontal rule style [Expected: * * *; Actual: ***]',
  'test-files/md035.md:15 error MD035/hr-style Horizontal rule style [Expected: * * *; Actual: ----]',
  'test-files/md035.md:19 error MD035/hr-style Horizontal rule style [Expected: * * *; Actual: ****]',
  'test-files/md035.md:23 error MD035/hr-style Horizontal rule style [Expected: * * *; Actual: * * * *]',

  'test-files/md037.md:3:10 error MD037/no-space-in-emphasis Spaces inside emphasis markers [Context: "* e"]',
  'test-files/md037.md:3:13 error MD037/no-space-in-emphasis Spaces inside emphasis markers [Context: "m *"]',
  'test-files/md037.md:5:11 error MD037/no-space-in-emphasis Spaces inside emphasis markers [Context: "** s"]',
  'test-files/md037.md:5:18 error MD037/no-space-in-emphasis Spaces inside emphasis markers [Context: "g **"]',
  'test-files/md037.md:7:12 error MD037/no-space-in-emphasis Spaces inside emphasis markers [Context: "*** e"]',
  'test-files/md037.md:7:26 error MD037/no-space-in-emphasis Spaces inside emphasis markers [Context: "g ***"]',

  'test-files/md038.md:3:20 error MD038/no-space-in-code Spaces inside code span elements [Context: "` true`"]',
  'test-files/md038.md:5:24 error MD038/no-space-in-code Spaces inside code span elements [Context: "`true `"]',

  'test-files/md039.md:1:2 error MD039/no-space-in-links Spaces inside link text [Context: "[ Spaces inside link text]"]',
  'test-files/md039.md:3:25 error MD039/no-space-in-links Spaces inside link text [Context: "[Spaces inside link text ]"]',
  'test-files/md039.md:5:2 error MD039/no-space-in-links Spaces inside link text [Context: "[ Spaces inside link text ]"]',
  'test-files/md039.md:5:26 error MD039/no-space-in-links Spaces inside link text [Context: "[ Spaces inside link text ]"]',

  'test-files/md040.md:3 error MD040/fenced-code-language Fenced code blocks should have a language specified [Context: "```"]',

  'test-files/md042.md:1:1 error MD042/no-empty-links No empty links [Context: "[No empty links]()"]',
  'test-files/md042.md:3:1 error MD042/no-empty-links No empty links [Context: "[No empty links](#)"]',
  'test-files/md042.md:5:1 error MD051/link-fragments Link fragments should be valid [Context: "[No empty links](#example)"]',

  'test-files/md044.md:3:11 error MD044/proper-names Proper names should have the correct capitalization [Expected: JavaScript; Actual: javascript]',
  'test-files/md044.md:5:11 error MD044/proper-names Proper names should have the correct capitalization [Expected: JavaScript; Actual: javaScript]',
  'test-files/md044.md:7:11 error MD044/proper-names Proper names should have the correct capitalization [Expected: JavaScript; Actual: Javascript]',

  'test-files/md045.md:1:1 error MD045/no-alt-text Images should have alternate text (alt text)',
  'test-files/md045.md:3:1 error MD045/no-alt-text Images should have alternate text (alt text)',
  'test-files/md045.md:9:1 error MD045/no-alt-text Images should have alternate text (alt text)',
  'test-files/md045.md:11:1 error MD045/no-alt-text Images should have alternate text (alt text)',

  'test-files/md046.md:3 error MD046/code-block-style Code block style [Expected: fenced; Actual: indented]',

  'test-files/md047.md:3:29 error MD047/single-trailing-newline Files should end with a single newline character',

  'test-files/md048.md:8 error MD048/code-fence-style Code fence style [Expected: backtick; Actual: tilde]',

  'test-files/md049.md:5:9 error MD049/emphasis-style Emphasis style [Expected: asterisk; Actual: underscore]',
  'test-files/md049.md:5:13 error MD049/emphasis-style Emphasis style [Expected: asterisk; Actual: underscore]',

  'test-files/md050.md:5:9 error MD050/strong-style Strong style [Expected: asterisk; Actual: underscore]',
  'test-files/md050.md:5:14 error MD050/strong-style Strong style [Expected: asterisk; Actual: underscore]',

  'test-files/md051.md:5:1 error MD051/link-fragments Link fragments should be valid [Context: "[Link does not exist](#fragment)"]',

  'test-files/md052.md:1:7 error MD054/link-image-style Link and image style [Context: "[text][label]"]',
  'test-files/md052.md:2:12 error MD054/link-image-style Link and image style [Context: "[label][]"]',
  'test-files/md052.md:3:11 error MD054/link-image-style Link and image style [Context: "[label]"]',
  'test-files/md052.md:5:7 error MD054/link-image-style Link and image style [Context: "![text][image]"]',
  'test-files/md052.md:6:12 error MD054/link-image-style Link and image style [Context: "![image][]"]',
  'test-files/md052.md:7:11 error MD054/link-image-style Link and image style [Context: "![image]"]',
  'test-files/md052.md:14:7 error MD052/reference-links-images Reference links and images should use a label that is defined [Missing link or image reference definition: "content"] [Context: "[Words][content]"]',
  'test-files/md052.md:15:12 error MD052/reference-links-images Reference links and images should use a label that is defined [Missing link or image reference definition: "content"] [Context: "[content][]"]',
  'test-files/md052.md:18:7 error MD052/reference-links-images Reference links and images should use a label that is defined [Missing link or image reference definition: "picture"] [Context: "![Words][picture]"]',
  'test-files/md052.md:19:12 error MD052/reference-links-images Reference links and images should use a label that is defined [Missing link or image reference definition: "picture"] [Context: "![picture][]"]',

  'test-files/md053.md:1:7 error MD054/link-image-style Link and image style [Context: "[text][label]"]',
  'test-files/md053.md:2:12 error MD054/link-image-style Link and image style [Context: "[label][]"]',
  'test-files/md053.md:3:11 error MD054/link-image-style Link and image style [Context: "[label]"]',
  'test-files/md053.md:5:7 error MD054/link-image-style Link and image style [Context: "![text][image]"]',
  'test-files/md053.md:6:12 error MD054/link-image-style Link and image style [Context: "![image][]"]',
  'test-files/md053.md:7:11 error MD054/link-image-style Link and image style [Context: "![image]"]',
  'test-files/md053.md:12:1 error MD053/link-image-reference-definitions Link and image reference definitions should be needed [Unused link or image reference definition: "content"] [Context: "[content]: https://exampl.com/..."]',
  'test-files/md053.md:13:1 error MD053/link-image-reference-definitions Link and image reference definitions should be needed [Unused link or image reference definition: "picture"] [Context: "[picture]: https://exampl.com/..."]',

  'test-files/md054.md:1:1 error MD054/link-image-style Link and image style [Context: "<https://autolink.com>"]',
  'test-files/md054.md:9:1 error MD054/link-image-style Link and image style [Context: "["full" link][url]"]',
  'test-files/md054.md:11:1 error MD054/link-image-style Link and image style [Context: "!["full" image][url]"]',
  'test-files/md054.md:16:1 error MD054/link-image-style Link and image style [Context: "[collapsed][]"]',
  'test-files/md054.md:18:1 error MD054/link-image-style Link and image style [Context: "![collapsed][]"]',
  'test-files/md054.md:23:1 error MD054/link-image-style Link and image style [Context: "[shortcut]"]',
  'test-files/md054.md:25:1 error MD054/link-image-style Link and image style [Context: "![shortcut]"]'
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
