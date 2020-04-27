function generateProjectUrl(github, title) {
  const kebabCaseTitle = title.toLowerCase().split(" ").join("-");
  return `https://github.com/${github}/${kebabCaseTitle}`;
}

function renderLicenseBadge(license, github, title) {
  if (license !== "None") {
    return `[![GitHub license](https://img.shields.io/badge/license-${license}-blue.svg)](${generateProjectUrl(github, title)})`
  }
  return ''
}

function renderLicenseSection(license) {
  if (license !== "None") {
    return (
      `
This project is licensed under the ${license} license.`
    )
  }
  return ''
}

// Development will happen in generate markdown
function generateMarkdown(data) {
  console.log(data)
  return `
------------------------------------------ ${data.title} ---------------------------------------

Please visit:
${renderLicenseBadge(data.license, data.github, data.title)}

**** Description:
${data.description}

---------------------------------- Table of Contents ----------------------------------

                              [Installation](#installation)

                                     [Usage](#usage)

                                   [License](#license)

                              [Contributing](#contributing)

                                     [Tests](#tests)

                                 [Questions](#questions)

## Installation:
please run the following command:
${data.installation}

## Usage
${data.usage}

## License
${renderLicenseSection(data.license)}

## contributing
${data.contributing}

## Tests
please run the following command:
${data.test}

## Questions
  <img src = "${data.avatar_url}" >
  ${data.emailAddress}

`;
}

module.exports = generateMarkdown;
