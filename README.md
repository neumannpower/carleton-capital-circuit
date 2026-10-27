# Carleton Capital Circuit website

Static site for https://carletoncc.ca, based on Desktop version 4.4.

## October 26 update

- Added registered teams and team information pages, navigation and sitemap entries.
- Public team fields are limited to number, name and home location. No registration contact, accommodation or private form data is included.
- Ambiguous entry 011 is withheld pending confirmation. Additional robots and program categories remain to be verified.
- Includes Marriott and Flash Your Badge links with date/eligibility qualifications.
- Keeps the existing team schedule and draft load-in manual unchanged.
- Detailed playoff rotation rules remain pending approval; no proposed rules are represented as final.

## Hosting

The original package specifies Namecheap/cPanel. Upload repository contents to the existing document root to update that host, retaining any server-specific configuration. Creating this repository does not update that hosting automatically. No new license is granted for FIRST, Carleton, CU FIRST, sponsor marks or supplied images.

## Maintenance

Public data: assets/data/teams.json and teams.html. Regenerate both when editing entries. Validate team identities with organizers before changes. Original deployment notes are in README.txt.


## October 27, 2026 design update

Restores the Desktop v4.4 navigation and layout. Registered teams appear in the Team Registration sidebar, grouped by FRC and FTC; assets/data/teams.json includes program labels. The home venue section includes family-friendly Flash Your Badge museum examples and the Ottawa Tourism signup link. Share Event uses an SVG share icon. Legacy teams.html and team-information.html URLs redirect to registration; no hotel block details are published.

Validation: all 170 local HTML links resolve, JavaScript syntax passes, and home/registration render without horizontal overflow at 1440px and 390px. Existing schedule and load-in PDFs are unchanged. GitHub source updates do not deploy the separate cPanel host.
