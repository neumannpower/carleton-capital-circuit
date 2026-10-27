CARLETON CAPITAL CIRCUIT — WEBSITE DRAFT 4.4

Domain: https://carletoncc.ca
Event: Carleton Capital Circuit
Date: November 27–28, 2026
Venue: Ravens Nest Gymnasium, Carleton University, Ottawa
Format: FIRST robotics exhibition featuring FRC and FTC

READY TO DEPLOY
---------------
This is a static website. Upload the CONTENTS of this ZIP to the document root for carletoncc.ca in Namecheap/cPanel. No PHP, Node.js, database, or mail server is required.

EVENT LANGUAGE
--------------
The public-facing event description is:
  “A FIRST robotics exhibition event featuring FRC and FTC in Canada’s Capital.”

The event is presented as a two-day exhibition. FRC and FTC robots participate in live match-style demonstrations that simulate the match formats used in their respective FIRST programs. Public-facing copy consistently describes the event as an exhibition rather than a conventional competition.

TEAM REGISTRATION
-----------------
The team registration Google Form is configured in config.js and embeds automatically on registration.html. There is no registration fee. All Team Registration buttons stay on the event website and lead to registration.html.

VOLUNTEER REGISTRATION
----------------------
The volunteer responder form is configured in config.js. Because the Google Form contains a File Upload question, Google does not permit iframe embedding. The volunteer page opens the official responder form in a new tab.

CONTACT FORM
------------
The public contact Google Form is configured in config.js and embeds on contact.html.

VENUE MAP / LOAD-IN
-------------------
The home page embeds Google Maps for Ravens Nest Gymnasium without requiring a Google Maps API key. The downloadable draft load-in manual is located at:
  assets/docs/Carleton-Capital-Circuit-Load-In-Manual.pdf

HOST INSTITUTION LOGO
---------------------
The home page host-institution section uses:
  assets/images/carleton-fed-stack.webp

STYLE
-----
The original Barlow Condensed + Inter typography is preserved. V4 only appends styles for the new FRC/FTC exhibition-format cards.

NAVIGATION
----------
Primary navigation is standardized on each regular page as: Home, Schedule, Volunteer, Sponsors, Event Card, Contact, and one red Team Registration button. The standalone Event Card has a visible Team Schedule link in its top bar.

V4.0 CONTENT UPDATE
-------------------
- Standardized all public-facing language around the exhibition format.
- Reframed Carleton Capital Circuit as a FIRST robotics exhibition.
- Added explicit FRC and FTC presence throughout the site.
- Replaced the repetitive homepage image/bullet section with a useful two-program exhibition-format section.
- Updated team registration, volunteer, sponsor, contact, metadata, and footer copy to use exhibition language.


V4.1 DIGITAL EVENT CARD
- Added card.html mobile-first event card for networking.
- QR code points to https://carletoncc.ca/.
- Includes native Share, copy-link, email, full-screen QR, and downloadable vCard.
- Event Card added to site navigation/footer plus a floating quick-access button.


V4.2 SPONSOR UPDATE
- Added Sullivan as an event sponsor using the supplied sponsor artwork.
- Added Neumann Laboratories as an event sponsor using the supplied sponsor artwork.
- Added a dedicated Event Sponsors section on sponsors.html and removed the empty sponsor placeholders.

V4.3 SPONSOR LAYOUT UPDATE
- Sullivan and Neumann Laboratories now appear in the same sponsor grid, directly below the existing Carleton FED, FIRST Canada, and CU FIRST logos.
- All sponsor tiles use identical sizing and logo constraints.
- The section heading now reads “Thank you to our sponsors”.

V4.4 TEAM SCHEDULE PAGE
-----------------------
- Added schedule.html with an embedded, scrollable two-page PDF viewer, direct-open link, and download buttons.
- Included the exact user-provided team schedule PDF without modification at:
    assets/docs/Carleton-Capital-Circuit-Team-Schedule-2026.pdf
- Added Schedule to the navigation and Team Schedule to the footer on all standard pages.
- Added a visible Team Schedule link to the standalone digital Event Card.
- Added a homepage notice with View Team Schedule and Download PDF actions.
- Added schedule.html to sitemap.xml.
- Original Barlow Condensed + Inter fonts, all imagery, and the Google Forms integrations are preserved.

Updating the schedule later: replace assets/docs/Carleton-Capital-Circuit-Team-Schedule-2026.pdf with the revised PDF using the same filename. If browsers cache it, rename the PDF and update references in index.html and schedule.html.
