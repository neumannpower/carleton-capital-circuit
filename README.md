# Carleton Capital Circuit website

Static website for https://carletoncc.ca, preserving the Desktop v4.4 design.

## Current site

The original navigation is retained. Registered teams appear in the Team Registration sidebar, grouped by FRC and FTC. Visiting Ottawa includes linked museums, family dining and entertainment suggestions, Flash Your Badge signup, and the selected Parliament photo. No hotel block details are published.

Public roster data is in assets/data/teams.json; the visible list is in registration.html. Update both together. No registration contact information or private responses belong in this repository.

## Publishing

Editing files or pushing to GitHub never publishes the site automatically. See DEPLOYMENT.md and AGENTS.md. The manual Publish website workflow requires an explicitly approved full commit SHA and a separate publish confirmation. Hosting credentials are held in GitHub production environment secrets and use an FTP account restricted to the website folder.

The reviewed build d611fdf885c2b22357d523c831ed5a1ca062117f was published on October 27, 2026. The prior live files were backed up outside public_html. Server configuration is preserved during publishing.

FIRST, Carleton, CU FIRST and sponsor marks retain their existing ownership and usage restrictions. Photo credits are shown alongside the image.
