"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const fs = require("fs");
const path = require("path");
const { pascalCase } = require("pascal-case");

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to ${chalk.red(
          "generator-g-react"
        )} MUI component extender generator, follow the quick and easy configuration to create a new MUI extended component!`
      )
    );

    const answers = await this.prompt([
      {
        type: "input",
        name: "componentName",
        message: "What is your component name?"
      },
      {
        type: "input",
        name: "muiComponentName",
        message: "What is the MUI component name you want to extend?"
      }
    ]);

    if (answers.componentName === "" || answers.muiComponentName === "") {
      this.log(
        yosay(chalk.red("Please give your component a name next time!"))
      );
      process.exit(1);
      return;
    }

    answers.componentName = pascalCase(answers.componentName);
    this.answers = answers;
  }

  writing() {
    /**
     * Index.tsx component file
     */

    this.fs.copyTpl(
      this.templatePath("index.ejs"),
      this.destinationPath(
        `./src/components/${this.answers.componentName}/index.tsx`
      ),
      {
        ...this.answers
      }
    );

    /**
     * Index.hooks.tsx hooks file
     */

    this.fs.copyTpl(
      this.templatePath("index.hooks.ejs"),
      this.destinationPath(
        `./src/components/${this.answers.componentName}/index.hooks.tsx`
      ),
      {
        ...this.answers
      }
    );

    /**
     * /src/components/index.tsx export file
     */

    const content = `export {default as ${this.answers.componentName}} from './${this.answers.componentName}'\n`;

    fs.appendFileSync(
      path.join(this.destinationRoot(), "src", "components", "index.tsx"),
      content
    );
  }
};
