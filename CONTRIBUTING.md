# Contributing to Tao Wallet

When contributing to this repository, please first discuss the change you wish to make via Jira issue
with the owners of this repository before making a change.

Please note we have a code of conduct, please follow it in all your interactions with the project.

- [Submitting an Issue](#submitting-an-issue)
- [Submitting a PR](#submitting-a-pr)
- [Contributing](#contributing)
- [CI/CD](#ci/cd)
- [Running Tests](#tests)
- [Code of Conduct](#code-of-conduct)

#### Submitting an Issue

- When contributing to the project, please discuss the change you want to make via [GitHub issue](https://github.com/dannydeezy/tao-wallet/issues) before making a change and submitting a PR.

#### Submitting a PR

- Open a pull request with the patch.

- Make sure your PR description clearly describes the problem that you've solving, and how this patch achieves that goal. Include a link to the relevant GitHub issue.

- Changes that only fix whitespace / formatting will generally not be accepted. Drive-by style fixes are fine when working on adjacent areas of the code, but please put them in a separate commit from functional changes.

- Where possible, please provide unit tests / integration tests that demonstrate new functionality is working.

Our maintainers are committed to reviewing patches in a timely manner. That said, we do have other things on our plate, so please be patient.

If you use GPG, feel free to sign your commits.

Once your patch has been reviewed and has been accepted, you are free to merge it.

## Contributing

Use git flow principle for development

- [https://nvie.com/posts/a-successful-git-branching-model/](https://nvie.com/posts/a-successful-git-branching-model/)

### Git flow config

- Branch name for production releases: main
- Branch name for "next release" development: develop
- Feature branches: feature/
- Release branches: release/
- Hotfix branches: hotfix/
- Support branches: support/
- Version tag prefix: v

## CI/CD

_TBD_

### Tests

_TBD_

## Formatting your source code

Tao-wallet uses [prettier](https://prettier.io/) to format the source code.

A better way is to set up your IDE to format the changed files on each file save, it also runs automatically on commit.

### VS Code

1. Install [Prettier-vscode](https://github.com/prettier/prettier-vscode) extension for VS Code.
2. It will automatically pick up the settings from `.prettier`.
   Follow instructions in link to configure

### WebStorm / IntelliJ

1. Install the [Prettier](https://plugins.jetbrains.com/plugin/10456-prettier) plugin

## Linting/verifying your Source Code

You can check that your code is properly formatted and adheres to coding style by running:

```shell
$ npm run lint
```

## Code of Conduct

### Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project
a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, gender identity and expression, level of experience,
nationality, personal appearance, race, religion, or sexual identity and
orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment
include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

- The use of sexualized language or imagery and unwelcome sexual attention or
  advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or electronic
  address, without explicit permission
- Other conduct which could reasonably be considered inappropriate in a
  professional setting

### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

### Scope

This Code of Conduct applies both within project spaces and in public spaces
when an individual is representing the project. Examples of
representing a project include using an official project e-mail
address, posting via an official social media account, or acting as an appointed
representative at an online or offline event. Representation of a project may be
further defined and clarified by project maintainers.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by contacting the project team [Twitter](https://twitter.com/dannydiekroeger). All
complaints will be reviewed and investigated and will result in a response that
is deemed necessary and appropriate to the circumstances. The project team is
obligated to maintain confidentiality with regard to the reporter of an incident.
Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good
faith may face temporary or permanent repercussions as determined by other
members of the project's leadership.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4,
available at [http://contributor-covenant.org/version/1/4][version]

[homepage]: http://contributor-covenant.org
[version]: http://contributor-covenant.org/version/1/4/
