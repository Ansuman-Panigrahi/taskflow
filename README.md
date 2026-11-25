# Angular Enterprise Frontend Engineering Roadmap

A practical, self-paced roadmap for an experienced Angular developer.
Use the **TaskFlow** Todo application as the implementation project.

## Scope

This roadmap focuses on engineering practices commonly expected in a
professional frontend team.

**Already assumed:** Angular components, templates, lifecycle hooks,
services and dependency injection, routing, forms, reusable components,
basic RxJS, TypeScript fundamentals, and basic HTTP integration.

**Explicitly excluded:** Angular fundamentals, end-to-end testing,
Playwright, and fixed learning timelines.

------------------------------------------------------------------------

# 1. Git and GitHub Collaboration

## Learn

-   [ ] Understand the difference between working tree, staging area,
    local repository, and remote repository.
-   [ ] Use feature branches and establish a consistent branch naming
    convention.
-   [ ] Understand merge commits, fast-forward merges, and squash
    merges.
-   [ ] Rebase a feature branch onto the latest base branch.
-   [ ] Resolve merge conflicts safely.
-   [ ] Use `git cherry-pick` to apply selected commits to another
    branch.
-   [ ] Understand when to use `git revert` versus `git reset`.
-   [ ] Recover work using `git reflog`.
-   [ ] Create annotated tags and understand semantic version tags.
-   [ ] Use GitHub Pull Requests for all changes instead of pushing
    directly to the main branch.
-   [ ] Write useful PR descriptions: context, changes, testing
    evidence, and risks.
-   [ ] Review a PR for correctness, maintainability, readability, and
    test coverage.
-   [ ] Use GitHub Issues, labels, milestones, and project boards.
-   [ ] Configure branch protection and required status checks.
-   [ ] Configure PR templates and issue templates.
-   [ ] Understand `CODEOWNERS` and automatic review requests.
-   [ ] Create GitHub Releases and maintain release notes.

## Implement in TaskFlow

-   [ ] Create `main` and `develop` branches, or use `main` with
    short-lived feature branches.
-   [ ] Create separate branches for features and bug fixes.
-   [ ] Open PRs for changes and merge them using squash merge.
-   [ ] Add a PR template with summary, testing checklist, and
    screenshots where relevant.
-   [ ] Add an issue template for bugs and feature requests.
-   [ ] Add a `CODEOWNERS` file.
-   [ ] Protect `main` and require CI checks before merging.
-   [ ] Create a version tag and GitHub Release.

## Completion criteria

You can manage a feature from issue creation through branch, commits, PR
review, CI checks, merge, tag, and release. You can also recover from a
mistaken commit or resolve a realistic merge conflict.

------------------------------------------------------------------------

# 2. Angular Unit Testing

Use the test runner supported by the Angular version and project
configuration. Learn the testing concepts independently of the runner.

## Learn

-   [ ] Understand the purpose and boundaries of unit tests.
-   [ ] Follow Arrange--Act--Assert (AAA) structure.
-   [ ] Write tests for pure functions and utility logic.
-   [ ] Understand `describe`, `it`/`test`, setup hooks, and test
    isolation.
-   [ ] Use Angular `TestBed` to configure a testing environment.
-   [ ] Create component tests that verify rendered output and user
    interactions.
-   [ ] Test component inputs, outputs, and relevant state changes.
-   [ ] Test services independently from components.
-   [ ] Use spies and mocks to isolate dependencies.
-   [ ] Test success, error, empty, and edge-case paths.
-   [ ] Test HTTP services with Angular's HTTP testing utilities.
-   [ ] Verify outgoing request URLs, methods, headers, and payloads.
-   [ ] Flush successful and failed HTTP responses in tests.
-   [ ] Test asynchronous code and observable-based behavior.
-   [ ] Test RxJS pipelines where the transformation logic is
    non-trivial.
-   [ ] Test NgRx reducers, selectors, and effects when NgRx is
    introduced.
-   [ ] Understand code coverage: statements, branches, functions, and
    lines.
-   [ ] Identify what should not be tested, such as framework internals
    or trivial implementation details.
-   [ ] Avoid brittle tests that depend on private implementation
    details.

## Implement in TaskFlow

