# Contribution guidelines
## How to contribute

Follow [these steps](https://codeburst.io/a-step-by-step-guide-to-making-your-first-github-contribution-5302260a2940)  
After you pull requested your branch it will be reviewed by me ([SMJS](https://github.com/SMJSGaming)) or any future collaborator on the project.  
If we think the pull request is up to the standards we want it will be added, otherwise it will be declined.  
If your pull request was accepted and merged you will be added to the [Credits](https://github.com/SMJSGaming/GD-NodeJS-API#credits).

## The standards

* All files should be exported as a class.
* All files should have additional [jsDocs](https://jsdoc.app/) in the same format as all files.
* All classes which are called new multiple times should be made singletons as done in [the converter classes](https://github.com/SMJSGaming/GD-NodeJS-API/blob/master/api/converters).
* All updates on values and methods should have a version assigned.
* Detailed info about the update must be provided in [the changelogs](https://github.com/SMJSGaming/GD-NodeJS-API/blob/master/CHANGELOGS.md).
* All updates should follow the [Code of Conduct](https://github.com/SMJSGaming/GD-NodeJS-API/blob/master/CODE_OF_CONDUCT.md).
* Casing:
    * File names should be PascalCase.
    * Class names should be PascalCase.
    * Folder names should be camelCase.
    * Value and method names should be camelCase.