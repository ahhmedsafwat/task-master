task-master Data Model Overview

Profiles

Each user has a profile (id, email, username, etc.) created automatically via Supabase Auth.

Tasks

Tasks are created by a user (creator_id) and may optionally belong to a project (project_id).
Tasks can be private or public.

Task_Assignees

A join table linking tasks and profiles.
It records which users are assigned to each task.

Projects

Projects serve as containers for tasks and collaborative work.
Each project is created by a user (creator_id).

Project_Members

A join table linking projects and profiles with an assigned role (VIEWER, MEMBER, or ADMIN).

It controls who is part of a project and their permissions.

Interactions:

Users create profiles, tasks, and projects.
Tasks can be personal (private) or tied to a project.
Tasks can have multiple assignees, and project membership (with roles) governs visibility and collaborative access.

---

# Contributing to Task Master App

Thank you for your interest in contributing to the Task Manager app! Contributions are welcome and appreciated. Please follow the guidelines below to ensure a smooth collaboration.

## How to Contribute

1. **Fork the Repository**: Start by forking the repository to your GitHub account.
2. **Clone Your Fork**: Use the following command to clone your fork locally:
   ```sh
   git clone https://github.com/ahhmedsafwat/task-master.git
   ```
3. **Create a Branch**: Before making changes, create a new branch:
   ```sh
   git checkout -b feature-or-bugfix-name
   ```
4. **Make Your Changes**: Implement your improvements or bug fixes.
5. **Commit Your Changes**: Follow best practices for commit messages:
   ```sh
   git commit -m "Brief description of changes"
   ```
6. **Push to Your Fork**: Push your branch to your GitHub fork:
   ```sh
   git push origin feature-or-bugfix-name
   ```
7. **Submit a Pull Request (PR)**: Open a PR to the main repository, describing your changes.

## Code Guidelines

- Follow the existing coding style.
- Ensure your code is clean and well-documented.
- Keep PRs small and focused on a single issue.
- Write descriptive commit messages.

## Reporting Issues

If you encounter bugs or have feature requests, please open an issue on GitHub with:

- A clear title and description.
- Steps to reproduce (if applicable).
- Expected and actual behavior.

## Acknowledgment

By contributing, you agree that your changes may be used under the project's open-source license and that proper attribution will be maintained.

Happy coding!

---

Ahmed Safwat
