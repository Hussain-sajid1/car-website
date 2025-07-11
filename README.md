# HH CAR COLLECTION - Luxury Automotive Website

A sophisticated, luxury car selling website featuring elegant design, interactive elements, and premium user experience.

## Features

### 🎨 Design & Styling
- **Luxury Color Scheme**: Rich dark background with golden accents (#d4af37, #b8860b)
- **Typography**: Bookman Old Style font for the store name "HH CAR COLLECTION"
- **Premium Layout**: Clean, modern design with elegant spacing and typography
- **Responsive Design**: Fully responsive across all devices

### ✨ Interactive Elements
- **Car-Shaped Menu Button**: 
  - Tan color that changes to milky white on hover
  - Glowing background effect
  - 100 spark particles that spread around the button
  - Sparks disappear after 1 second
  - Car icon with "MENU" text

### 🎯 User Experience
- **Custom Scrollbar**: Positioned on the right side with golden styling
- **Smooth Animations**: Fade-in effects for content elements
- **Scroll Indicators**: Animated arrow at the bottom
- **Keyboard Navigation**: Arrow keys and Page Up/Down support
- **Touch Support**: Swipe gestures for mobile devices

### 📱 Responsive Features
- Mobile-optimized layout
- Touch-friendly interactions
- Adaptive typography sizing
- Flexible button layouts

## File Structure

```
car-website/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Interactive functionality
└── README.md           # This file
```

## How to Use

1. **Open the Website**: Simply open `index.html` in any modern web browser
2. **Navigation**: 
   - Use the scroll wheel or arrow keys to navigate
   - Click the scroll indicator at the bottom
   - Swipe on mobile devices
3. **Interactive Elements**:
   - Hover over the MENU button to see spark effects
   - Click the MENU button for navigation (currently logs to console)

## Technical Details

### Color Palette
- **Primary Gold**: #d4af37 (Royal Gold)
- **Secondary Gold**: #b8860b (Dark Goldenrod)
- **Tan Sparks**: #d2b48c
- **Background**: Dark gradient (#0a0a0a to #2d2d2d)
- **Text**: #f5f5f5 (Off-white)

### Fonts Used
- **Bookman Old Style**: For "HH CAR COLLECTION" title
- **Playfair Display**: For headings and button text
- **Inter**: For body text and general content

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-gold: #d4af37;
    --secondary-gold: #b8860b;
    --spark-color: #d2b48c;
}
```

### Modifying Spark Effects
In `script.js`, adjust:
- `SPARK_COUNT`: Number of spark particles (currently 100)
- `SPARK_COLOR`: Color of spark particles
- Animation duration in CSS

### Adding Content
The about section in `index.html` can be easily modified to include:
- Company history
- Services offered
- Contact information
- Featured vehicles

## Performance Features

- Optimized animations using CSS transforms
- Efficient spark generation and cleanup
- Smooth scrolling with hardware acceleration
- Responsive images and scalable graphics

## Future Enhancements

Potential additions for a complete car selling website:
- Vehicle catalog with filtering
- Contact forms
- Image galleries
- Booking system
- Customer testimonials
- Social media integration

---

**HH CAR COLLECTION** - Where luxury meets automotive excellence. 