-   [ ] Add tests for task validation and other pure utility functions.
-   [ ] Test task creation, editing, completion, deletion, and filtering
    logic.
-   [ ] Test components for empty, loading, populated, and error states
    where applicable.
-   [ ] Test service HTTP requests and error handling.
-   [ ] Mock dependencies rather than calling real APIs.
-   [ ] Configure a coverage report and review uncovered branches.
-   [ ] Add a test command that can run in CI without watch mode.

## Completion criteria

Core business logic, important components, and HTTP behavior have
meaningful automated unit tests. Tests run reliably in a clean checkout
and do not depend on a real backend.

------------------------------------------------------------------------

# 3. NgRx State Management

Learn NgRx Store before deciding whether every part of a small
application needs global state.

## Learn

-   [ ] Understand when local component state is sufficient and when
    shared application state is justified.
-   [ ] Understand the unidirectional data-flow model.
-   [ ] Understand Store, Actions, Reducers, Selectors, and Effects and
    the responsibility of each.
-   [ ] Define typed actions with clear event-oriented names.
-   [ ] Write pure reducers and maintain immutable state updates.
-   [ ] Design a feature state interface.
-   [ ] Register feature state and provide the Store.
-   [ ] Select data using memoized selectors.
-   [ ] Compose selectors for derived state.
-   [ ] Handle asynchronous operations using Effects.
-   [ ] Understand common RxJS flattening operators used in Effects:
    `switchMap`, `mergeMap`, `concatMap`, and `exhaustMap`.
-   [ ] Handle success and failure actions consistently.
-   [ ] Prevent duplicate requests and handle request loading states.
-   [ ] Understand normalized state and entity collections.
-   [ ] Use NgRx Entity for CRUD-style collections.
-   [ ] Use NgRx Store DevTools to inspect actions and state
    transitions.
-   [ ] Understand the trade-offs of global state, duplicated state, and
    derived state.
-   [ ] Learn SignalStore as an optional follow-up, not a prerequisite.

## Implement in TaskFlow

-   [ ] Introduce a `tasks` feature state.
-   [ ] Create actions for loading, adding, updating, deleting, and
    completing tasks.
-   [ ] Implement reducers for synchronous state transitions.
-   [ ] Create selectors for all tasks, completed tasks, active tasks,
    and task counts.
-   [ ] Use Effects for API operations.
-   [ ] Handle loading and error state through explicit actions and
    state.
-   [ ] Use NgRx Entity if the task collection benefits from normalized
    CRUD operations.
-   [ ] Inspect state transitions with DevTools.

## Completion criteria

You can explain and implement the complete flow from user interaction to
dispatched action, reducer/effect processing, state update, selector,
and UI update. You can justify which state belongs in NgRx and which
should remain local.

------------------------------------------------------------------------

# 4. Code Quality and Maintainability

## Learn

-   [ ] Configure ESLint for the Angular and TypeScript project.
-   [ ] Understand the difference between linting and formatting.
-   [ ] Configure Prettier and avoid conflicting ESLint formatting
    rules.
-   [ ] Define consistent naming, import, and file organization
    conventions.
-   [ ] Understand strict TypeScript settings and avoid unnecessary
    `any`.
-   [ ] Use explicit types at important application boundaries.
-   [ ] Identify duplicated logic and refactor it without
    over-abstraction.
-   [ ] Understand separation of concerns and dependency boundaries.
-   [ ] Review code for unnecessary subscriptions, memory leaks, and
    unclear observable ownership.
-   [ ] Understand basic complexity and maintainability indicators.
-   [ ] Understand SonarQube concepts: bugs, vulnerabilities, code
    smells, duplications, coverage, and quality gates.
-   [ ] Understand how a quality gate can fail a build.
-   [ ] Learn how to triage static-analysis findings instead of blindly
    suppressing rules.

## Implement in TaskFlow

-   [ ] Add lint and format scripts.
-   [ ] Configure rules for unused variables, explicit `any`, and
    consistent imports.
-   [ ] Run linting and formatting checks before committing.
-   [ ] Add a SonarQube project configuration or document how the
    project would be analyzed.
-   [ ] Define a small quality gate: lint passes, tests pass, and no new
    high-severity findings.

## Completion criteria

