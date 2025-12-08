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
    
    // In production, you would save this to a database or send an email
    console.log('Contact form submission:', { name, email, company, service, message })
    
    return c.json({ 
      success: true, 
      message: 'Thank you for contacting us! We will get back to you soon.' 
    })
  } catch (error) {
    return c.json({ 
      success: false, 
      message: 'Failed to submit form. Please try again.' 
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
        <title>Data Collectors Limited - ML, Data Pipelines & Analytics Solutions</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
            }
            
            @keyframes pulse-glow {
                0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
                50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
            }
            
            @keyframes slideInLeft {
                from { opacity: 0; transform: translateX(-50px); }
                to { opacity: 1; transform: translateX(0); }
            }
            
            @keyframes slideInRight {
                from { opacity: 0; transform: translateX(50px); }
                to { opacity: 1; transform: translateX(0); }
            }
            
            @keyframes dataFlow {
                0% { stroke-dashoffset: 1000; }
                100% { stroke-dashoffset: 0; }
            }
            
            .float-animation {
                animation: float 3s ease-in-out infinite;
            }
            
            .pulse-glow {
                animation: pulse-glow 2s ease-in-out infinite;
            }
            
            .slide-in-left {
                animation: slideInLeft 0.8s ease-out forwards;
            }
            
            .slide-in-right {
                animation: slideInRight 0.8s ease-out forwards;
            }
            
            .gradient-bg {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            
            .card-hover {
                transition: all 0.3s ease;
            }
            
            .card-hover:hover {
                transform: translateY(-10px) scale(1.02);
                box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            }
            
            /* Data Pipeline Animation */
            .data-node {
                transition: all 0.3s ease;
            }
            
            .data-node:hover {
                transform: scale(1.1);
            }
            
            .data-particle {
                animation: moveParticle 3s linear infinite;
            }
            
            @keyframes moveParticle {
                0% { transform: translateX(0) translateY(0); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateX(200px) translateY(0); opacity: 0; }
            }
            
            /* Smooth scroll */
            html {
                scroll-behavior: smooth;
            }
            
            /* Hero gradient text */
            .gradient-text {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            /* Background animation for contact section */
            .contact-bg {
                position: relative;
                overflow: hidden;
            }
            
            .contact-bg-animation {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                opacity: 0.15;
                pointer-events: none;
            }
            
            /* Data upload animation */
            @keyframes dataUpload {
                0% { 
                    transform: translateY(0) translateX(0) scale(1);
                    opacity: 0;
                }
                20% {
                    opacity: 1;
                }
                80% {
                    opacity: 1;
                }
                100% { 
                    transform: translateY(-400px) translateX(200px) scale(0.5);
                    opacity: 0;
                }
            }
            
            .data-particle-upload {
                animation: dataUpload 4s ease-in-out infinite;
            }
            
            /* Phone glow animation */
            @keyframes phoneGlow {
                0%, 100% { 
                    filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.6));
                }
                50% { 
                    filter: drop-shadow(0 0 25px rgba(139, 92, 246, 0.9));
                }
            }
            
            .phone-glow {
                animation: phoneGlow 2s ease-in-out infinite;
            }
            
            /* Cloud pulse animation */
            @keyframes cloudPulse {
                0%, 100% { 
                    transform: scale(1);
                    opacity: 0.8;
                }
                50% { 
                    transform: scale(1.05);
                    opacity: 1;
                }
            }
            
            .cloud-pulse {
                animation: cloudPulse 3s ease-in-out infinite;
            }
            
            /* Wave animation for signal */
            @keyframes waveExpand {
                0% {
                    r: 10;
                    opacity: 0.8;
                }
                100% {
                    r: 40;
                    opacity: 0;
                }
            }
            
            .signal-wave {
                animation: waveExpand 2s ease-out infinite;
            }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Navigation -->
        <nav class="bg-white shadow-lg fixed w-full top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16 items-center">
                    <div class="flex items-center">
                        <i class="fas fa-database text-3xl text-blue-600 mr-3"></i>
                        <span class="text-2xl font-bold gradient-text">Data Collectors Ltd</span>
                    </div>
                    <div class="hidden md:flex space-x-8">
                        <a href="#home" class="text-gray-700 hover:text-blue-600 transition">Home</a>
                        <a href="#services" class="text-gray-700 hover:text-blue-600 transition">Services</a>
                        <a href="#pipeline" class="text-gray-700 hover:text-blue-600 transition">Data Flow</a>
                        <a href="#projects" class="text-gray-700 hover:text-blue-600 transition">Projects</a>
                        <a href="#contact" class="text-gray-700 hover:text-blue-600 transition">Contact</a>
                    </div>
                    <button id="mobile-menu-btn" class="md:hidden">
                        <i class="fas fa-bars text-2xl text-gray-700"></i>
                    </button>
                </div>
            </div>
            <!-- Mobile Menu -->
            <div id="mobile-menu" class="hidden md:hidden bg-white border-t">
                <div class="px-2 pt-2 pb-3 space-y-1">
                    <a href="#home" class="block px-3 py-2 text-gray-700 hover:bg-blue-50">Home</a>
                    <a href="#services" class="block px-3 py-2 text-gray-700 hover:bg-blue-50">Services</a>
                    <a href="#pipeline" class="block px-3 py-2 text-gray-700 hover:bg-blue-50">Data Flow</a>
                    <a href="#projects" class="block px-3 py-2 text-gray-700 hover:bg-blue-50">Projects</a>
                    <a href="#contact" class="block px-3 py-2 text-gray-700 hover:bg-blue-50">Contact</a>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section id="home" class="pt-24 pb-20 gradient-bg text-white min-h-screen flex items-center contact-bg">
            <!-- Animated Background -->
            <div class="contact-bg-animation">
                <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
                    <!-- African Youth with Smartphone (Left Side) -->
                    <g id="person-collecting-data" transform="translate(200, 400)">
                        <!-- Person Body -->
                        <ellipse cx="0" cy="60" rx="35" ry="45" fill="#8b5cf6" opacity="0.9"/>
                        
                        <!-- Person Head (African skin tone) -->
                        <circle cx="0" cy="0" r="30" fill="#8d5524" opacity="0.95"/>
                        
                        <!-- Hair (African hairstyle) -->
                        <path d="M -25,-5 Q -30,-15 -25,-25 Q -15,-30 0,-28 Q 15,-30 25,-25 Q 30,-15 25,-5 Z" fill="#1a1a1a" opacity="0.95"/>
                        
                        <!-- Eyes -->
                        <circle cx="-10" cy="-3" r="3" fill="#fff"/>
                        <circle cx="10" cy="-3" r="3" fill="#fff"/>
                        <circle cx="-10" cy="-3" r="2" fill="#000"/>
                        <circle cx="10" cy="-3" r="2" fill="#000"/>
                        
                        <!-- Smile -->
                        <path d="M -10,8 Q 0,12 10,8" stroke="#000" stroke-width="2" fill="none" opacity="0.8"/>
                        
                        <!-- Arms -->
                        <ellipse cx="-30" cy="45" rx="12" ry="35" fill="#8d5524" opacity="0.9" transform="rotate(-20 -30 45)"/>
                        <ellipse cx="30" cy="45" rx="12" ry="35" fill="#8d5524" opacity="0.9" transform="rotate(20 30 45)"/>
                        
                        <!-- Legs -->
                        <rect x="-20" y="95" width="15" height="50" rx="7" fill="#4c1d95" opacity="0.9"/>
                        <rect x="5" y="95" width="15" height="50" rx="7" fill="#4c1d95" opacity="0.9"/>
                        
                        <!-- Smartphone in hand -->
                        <g class="phone-glow" transform="translate(50, 30)">
                            <rect x="0" y="0" width="40" height="70" rx="5" fill="#1e293b" opacity="0.95" stroke="#8b5cf6" stroke-width="2"/>
                            <rect x="5" y="8" width="30" height="50" rx="2" fill="#3b82f6" opacity="0.9"/>
                            
                            <!-- Screen content - data icons -->
                            <circle cx="20" cy="20" r="3" fill="#fff" opacity="0.9"/>
                            <circle cx="20" cy="30" r="3" fill="#fff" opacity="0.9"/>
                            <circle cx="20" cy="40" r="3" fill="#fff" opacity="0.9"/>
                            <rect x="10" y="18" width="5" height="2" fill="#fff" opacity="0.7"/>
                            <rect x="10" y="28" width="5" height="2" fill="#fff" opacity="0.7"/>
                            <rect x="10" y="38" width="5" height="2" fill="#fff" opacity="0.7"/>
                            
                            <!-- Signal waves from phone -->
                            <circle cx="20" cy="10" r="10" fill="none" stroke="#fbbf24" stroke-width="2" opacity="0.6" class="signal-wave"/>
                            <circle cx="20" cy="10" r="10" fill="none" stroke="#fbbf24" stroke-width="2" opacity="0.6" class="signal-wave" style="animation-delay: 0.5s"/>
                            <circle cx="20" cy="10" r="10" fill="none" stroke="#fbbf24" stroke-width="2" opacity="0.6" class="signal-wave" style="animation-delay: 1s"/>
                        </g>
                    </g>
                    
                    <!-- Animated Data Particles flowing upward -->
                    <g id="data-stream">
                        <!-- Particle 1 -->
                        <g class="data-particle-upload">
                            <circle cx="270" cy="450" r="8" fill="#3b82f6" opacity="0.9"/>
                            <circle cx="270" cy="450" r="4" fill="#fff" opacity="0.9"/>
                        </g>
                        
                        <!-- Particle 2 -->
                        <g class="data-particle-upload" style="animation-delay: 0.5s">
                            <circle cx="280" cy="460" r="6" fill="#10b981" opacity="0.9"/>
                            <circle cx="280" cy="460" r="3" fill="#fff" opacity="0.9"/>
                        </g>
                        
                        <!-- Particle 3 -->
                        <g class="data-particle-upload" style="animation-delay: 1s">
                            <circle cx="260" cy="440" r="7" fill="#fbbf24" opacity="0.9"/>
                            <circle cx="260" cy="440" r="3.5" fill="#fff" opacity="0.9"/>
                        </g>
                        
                        <!-- Particle 4 -->
                        <g class="data-particle-upload" style="animation-delay: 1.5s">
                            <circle cx="275" cy="455" r="5" fill="#ef4444" opacity="0.9"/>
                            <circle cx="275" cy="455" r="2.5" fill="#fff" opacity="0.9"/>
                        </g>
                        
                        <!-- Particle 5 -->
                        <g class="data-particle-upload" style="animation-delay: 2s">
                            <circle cx="285" cy="445" r="6" fill="#8b5cf6" opacity="0.9"/>
                            <circle cx="285" cy="445" r="3" fill="#fff" opacity="0.9"/>
                        </g>
                        
                        <!-- Particle 6 -->
                        <g class="data-particle-upload" style="animation-delay: 2.5s">
                            <circle cx="265" cy="465" r="7" fill="#06b6d4" opacity="0.9"/>
                            <circle cx="265" cy="465" r="3.5" fill="#fff" opacity="0.9"/>
                        </g>
                        
                        <!-- Particle 7 -->
                        <g class="data-particle-upload" style="animation-delay: 3s">
                            <circle cx="272" cy="448" r="5" fill="#f97316" opacity="0.9"/>
                            <circle cx="272" cy="448" r="2.5" fill="#fff" opacity="0.9"/>
                        </g>
                        
                        <!-- Particle 8 -->
                        <g class="data-particle-upload" style="animation-delay: 3.5s">
                            <circle cx="278" cy="452" r="6" fill="#ec4899" opacity="0.9"/>
                            <circle cx="278" cy="452" r="3" fill="#fff" opacity="0.9"/>
                        </g>
                    </g>
                    
                    <!-- Data flowing line (curved path) -->
                    <path d="M 270,450 Q 350,300 470,100" stroke="#8b5cf6" stroke-width="3" fill="none" opacity="0.3" stroke-dasharray="10,5">
                        <animate attributeName="stroke-dashoffset" from="0" to="100" dur="3s" repeatCount="indefinite"/>
                    </path>
                    
                    <!-- Cloud Database System (Top Right) -->
                    <g id="cloud-system" transform="translate(750, 150)" class="cloud-pulse">
                        <!-- Cloud shape -->
                        <ellipse cx="0" cy="0" rx="80" ry="50" fill="#fff" opacity="0.95"/>
                        <circle cx="-50" cy="0" r="40" fill="#fff" opacity="0.95"/>
                        <circle cx="50" cy="0" r="40" fill="#fff" opacity="0.95"/>
                        <circle cx="0" cy="-20" r="45" fill="#fff" opacity="0.95"/>
                        
                        <!-- Cloud icon/text -->
                        <text x="0" y="5" text-anchor="middle" fill="#667eea" font-size="20" font-weight="bold">CLOUD</text>
                        <text x="0" y="25" text-anchor="middle" fill="#8b5cf6" font-size="14" font-weight="bold">DATABASE</text>
                        
                        <!-- Database icon inside cloud -->
                        <g transform="translate(0, -35)">
                            <ellipse cx="0" cy="0" rx="25" ry="8" fill="#667eea" opacity="0.8"/>
                            <rect x="-25" y="0" width="50" height="20" fill="#667eea" opacity="0.6"/>
                            <ellipse cx="0" cy="20" rx="25" ry="8" fill="#667eea" opacity="0.8"/>
                        </g>
                        
                        <!-- Data receiving indicators -->
                        <circle cx="0" cy="60" r="5" fill="#10b981" opacity="0.9">
                            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="-15" cy="55" r="4" fill="#3b82f6" opacity="0.9">
                            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin="0.3s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="15" cy="55" r="4" fill="#fbbf24" opacity="0.9">
                            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin="0.6s" repeatCount="indefinite"/>
                        </circle>
                    </g>
                    
                    <!-- Connection visualization -->
                    <g transform="translate(750, 210)">
                        <text x="0" y="0" text-anchor="middle" fill="#fff" font-size="14" opacity="0.8">Data Management System</text>
                    </g>
                    
                    <!-- Additional decorative data icons around cloud -->
                    <g transform="translate(650, 120)">
                        <circle cx="0" cy="0" r="15" fill="#3b82f6" opacity="0.6">
                            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="10s" repeatCount="indefinite"/>
                        </circle>
                        <text x="0" y="5" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">ML</text>
                    </g>
                    
                    <g transform="translate(850, 120)">
                        <circle cx="0" cy="0" r="15" fill="#10b981" opacity="0.6">
                            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="12s" repeatCount="indefinite"/>
                        </circle>
                        <text x="0" y="5" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">BI</text>
                    </g>
                    
                    <g transform="translate(750, 80)">
                        <circle cx="0" cy="0" r="15" fill="#fbbf24" opacity="0.6">
                            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="8s" repeatCount="indefinite"/>
                        </circle>
                        <text x="0" y="5" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">API</text>
                    </g>
                    
                    <!-- Ground line -->
                    <line x1="150" y1="550" x2="300" y2="550" stroke="#fff" stroke-width="2" opacity="0.3"/>
                </svg>
            </div>
            
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div class="slide-in-left">
                        <h1 class="text-5xl md:text-6xl font-bold mb-6">
                            Transform Data Into <span class="text-yellow-300">Intelligent Solutions</span>
                        </h1>
                        <p class="text-xl mb-8 text-gray-100">
                            We specialize in Machine Learning, Data Pipelines, Analytics, and Mobile Applications 
                            that drive business intelligence and automation.
                        </p>
                        <div class="flex space-x-4">
                            <a href="#contact" class="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                                Get Started
                            </a>
                            <a href="#services" class="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition">
                                Our Services
                            </a>
                        </div>
                    </div>
                    <div class="slide-in-right relative">
                        <div class="float-animation">
                            <svg viewBox="0 0 400 400" class="w-full h-auto">
                                <!-- Central Hub -->
                                <circle cx="200" cy="200" r="40" fill="#ffffff" opacity="0.9" class="pulse-glow"/>
                                <text x="200" y="205" text-anchor="middle" fill="#667eea" font-size="16" font-weight="bold">DATA</text>
                                
                                <!-- Orbiting Nodes -->
                                <g id="ml-node" class="data-node">
                                    <circle cx="200" cy="80" r="30" fill="#fbbf24" opacity="0.9"/>
                                    <text x="200" y="85" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">ML</text>
                                </g>
                                
                                <g id="pipeline-node" class="data-node">
                                    <circle cx="320" cy="200" r="30" fill="#10b981" opacity="0.9"/>
                                    <text x="320" y="205" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">API</text>
                                </g>
                                
                                <g id="dashboard-node" class="data-node">
                                    <circle cx="200" cy="320" r="30" fill="#ef4444" opacity="0.9"/>
                                    <text x="200" y="325" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">BI</text>
                                </g>
                                
                                <g id="mobile-node" class="data-node">
                                    <circle cx="80" cy="200" r="30" fill="#8b5cf6" opacity="0.9"/>
                                    <text x="80" y="205" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">APP</text>
                                </g>
                                
                                <!-- Connecting Lines with Animation -->
                                <line x1="200" y1="160" x2="200" y2="110" stroke="#fff" stroke-width="2" opacity="0.6"/>
                                <line x1="240" y1="200" x2="290" y2="200" stroke="#fff" stroke-width="2" opacity="0.6"/>
                                <line x1="200" y1="240" x2="200" y2="290" stroke="#fff" stroke-width="2" opacity="0.6"/>
                                <line x1="160" y1="200" x2="110" y2="200" stroke="#fff" stroke-width="2" opacity="0.6"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Services Section -->
        <section id="services" class="py-20 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold text-gray-900 mb-4">Our Core Services</h2>
                    <p class="text-xl text-gray-600">Comprehensive data solutions tailored to your business needs</p>
                </div>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- ML Projects -->
                    <div class="card-hover bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-8 border-2 border-yellow-200">
                        <div class="text-5xl mb-4">
                            <i class="fas fa-brain text-yellow-600"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-3">Machine Learning</h3>
                        <p class="text-gray-700 mb-4">
                            Custom ML models for prediction, classification, and automation. From data preprocessing to model deployment.
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li><i class="fas fa-check text-yellow-600 mr-2"></i>Predictive Analytics</li>
                            <li><i class="fas fa-check text-yellow-600 mr-2"></i>Natural Language Processing</li>
                            <li><i class="fas fa-check text-yellow-600 mr-2"></i>Computer Vision</li>
                            <li><i class="fas fa-check text-yellow-600 mr-2"></i>Model Deployment</li>
                        </ul>
                    </div>

                    <!-- Data Pipelines -->
                    <div class="card-hover bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 border-2 border-green-200">
                        <div class="text-5xl mb-4">
                            <i class="fas fa-project-diagram text-green-600"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-3">Data Pipelines</h3>
                        <p class="text-gray-700 mb-4">
                            Automated ETL processes that transform raw data into actionable insights with real-time processing.
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li><i class="fas fa-check text-green-600 mr-2"></i>ETL/ELT Development</li>
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Real-time Processing</li>
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Data Integration</li>
                            <li><i class="fas fa-check text-green-600 mr-2"></i>API Development</li>
                        </ul>
                    </div>

                    <!-- Data Management -->
                    <div class="card-hover bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border-2 border-blue-200">
                        <div class="text-5xl mb-4">
                            <i class="fas fa-database text-blue-600"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-3">Data Management</h3>
                        <p class="text-gray-700 mb-4">
                            Scalable data warehouses and management systems for efficient storage and retrieval.
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Database Design</li>
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Data Warehousing</li>
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Data Quality</li>
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Cloud Migration</li>
                        </ul>
                    </div>

                    <!-- Android Apps -->
                    <div class="card-hover bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 border-2 border-purple-200">
                        <div class="text-5xl mb-4">
                            <i class="fas fa-mobile-alt text-purple-600"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-3">Android Applications</h3>
                        <p class="text-gray-700 mb-4">
                            Native and cross-platform mobile apps with seamless backend integration.
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li><i class="fas fa-check text-purple-600 mr-2"></i>Native Development</li>
                            <li><i class="fas fa-check text-purple-600 mr-2"></i>Cross-Platform Apps</li>
                            <li><i class="fas fa-check text-purple-600 mr-2"></i>API Integration</li>
                            <li><i class="fas fa-check text-purple-600 mr-2"></i>Offline Capability</li>
                        </ul>
                    </div>

                    <!-- Power BI -->
                    <div class="card-hover bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-8 border-2 border-red-200">
                        <div class="text-5xl mb-4">
                            <i class="fas fa-chart-line text-red-600"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-3">Power BI Dashboards</h3>
                        <p class="text-gray-700 mb-4">
                            Interactive dashboards and reports that transform data into visual insights.
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li><i class="fas fa-check text-red-600 mr-2"></i>Custom Dashboards</li>
                            <li><i class="fas fa-check text-red-600 mr-2"></i>Real-time Analytics</li>
                            <li><i class="fas fa-check text-red-600 mr-2"></i>Data Visualization</li>
                            <li><i class="fas fa-check text-red-600 mr-2"></i>Report Automation</li>
                        </ul>
                    </div>

                    <!-- Data Analysis -->
                    <div class="card-hover bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-8 border-2 border-indigo-200">
                        <div class="text-5xl mb-4">
                            <i class="fas fa-chart-pie text-indigo-600"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-3">Data Analysis</h3>
                        <p class="text-gray-700 mb-4">
                            Deep statistical analysis and insights extraction from complex datasets.
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li><i class="fas fa-check text-indigo-600 mr-2"></i>Statistical Analysis</li>
                            <li><i class="fas fa-check text-indigo-600 mr-2"></i>Exploratory Data Analysis</li>
                            <li><i class="fas fa-check text-indigo-600 mr-2"></i>Business Intelligence</li>
                            <li><i class="fas fa-check text-indigo-600 mr-2"></i>Reporting</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Data Pipeline Visualization Section -->
        <section id="pipeline" class="py-20 bg-gray-100">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold text-gray-900 mb-4">Data Flow Architecture</h2>
                    <p class="text-xl text-gray-600">Watch how data transforms from source to insights</p>
                </div>

                <!-- Interactive Pipeline Canvas -->
                <div class="bg-white rounded-xl shadow-2xl p-8 overflow-x-auto">
                    <div id="pipeline-canvas" class="min-w-max">
                        <svg width="1200" height="400" viewBox="0 0 1200 400" class="mx-auto">
                            <!-- MIS Database -->
                            <g id="mis-system">
                                <rect x="20" y="150" width="120" height="100" rx="10" fill="#3b82f6" opacity="0.9"/>
                                <text x="80" y="190" text-anchor="middle" fill="#fff" font-size="16" font-weight="bold">MIS</text>
                                <text x="80" y="210" text-anchor="middle" fill="#fff" font-size="12">Database</text>
                                <circle cx="80" cy="230" r="8" fill="#fbbf24" class="pulse-glow">
                                    <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite"/>
                                </circle>
                            </g>

                            <!-- Data Collection -->
                            <g id="data-collection">
                                <rect x="200" y="150" width="140" height="100" rx="10" fill="#10b981" opacity="0.9"/>
                                <text x="270" y="185" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold">Data Collection</text>
                                <text x="270" y="205" text-anchor="middle" fill="#fff" font-size="11">• APIs</text>
                                <text x="270" y="220" text-anchor="middle" fill="#fff" font-size="11">• Forms</text>
                                <text x="270" y="235" text-anchor="middle" fill="#fff" font-size="11">• IoT Sensors</text>
                            </g>

                            <!-- ETL Pipeline -->
                            <g id="etl-pipeline">
                                <rect x="400" y="150" width="140" height="100" rx="10" fill="#8b5cf6" opacity="0.9"/>
                                <text x="470" y="185" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold">ETL Pipeline</text>
                                <text x="470" y="205" text-anchor="middle" fill="#fff" font-size="11">• Extract</text>
                                <text x="470" y="220" text-anchor="middle" fill="#fff" font-size="11">• Transform</text>
                                <text x="470" y="235" text-anchor="middle" fill="#fff" font-size="11">• Load</text>
                            </g>

                            <!-- Data Warehouse -->
                            <g id="data-warehouse">
                                <rect x="600" y="150" width="140" height="100" rx="10" fill="#f59e0b" opacity="0.9"/>
                                <text x="670" y="185" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold">Data Warehouse</text>
                                <text x="670" y="205" text-anchor="middle" fill="#fff" font-size="11">• Storage</text>
                                <text x="670" y="220" text-anchor="middle" fill="#fff" font-size="11">• Processing</text>
                                <text x="670" y="235" text-anchor="middle" fill="#fff" font-size="11">• Indexing</text>
                            </g>

                            <!-- ML Models -->
                            <g id="ml-models">
                                <rect x="800" y="50" width="140" height="80" rx="10" fill="#ef4444" opacity="0.9"/>
                                <text x="870" y="80" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold">ML Models</text>
                                <text x="870" y="100" text-anchor="middle" fill="#fff" font-size="11">• Prediction</text>
                                <text x="870" y="115" text-anchor="middle" fill="#fff" font-size="11">• Classification</text>
                            </g>

                            <!-- Analytics -->
                            <g id="analytics">
                                <rect x="800" y="170" width="140" height="60" rx="10" fill="#06b6d4" opacity="0.9"/>
                                <text x="870" y="195" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold">Analytics</text>
                                <text x="870" y="215" text-anchor="middle" fill="#fff" font-size="11">• Business Intelligence</text>
                            </g>

                            <!-- Power BI Dashboard -->
                            <g id="powerbi-dashboard">
                                <rect x="1000" y="150" width="160" height="100" rx="10" fill="#dc2626" opacity="0.9"/>
                                <text x="1080" y="185" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold">Power BI</text>
                                <text x="1080" y="205" text-anchor="middle" fill="#fff" font-size="11">Dashboard</text>
                                <circle cx="1080" cy="225" r="15" fill="#fff" opacity="0.3"/>
                                <circle cx="1080" cy="225" r="8" fill="#fbbf24" class="pulse-glow">
                                    <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite"/>
                                </circle>
                            </g>

                            <!-- Animated Arrows -->
                            <defs>
                                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                    <polygon points="0 0, 10 3, 0 6" fill="#4b5563" />
                                </marker>
                            </defs>

                            <!-- Arrow Lines -->
                            <line x1="140" y1="200" x2="200" y2="200" stroke="#4b5563" stroke-width="3" marker-end="url(#arrowhead)"/>
                            <line x1="340" y1="200" x2="400" y2="200" stroke="#4b5563" stroke-width="3" marker-end="url(#arrowhead)"/>
                            <line x1="540" y1="200" x2="600" y2="200" stroke="#4b5563" stroke-width="3" marker-end="url(#arrowhead)"/>
                            <line x1="740" y1="180" x2="800" y2="100" stroke="#4b5563" stroke-width="3" marker-end="url(#arrowhead)"/>
                            <line x1="740" y1="200" x2="800" y2="200" stroke="#4b5563" stroke-width="3" marker-end="url(#arrowhead)"/>
                            <line x1="940" y1="100" x2="1000" y2="180" stroke="#4b5563" stroke-width="3" marker-end="url(#arrowhead)"/>
                            <line x1="940" y1="200" x2="1000" y2="200" stroke="#4b5563" stroke-width="3" marker-end="url(#arrowhead)"/>

                            <!-- Animated Data Particles -->
                            <g id="particles">
                                <!-- Particle 1 -->
                                <circle cx="0" cy="0" r="6" fill="#3b82f6">
                                    <animateMotion dur="6s" repeatCount="indefinite">
                                        <mpath href="#dataPath1"/>
                                    </animateMotion>
                                </circle>
                                
                                <!-- Particle 2 -->
                                <circle cx="0" cy="0" r="6" fill="#10b981">
                                    <animateMotion dur="6s" begin="1s" repeatCount="indefinite">
                                        <mpath href="#dataPath1"/>
                                    </animateMotion>
                                </circle>
                                
                                <!-- Particle 3 -->
                                <circle cx="0" cy="0" r="6" fill="#f59e0b">
                                    <animateMotion dur="6s" begin="2s" repeatCount="indefinite">
                                        <mpath href="#dataPath1"/>
                                    </animateMotion>
                                </circle>
                            </g>

                            <!-- Invisible paths for animation -->
                            <path id="dataPath1" d="M 140,200 L 200,200 L 340,200 L 400,200 L 540,200 L 600,200 L 740,200 L 940,200 L 1000,200" fill="none" opacity="0"/>
                        </svg>
                    </div>

                    <div class="mt-8 text-center">
                        <p class="text-gray-600 text-lg">
                            <i class="fas fa-info-circle text-blue-600 mr-2"></i>
                            Real-time data flows from source systems through our optimized pipelines to actionable dashboards
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Projects/Portfolio Section -->
        <section id="projects" class="py-20 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
                    <p class="text-xl text-gray-600">Real-world solutions delivering measurable results</p>
                </div>

                <div class="grid md:grid-cols-2 gap-8">
                    <!-- Project 1 -->
                    <div class="card-hover bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl overflow-hidden shadow-lg">
                        <div class="p-8">
                            <div class="flex items-center mb-4">
                                <i class="fas fa-chart-bar text-4xl text-blue-600 mr-4"></i>
                                <h3 class="text-2xl font-bold text-gray-900">Sales Forecasting ML Model</h3>
                            </div>
                            <p class="text-gray-700 mb-4">
                                Developed a machine learning model that predicts sales trends with 95% accuracy, 
                                helping retailers optimize inventory and reduce waste by 30%.
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Python</span>
                                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">TensorFlow</span>
                                <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Power BI</span>
                            </div>
                            <div class="text-gray-600">
                                <p><i class="fas fa-check-circle text-green-600 mr-2"></i>95% prediction accuracy</p>
                                <p><i class="fas fa-check-circle text-green-600 mr-2"></i>30% waste reduction</p>
                            </div>
                        </div>
                    </div>

                    <!-- Project 2 -->
                    <div class="card-hover bg-gradient-to-br from-green-50 to-teal-50 rounded-xl overflow-hidden shadow-lg">
                        <div class="p-8">
                            <div class="flex items-center mb-4">
                                <i class="fas fa-stream text-4xl text-green-600 mr-4"></i>
                                <h3 class="text-2xl font-bold text-gray-900">Real-time ETL Pipeline</h3>
                            </div>
                            <p class="text-gray-700 mb-4">
                                Built a scalable data pipeline processing 10M+ records daily from multiple sources, 
                                reducing data latency from hours to seconds.
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Apache Kafka</span>
                                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Spark</span>
                                <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">AWS</span>
                            </div>
                            <div class="text-gray-600">
                                <p><i class="fas fa-check-circle text-green-600 mr-2"></i>10M+ records/day</p>
                                <p><i class="fas fa-check-circle text-green-600 mr-2"></i>99.9% uptime</p>
                            </div>
                        </div>
                    </div>

                    <!-- Project 3 -->
                    <div class="card-hover bg-gradient-to-br from-red-50 to-orange-50 rounded-xl overflow-hidden shadow-lg">
                        <div class="p-8">
                            <div class="flex items-center mb-4">
                                <i class="fas fa-mobile-alt text-4xl text-red-600 mr-4"></i>
                                <h3 class="text-2xl font-bold text-gray-900">Field Data Collection App</h3>
                            </div>
                            <p class="text-gray-700 mb-4">
                                Android application for offline-first data collection with GPS tracking and 
                                photo capture, serving 500+ field agents.
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Android</span>
                                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Kotlin</span>
                                <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Firebase</span>
                            </div>
                            <div class="text-gray-600">
                                <p><i class="fas fa-check-circle text-green-600 mr-2"></i>500+ active users</p>
                                <p><i class="fas fa-check-circle text-green-600 mr-2"></i>Offline capable</p>
                            </div>
                        </div>
                    </div>

                    <!-- Project 4 -->
                    <div class="card-hover bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl overflow-hidden shadow-lg">
                        <div class="p-8">
                            <div class="flex items-center mb-4">
                                <i class="fas fa-tachometer-alt text-4xl text-purple-600 mr-4"></i>
                                <h3 class="text-2xl font-bold text-gray-900">Executive Dashboard Suite</h3>
                            </div>
                            <p class="text-gray-700 mb-4">
                                Comprehensive Power BI dashboard integrating data from 15+ sources, 
                                providing real-time KPIs and automated reporting.
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Power BI</span>
                                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">DAX</span>
                                <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">SQL</span>
                            </div>
                            <div class="text-gray-600">
                                <p><i class="fas fa-check-circle text-green-600 mr-2"></i>15+ data sources</p>
                                <p><i class="fas fa-check-circle text-green-600 mr-2"></i>Real-time updates</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="py-20 gradient-bg text-white">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-4xl font-bold mb-4">Let's Transform Your Data</h2>
                    <p class="text-xl text-gray-100">Get in touch to discuss your project requirements</p>
                </div>

                <div class="bg-white rounded-xl shadow-2xl p-8 text-gray-900">
                    <form id="contact-form" class="space-y-6">
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-semibold mb-2">Name *</label>
                                <input type="text" id="name" required 
                                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold mb-2">Email *</label>
                                <input type="email" id="email" required 
                                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                            </div>
                        </div>

                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-semibold mb-2">Company</label>
                                <input type="text" id="company" 
                                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold mb-2">Service Interested In</label>
                                <select id="service" 
                                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                                    <option value="">Select a service</option>
                                    <option value="ml">Machine Learning</option>
                                    <option value="pipeline">Data Pipelines</option>
                                    <option value="management">Data Management</option>
                                    <option value="android">Android Apps</option>
                                    <option value="powerbi">Power BI</option>
                                    <option value="analysis">Data Analysis</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold mb-2">Message *</label>
                            <textarea id="message" rows="5" required 
                                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"></textarea>
                        </div>

                        <div>
                            <button type="submit" 
                                class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition transform hover:scale-105">
                                <i class="fas fa-paper-plane mr-2"></i>Send Message
                            </button>
                        </div>

                        <div id="form-message" class="hidden text-center p-4 rounded-lg"></div>
                    </form>

                    <div class="mt-8 pt-8 border-t border-gray-200">
                        <div class="grid md:grid-cols-3 gap-6 text-center">
                            <div>
                                <i class="fas fa-envelope text-3xl text-blue-600 mb-2"></i>
                                <p class="font-semibold">Email</p>
                                <p class="text-gray-600">info@datacollectors.com</p>
                            </div>
                            <div>
                                <i class="fas fa-phone text-3xl text-blue-600 mb-2"></i>
                                <p class="font-semibold">Phone</p>
                                <p class="text-gray-600">+123 456 7890</p>
                            </div>
                            <div>
                                <i class="fas fa-map-marker-alt text-3xl text-blue-600 mb-2"></i>
                                <p class="font-semibold">Location</p>
                                <p class="text-gray-600">Your City, Country</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-4 gap-8">
                    <div>
                        <div class="flex items-center mb-4">
                            <i class="fas fa-database text-2xl text-blue-400 mr-2"></i>
                            <span class="text-xl font-bold">Data Collectors Ltd</span>
                        </div>
                        <p class="text-gray-400">
                            Transforming data into intelligent solutions through ML, analytics, and automation.
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
                            <li><a href="#projects" class="hover:text-white transition">Projects</a></li>
                            <li><a href="#contact" class="hover:text-white transition">Contact</a></li>
                            <li><a href="#" class="hover:text-white transition">About Us</a></li>
                            <li><a href="#" class="hover:text-white transition">Careers</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold mb-4">Connect</h4>
                        <div class="flex space-x-4">
                            <a href="#" class="text-gray-400 hover:text-white transition text-2xl">
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <a href="#" class="text-gray-400 hover:text-white transition text-2xl">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#" class="text-gray-400 hover:text-white transition text-2xl">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="#" class="text-gray-400 hover:text-white transition text-2xl">
                                <i class="fab fa-facebook"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
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

            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        // Close mobile menu if open
                        document.getElementById('mobile-menu').classList.add('hidden');
                    }
                });
            });

            // Contact form submission
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
                    
                    // Reset form
                    document.getElementById('contact-form').reset();
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        messageDiv.classList.add('hidden');
                    }, 5000);
                    
                } catch (error) {
                    messageDiv.className = 'text-center p-4 rounded-lg bg-red-100 text-red-800';
                    messageDiv.textContent = 'Failed to send message. Please try again.';
                    messageDiv.classList.remove('hidden');
                }
            });

            // Animate elements on scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.card-hover').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'all 0.6s ease-out';
                observer.observe(el);
            });
        </script>
    </body>
    </html>
  `)
})

export default app
