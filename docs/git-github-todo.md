# Git & GitHub Quick Todo (3 YOE Essentials)

- [ ] **Branch + PR + Squash Merge:** Create `feat/github-setup` from `main`, add `.github/PULL_REQUEST_TEMPLATE.md` & `.github/CODEOWNERS`, push, open a PR, and squash-merge it...
- [ ] **Rebase + Conflict:** Create two branches from `main` editing the same line, merge the first, then `git rebase origin/main` on the second, resolve the conflict, and `git push --force-with-lease`.
- [ ] **Cherry-pick:** Apply a single commit from another branch to `main` using `git cherry-pick <sha>`.
- [ ] **Revert vs Reset:** Practice `git reset --soft HEAD~1` (local) and `git revert <sha>` (shared).
- [ ] **Reflog:** Run `git reset --hard HEAD~1` on a test commit and recover it via `git reflog`.
- [ ] **Protect & Tag:** Enable branch protection on `main` (require PR), then run `git tag -a v0.1.0 -m "init"` and `git push origin v0.1.0`.