The project has repeatable code-quality checks. A contributor can run
them locally, and CI can enforce the same standards.

------------------------------------------------------------------------

# 5. Docker for Angular Applications

## Learn

-   [ ] Understand images, containers, registries, layers, and container
    ports.
-   [ ] Understand the difference between build-time and runtime
    configuration for frontend applications.
-   [ ] Write a Dockerfile for an Angular production build.
-   [ ] Use a multi-stage Docker build: Node build stage and Nginx
    runtime stage.
-   [ ] Understand Docker build context and `.dockerignore`.
-   [ ] Serve Angular static files through Nginx.
-   [ ] Configure Nginx fallback routing for Angular client-side routes.
-   [ ] Understand container port mapping and environment configuration.
-   [ ] Build, run, stop, inspect, and remove containers.
-   [ ] Use Docker Compose to define a frontend and a local API service
    when needed.
-   [ ] Understand image tags and why `latest` alone is not a reliable
    release identifier.
-   [ ] Reduce image size and avoid copying development dependencies
    into the runtime image.
-   [ ] Understand that secrets must not be embedded in frontend bundles
    or Docker images.

## Implement in TaskFlow

-   [ ] Create a production Dockerfile using a multi-stage build.
-   [ ] Add a `.dockerignore`.
-   [ ] Configure Nginx to serve the Angular app and support client-side
    routes.
-   [ ] Build and run the container locally.
-   [ ] Verify that refreshing a nested Angular route works.
-   [ ] Tag the image with a version.
-   [ ] Optionally add Docker Compose if TaskFlow has a local API
    service.

## Completion criteria

A clean checkout can produce a production image that serves the Angular
application correctly. The final image contains only the runtime assets
and required web server, not the development toolchain.

------------------------------------------------------------------------

# 6. GitHub Actions

## Learn

-   [ ] Understand workflow files and YAML structure.
-   [ ] Understand events and triggers such as `push`, `pull_request`,
    and manual dispatch.
-   [ ] Understand workflows, jobs, steps, runners, and actions.
-   [ ] Use checkout and setup actions to prepare the environment.
-   [ ] Configure Node.js versions and dependency installation.
-   [ ] Cache package-manager dependencies.
-   [ ] Run lint, unit tests, and production builds in a workflow.
-   [ ] Understand job dependencies and parallel jobs.
-   [ ] Use workflow artifacts to retain reports or build outputs.
-   [ ] Store sensitive values in GitHub Secrets and variables.
-   [ ] Apply least-privilege workflow permissions.
-   [ ] Understand environment protection rules and deployment
    approvals.
-   [ ] Pin third-party actions to reviewed versions or commit SHAs
    according to team policy.
-   [ ] Read workflow logs and diagnose failed jobs.

## Implement in TaskFlow

-   [ ] Create a PR workflow that runs lint, unit tests, and production
    build.
-   [ ] Run the same checks on pushes to the main branch.
-   [ ] Cache dependencies to reduce repeated installation time.
-   [ ] Upload test coverage reports as artifacts.
-   [ ] Configure workflow permissions explicitly.
-   [ ] Make required CI checks a branch protection requirement.

## Completion criteria

Every PR receives automated lint, test, and build checks. Failed checks
prevent merging, and logs make failures diagnosable.

------------------------------------------------------------------------

# 7. CI/CD and Release Workflow

## Learn

-   [ ] Distinguish Continuous Integration, Continuous Delivery, and
    Continuous Deployment.
-   [ ] Understand the stages of a frontend pipeline: install, lint,
    test, build, package, publish, deploy, verify.
-   [ ] Understand how CI differs from a deployment workflow.
-   [ ] Build a Docker image in CI.
-   [ ] Authenticate to a container registry using secrets.
-   [ ] Publish versioned images to a registry.
-   [ ] Understand environment-specific configuration.
-   [ ] Understand deployment environments such as staging and
    production.
-   [ ] Understand deployment approvals and protected environments.
-   [ ] Understand basic deployment strategies: recreate, rolling, and
    blue-green at a conceptual level.
-   [ ] Understand rollback by redeploying a previously published image.
-   [ ] Verify deployments with a health check or smoke check.
-   [ ] Understand release tags and traceability from source commit to
    deployed image.

## Implement in TaskFlow

