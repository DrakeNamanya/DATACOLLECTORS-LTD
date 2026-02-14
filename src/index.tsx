import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './public' }))

app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Intelligent Solutions | Enterprise AI</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  brand: {
                    dark: '#0f172a',
                    purple: '#6366f1',
                    accent: '#8b5cf6',
                  }
                },
                animation: {
                  'flow': 'flow 3s linear infinite',
                  'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                },
                keyframes: {
                  flow: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' }
                  }
                }
              }
            }
          }
        </script>
        <style>
          .glass-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .gradient-text {
            background: linear-gradient(135deg, #4f46e5 0%, #9333ea 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .hero-bg {
            background-color: #f8fafc;
            background-image: radial-gradient(#e0e7ff 1px, transparent 1px);
            background-size: 40px 40px;
          }
          
          /* Data Flow Animation Lines */
          .data-stream {
            position: absolute;
            width: 2px;
            background: linear-gradient(to bottom, transparent, #6366f1, transparent);
            opacity: 0.3;
            animation: data-flow 2s infinite linear;
          }
          @keyframes data-flow {
            0% { transform: translateY(-100%); opacity: 0; }
            50% { opacity: 0.5; }
            100% { transform: translateY(100%); opacity: 0; }
          }
        </style>
    </head>
    <body class="bg-slate-50 text-slate-900 font-sans antialiased overflow-x-hidden">
        
        <!-- Navbar -->
        <nav class="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-20">
                    <div class="flex items-center space-x-2">
                        <div class="w-8 h-8 rounded bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">I</div>
                        <span class="text-xl font-bold text-slate-900 tracking-tight">Intelligent<span class="text-indigo-600">Solutions</span></span>
                    </div>
                    <div class="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
                        <a href="#" class="hover:text-indigo-600 transition-colors">Platform</a>
                        <a href="#" class="hover:text-indigo-600 transition-colors">Solutions</a>
                        <a href="#" class="hover:text-indigo-600 transition-colors">Customers</a>
                        <a href="#" class="hover:text-indigo-600 transition-colors">Resources</a>
                    </div>
                    <div>
                        <a href="#" class="px-5 py-2.5 rounded-full text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-all">Contact Sales</a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <div class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden hero-bg">
            <!-- Background Decorative Elements -->
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-indigo-100/50 rounded-full blur-3xl -z-10 opacity-60"></div>
            
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div class="inline-flex items-center space-x-2 bg-white/60 backdrop-blur border border-indigo-100 rounded-full px-4 py-1.5 mb-8 shadow-sm">
                    <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span class="text-sm font-medium text-indigo-900">Enterprise AI for Africa</span>
                </div>
                
                <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                    Transform Data Into <br class="hidden md:block" />
                    <span class="gradient-text">Intelligent Solutions</span>
                </h1>
                
                <p class="mt-6 max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed">
                    Enterprise-grade machine learning, data pipelines, and analytics solutions that drive business growth across Africa.
                </p>
                
                <div class="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                    <a href="#" class="group px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center">
                        Start Your Project 
                        <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                    </a>
                    <a href="#pipeline" class="px-8 py-4 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold text-lg shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all">
                        View Solutions
                    </a>
                </div>
                
                <!-- Trust Badges -->
                <div class="mt-16 pt-8 border-t border-slate-200/60 max-w-4xl mx-auto">
                    <p class="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-6">Trusted by industry leaders</p>
                    <div class="flex flex-wrap justify-center gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <!-- Placeholders for generic company logos -->
                        <div class="flex items-center space-x-2"><i class="fas fa-building text-2xl"></i><span class="font-bold text-xl">Acme Corp</span></div>
                        <div class="flex items-center space-x-2"><i class="fas fa-globe text-2xl"></i><span class="font-bold text-xl">GlobalTech</span></div>
                        <div class="flex items-center space-x-2"><i class="fas fa-chart-line text-2xl"></i><span class="font-bold text-xl">DataFlow</span></div>
                        <div class="flex items-center space-x-2"><i class="fas fa-cloud text-2xl"></i><span class="font-bold text-xl">CloudScale</span></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Architecture Flow Section -->
        <section id="pipeline" class="py-24 bg-slate-900 text-white relative overflow-hidden">
            <!-- Background Grid -->
            <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div class="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950/20 to-slate-900"></div>
            
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div class="text-center mb-20">
                    <h2 class="text-3xl md:text-5xl font-bold mb-6">Enterprise Data Architecture</h2>
                    <p class="text-indigo-200 max-w-3xl mx-auto text-lg">A robust, scalable, and secure end-to-end data pipeline designed for modern enterprises.</p>
                </div>

                <!-- The Flow Diagram -->
                <div class="relative max-w-4xl mx-auto">
                    <!-- Central Connecting Line -->
                    <div class="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-indigo-900/50 hidden md:block">
                        <div class="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-indigo-500 to-purple-500 animate-pulse"></div>
                    </div>

                    <!-- Step 1: Client App -->
                    <div class="relative flex flex-col md:flex-row items-center justify-between mb-16 group">
                        <div class="md:w-5/12 text-center md:text-right pr-0 md:pr-12 mb-6 md:mb-0">
                            <h3 class="text-2xl font-bold text-white mb-2">Client Application</h3>
                            <p class="text-slate-400 text-sm">Web / Mobile / Admin Interface</p>
                        </div>
                        <div class="relative z-10 w-16 h-16 rounded-full bg-slate-800 border-4 border-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)] group-hover:scale-110 transition-transform duration-300">
                            <i class="fas fa-laptop-code text-indigo-400 text-xl"></i>
                        </div>
                        <div class="md:w-5/12 pl-0 md:pl-12 hidden md:block opacity-50 text-sm text-slate-500">
                            User Interaction Entry Point
                        </div>
                    </div>

                    <!-- Flow Line Arrow -->
                    <div class="flex justify-center mb-8 md:hidden"><i class="fas fa-arrow-down text-indigo-500 animate-bounce"></i></div>

                    <!-- Step 2: API Layer -->
                    <div class="relative flex flex-col md:flex-row items-center justify-between mb-16 group">
                        <div class="md:w-5/12 text-right pr-12 hidden md:block opacity-50 text-sm text-slate-500">
                            Node.js / Django / FastAPI
                        </div>
                        <div class="relative z-10 w-16 h-16 rounded-full bg-slate-800 border-4 border-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)] group-hover:scale-110 transition-transform duration-300">
                            <i class="fas fa-server text-indigo-400 text-xl"></i>
                        </div>
                        <div class="md:w-5/12 text-center md:text-left pl-0 md:pl-12 mb-6 md:mb-0">
                            <h3 class="text-2xl font-bold text-white mb-2">API Gateway</h3>
                            <p class="text-slate-400 text-sm">Request Routing & Load Balancing</p>
                        </div>
                    </div>

                     <!-- Flow Line Arrow -->
                    <div class="flex justify-center mb-8 md:hidden"><i class="fas fa-arrow-down text-indigo-500 animate-bounce"></i></div>

                    <!-- Step 3: Backend Services (The "Circle Flame" Concept - Big Cluster) -->
                    <div class="relative mb-20 py-10">
                        <div class="absolute inset-0 border border-indigo-500/30 rounded-3xl bg-indigo-900/10 backdrop-blur-sm -z-10"></div>
                        <div class="text-center mb-8">
                            <span class="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Core Infrastructure</span>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 px-8">
                            <!-- Service 1 -->
                            <div class="glass-card p-6 rounded-xl hover:bg-white/10 transition-colors">
                                <div class="flex items-center space-x-4 mb-3">
                                    <div class="w-10 h-10 rounded bg-blue-500/20 flex items-center justify-center text-blue-400"><i class="fas fa-shield-alt"></i></div>
                                    <h4 class="font-bold text-white">Auth Service</h4>
                                </div>
                                <p class="text-sm text-slate-400">JWT / OAuth 2.0 Secure Access Control</p>
                            </div>
                            
                            <!-- Service 2 -->
                            <div class="glass-card p-6 rounded-xl hover:bg-white/10 transition-colors">
                                <div class="flex items-center space-x-4 mb-3">
                                    <div class="w-10 h-10 rounded bg-green-500/20 flex items-center justify-center text-green-400"><i class="fas fa-database"></i></div>
                                    <h4 class="font-bold text-white">Database</h4>
                                </div>
                                <p class="text-sm text-slate-400">PostgreSQL Relational Storage</p>
                            </div>

                            <!-- Service 3 -->
                            <div class="glass-card p-6 rounded-xl hover:bg-white/10 transition-colors">
                                <div class="flex items-center space-x-4 mb-3">
                                    <div class="w-10 h-10 rounded bg-yellow-500/20 flex items-center justify-center text-yellow-400"><i class="fas fa-cube"></i></div>
                                    <h4 class="font-bold text-white">Object Storage</h4>
                                </div>
                                <p class="text-sm text-slate-400">S3 Compatible Blob Storage</p>
                            </div>

                            <!-- Service 4 -->
                            <div class="glass-card p-6 rounded-xl hover:bg-white/10 transition-colors">
                                <div class="flex items-center space-x-4 mb-3">
                                    <div class="w-10 h-10 rounded bg-red-500/20 flex items-center justify-center text-red-400"><i class="fas fa-bolt"></i></div>
                                    <h4 class="font-bold text-white">Cache Layer</h4>
                                </div>
                                <p class="text-sm text-slate-400">Redis High-Performance Caching</p>
                            </div>
                        </div>
                    </div>

                    <!-- Step 4: Data Pipeline (Streaming) -->
                    <div class="relative flex flex-col md:flex-row items-center justify-between mb-16 group">
                        <div class="md:w-5/12 text-center md:text-right pr-0 md:pr-12 mb-6 md:mb-0">
                            <h3 class="text-2xl font-bold text-white mb-2">Real-time Pipeline</h3>
                            <p class="text-slate-400 text-sm">Kafka / Change Data Capture (CDC)</p>
                        </div>
                        <div class="relative z-10 w-16 h-16 rounded-full bg-slate-800 border-4 border-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)] animate-pulse">
                            <i class="fas fa-stream text-indigo-400 text-xl"></i>
                        </div>
                        <div class="md:w-5/12 pl-0 md:pl-12 hidden md:block opacity-50 text-sm text-slate-500">
                            High-throughput Event Streaming
                        </div>
                    </div>

                    <!-- Flow Line Arrow -->
                    <div class="flex justify-center mb-8 md:hidden"><i class="fas fa-arrow-down text-indigo-500 animate-bounce"></i></div>

                    <!-- Step 5: Spark Cluster (Processing) -->
                    <div class="relative flex flex-col md:flex-row items-center justify-between mb-16 group">
                         <div class="md:w-5/12 text-right pr-12 hidden md:block opacity-50 text-sm text-slate-500">
                            Cleaning, Feature Engineering, ML Models
                        </div>
                        <div class="relative z-10 w-16 h-16 rounded-full bg-slate-800 border-4 border-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)] group-hover:scale-110 transition-transform duration-300">
                            <i class="fas fa-brain text-purple-400 text-xl"></i>
                        </div>
                        <div class="md:w-5/12 text-center md:text-left pl-0 md:pl-12 mb-6 md:mb-0">
                            <h3 class="text-2xl font-bold text-white mb-2">Spark Cluster</h3>
                            <p class="text-slate-400 text-sm">Machine Learning & Processing</p>
                        </div>
                    </div>

                    <!-- Flow Line Arrow -->
                    <div class="flex justify-center mb-8 md:hidden"><i class="fas fa-arrow-down text-indigo-500 animate-bounce"></i></div>

                    <!-- Step 6: Warehouse & Output -->
                    <div class="text-center bg-gradient-to-br from-indigo-900 to-slate-900 p-8 rounded-2xl border border-indigo-500/30 shadow-2xl">
                        <div class="flex justify-center mb-4 text-3xl text-green-400">
                            <i class="fas fa-chart-pie"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-2">Actionable Intelligence</h3>
                        <p class="text-slate-400 mb-4">Processed Data Warehouse & Analytics Tables</p>
                        <div class="flex justify-center gap-4 text-sm font-mono text-indigo-300">
                            <span class="bg-indigo-950/50 px-3 py-1 rounded">API Endpoints</span>
                            <span>→</span>
                            <span class="bg-indigo-950/50 px-3 py-1 rounded">User Dashboard</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-20 bg-indigo-600 relative overflow-hidden">
            <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30"></div>
            <div class="max-w-5xl mx-auto px-4 text-center relative z-10">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Ready to transform your business?</h2>
                <p class="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">Join the leading companies using our intelligent solutions to drive growth and efficiency.</p>
                <div class="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="#" class="px-8 py-4 bg-white text-indigo-600 font-bold rounded-lg shadow-lg hover:bg-indigo-50 transition-colors">
                        Get Started Now
                    </a>
                    <a href="#" class="px-8 py-4 bg-transparent border border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                        Contact Sales
                    </a>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <span class="text-xl font-bold text-white tracking-tight">Intelligent<span class="text-indigo-500">Solutions</span></span>
                        <p class="mt-4 text-sm">Empowering African enterprises with next-generation AI and data infrastructure.</p>
                    </div>
                    <div>
                        <h4 class="text-white font-bold mb-4">Platform</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="#" class="hover:text-indigo-400">Data Pipeline</a></li>
                            <li><a href="#" class="hover:text-indigo-400">Machine Learning</a></li>
                            <li><a href="#" class="hover:text-indigo-400">Analytics</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-white font-bold mb-4">Company</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="#" class="hover:text-indigo-400">About Us</a></li>
                            <li><a href="#" class="hover:text-indigo-400">Careers</a></li>
                            <li><a href="#" class="hover:text-indigo-400">Blog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-white font-bold mb-4">Legal</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="#" class="hover:text-indigo-400">Privacy Policy</a></li>
                            <li><a href="#" class="hover:text-indigo-400">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div class="border-t border-slate-800 pt-8 text-center text-sm">
                    &copy; 2024 Intelligent Solutions Inc. All rights reserved.
                </div>
            </div>
        </footer>
    </body>
    </html>
  `)
})

export default app
