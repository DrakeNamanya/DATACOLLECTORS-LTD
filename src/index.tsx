import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Contact form API endpoint
app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json()
    const { name, email, company, service, message } = body
    
    // Log submission details
    console.log('Contact form submission:', { name, email, company, service, message })
    
    // TODO: Integrate with email service (SendGrid, Mailgun, or Resend)
    // Email would be sent to: drnamanya@gmail.com
    // From: datacollectorslimited@gmail.com
    
    return c.json({ 
      success: true, 
      message: 'Thank you for contacting us! We have received your message and will get back to you soon.' 
    })
  } catch (error) {
    return c.json({ 
      success: false, 
      message: 'Failed to submit form. Please try again or contact us directly at drnamanya@gmail.com' 
    }, 400)
  }
})

// Main page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Data Collectors Limited - Transform Data Into Intelligent Solutions</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            primary: '#1e40af',
                            secondary: '#7c3aed',
                        }
                    }
                }
            }
        </script>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
            
            body {
                font-family: 'Inter', sans-serif;
            }
            
            .gradient-primary {
                background: linear-gradient(135deg, #1e40af 0%, #7c3aed 100%);
            }
            
            .gradient-text {
                background: linear-gradient(135deg, #1e40af 0%, #7c3aed 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .hover-lift {
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .hover-lift:hover {
                transform: translateY(-8px);
                box-shadow: 0 20px 40px rgba(0,0,0,0.15);
            }
            
            .btn-primary {
                background: linear-gradient(135deg, #1e40af 0%, #7c3aed 100%);
                transition: all 0.3s ease;
            }
            
            .btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 25px rgba(30, 64, 175, 0.4);
            }
            
            .placeholder-section {
                background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
                min-height: 400px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px dashed #4b5563;
            }
            
            html {
                scroll-behavior: smooth;
            }
            
            /* Animated gradient background */
            @keyframes gradient-shift {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            
            .animated-gradient {
                background: linear-gradient(270deg, #1e40af, #7c3aed, #ec4899);
                background-size: 600% 600%;
                animation: gradient-shift 15s ease infinite;
            }
            
            /* Carousel Styles */
            .carousel-container {
                position: relative;
            }
            
            .carousel-slide {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                transform: translateX(100%);
                transition: transform 0.8s ease-in-out, opacity 0.8s ease-in-out;
            }
            
            .carousel-slide.active {
                opacity: 1;
                transform: translateX(0);
                z-index: 10;
            }
            
            .carousel-slide.exit {
                opacity: 0;
                transform: translateX(-100%);
            }
            
            .carousel-slide img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .carousel-dot {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                border: 2px solid white;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .carousel-dot.active {
                background: white;
                width: 40px;
                border-radius: 6px;
            }
            
            .carousel-dot:hover {
                background: rgba(255, 255, 255, 0.8);
            }
        </style>
    </head>
    <body class="bg-white">
        <!-- Navigation -->
        <nav class="bg-white shadow-sm fixed w-full top-0 z-50 border-b border-gray-100">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-20 items-center">
                    <div class="flex items-center space-x-3">
                        <img src="/static/data-collectors-logo.png" alt="Data Collectors Limited" class="h-12 w-auto">
                    </div>
                    <div class="hidden md:flex space-x-8 items-center">
                        <a href="#services" class="text-gray-700 hover:text-blue-600 font-medium transition">Services</a>
                        <a href="#solutions" class="text-gray-700 hover:text-blue-600 font-medium transition">Solutions</a>
                        <a href="#clients" class="text-gray-700 hover:text-blue-600 font-medium transition">Clients</a>
                        <a href="#pricing" class="text-gray-700 hover:text-blue-600 font-medium transition">Pricing</a>
                        <a href="#contact" class="btn-primary text-white px-6 py-2.5 rounded-lg font-semibold">
                            Get Started
                        </a>
                    </div>
                    <button id="mobile-menu-btn" class="md:hidden">
                        <i class="fas fa-bars text-2xl text-gray-700"></i>
                    </button>
                </div>
            </div>
            <!-- Mobile Menu -->
            <div id="mobile-menu" class="hidden md:hidden bg-white border-t">
                <div class="px-4 pt-2 pb-3 space-y-1">
                    <a href="#services" class="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded">Services</a>
                    <a href="#solutions" class="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded">Solutions</a>
                    <a href="#clients" class="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded">Clients</a>
                    <a href="#pricing" class="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded">Pricing</a>
                    <a href="#contact" class="block px-3 py-2 bg-blue-600 text-white rounded">Get Started</a>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
            <div class="max-w-7xl mx-auto">
                <div class="text-center max-w-4xl mx-auto">
                    <h1 class="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                        Transform Data Into
                        <span class="gradient-text"> Intelligent Solutions</span>
                    </h1>
                    <p class="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
                        Enterprise-grade machine learning, data pipelines, and analytics solutions 
                        that drive business growth across Africa.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a href="#contact" class="btn-primary text-white px-8 py-4 rounded-lg font-semibold text-lg w-full sm:w-auto">
                            Start Your Project
                            <i class="fas fa-arrow-right ml-2"></i>
                        </a>
                        <a href="#solutions" class="bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-blue-600 transition w-full sm:w-auto">
                            View Solutions
                        </a>
                    </div>
                    
                    <!-- Stats -->
                    <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <div class="text-4xl font-bold gradient-text">50+</div>
                            <div class="text-gray-600 mt-2">Projects Delivered</div>
                        </div>
                        <div>
                            <div class="text-4xl font-bold gradient-text">10M+</div>
                            <div class="text-gray-600 mt-2">Records Processed</div>
                        </div>
                        <div>
                            <div class="text-4xl font-bold gradient-text">6</div>
                            <div class="text-gray-600 mt-2">Industry Sectors</div>
                        </div>
                        <div>
                            <div class="text-4xl font-bold gradient-text">99.9%</div>
                            <div class="text-gray-600 mt-2">Uptime</div>
                        </div>
                    </div>
                </div>

                <!-- Dynamic Services Carousel -->
                <div class="mt-16 relative">
                    <div class="carousel-container relative overflow-hidden rounded-2xl shadow-2xl" style="height: 500px;">
                        <!-- Carousel Slides -->
                        <div class="carousel-slide active" data-index="0">
                            <img src="/static/carousel/app-development.jpg" alt="We Develop Applications" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                                <div class="p-12 text-white">
                                    <h3 class="text-4xl md:text-5xl font-bold mb-3">We Develop Applications</h3>
                                    <p class="text-xl text-gray-200">Building powerful mobile and web applications for your business</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="carousel-slide" data-index="1">
                            <img src="/static/carousel/data-analysis.jpg" alt="We Analyze Data" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                                <div class="p-12 text-white">
                                    <h3 class="text-4xl md:text-5xl font-bold mb-3">We Analyze Data</h3>
                                    <p class="text-xl text-gray-200">Transforming raw data into actionable business insights</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="carousel-slide" data-index="2">
                            <img src="/static/carousel/data-collection.jpg" alt="Research Data Collectors" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                                <div class="p-12 text-white">
                                    <h3 class="text-4xl md:text-5xl font-bold mb-3">We Are Research Data Collectors</h3>
                                    <p class="text-xl text-gray-200">Professional field data collection across Uganda and East Africa</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="carousel-slide" data-index="3">
                            <img src="/static/carousel/machine-learning.jpg" alt="Machine Learning Models" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                                <div class="p-12 text-white">
                                    <h3 class="text-4xl md:text-5xl font-bold mb-3">We Design Machine Learning Models</h3>
                                    <p class="text-xl text-gray-200">Custom AI solutions that drive innovation and efficiency</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="carousel-slide" data-index="4">
                            <img src="/static/carousel/data-pipelines.jpg" alt="Data Pipelines" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                                <div class="p-12 text-white">
                                    <h3 class="text-4xl md:text-5xl font-bold mb-3">We Design Data Pipelines</h3>
                                    <p class="text-xl text-gray-200">Scalable ETL solutions for enterprise data processing</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="carousel-slide" data-index="5">
                            <img src="/static/carousel/consultancy.jpg" alt="Data Consultancy" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                                <div class="p-12 text-white">
                                    <h3 class="text-4xl md:text-5xl font-bold mb-3">We Are A Data Consultancy Company</h3>
                                    <p class="text-xl text-gray-200">Strategic data solutions tailored to your business needs</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Navigation Dots -->
                        <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
                            <button class="carousel-dot active" data-slide="0"></button>
                            <button class="carousel-dot" data-slide="1"></button>
                            <button class="carousel-dot" data-slide="2"></button>
                            <button class="carousel-dot" data-slide="3"></button>
                            <button class="carousel-dot" data-slide="4"></button>
                            <button class="carousel-dot" data-slide="5"></button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Trusted By Section -->
        <section class="py-16 bg-white border-y border-gray-100" id="clients">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p class="text-center text-gray-500 text-sm font-semibold uppercase tracking-wider mb-10">
                    Trusted by Leading Organizations
                </p>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
                    <div class="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition">
                        <img src="/static/logos/saye-katale.png" alt="Saye Katale" class="h-16 w-auto object-contain opacity-70 hover:opacity-100">
                    </div>
                    <div class="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition">
                        <img src="/static/logos/hipe-mart.png" alt="Hipe Mart Oils" class="h-16 w-auto object-contain opacity-70 hover:opacity-100">
                    </div>
                    <div class="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition">
                        <img src="/static/logos/heifer.png" alt="Heifer International" class="h-16 w-auto object-contain opacity-70 hover:opacity-100">
                    </div>
                    <div class="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition">
                        <img src="/static/logos/ucu.png" alt="Uganda Christian University" class="h-16 w-auto object-contain opacity-70 hover:opacity-100">
                    </div>
                    <div class="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition">
                        <img src="/static/logos/mukono.png" alt="Mukono Municipal Council" class="h-16 w-auto object-contain opacity-70 hover:opacity-100">
                    </div>
                    <div class="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition">
                        <img src="/static/logos/simpo.png" alt="Simpo Café" class="h-16 w-auto object-contain opacity-70 hover:opacity-100">
                    </div>
                </div>
            </div>
        </section>

        <!-- Core Services Section -->
        <section class="py-20 bg-gray-50" id="services">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Enterprise Data Solutions
                    </h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                        End-to-end data services that power modern businesses
                    </p>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Machine Learning -->
                    <div class="bg-white p-8 rounded-2xl hover-lift border border-gray-100">
                        <div class="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-6">
                            <i class="fas fa-brain text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-3">Machine Learning</h3>
                        <p class="text-gray-600 mb-6">
                            Custom ML models for prediction, classification, and intelligent automation.
                        </p>
                        <ul class="space-y-3">
                            <li class="flex items-start">
                                <i class="fas fa-check text-blue-600 mt-1 mr-3"></i>
                                <span class="text-gray-700">Predictive Analytics</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check text-blue-600 mt-1 mr-3"></i>
                                <span class="text-gray-700">Natural Language Processing</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check text-blue-600 mt-1 mr-3"></i>
                                <span class="text-gray-700">Computer Vision</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Data Pipelines -->
                    <div class="bg-white p-8 rounded-2xl hover-lift border border-gray-100">
                        <div class="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-6">
                            <i class="fas fa-project-diagram text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-3">Data Pipelines</h3>
                        <p class="text-gray-600 mb-6">
                            Real-time ETL processes that transform raw data into actionable insights.
                        </p>
                        <ul class="space-y-3">
                            <li class="flex items-start">
                                <i class="fas fa-check text-blue-600 mt-1 mr-3"></i>
                                <span class="text-gray-700">ETL/ELT Development</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check text-blue-600 mt-1 mr-3"></i>
                                <span class="text-gray-700">Real-time Processing</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check text-blue-600 mt-1 mr-3"></i>
                                <span class="text-gray-700">API Integration</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Power BI -->
                    <div class="bg-white p-8 rounded-2xl hover-lift border border-gray-100">
                        <div class="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-6">
                            <i class="fas fa-chart-line text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-3">Power BI Dashboards</h3>
                        <p class="text-gray-600 mb-6">
                            Interactive dashboards that turn complex data into visual stories.
                        </p>
                        <ul class="space-y-3">
                            <li class="flex items-start">
                                <i class="fas fa-check text-blue-600 mt-1 mr-3"></i>
                                <span class="text-gray-700">Custom Dashboards</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check text-blue-600 mt-1 mr-3"></i>
                                <span class="text-gray-700">Real-time Analytics</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check text-blue-600 mt-1 mr-3"></i>
                                <span class="text-gray-700">Report Automation</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Data Management -->
                    <div class="bg-white p-8 rounded-2xl hover-lift border border-gray-100">
                        <div class="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-6">
                            <i class="fas fa-database text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-3">Data Management</h3>
                        <p class="text-gray-600 mb-6">
                            Scalable data warehouses and management systems for your business.
                        </p>
                        <ul class="space-y-3">
                            <li class="flex items-start">
                                <i class="fas fa-check text-blue-600 mt-1 mr-3"></i>
                                <span class="text-gray-700">Database Design</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check text-blue-600 mt-1 mr-3"></i>
                                <span class="text-gray-700">Data Warehousing</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check text-blue-600 mt-1 mr-3"></i>
                                <span class="text-gray-700">Cloud Migration</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Android Apps -->
                    <div class="bg-white p-8 rounded-2xl hover-lift border border-gray-100">
                        <div class="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-6">
                            <i class="fas fa-mobile-alt text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-3">Android Applications</h3>
                        <p class="text-gray-600 mb-6">
                            Native and cross-platform mobile apps with seamless integration.
                        </p>
                        <ul class="space-y-3">
                            <li class="flex items-start">
                                <i class="fas fa-check text-blue-600 mt-1 mr-3"></i>
                                <span class="text-gray-700">Native Development</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check text-blue-600 mt-1 mr-3"></i>
                                <span class="text-gray-700">Offline Capability</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check text-blue-600 mt-1 mr-3"></i>
                                <span class="text-gray-700">Backend Integration</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Data Analysis -->
                    <div class="bg-white p-8 rounded-2xl hover-lift border border-gray-100">
                        <div class="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-6">
                            <i class="fas fa-chart-pie text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-3">Data Analysis</h3>
                        <p class="text-gray-600 mb-6">
                            Deep statistical analysis and insights extraction from complex data.
                        </p>
                        <ul class="space-y-3">
                            <li class="flex items-start">
                                <i class="fas fa-check text-blue-600 mt-1 mr-3"></i>
                                <span class="text-gray-700">Statistical Analysis</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check text-blue-600 mt-1 mr-3"></i>
                                <span class="text-gray-700">Business Intelligence</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check text-blue-600 mt-1 mr-3"></i>
                                <span class="text-gray-700">Custom Reporting</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Solutions Section -->
        <section class="py-20 bg-white" id="solutions">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Industry Solutions
                    </h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                        Tailored data solutions for your specific industry needs
                    </p>
                </div>

                <!-- Solution 1 -->
                <div class="mb-20">
                    <div class="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div class="text-blue-600 font-semibold mb-3">AGRICULTURE & MARKETPLACE</div>
                            <h3 class="text-3xl font-bold text-gray-900 mb-4">
                                Smart Agriculture Data Platforms
                            </h3>
                            <p class="text-lg text-gray-600 mb-6">
                                From farm to market, our data solutions help agricultural businesses 
                                optimize supply chains, predict yields, and connect with buyers efficiently.
                            </p>
                            <ul class="space-y-3 mb-8">
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                                    <span class="text-gray-700">Demand-Supply Matching Systems</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                                    <span class="text-gray-700">Yield Prediction Models</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                                    <span class="text-gray-700">Price Analytics & Forecasting</span>
                                </li>
                            </ul>
                            <a href="#contact" class="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
                                Learn More <i class="fas fa-arrow-right ml-2"></i>
                            </a>
                        </div>
                        <div class="rounded-2xl overflow-hidden shadow-2xl">
                            <img src="/static/solutions/agriculture-solution.jpg" alt="Agriculture Data Collection - Field data monitoring and crop analytics" class="w-full h-full object-cover">
                        </div>
                    </div>
                </div>

                <!-- Solution 2 -->
                <div class="mb-20">
                    <div class="grid md:grid-cols-2 gap-12 items-center">
                        <div class="rounded-2xl overflow-hidden shadow-2xl order-2 md:order-1">
                            <img src="/static/solutions/education-solution.jpg" alt="Education Analytics - Student performance dashboards and learning insights" class="w-full h-full object-cover">
                        </div>
                        <div class="order-1 md:order-2">
                            <div class="text-purple-600 font-semibold mb-3">EDUCATION & TRAINING</div>
                            <h3 class="text-3xl font-bold text-gray-900 mb-4">
                                Education Data Analytics
                            </h3>
                            <p class="text-lg text-gray-600 mb-6">
                                Transform educational data into actionable insights that improve student 
                                outcomes, optimize resources, and enhance learning experiences.
                            </p>
                            <ul class="space-y-3 mb-8">
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-purple-500 mt-1 mr-3"></i>
                                    <span class="text-gray-700">Student Performance Analytics</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-purple-500 mt-1 mr-3"></i>
                                    <span class="text-gray-700">Enrollment Prediction Models</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-purple-500 mt-1 mr-3"></i>
                                    <span class="text-gray-700">Resource Optimization</span>
                                </li>
                            </ul>
                            <a href="#contact" class="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700">
                                Learn More <i class="fas fa-arrow-right ml-2"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Solution 3 -->
                <div>
                    <div class="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div class="text-blue-600 font-semibold mb-3">GOVERNMENT & MUNICIPAL</div>
                            <h3 class="text-3xl font-bold text-gray-900 mb-4">
                                Smart City Data Solutions
                            </h3>
                            <p class="text-lg text-gray-600 mb-6">
                                Enable data-driven governance with our comprehensive data management 
                                and analytics solutions for public sector organizations.
                            </p>
                            <ul class="space-y-3 mb-8">
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-blue-500 mt-1 mr-3"></i>
                                    <span class="text-gray-700">Citizen Data Management</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-blue-500 mt-1 mr-3"></i>
                                    <span class="text-gray-700">Service Delivery Analytics</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-blue-500 mt-1 mr-3"></i>
                                    <span class="text-gray-700">Budget & Resource Planning</span>
                                </li>
                            </ul>
                            <a href="#contact" class="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
                                Learn More <i class="fas fa-arrow-right ml-2"></i>
                            </a>
                        </div>
                        <div class="rounded-2xl overflow-hidden shadow-2xl">
                            <img src="/static/solutions/government-solution.jpg" alt="Government Solutions - Municipal dashboards and civic data visualization" class="w-full h-full object-cover">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- How It Works -->
        <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        How We Work
                    </h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                        Our proven process delivers results in weeks, not months
                    </p>
                </div>

                <div class="grid md:grid-cols-4 gap-8">
                    <div class="text-center">
                        <div class="w-16 h-16 gradient-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                            1
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3">Discovery</h3>
                        <p class="text-gray-600">
                            We analyze your data challenges and business goals to create a tailored strategy.
                        </p>
                    </div>

                    <div class="text-center">
                        <div class="w-16 h-16 gradient-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                            2
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3">Design</h3>
                        <p class="text-gray-600">
                            Our experts design the optimal data architecture and solution blueprint.
                        </p>
                    </div>

                    <div class="text-center">
                        <div class="w-16 h-16 gradient-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                            3
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3">Deploy</h3>
                        <p class="text-gray-600">
                            We build, test, and deploy your solution with minimal disruption to operations.
                        </p>
                    </div>

                    <div class="text-center">
                        <div class="w-16 h-16 gradient-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                            4
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3">Support</h3>
                        <p class="text-gray-600">
                            Ongoing maintenance, monitoring, and optimization to ensure peak performance.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Pricing Section -->
        <section class="py-20 bg-white" id="pricing">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Flexible Pricing Plans
                    </h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                        Choose the plan that fits your business needs
                    </p>
                </div>

                <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <!-- Starter -->
                    <div class="bg-white border-2 border-gray-200 rounded-2xl p-8 hover-lift">
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                        <p class="text-gray-600 mb-6">Perfect for small businesses</p>
                        <div class="mb-6">
                            <span class="text-5xl font-bold text-gray-900">$2,500</span>
                            <span class="text-gray-600">/project</span>
                        </div>
                        <ul class="space-y-4 mb-8">
                            <li class="flex items-start">
                                <i class="fas fa-check text-green-500 mt-1 mr-3"></i>
                                <span class="text-gray-700">Basic Data Pipeline Setup</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check text-green-500 mt-1 mr-3"></i>
                                <span class="text-gray-700">1 Dashboard/Report</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check text-green-500 mt-1 mr-3"></i>
                                <span class="text-gray-700">Email Support</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check text-green-500 mt-1 mr-3"></i>
                                <span class="text-gray-700">30 Days Support</span>
                            </li>
                        </ul>
                        <a href="#contact" class="block text-center bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                            Get Started
                        </a>
                    </div>

                    <!-- Professional -->
                    <div class="bg-white border-2 border-blue-600 rounded-2xl p-8 hover-lift relative">
                        <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                            POPULAR
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
                        <p class="text-gray-600 mb-6">For growing businesses</p>
                        <div class="mb-6">
                            <span class="text-5xl font-bold text-gray-900">$7,500</span>
                            <span class="text-gray-600">/project</span>
                        </div>
                        <ul class="space-y-4 mb-8">
                            <li class="flex items-start">
                                <i class="fas fa-check text-green-500 mt-1 mr-3"></i>
                                <span class="text-gray-700">Advanced Data Pipeline</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check text-green-500 mt-1 mr-3"></i>
                                <span class="text-gray-700">3 Dashboards/Reports</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check text-green-500 mt-1 mr-3"></i>
                                <span class="text-gray-700">ML Model Integration</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check text-green-500 mt-1 mr-3"></i>
                                <span class="text-gray-700">Priority Support</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check text-green-500 mt-1 mr-3"></i>
                                <span class="text-gray-700">90 Days Support</span>
                            </li>
                        </ul>
                        <a href="#contact" class="block text-center btn-primary text-white px-6 py-3 rounded-lg font-semibold">
                            Get Started
                        </a>
                    </div>

                    <!-- Enterprise -->
                    <div class="bg-white border-2 border-gray-200 rounded-2xl p-8 hover-lift">
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                        <p class="text-gray-600 mb-6">For large organizations</p>
                        <div class="mb-6">
                            <span class="text-5xl font-bold text-gray-900">Custom</span>
                        </div>
                        <ul class="space-y-4 mb-8">
                            <li class="flex items-start">
                                <i class="fas fa-check text-green-500 mt-1 mr-3"></i>
                                <span class="text-gray-700">Custom Architecture</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check text-green-500 mt-1 mr-3"></i>
                                <span class="text-gray-700">Unlimited Dashboards</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check text-green-500 mt-1 mr-3"></i>
                                <span class="text-gray-700">Advanced ML Solutions</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check text-green-500 mt-1 mr-3"></i>
                                <span class="text-gray-700">24/7 Dedicated Support</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check text-green-500 mt-1 mr-3"></i>
                                <span class="text-gray-700">SLA Guarantee</span>
                            </li>
                        </ul>
                        <a href="#contact" class="block text-center bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                            Contact Sales
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-20 animated-gradient">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
                    Ready to Transform Your Data?
                </h2>
                <p class="text-xl text-white opacity-90 mb-10">
                    Join leading organizations across Uganda in leveraging data for business growth
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#contact" class="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition">
                        Start Your Project
                    </a>
                    <a href="tel:+256701634653" class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition">
                        <i class="fas fa-phone mr-2"></i>
                        Call Us Now
                    </a>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section class="py-20 bg-white" id="contact">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-2 gap-12">
                    <!-- Contact Info -->
                    <div>
                        <h2 class="text-4xl font-bold text-gray-900 mb-6">Get In Touch</h2>
                        <p class="text-lg text-gray-600 mb-8">
                            Have a project in mind? Let's discuss how we can help transform your data into actionable insights.
                        </p>

                        <div class="space-y-6">
                            <div class="flex items-start">
                                <div class="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mr-4">
                                    <i class="fas fa-envelope text-white"></i>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-gray-900 mb-1">Email</h3>
                                    <a href="mailto:datacollectorslimited@gmail.com" class="text-blue-600 hover:text-blue-700">
                                        datacollectorslimited@gmail.com
                                    </a>
                                    <br>
                                    <a href="mailto:drnamanya@gmail.com" class="text-blue-600 hover:text-blue-700">
                                        drnamanya@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div class="flex items-start">
                                <div class="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mr-4">
                                    <i class="fas fa-phone text-white"></i>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-gray-900 mb-1">Phone / WhatsApp</h3>
                                    <a href="tel:+256701634653" class="text-blue-600 hover:text-blue-700">
                                        +256 701 634653
                                    </a>
                                    <br>
                                    <a href="https://wa.me/256701634653" target="_blank" class="inline-flex items-center text-green-600 hover:text-green-700 mt-1">
                                        <i class="fab fa-whatsapp mr-1"></i> Chat on WhatsApp
                                    </a>
                                </div>
                            </div>

                            <div class="flex items-start">
                                <div class="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mr-4">
                                    <i class="fas fa-map-marker-alt text-white"></i>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-gray-900 mb-1">Our Locations</h3>
                                    <p class="text-gray-600">
                                        Kampala • Jinja • Gulu • Hoima
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Form -->
                    <div class="bg-gray-50 rounded-2xl p-8">
                        <form id="contact-form" class="space-y-6">
                            <div>
                                <label class="block text-sm font-semibold text-gray-900 mb-2">Name *</label>
                                <input type="text" id="name" required 
                                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                            </div>

                            <div>
                                <label class="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
                                <input type="email" id="email" required 
                                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                            </div>

                            <div>
                                <label class="block text-sm font-semibold text-gray-900 mb-2">Company</label>
                                <input type="text" id="company" 
                                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                            </div>

                            <div>
                                <label class="block text-sm font-semibold text-gray-900 mb-2">Service Interested In</label>
                                <select id="service" 
                                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                                    <option value="">Select a service</option>
                                    <option value="ml">Machine Learning</option>
                                    <option value="pipeline">Data Pipelines</option>
                                    <option value="powerbi">Power BI Dashboards</option>
                                    <option value="management">Data Management</option>
                                    <option value="android">Android Apps</option>
                                    <option value="analysis">Data Analysis</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-sm font-semibold text-gray-900 mb-2">Message *</label>
                                <textarea id="message" rows="4" required 
                                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"></textarea>
                            </div>

                            <button type="submit" 
                                class="w-full btn-primary text-white px-8 py-4 rounded-lg font-semibold">
                                <i class="fas fa-paper-plane mr-2"></i>Send Message
                            </button>

                            <div id="form-message" class="hidden text-center p-4 rounded-lg"></div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div class="mb-4">
                            <img src="/static/data-collectors-logo.png" alt="Data Collectors Limited" class="h-16 w-auto mb-3">
                        </div>
                        <p class="text-gray-400">
                            Transforming data into intelligent solutions across Africa.
                        </p>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold mb-4">Services</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="#services" class="hover:text-white transition">Machine Learning</a></li>
                            <li><a href="#services" class="hover:text-white transition">Data Pipelines</a></li>
                            <li><a href="#services" class="hover:text-white transition">Power BI</a></li>
                            <li><a href="#services" class="hover:text-white transition">Android Apps</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold mb-4">Company</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="#solutions" class="hover:text-white transition">Solutions</a></li>
                            <li><a href="#pricing" class="hover:text-white transition">Pricing</a></li>
                            <li><a href="#clients" class="hover:text-white transition">Clients</a></li>
                            <li><a href="#contact" class="hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold mb-4">Connect</h4>
                        <div class="flex space-x-4">
                            <a href="#" class="text-gray-400 hover:text-white transition text-xl">
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <a href="#" class="text-gray-400 hover:text-white transition text-xl">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#" class="text-gray-400 hover:text-white transition text-xl">
                                <i class="fab fa-facebook"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="border-t border-gray-800 pt-8 text-center text-gray-400">
                    <p>&copy; 2024 Data Collectors Limited. All rights reserved.</p>
                </div>
            </div>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
            // Mobile menu toggle
            document.getElementById('mobile-menu-btn').addEventListener('click', function() {
                const menu = document.getElementById('mobile-menu');
                menu.classList.toggle('hidden');
            });

            // Smooth scroll
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        document.getElementById('mobile-menu').classList.add('hidden');
                    }
                });
            });

            // Carousel functionality
            let currentSlide = 0;
            const slides = document.querySelectorAll('.carousel-slide');
            const dots = document.querySelectorAll('.carousel-dot');
            const totalSlides = slides.length;
            
            function showSlide(index) {
                // Remove active class from all slides and dots
                slides.forEach(slide => {
                    slide.classList.remove('active', 'exit');
                });
                dots.forEach(dot => {
                    dot.classList.remove('active');
                });
                
                // Add exit class to current slide
                if (slides[currentSlide]) {
                    slides[currentSlide].classList.add('exit');
                }
                
                // Update current slide
                currentSlide = (index + totalSlides) % totalSlides;
                
                // Add active class to new slide and dot
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            }
            
            function nextSlide() {
                showSlide(currentSlide + 1);
            }
            
            // Dot click handlers
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => showSlide(index));
            });
            
            // Auto-advance carousel every 5 seconds
            setInterval(nextSlide, 5000);
            
            // Contact form
            document.getElementById('contact-form').addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    company: document.getElementById('company').value,
                    service: document.getElementById('service').value,
                    message: document.getElementById('message').value
                };

                const messageDiv = document.getElementById('form-message');
                
                try {
                    const response = await axios.post('/api/contact', formData);
                    
                    messageDiv.className = 'text-center p-4 rounded-lg bg-green-100 text-green-800';
                    messageDiv.textContent = response.data.message;
                    messageDiv.classList.remove('hidden');
                    
                    document.getElementById('contact-form').reset();
                    
                    setTimeout(() => {
                        messageDiv.classList.add('hidden');
                    }, 5000);
                    
                } catch (error) {
                    messageDiv.className = 'text-center p-4 rounded-lg bg-red-100 text-red-800';
                    messageDiv.textContent = 'Failed to send message. Please try again.';
                    messageDiv.classList.remove('hidden');
                }
            });
        </script>
    </body>
    </html>
  `)
})

export default app