-   [ ] Extend GitHub Actions to build a Docker image after successful
    CI.
-   [ ] Publish the image to GitHub Container Registry (GHCR).
-   [ ] Tag images using a release version and commit SHA.
-   [ ] Create a staging deployment workflow if a hosting environment is
    available.
-   [ ] Require approval before production deployment, if production is
    configured.
-   [ ] Document how to roll back to the previous image tag.
-   [ ] Keep CI checks separate from deployment permissions.

## Completion criteria

A release can be traced from Git commit to version tag, CI run,
published image, and deployment. You can explain how to deploy a
previous image when a release has a problem.

------------------------------------------------------------------------

# 8. Frontend Security and Dependency Management

## Learn

-   [ ] Understand the frontend security boundary: browser code is
    public and cannot safely contain secrets.
-   [ ] Understand XSS and safe handling of untrusted content.
-   [ ] Understand why Angular template escaping is useful and when
    unsafe DOM APIs bypass protections.
-   [ ] Understand the risks of `innerHTML`, direct DOM manipulation,
    and bypassing Angular sanitization.
-   [ ] Understand CSRF at a high level and when it matters for
    cookie-based authentication.
-   [ ] Understand secure token and session handling trade-offs in
    browser applications.
-   [ ] Understand Content Security Policy (CSP): directives, sources,
    nonces, and report-only mode.
-   [ ] Understand HTTPS and secure transport.
-   [ ] Audit dependencies for known vulnerabilities.
-   [ ] Understand direct versus transitive dependencies.
-   [ ] Use `npm audit` and interpret severity and remediation output.
-   [ ] Understand lockfiles and why they should be committed.
-   [ ] Review dependency updates and breaking changes before merging.
-   [ ] Understand secret scanning and why accidentally committed
    credentials must be rotated, not merely deleted from the latest
    commit.

## Implement in TaskFlow

-   [ ] Add a dependency audit command to the project workflow.
-   [ ] Run dependency scanning in CI and review its output.
-   [ ] Keep the package lockfile committed.
-   [ ] Add a CSP appropriate to the app's actual hosting and API
    requirements.
-   [ ] Review the app for unsafe HTML rendering and unnecessary
    sanitization bypasses.
-   [ ] Ensure no API keys, passwords, or private credentials are
    included in frontend source or build artifacts.
-   [ ] Document how to respond to a vulnerable dependency.

## Completion criteria

You can identify common frontend security risks, explain the protections
in place, and respond appropriately to a dependency vulnerability or
accidentally exposed secret.

------------------------------------------------------------------------

# Suggested TaskFlow Repository Structure

The exact Angular source structure can follow the conventions of the
Angular version in use. Keep engineering configuration and documentation
clear:

``` text
taskflow/
├── src/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   └── release.yml
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CODEOWNERS
├── docs/
│   ├── development.md
│   ├── testing.md
│   ├── release-process.md
│   └── security.md
├── Dockerfile
├── .dockerignore
├── .prettierrc
├── eslint.config.js
├── package.json
└── README.md
```

# Final Project Definition of Done

TaskFlow is ready when:

-   [ ] Work is delivered through feature branches and reviewed PRs.
-   [ ] `main` is protected by required CI checks.
-   [ ] Core application logic and important UI behavior have unit
    tests.
-   [ ] NgRx is used for state that genuinely benefits from centralized
    management.
-   [ ] Linting, formatting, tests, and production builds are
    repeatable.
-   [ ] The application can be built and served as a Docker image.
-   [ ] GitHub Actions runs CI automatically for PRs and main-branch
    changes.
-   [ ] A versioned Docker image can be published to a registry.
-   [ ] The release and rollback process is documented.
-   [ ] Dependency and frontend security checks are part of the
    workflow.

## Recommended learning order

1.  Git and GitHub collaboration
2.  Unit testing
3.  Code quality
4.  NgRx
5.  Docker
6.  GitHub Actions
7.  CI/CD and release workflow
8.  Frontend security and dependency management

Learn one topic at a time. For each topic, first understand the listed
concepts, then implement the TaskFlow tasks, and finally verify the
completion criteria. Do not move on merely because the configuration
works; make sure you can explain why it is used and how it behaves in a
team workflow.
