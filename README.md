# Data Collectors Limited - Website

## Project Overview
- **Name**: Data Collectors Limited Website
- **Goal**: Dynamic, animated website showcasing ML projects, data pipelines, analytics solutions, and services
- **Features**: 
  - Animated hero section with floating data visualization
  - Interactive data flow pipeline from MIS to Power BI dashboards
  - Service cards with hover animations
  - Project portfolio showcase
  - Contact form with API integration
  - Responsive mobile design

## URLs
- **Development (Sandbox)**: https://3000-ip706wumytw4paowvwgd3-b32ec7bb.sandbox.novita.ai
- **Production (Cloudflare Pages)**: https://data-collectors-ltd.pages.dev
- **Latest Deployment**: https://0b7e8d16.data-collectors-ltd.pages.dev
- **GitHub**: (Ready to push)

## Completed Features
1. ✅ Animated hero section with gradient background and floating SVG visualization
2. ✅ Services section featuring:
   - Machine Learning projects
   - Data Pipelines & ETL
   - Data Management Systems
   - Android Applications
   - Power BI Dashboards
   - Data Analysis & Collection
3. ✅ Interactive data flow visualization showing:
   - MIS Database → Data Collection → ETL Pipeline → Data Warehouse → ML Models/Analytics → Power BI Dashboard
   - Animated data particles flowing through the pipeline
   - Pulsing nodes and connections
4. ✅ Project portfolio with 4 featured case studies
5. ✅ Contact form with backend API endpoint
6. ✅ Responsive navigation with mobile menu
7. ✅ Smooth scroll animations and hover effects
8. ✅ Footer with social links and company info

## Technology Stack
- **Backend**: Hono (Cloudflare Workers)
- **Frontend**: HTML5, TailwindCSS, Vanilla JavaScript
- **Animations**: CSS animations, SVG animations
- **Icons**: Font Awesome 6
- **HTTP Client**: Axios
- **Deployment**: Cloudflare Pages (pending)

## Data Architecture
- **Contact Form Data**: Currently logged to console (can be connected to D1 Database or external API)
- **Static Assets**: Served via Cloudflare Workers serveStatic
- **API Routes**: `/api/contact` for form submissions

## Key Animation Features
1. **Hero Section**: 
   - Floating animation on SVG data hub
   - Gradient text effects
   - Slide-in animations from left and right
   
2. **Data Pipeline Visualization**:
   - Animated data particles moving through pipeline stages
   - Pulsing glow effects on active nodes
   - Real-time data flow representation from MIS to Dashboard
   
3. **Service Cards**:
   - Hover lift effect with shadow
   - Color-coded for different services
   - Icon animations
   
4. **Scroll Animations**:
   - Elements fade in and slide up on scroll
   - Intersection Observer for performance

## API Endpoints
- `GET /` - Main website homepage
- `POST /api/contact` - Contact form submission
  - Body: `{ name, email, company, service, message }`
  - Returns: `{ success: true/false, message: string }`

## Local Development
```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start development server
pm2 start ecosystem.config.cjs

# Test the service
curl http://localhost:3000

# Check logs
pm2 logs webapp --nostream
```

## Deployment Instructions

### Deploy to Cloudflare Pages
```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
npm run deploy:prod

# Or manually
npx wrangler pages deploy dist --project-name webapp
```

## Project Structure
```
webapp/
├── src/
│   └── index.tsx          # Main Hono application with embedded HTML
├── dist/                  # Build output (generated)
├── ecosystem.config.cjs   # PM2 configuration
├── package.json          # Dependencies and scripts
├── wrangler.jsonc        # Cloudflare configuration
└── README.md             # This file
```

## Services Showcased
1. **Machine Learning Projects** - Custom ML models, prediction, classification
2. **Data Pipelines** - ETL/ELT, real-time processing, API development
3. **Data Management Systems** - Database design, warehousing, cloud migration
4. **Android Applications** - Native and cross-platform mobile apps
5. **Power BI Dashboards** - Interactive dashboards, real-time analytics
6. **Data Analysis & Collection** - Statistical analysis, BI, reporting

## Future Enhancements
- [ ] Connect contact form to D1 database for persistence
- [ ] Add admin dashboard for viewing submissions
- [ ] Implement blog section for case studies
- [ ] Add client testimonials section
- [ ] Create interactive demos of actual projects
- [ ] Add more advanced animations (particles.js, three.js)
- [ ] Implement dark mode toggle
- [ ] Add multi-language support

## Status
- **Platform**: Cloudflare Pages
- **Local Status**: ✅ Active and running
- **Production Status**: ✅ Deployed and live
- **Last Updated**: 2024-12-07
- **Cloudflare Project**: data-collectors-ltd
