# AGENTS.md

## Content
- Albums live in `public/photo-manifest.yaml` (projects in `public/project-manifest.yaml`). `public/` is gitignored — manifest edits ship only via deploy, never via commits.
- New albums go at the top of the manifest. Photos are served from S3 at `/albums/<key>/<file>.jpg`, including in local dev (`BASE_URL` in `src/utilities.ts`).
- Album `display`: unset/`all` = main page + archive, `archive` = archive only, `hidden` = neither (direct `/archive/<key>` URL still works).

## Commands
- `make up`: dev server on :1234, output in `.dev/`. It copies the manifests once at startup — after editing them, `cp public/*-manifest.yaml .dev/` and refresh.
- `make new-album` is interactive (fzf, prompts, nvim); a human has to run it.
- `make upload-album ALBUM=<key>` needs `~/Desktop/deploy-<key>/`. If the photos are already in S3, just run `make build && make deploy`.
- `make deploy` pushes to production: it syncs `dist/` to S3 with `--delete` (skips `albums/*`) and clears the CloudFront cache. Only deploy when asked.

## Checks
- No `tsc` installed. Check formatting with `npx prettier --check <files>`.
- To test-build, use your own output and cache folders: `npx parcel build src/index.html --dist-dir <tmp> --cache-dir <tmp>`. The shared `.parcel-cache` can get corrupted.

## Code
- Use `src/components/Image.tsx` for photos. It shows a loading placeholder and needs `smallUrl`, `width`, and `height`.
- Commit messages: short imperative subject, e.g. "Add profile photos to About page".
