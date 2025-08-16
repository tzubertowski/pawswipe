# PawSwipe 🐾

A modern Tinder-style web application for animal shelter adoption and virtual sponsorship in Poland. Swipe through adorable animals and find your perfect companion or support them through virtual adoption.

## Features

- **Swipe Interface**: Intuitive left/right swipe gestures to browse animals
- **Virtual Adoption**: Support animals financially without taking them home
- **Real Adoption**: Connect with shelters for permanent adoption
- **Animal Profiles**: Detailed information including personality traits, interests, and health status
- **Responsive Design**: Mobile-first design that works on all devices
- **Shelter Integration**: Direct links to animal shelters across Poland

## Tech Stack

- **Framework**: Nuxt 3 (Vue.js)
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Build**: Static Site Generation (SSG)
- **Deployment**: Render.com

## Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

### Build for Production

Generate static site:

```bash
npm run generate
```

The built files will be in `.output/public/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── app/
│   ├── components/
│   │   ├── AnimalCard.vue      # Main swipe card component
│   │   ├── SwipeContainer.vue  # Container for swipe functionality
│   │   ├── WelcomeDialog.vue   # Initial user preferences
│   │   └── InterestPage.vue    # Virtual adoption details
│   ├── stores/
│   │   └── useAppStore.ts      # Application state management
│   └── app.vue                 # Root component
├── public/
│   ├── animals.json            # Animal data
│   └── images/                 # Animal and shelter images
└── nuxt.config.ts             # Nuxt configuration
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is created for demonstration purposes.
