# **App Name**: Living Gold

## Core Features:

- Pixel-Perfect Display: Display all page elements according to precise pixel specifications, ensuring a visually faithful and consistent presentation across devices and browsers, as documented in the style guide. If element sizes change as a result of viewport size changes, smoothly transition between states.
- Interactive Hover Effects: Implement hover transitions and scaling on interactive elements. An AI tool will be used to subtly animate elements like buttons, images, and links on hover. For example, darken buttons by 10% and apply a gold underline animation on links. If the user hovers over an element and clicks on it at the same time, briefly interrupt the hover transition.
- Instagram Feed Integration: Fetch and display the latest posts from the @LIVINGGOLDINTERIORS Instagram feed in a 4x2 grid. Each image should have a gold border overlay on hover with a border-radius of 8px.
- Contact Form Submission: Implement a contact form that allows users to submit inquiries. Ensure form validation and a smooth submission process with appropriate feedback messages.
- Dynamic Content Loading: Asynchronously load new content and inject the content into the page, so the display smoothly adapts to changing viewports.
- Responsive Layout Adaptation: Dynamically adjust the layout, typography, and spacing of content to provide a consistent user experience across different screen sizes, based on viewport size. Maintain the design fidelity across devices without reliance on media queries. Use viewport hooks to check size.

## Style Guidelines:

- Primary color: Gold (#D4AF37) to be used as brand accent for buttons and highlights.
- Secondary color: Black (#000000) for headers and primary backgrounds.
- Background color: Dark Charcoal (#2D2D2D) to be used for secondary backgrounds; slightly desaturated and dark to provide contrast.
- Headline font: 'Playfair', a modern serif with an elegant, fashionable feel, for headers and small amounts of text. Note: currently only Google Fonts are supported.
- Body font: 'PT Sans', a humanist sans-serif that combines a modern look and a little warmth or personality, for body text. Note: currently only Google Fonts are supported.
- Container max-width: 1200px to center content on larger screens.
- Section padding: 120px top/bottom to create visual breathing room.
- Hover transitions: Use 0.3s ease-in-out for interactive elements.