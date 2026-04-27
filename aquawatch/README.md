# AquaWatch - Water & Sanitation Monitoring System

A web-based platform for citizens to report and track Water, Sanitation, and Hygiene (WASH) issues in Bengaluru, India.

## 🌊 Overview

AquaWatch enables citizens to:
- **Report WASH issues** with photos, descriptions, and locations
- **Track reports** on an interactive map
- **View community statistics** and leaderboard
- **Get AI assistance** for water safety and hygiene questions

## 🚀 Quick Start

### Option 1: Direct Browser Open
Simply open `index.html` in any modern web browser:
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### Option 2: Using a Local Server
```bash
# Python 3
python -m http.server 8000
# Then open http://localhost:8000

# Node.js (if available)
npx serve .
```

## 📱 Features

| Feature | Description |
|---------|-------------|
| **🗺️ Interactive Map** | View all reported issues on OpenStreetMap with color-coded markers |
| **📝 Report Issues** | Submit new WASH issues with category, photo, and location |
| **📊 Dashboard** | View personal and community statistics |
| **🏆 Leaderboard** | See top contributors in the community |
| **💬 AI Chatbot** | Get instant answers about water safety and hygiene |
| **👤 Profile** | Track points, badges, and manage your profile |

## 💡 How to Use

### Submit a Report
1. Click the **📝 Report** tab
2. Select issue category (Contaminated Water, Open Drainage, etc.)
3. Add description and location
4. Optionally attach a photo
5. Click Submit → Earn 10 points!

### Track Reports
- View on the **🗺️ Map** - click markers for details
- Check **📊 Dashboard** for status updates
- Filter by status (Open, Investigating, Resolved)

### Earn Badges
- 🌊 **First Reporter**: Submit your first report
- 🛡️ **Water Guardian**: Submit 5 reports
- 🏆 **Clean Streets**: Submit 10 reports
- 💉 **Lifesaver**: Submit 20 reports

## 🏗️ Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed system design.

### Tech Stack
- **React 18** - UI framework (via CDN)
- **Tailwind CSS** - Styling (via CDN)
- **Leaflet.js** - Interactive maps (OpenStreetMap)
- **LocalStorage** - Data persistence (browser-based)
- **Babel** - JSX compilation in browser

### File Structure
```
aquawatch/
├── index.html          # Main application (single file)
├── package.json        # Project metadata
├── vite.config.js      # Vite configuration (for future dev server)
├── tailwind.config.js  # Tailwind configuration
├── postcss.config.js   # PostCSS configuration
├── task_plan.md        # Development task tracking
├── README.md           # This file
└── docs/
    └── decisions/      # Architecture Decision Records
```

## 🔧 Development

### Adding New Features

1. **New Report Category**: Add to `CATEGORIES` object (around line 89)
2. **New Badge**: Add to `BADGES` object (around line 104)
3. **New AI Response**: Add to `AI_RESPONSES` object (search for "AI_RESPONSES")
4. **New Hygiene Tip**: Add to `HYGIENE_TIPS` array (search for "HYGIENE_TIPS")

### Code Style
- Uses embedded React components in single HTML file
- Tailwind CSS classes for styling
- Custom CSS animations in `<style>` tag
- All JavaScript in `<script type="text/babel">` block

### Key Constants

```javascript
// Report Categories
CATEGORIES = {
    CONTAMINATED_WATER: { name, icon, color, riskWeight },
    BROKEN_FACILITY: { ... },
    OPEN_DRAINAGE: { ... },
    LACK_SOAP: { ... },
    OTHER: { ... }
}

// Report Statuses
STATUSES = {
    OPEN: { name, bgColor, textColor, borderColor },
    INVESTIGATING: { ... },
    RESOLVED: { ... }
}

// Achievement Badges
BADGES = {
    FIRST_REPORTER: { name, icon, description },
    WATER_GUARDIAN: { ... },
    CLEAN_STREETS: { ... },
    LIFESAVER: { ... }
}
```

## ⚠️ Limitations

- **Data stored locally**: Reports only exist in browser localStorage
- **Single user**: No authentication system
- **Bengaluru only**: Hardcoded coordinates and BBMP references
- **Fake GPS**: New reports use random coordinates near Bengaluru center

See [LIMITATIONS.md](./docs/LIMITATIONS.md) for detailed limitations and planned improvements.

## 📄 Documentation

| Document | Purpose |
|----------|---------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design and component structure |
| [docs/decisions/](./docs/decisions/) | Architecture Decision Records (ADRs) |
| [CLAUDE.md](./CLAUDE.md) | AI agent conventions and rules |
| [CHANGELOG.md](./CHANGELOG.md) | Version history and changes |

## 📄 License

MIT License - Created for Bengaluru Water & Sanitation Monitoring.

## 👥 Author

Built with 💙 for Bengaluru's community water safety.

---

**Note**: This is a prototype/demo application. For production deployment, consider adding:
- Backend database (Firebase, Supabase, or custom)
- User authentication
- Real GPS location services
- Integration with BBMP (Bruhat Bengaluru Mahanagara Palike)