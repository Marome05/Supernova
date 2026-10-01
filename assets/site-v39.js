// v37: current Supernova interactive prototype.
try{
  if('scrollRestoration' in history) history.scrollRestoration='manual';
  const navEntry=performance.getEntriesByType?.('navigation')?.[0];
  const isReload=navEntry?.type==='reload';
  if(isReload || !location.hash) scrollTo(0,0);
  addEventListener('pageshow',e=>{if(e.persisted || isReload) requestAnimationFrame(()=>scrollTo(0,0));},{once:true});
}catch(e){}

const PAGES={
 home:'index.html',commercial:'commercial.html',cpo:'cpo.html',homeCharging:'home-charging.html',franchise:'franchise.html',drivers:'ev-drivers.html',chargers:'our-chargers.html',about:'about.html',stories:'success-stories.html',story:'success-story-detail.html',news:'news.html',article:'news-article.html',contact:'contact.html'
};
const products=[
  ['Supernova Home AC 7','AC','7 kW','Type 2 / GB/T','Home'],
  ['Supernova Urban AC 11','AC','11 kW','Type 2','Residential / Workplace'],
  ['Supernova Pro AC 22','AC','22 kW','Type 2 / GB/T','Commercial'],
  ['Supernova Rapid DC 60','DC','60 kW','CCS2 / GB/T','Retail / Fleet'],
  ['Supernova Ultra DC 120','DC','120 kW','CCS2','High-traffic / Highway'],
  ['Supernova Fleet DC 180','DC','180 kW','CCS2 / GB/T','Fleet / Charging Hub']
];
const stories=[
  ['Retail Mall','Ayala Retail','Turning a retail destination into a connected EV charging stop'],
  ['Condominium','Residential Partner','Reliable charging access for residents and guests'],
  ['Fleet','Mobility Operator','Charging readiness for daily fleet operations'],
  ['Government','Public Sector','Supporting public-sector EV infrastructure'],
  ['Petrol Station','Mobility Hub','Adding EV charging to an existing mobility destination'],
  ['Hospitality','Resort Partner','Premium charging as part of the guest experience']
];
const iconTypeFor=(title='',hint='')=>{
 const t=`${title} ${hint}`.toLowerCase();
 if(/mobile|app|experience/.test(t))return 'phone';
 if(/charger|charging|kw|type 2|gb\/t|connector/.test(t))return 'plug';
 if(/home|residential/.test(t))return 'home';
 if(/dashboard|visibility|monitor|analytics/.test(t))return 'analytics';
 if(/support|maintenance/.test(t))return 'support';
 if(/sustain|clean|energy/.test(t))return 'leaf';
 if(/market|revenue|magnet|growth|customer/.test(t))return 'growth';
 if(/workplace|commercial|retail|hospitality|resort|community|fleet|township|setup/.test(t))return 'building';
 return 'network';
};
const motionIcon=(title='',hint='')=>{
 const type=iconTypeFor(title,hint);
 const glyph={
  phone:'<rect x="7.2" y="3.6" width="9.6" height="16.8" rx="2.2"/><path d="M10 6.5h4M10.7 17.2h2.6"/>',
  plug:'<path d="M9 3.8v4.1M15 3.8v4.1M7.5 7.9h9v2.4a4.5 4.5 0 0 1-4.5 4.5v5.4M9.4 11h5.2"/>',
  home:'<path d="M4.2 10.7 12 4.4l7.8 6.3M6.5 9.4v9.5h11V9.4M10 18.9v-5.2h4v5.2"/>',
  analytics:'<path d="M5 18.7V13h3v5.7M10.5 18.7V9.1h3v9.6M16 18.7V5.3h3v13.4M4 20h16"/>',
  support:'<path d="M5.2 13.2v-2.4a6.8 6.8 0 0 1 13.6 0v2.4M5.2 12.2H3.8v4.4h3.1v-4.4H5.2ZM18.8 12.2h1.4v4.4h-3.1v-4.4h1.7ZM17.1 18.6c-1 1-2.3 1.5-4 1.5"/>',
  leaf:'<path d="M18.9 4.8C11.2 4.9 6.2 8.5 5.2 15.6c3.3 1.4 7 .4 9.3-2.2 2.4-2.7 3.3-5.5 4.4-8.6ZM6 18.8c2.3-3.6 5.3-6.3 9.2-8.2"/>',
  growth:'<path d="M4.5 18.8h15M6.4 16.3l4.2-4.2 3 2.5 4.7-6.2M14.8 8.4h3.5v3.5"/>',
  building:'<path d="M5.2 20V5.2h9.2V20M14.4 9h4.4v11M8 8h1.5M11.3 8h1.5M8 11.2h1.5M11.3 11.2h1.5M8 14.4h1.5M11.3 14.4h1.5M3.7 20h16.6"/>',
  network:'<path d="M12 6.2v4.2M7.2 16.8 10 13.9M16.8 16.8 14 13.9"/><circle cx="12" cy="4.3" r="2"/><circle cx="5.7" cy="18.2" r="2"/><circle cx="18.3" cy="18.2" r="2"/><circle cx="12" cy="12.2" r="2.1"/>'
 }[type];
 return `<div class="icon motion-icon motion-icon-${type}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="mi-track" cx="12" cy="12" r="9.1"/><g class="mi-glyph">${glyph}</g><circle class="mi-spark" cx="12" cy="2.9" r="1.05"/></svg></div>`;
};
const brandLockup=(cls='')=>`<span class="brand-lockup ${cls}"><img class="brand-logo logo-nav-main" src="assets/logo-supernova-nav-v16.png" alt="Supernova logo"></span>`;
function breadcrumbs(page){
 const trails={
  home:[['Home','index.html']],
  commercial:[['Home','index.html'],['Solutions','index.html#solutions'],['Commercial Charging','commercial.html']],
  cpo:[['Home','index.html'],['Solutions','index.html#solutions'],['Charging Point Operators','cpo.html']],
  homeCharging:[['Home','index.html'],['Solutions','index.html#solutions'],['Home Charging','home-charging.html']],
  franchise:[['Home','index.html'],['Solutions','index.html#solutions'],['Franchise','franchise.html']],
  drivers:[['Home','index.html'],['Solutions','index.html#solutions'],['EV Drivers','ev-drivers.html']],
  chargers:[['Home','index.html'],['Our Chargers','our-chargers.html']],
  about:[['Home','index.html'],['About Us','about.html']],
  stories:[['Home','index.html'],['Resources','success-stories.html'],['Success Stories','success-stories.html']],
  story:[['Home','index.html'],['Resources','success-stories.html'],['Success Stories','success-stories.html'],['Story','success-story-detail.html']],
  news:[['Home','index.html'],['Resources','news.html'],['News & Updates','news.html']],
  article:[['Home','index.html'],['Resources','news.html'],['News & Updates','news.html'],['Article','news-article.html']],
  contact:[['Home','index.html'],['Contact Us','contact.html']]
 };
 const trail=trails[page]||trails.home;
 return `<div class="breadcrumbs-shell"><nav class="container breadcrumbs" aria-label="Breadcrumb">${trail.map(([label,href],i)=>i===trail.length-1?`<span class="breadcrumb-current" aria-current="page">${label}</span>`:`<a href="${href}">${label}</a><span class="breadcrumb-sep" aria-hidden="true">/</span>`).join('')}</nav></div>`;
}
function nav(){return `<div class="nav-shell"><div class="nav nav-refined"><a href="index.html" class="brand">${brandLockup()}</a><div class="nav-right"><div class="dropdown"><button class="dropbtn"><span>Solutions</span></button><div class="dropdown-menu"><a href="commercial.html">Commercial Charging</a><a href="cpo.html">Charging Point Operators / CPO</a><a href="home-charging.html">Home Charging</a><a href="franchise.html">Franchise</a><a href="ev-drivers.html">EV Drivers</a></div></div><a class="navlink" href="our-chargers.html">Our Chargers</a><a class="navlink" href="about.html">About Us</a><div class="dropdown resources-dropdown"><button class="dropbtn"><span>Resources</span></button><div class="dropdown-menu"><a href="success-stories.html">Success Stories</a><a href="news.html">News & Updates</a></div></div><a class="nav-cta" href="contact.html">Contact Us</a></div><button class="menu-btn" aria-label="Menu">☰</button></div></div>`}
function footer(){return `<footer class="footer"><div class="container"><div class="footer-grid"><div><a href="index.html" class="brand footer-brand"><img class="footer-logo-img" src="assets/SNLogo.png" alt="Supernova"></a><p class="muted" style="margin-top:18px">5F Salustiana D. Ty Tower<br>104 Paseo de Roxas<br>Legazpi Village<br>Makati City, Philippines</p><p class="muted">Phone · Email</p></div><div class="foot-col"><h4>Solutions</h4><a href="commercial.html">Commercial Charging</a><a href="cpo.html">CPO Solutions</a><a href="home-charging.html">Home Charging</a></div><div class="foot-col"><h4>Franchise</h4><a href="franchise.html">Why Franchise</a><a href="franchise.html#partner">Become a Partner</a><a href="ev-drivers.html">EV Drivers</a><a href="ev-drivers.html#how">How It Works</a></div><div class="foot-col"><h4>About Us</h4><a href="about.html">Our Story</a><a href="about.html#mission">Mission & Vision</a><a href="ev-drivers.html">Mobile App</a><a href="contact.html">Contact</a></div><div class="foot-col"><h4>Contact</h4><a href="contact.html">Phone</a><a href="contact.html">Email</a><a href="contact.html">Office Location</a><a href="contact.html">Privacy Policy</a></div></div><div class="footer-bottom"><div>© 2026 SUPERNOVA. All rights reserved.</div><div>Facebook &nbsp; Instagram</div></div></div></footer>`}
function bottomEnergyFade(){return `<section class="bottom-energy-fade" id="bottomEnergyFade" aria-hidden="true"><div class="bottom-energy-grid"></div><div class="bottom-energy-orb"></div><div class="bottom-energy-horizon"></div></section>`}
function globalCTA(){return `<section class="cta-band reveal"><div><span class="eyebrow">Start your charging journey</span><h2>Let’s Get Started!</h2><p class="lead" style="margin-bottom:0">Whether you're looking for EV charging stations, home charging, commercial charging, or franchise opportunities, we're here to help.</p></div><div class="cta-actions"><a class="btn primary cta-equal" href="contact.html"><span>Consult with us</span></a><a class="btn cta-equal instant-contact" href="contact.html"><span>Message or call us instantly</span></a></div></section>${bottomEnergyFade()}`}
function pageHero(eyebrow,title,copy,action='Contact Supernova',href='contact.html'){return `<section class="page-hero page-hero-v27"><div class="page-hero-atmosphere" aria-hidden="true"><span class="page-hero-beam beam-a"></span><span class="page-hero-beam beam-b"></span></div><div class="container page-hero-v27-grid"><div class="page-hero-copy reveal" data-parallax data-speed="-0.012"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p class="lead">${copy}</p><div class="hero-actions page-hero-actions"><a class="btn primary" href="${href}">${action}</a></div></div><div class="page-hero-energy reveal" data-parallax data-speed="0.014" aria-hidden="true"><div class="page-hero-energy-core"></div><span class="energy-ring ring-one"></span><span class="energy-ring ring-two"></span><span class="energy-ring ring-three"></span><div class="page-hero-signal"><span>SUPERNOVA</span><i></i><b>CONNECTED ENERGY</b></div></div></div></section>`}
function chargerVisual(){return `<div class="visual-panel reveal"><div class="visual-grid"></div><div class="charger"><div class="charger-screen"></div><div class="charger-light"></div><div class="charger-port"></div><div class="charger-cable"></div></div><div class="energy-line"></div></div>`}
function process(items){return `<div class="process process-interactive reveal">${items.map((x,i)=>`<div class="process-item" tabindex="0" data-process-step="${i}"><div class="process-glow" aria-hidden="true"></div><div class="num">0${i+1}</div><h3>${x}</h3><span class="process-hint">Explore step <b>↗</b></span></div>`).join('')}</div>`}
function innerStatement(eyebrow,parts){let index=0;const label=parts.map(p=>p[0]).join(' ');const words=parts.flatMap(([text,accent])=>text.split(/\s+/).filter(Boolean).map(word=>`<span class="inner-statement-word${accent?' inner-statement-accent':''}" data-inner-word style="--i:${index++}">${word}</span>`)).join(' ');return `<section class="inner-statement-section"><div class="inner-statement-grid" aria-hidden="true"></div><div class="inner-statement-glow glow-a" aria-hidden="true"></div><div class="inner-statement-glow glow-b" aria-hidden="true"></div><div class="container inner-statement-inner" data-parallax data-speed="0.012"><span class="eyebrow">${eyebrow}</span><h2 class="inner-statement-reveal" aria-label="${label.replace(/"/g,'&quot;')}">${words}</h2><div class="inner-statement-line"><span></span></div></div></section>`}
function card(title,copy,href='contact.html',i='↗'){return `<a class="card reveal" href="${href}">${motionIcon(title,i)}<span class="arrow">↗</span><h3>${title}</h3><p class="muted">${copy}</p></a>`}
function home(){return `<main><section class="hero hero-split"><div class="hero-grid"></div><div class="hero-noise"></div><div class="container hero-layout"><div class="hero-copy reveal" data-parallax data-speed="-0.02"><span class="eyebrow">Connected EV charging ecosystem</span><h1>Your End-to-End <span class="cyan">EV Charging Solutions</span> Partner</h1><p class="lead">Supernova brings together EV charging hardware, installation, software, payments, and support into one connected charging ecosystem.</p><div class="hero-actions"><a class="btn primary" href="#solutions">Explore Our Solutions</a><a class="btn" href="ev-drivers.html">For EV Drivers</a></div></div><div class="hero-visual hero-video-full reveal" id="heroVisual"><div class="hero-orb" data-parallax data-speed="-0.05"></div><div class="hero-scan hero-scan-a"></div><div class="hero-scan hero-scan-b"></div><div class="video-panel video-primary video-full" data-parallax data-speed="0.02"><video autoplay muted loop playsinline preload="auto" poster="" src="assets/hero-video-1.mp4"></video><div class="video-edge-glow"></div></div><div class="hero-bottom-glow"></div></div></div></section><section class="section compact adjacent-solutions" id="solutions"><div class="container"><div class="section-head solutions-grid-head reveal" data-parallax data-speed="-0.012"><div><span class="eyebrow">Solutions for every journey</span><h2 class="scroll-text-reveal" aria-label="Built around how you charge, operate, and grow."><span data-word>Built</span> <span data-word>around</span> <span data-word>how</span> <span data-word>you</span> <span data-word>charge,</span> <span data-word>operate,</span> <span data-word>and</span> <span data-word>grow.</span></h2></div><p class="lead">Five connected solution paths—each designed to move from charging need to a better EV experience.</p></div><div class="solutions-visible-grid"><a class="card solution-card visible-solution-card reveal" href="cpo.html" style="--card-photo:url('assets/solution-photos/cpo.jpg')"><span class="solution-hover-bg" aria-hidden="true"></span><div class="solution-default"><div class="solution-icon icon-cpo"><span></span><span></span><span></span></div><span class="arrow">↗</span><h3>Charging Point Operators</h3><p class="muted">Upgrade charging operations with connected hardware, software, analytics, and support.</p></div><div class="solution-hover-content"><h3>Charging Point Operators</h3><span class="hover-cta">Learn more</span></div></a><a class="card solution-card visible-solution-card reveal" href="commercial.html" style="--card-photo:url('assets/solution-photos/business.jpg')"><span class="solution-hover-bg" aria-hidden="true"></span><div class="solution-default"><div class="solution-icon icon-business"><span></span><span></span><span></span></div><span class="arrow">↗</span><h3>Businesses</h3><p class="muted">Turn commercial locations into intelligent EV charging destinations.</p></div><div class="solution-hover-content"><h3>Businesses</h3><span class="hover-cta">Learn more</span></div></a><a class="card solution-card visible-solution-card reveal" href="home-charging.html" style="--card-photo:url('assets/solution-photos/homeowners.jpg')"><span class="solution-hover-bg" aria-hidden="true"></span><div class="solution-default"><div class="solution-icon icon-home"><span></span><span></span><span></span></div><span class="arrow">↗</span><h3>Homeowners</h3><p class="muted">Smart and reliable EV charging designed for residential use.</p></div><div class="solution-hover-content"><h3>Homeowners</h3><span class="hover-cta">Learn more</span></div></a><a class="card solution-card visible-solution-card reveal" href="franchise.html" style="--card-photo:url('assets/solution-photos/franchise-partners-hover-v19.png')"><span class="solution-hover-bg" aria-hidden="true"></span><div class="solution-default"><div class="solution-icon icon-franchise"><span></span><span></span><span></span></div><span class="arrow">↗</span><h3>Franchise Partners</h3><p class="muted">Own and operate a Supernova EV charging station.</p></div><div class="solution-hover-content"><h3>Franchise Partners</h3><span class="hover-cta">Learn more</span></div></a><a class="card solution-card visible-solution-card reveal" href="ev-drivers.html" style="--card-photo:url('assets/solution-photos/drivers.jpg')"><span class="solution-hover-bg" aria-hidden="true"></span><div class="solution-default"><div class="solution-icon icon-drivers"><span></span><span></span><span></span></div><span class="arrow">↗</span><h3>EV Drivers</h3><p class="muted">Find chargers, start charging, monitor sessions, and pay through the Supernova app.</p></div><div class="solution-hover-content"><h3>EV Drivers</h3><span class="hover-cta">Learn more</span></div></a></div></div></section><section class="mission-scroll reveal" id="mission"><div class="mission-sticky"><div class="mission-video-bg" aria-hidden="true"><video id="missionScrollVideo" muted playsinline preload="auto" src="assets/mission-scroll-video-v26.mp4"></video><div class="mission-video-overlay"></div></div><div class="mission-orbit mission-orbit-a" data-parallax data-speed="-0.03"></div><div class="mission-orbit mission-orbit-b" data-parallax data-speed="0.045"></div><div class="container mission-inner" data-parallax data-speed="0.018"><span class="eyebrow">Our mission</span><p class="mission-overline">Connected infrastructure. Intelligent charging. Better mobility.</p><h2 class="mission-statement scroll-mission-reveal"><span class="mission-word" data-mission-word style="--i:0">To</span> <span class="mission-word" data-mission-word style="--i:1">power</span> <span class="mission-word" data-mission-word style="--i:2">the</span> <span class="mission-word mission-accent" data-mission-word style="--i:3">future</span> <span class="mission-word mission-accent" data-mission-word style="--i:4">of</span> <span class="mission-word mission-accent" data-mission-word style="--i:5">sustainable</span> <span class="mission-word mission-accent" data-mission-word style="--i:6">transportation</span> <span class="mission-word" data-mission-word style="--i:7">by</span> <span class="mission-word" data-mission-word style="--i:8">delivering</span> <span class="mission-word mission-accent" data-mission-word style="--i:9">safe,</span> <span class="mission-word mission-accent" data-mission-word style="--i:10">accessible,</span> <span class="mission-word mission-accent" data-mission-word style="--i:11">and</span> <span class="mission-word mission-accent" data-mission-word style="--i:12">intelligent</span> <span class="mission-word" data-mission-word style="--i:13">EV</span> <span class="mission-word" data-mission-word style="--i:14">charging</span> <span class="mission-word" data-mission-word style="--i:15">solutions.</span></h2><div class="mission-progress-line"><span></span></div></div></div></section><section class="section"><div class="container grid-2 why-grid"><div><span class="eyebrow">Why Supernova</span><h2>Smarter Charging. Better Future.</h2><div class="accordion"><div class="acc-item open"><button class="acc-head"><span>Reliable Technology</span><span class="acc-plus">+</span></button><div class="acc-body">Reliable charging hardware powered by intelligent software.</div></div><div class="acc-item"><button class="acc-head"><span>Seamless Experience</span><span class="acc-plus">+</span></button><div class="acc-body">From installation to charging, payment, and monitoring.</div></div><div class="acc-item"><button class="acc-head"><span>Always Here</span><span class="acc-plus">+</span></button><div class="acc-body">Operations, maintenance, and customer support.</div></div></div></div><div class="video-panel future-video reveal"><div class="video-panel-top"><span class="tag">Real-world charging</span><span class="video-badge">On-site energy</span></div><video autoplay muted loop playsinline preload="auto" poster="" src="assets/hero-video-2.mp4"></video><div class="panel-caption"><div><strong>Charging experiences that feel premium, visible, and reliable.</strong><p class="muted">Use intelligent infrastructure and elegant interfaces to create better EV charging touchpoints.</p></div></div></div></div></section><section class="section"><div class="container"><div class="section-head" data-parallax data-speed="-0.01"><div><span class="eyebrow">Success stories</span><h2>Charging infrastructure in action.</h2></div><a class="btn" href="success-stories.html">View All Stories</a></div><div class="grid-3">${['Retail','Residential','Fleet'].map((x,i)=>`<a class="card reveal story-photo-card" href="success-story-detail.html"><div class="story-image"><img src="assets/story-photos/${['retail','residential','fleet'][i]}.jpg" alt="${x} EV charging success story"></div><span class="tag">${x}</span><h3 style="margin-top:8px">${['Smarter charging for high-traffic destinations','Reliable EV charging where people live','Connected charging that keeps fleets moving'][i]}</h3><p class="muted">See how connected Supernova infrastructure turns charging into a more manageable, measurable experience.</p></a>`).join('')}</div></div></section>${globalCTA()}</main>`}
function commercial(){return `<main>${pageHero('Business charging','Commercial EV Charging Solutions','Supernova helps properties and businesses become intelligent EV charging destinations through hardware, installation, software and support.','Talk to our commercial team')}<section class="section compact"><div class="container"><div class="section-head"><div><span class="eyebrow">End-to-end charging process</span><h2>From site assessment to dependable operation.</h2></div></div>${process(['Site & Power Supply Assessment','Charging Station Supply','Professional Installation','Testing & Activation','Support & Maintenance'])}</div></section><section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow">Industries we serve</span><h2>Charging built for where people live, work, stay and move.</h2></div></div><div class="grid-3">${['Commercial & Retail Hubs','Corporate Workplaces','Hospitality & Resorts','Residential Communities','Logistics & Fleet','Integrated Townships'].map(x=>card(x,'Flexible charging infrastructure designed around site needs, user behavior, visibility and operational support.','contact.html','▦')).join('')}</div></div></section><section class="section"><div class="container grid-2">${chargerVisual()}<div style="align-self:center"><span class="eyebrow">Commercial charging showcase</span><h2>Infrastructure that fits the property—and the operation behind it.</h2><p class="lead">Combine charger hardware, professional installation, live monitoring and driver-facing digital experiences in one deployment.</p><a class="btn primary" href="our-chargers.html">Explore chargers</a></div></div></section><section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow">Why businesses choose Supernova</span><h2>Charging with measurable business value.</h2></div></div><div class="grid-4">${card('A Magnet for Customers','Attract EV-driving customers.','contact.html','＋')}${card('Total Charging Visibility','Monitor stations, sessions, revenue, and performance.','contact.html','◉')}${card('Hands-on Support','Installation, maintenance, and technical support.','contact.html','⌁')}${card('Measurable Sustainability','Track charging activity and environmental impact.','contact.html','↗')}</div></div></section>${innerStatement('Built for business',[["Charging should create value",false],["without adding complexity.",true]])}${globalCTA()}</main>`}
function cpoScrollHero(){return `<section class="franchise-scroll-hero cpo-scroll-hero" id="cpoHero"><div class="franchise-hero-sticky"><div class="franchise-hero-video" aria-hidden="true"><video id="cpoScrollVideo" muted playsinline preload="auto" src="assets/drivers-cpo-scroll-video-v34.mp4"></video><div class="franchise-hero-overlay"></div><div class="franchise-hero-vignette"></div></div><div class="franchise-hero-grid" aria-hidden="true"></div><div class="container franchise-hero-content"><div class="franchise-hero-copy cpo-hero-copy"><span class="eyebrow">Charging point operators</span><h1>Operate Smarter with a Connected <span class="cyan">EV Charging Network</span></h1><p class="lead">Connect your charging hardware, software, driver discovery, analytics and support in one intelligent operating layer.</p><div class="hero-actions"><a class="btn primary" href="#solutions">Explore CPO solutions</a></div></div><div class="scroll-start-prompt" aria-hidden="true"><span>Scroll down to start</span><i class="scroll-start-mouse"><b></b></i><em>Scroll</em></div><div class="franchise-scroll-cue" aria-hidden="true"><span>Scroll to play</span><i></i></div></div><div class="franchise-hero-progress" aria-hidden="true"><div class="franchise-progress-track"><span class="franchise-progress-fill"></span><i class="franchise-progress-marker"></i><b class="franchise-progress-copy-zone"></b></div><div class="franchise-progress-meta"><span>Film</span><span>Operate</span></div></div></div></section>`}
function cpo(){return `<main>${cpoScrollHero()}<section class="section compact"><div class="container"><div class="section-head"><div><span class="eyebrow">A smarter path to better charging</span><h2>Upgrade the station without losing sight of the operation.</h2></div></div>${process(["Assessment and Planning","Custom Solutions","Seamless Integration","Testing and Optimization","Launch Your Upgraded Business"])} </div></section><section class="section" id="solutions"><div class="container"><div class="section-head"><div><span class="eyebrow">Built for charging operators</span><h2>The operating layer behind every session.</h2></div></div><div class="bento">${card("Supernova Mobile App","Driver discovery, charging, monitoring, and payments.","ev-drivers.html","▣")}${card("AC & DC Chargers","Charging hardware for different applications.","our-chargers.html","⚡")}${card("Merchant Dashboard","Station monitoring, revenue, sessions, performance, and analytics.","contact.html","▤")}${card("Always-On Support","Technical support, operations, and maintenance.","contact.html","◎")}</div></div></section>${innerStatement("Built for operators",[["Every charging session should be",false],["visible, connected, and controllable.",true]])}${globalCTA()}</main>`}
function homeCharging(){return `<main>${pageHero('Residential charging','EV Charging at Home','Reliable AC charging designed around everyday residential use.','Get a home charging consultation')}<section class="section compact"><div class="container"><div class="section-head"><div><span class="eyebrow">Supernova AC Home Charging</span><h2>Simple charging. Right where you park.</h2></div></div><div class="grid-3">${card('7–22 kW','Flexible AC charging.','contact.html','⚡')}${card('Type 2 or GB/T','Connector options.','contact.html','◌')}${card('Compact for Home Use','Designed for residential installations.','contact.html','⌂')}</div></div></section><section class="section home-photo-section"><div class="container home-photo-grid"><div class="home-photo-copy reveal" data-parallax data-speed="-0.012"><span class="eyebrow">Designed for home</span><h2>Premium charging that fits naturally into everyday life.</h2><p class="lead">A compact home charger paired with site assessment, professional installation, commissioning, and after-sales support.</p><div class="home-photo-pills"><span>Compact installation</span><span>Connected charging</span><span>Everyday convenience</span></div></div><figure class="home-parallax-visual reveal" data-parallax data-speed="0.02"><img src="assets/home2-v36.png" alt="Home EV charging with Supernova"><div class="home-parallax-overlay"></div><figcaption><span class="tag">Home charging</span><strong>Plug in at home. Wake up ready to go.</strong></figcaption></figure></div></section><section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow">Start charging at home</span><h2>Three steps from assessment to everyday charging.</h2></div></div>${process(['Site Assessment & Electrical Check','Installation, Testing & Commissioning','Post-Installation Support'])}</div></section>${innerStatement('Built for home',[["Everyday EV charging should feel",false],["effortless, dependable, and ready when you are.",true]])}${globalCTA()}</main>`}
function franchiseScrollHero(){return `<section class="franchise-scroll-hero" id="franchiseHero"><div class="franchise-hero-sticky"><div class="franchise-hero-video" aria-hidden="true"><video id="franchiseScrollVideo" muted playsinline preload="auto" src="assets/franchise-scroll-video-v32.mp4"></video><div class="franchise-hero-overlay"></div><div class="franchise-hero-vignette"></div></div><div class="franchise-hero-grid" aria-hidden="true"></div><div class="container franchise-hero-content"><div class="franchise-hero-copy"><span class="eyebrow">Franchise opportunities</span><h1>Own a Supernova <span class="cyan">EV Charging Station</span></h1><p class="lead">Build an EV charging business with a connected Supernova station, app experience, and operational support.</p><div class="hero-actions"><a class="btn primary" href="#partner">Start Your Application</a></div></div><div class="scroll-start-prompt" aria-hidden="true"><span>Scroll down to start</span><i class="scroll-start-mouse"><b></b></i><em>Scroll</em></div><div class="franchise-scroll-cue" aria-hidden="true"><span>Scroll to play</span><i></i></div></div><div class="franchise-hero-progress" aria-hidden="true"><div class="franchise-progress-track"><span class="franchise-progress-fill"></span><i class="franchise-progress-marker"></i><b class="franchise-progress-copy-zone"></b></div><div class="franchise-progress-meta"><span>Film</span><span>Story</span></div></div></div></section>`}
function chargersScrollHero(){return `<section class="franchise-scroll-hero charger-scroll-hero" id="chargersHero"><div class="franchise-hero-sticky"><div class="franchise-hero-video" aria-hidden="true"><video id="chargersScrollVideo" muted playsinline preload="auto" src="assets/chargers-scroll-video-v32.mp4"></video><div class="franchise-hero-overlay"></div><div class="franchise-hero-vignette"></div></div><div class="franchise-hero-grid" aria-hidden="true"></div><div class="container franchise-hero-content"><div class="franchise-hero-copy"><span class="eyebrow">Charging hardware</span><h1>Explore Our <span class="cyan">EV Chargers</span></h1><p class="lead">Discover charging hardware built for smarter, faster, and more reliable EV charging.</p><div class="hero-actions"><a class="btn primary" href="contact.html">Talk to our charger team</a></div></div><div class="scroll-start-prompt" aria-hidden="true"><span>Scroll down to start</span><i class="scroll-start-mouse"><b></b></i><em>Scroll</em></div><div class="franchise-scroll-cue" aria-hidden="true"><span>Scroll to play</span><i></i></div></div><div class="franchise-hero-progress" aria-hidden="true"><div class="franchise-progress-track"><span class="franchise-progress-fill"></span><i class="franchise-progress-marker"></i><b class="franchise-progress-copy-zone"></b></div><div class="franchise-progress-meta"><span>Film</span><span>Explore</span></div></div></div></section>`}
function driversScrollHero(){return `<section class="franchise-scroll-hero drivers-scroll-hero" id="driversHero"><div class="franchise-hero-sticky"><div class="franchise-hero-video" aria-hidden="true"><video id="driversScrollVideo" muted playsinline preload="auto" src="assets/drivers-cpo-scroll-video-v34.mp4"></video><div class="franchise-hero-overlay"></div><div class="franchise-hero-vignette"></div></div><div class="franchise-hero-grid" aria-hidden="true"></div><div class="container franchise-hero-content"><div class="franchise-hero-copy drivers-hero-copy"><span class="eyebrow">For EV drivers</span><h1>A Seamless, Smooth & Smart <span class="cyan">EV Charging Experience</span></h1><p class="lead">Use the Supernova mobile app to find stations, connect, start charging, monitor sessions, and pay.</p><div class="hero-actions drivers-hero-actions"><a class="btn primary" href="#how">Explore how charging works</a><span class="btn store-btn" role="button" tabindex="0">App Store</span><span class="btn store-btn" role="button" tabindex="0">Google Play</span></div></div><div class="scroll-start-prompt" aria-hidden="true"><span>Scroll down to start</span><i class="scroll-start-mouse"><b></b></i><em>Scroll</em></div><div class="franchise-scroll-cue" aria-hidden="true"><span>Scroll to play</span><i></i></div></div><div class="franchise-hero-progress" aria-hidden="true"><div class="franchise-progress-track"><span class="franchise-progress-fill"></span><i class="franchise-progress-marker"></i><b class="franchise-progress-copy-zone"></b></div><div class="franchise-progress-meta"><span>Film</span><span>Experience</span></div></div></div></section>`}
function franchise(){return `<main>${franchiseScrollHero()}<section class="section compact"><div class="container"><div class="section-head"><div><span class="eyebrow">Why franchise with Supernova</span><h2>Enter EV charging with a system designed to operate.</h2></div></div><div class="grid-3">${['Fast-Growing Market','Seamless App Experience','Low-Maintenance Revenue','Complete Turnkey Setup','Drive Clean Energy'].map((x,i)=>card(x,['Participate in a growing e-mobility market.','Give drivers a connected digital charging journey.','Operate with visibility across sessions and performance.','Hardware, installation and onboarding in one path.','Build infrastructure that supports cleaner mobility.'][i],'contact.html',['↗','▣','₱','▦','⚡'][i])).join('')}</div></div></section><section class="section"><div class="container grid-2">${chargerVisual()}<div style="align-self:center"><span class="eyebrow">Franchise station</span><h2>A physical charging destination backed by a digital operating layer.</h2><p class="lead">From station setup to onboarding and launch, the franchise experience is designed around getting the site ready to serve EV drivers.</p></div></div></section><section class="section" id="partner"><div class="container"><div class="section-head"><div><span class="eyebrow">Become a partner</span><h2>From application to grand opening.</h2></div></div>${process(['Franchise Application','Location Assessment & Approval','Station Setup, Training & Onboarding','Grand Opening'])}<div style="margin-top:24px"><a class="btn primary" href="contact.html">Start Your Application</a></div></div></section>${innerStatement('Built for growth',[["A charging business should launch with",false],["clarity, support, and momentum.",true]])}${globalCTA()}</main>`}
function drivers(){
  const driverSteps=[
    ["Download, Register & Top-up E-Wallet","Download the app in Google Play Store or Apple App Store. Then create an account and top up your e-wallet."],
    ["Connect the Charger","Open your EV’s charging port and plug in the charger gun."],
    ["Scan the Charger’s QR Code","Scan the QR code on the front of the charger, or select the correct Station in the app and input the corresponding Station Number or Terminal ID."],
    ["Start Charging","Choose your desired amount or encode it manually and your charging will start."],
    ["Finish Charging and Unplug","Wait for charging to finish or press Stop to end. Remove the charging gun and return it to the charger."]
  ];
  return `<main>${driversScrollHero()}
    <section class="section drivers-how-section v36-driver-how" id="how"><div class="container">
      <div class="section-head drivers-how-head"><div><span class="eyebrow">How EV charging works</span><h2>Five steps. One seamless flow.</h2></div><p class="lead">Move through the charging journey one step at a time. Each tab updates the live preview instantly.</p></div>
      <div class="driver-tabs v36-driver-tabs reveal" role="tablist" aria-label="EV charging steps">${driverSteps.map((x,i)=>`<button class="driver-tab" data-driver="${i}" role="tab"><b>0${i+1}</b><span>${x[0]}</span></button>`).join('')}</div>
      <div class="driver-tab-stage v36-driver-stage reveal">
        <div class="driver-tab-copy" id="driverPreviewCopy"><span class="tag">Step 0</span><h3>Ready when you are.</h3><p>Select a step above to explore the charging experience from app download to unplug.</p></div>
        <div class="driver-preview-device-wrap"><div class="device-glow" aria-hidden="true"></div><div class="driver-preview-device"><div class="phone-statusbar" aria-hidden="true"><span>9:41</span><i></i><b>● ● ●</b></div><div class="phone-island" aria-hidden="true"></div><div class="driver-preview-media" id="driverScreen"></div><div class="phone-home-indicator" aria-hidden="true"></div></div><span class="stage-kicker" id="driverStageKicker">Interactive preview</span></div>
      </div>
    </div></section>
    <section class="section drivers-station-section"><div class="container">
      <div class="section-head"><div><span class="eyebrow">Find a Supernova charger</span><h2>Nearby charging, made easier to understand.</h2></div><p class="lead">Search stations, compare status, and see where Supernova charging is available around you.</p></div>
      <div class="drivers-station-legacy-grid">
        <div class="card drivers-station-list reveal"><input class="search" id="stationSearch" placeholder="Search stations" style="width:100%;margin:0 0 15px"><div id="stationList">${[['bgc-hub','PSE Tower BGC','Available · 22 kW'],['uptown','Uptown Mall BGC','Available · 11 kW'],['one-ayala','One Ayala','Charging · 22 kW'],['bicutan','SM Bicutan','Available · 11 kW']].map((x,i)=>`<button class="journey-step station-item ${i===0?'active':''}" data-station="${x[0]}" style="width:100%;margin-bottom:8px"><strong>${x[1]}</strong><span class="muted">${x[2]}</span><i>↗</i></button>`).join('')}</div></div>
        <div class="visual-panel driver-map-panel reveal" data-parallax data-speed="0.012"><div class="visual-grid"></div><div class="map-city-label">Metro Manila charging network</div><svg class="driver-map-svg" viewBox="0 0 500 420" aria-hidden="true"><path class="route" d="M50 320C125 250 170 270 235 195S365 110 450 160"/><path class="route2" d="M72 95C152 150 218 128 288 195S386 292 446 250"/><circle class="pulse-node" cx="50" cy="320" r="8"/><circle class="pulse-node" cx="235" cy="195" r="8"/><circle class="pulse-node" cx="450" cy="160" r="8"/><circle class="pulse-node" cx="320" cy="250" r="7"/></svg><div class="map-float-card"><span class="status-dot"></span><strong>Supernova Network</strong><small>Stations online</small></div></div>
      </div>
    </div></section>
    ${innerStatement('Built for drivers',[["Charging should disappear into the journey—",false],["simple, connected, and easy to trust.",true]])}${globalCTA()}
  </main>`
}
function chargers(){return `<main>${chargersScrollHero()}<section class="section compact"><div class="container grid-2">${chargerVisual()}<div style="align-self:center"><span class="eyebrow">Featured hardware</span><h2>Built to connect with the Supernova ecosystem.</h2><p class="lead">From residential AC charging to high-output DC applications, explore chargers for different sites, operating models and driver needs.</p></div></div></section><section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow">Hardware catalog</span><h2>Find the charger for your use case.</h2></div></div><div class="toolbar"><button class="filter active" data-product-filter="All">All</button><button class="filter" data-product-filter="AC">AC</button><button class="filter" data-product-filter="DC">DC</button><input id="productSearch" class="search" placeholder="Search chargers"></div><div class="catalog" id="productCatalog">${products.map(p=>`<article class="card product-card reveal" data-cat="${p[1]}" data-name="${p[0].toLowerCase()}"><div class="product-vis"><div class="mini-charger"></div></div><span class="tag">${p[1]} Charger</span><h3 style="margin-top:7px">${p[0]}</h3><p class="muted">Connected charging hardware with monitoring-ready smart features.</p><div class="specs"><div>Power<br><b>${p[2]}</b></div><div>Connector<br><b>${p[3]}</b></div><div>Application<br><b>${p[4]}</b></div><div>Smart Features<br><b>Connected</b></div></div></article>`).join('')}</div></div></section>${innerStatement('Engineered for real sites',[["The right charger is the one that fits",false],["the location, the vehicle, and the operation.",true]])}${globalCTA()}</main>`}
function aboutScrollHero(){return `<section class="about-video-hero"><div class="about-video-bg" aria-hidden="true"><video autoplay muted loop playsinline preload="auto" src="assets/about-hero-video-v37.mp4"></video><div class="about-video-overlay"></div><div class="about-video-vignette"></div></div><div class="about-video-grid" aria-hidden="true"></div><div class="container about-video-content"><div class="about-video-copy reveal"><span class="eyebrow">About Supernova</span><h1>Powering a More Connected <span class="cyan">Electric Future</span></h1><p class="lead">Supernova combines charging hardware, infrastructure, software, payments, and driver experiences into one connected e-mobility ecosystem.</p><div class="hero-actions"><a class="btn primary" href="#mission">Discover our purpose</a></div></div></div></section>`}
function about(){return `<main>${aboutScrollHero()}
  <section class="section compact about-purpose-section" id="mission"><div class="container"><div class="section-head about-purpose-head" data-parallax data-speed="-0.01"><div><span class="eyebrow">Mission & vision</span><h2>Built around a cleaner, smarter mobility future.</h2></div><p class="lead">Two ideas shape how we design infrastructure, technology, and charging experiences.</p></div><div class="about-purpose-grid"><article class="about-purpose-card mission-card reveal" data-parallax data-speed="0.012"><div class="about-card-orbit" aria-hidden="true"></div><span class="tag">Mission</span><div class="about-purpose-icon" aria-hidden="true"><span></span><i></i></div><h3>Power sustainable transportation.</h3><p>To power the future of sustainable transportation by delivering <span class="cyan">safe, accessible, and intelligent</span> EV charging solutions.</p><div class="about-card-line"></div></article><article class="about-purpose-card vision-card reveal" data-parallax data-speed="-0.012"><div class="about-card-orbit" aria-hidden="true"></div><span class="tag">Vision</span><div class="about-purpose-icon" aria-hidden="true"><span></span><i></i></div><h3>Lead e-mobility in the Philippines.</h3><p>To become a leading e-mobility solutions provider through reliable, accessible, and intelligent charging infrastructure.</p><div class="about-card-line"></div></article></div></div></section>
  <div class="marquee about-marquee"><div class="marquee-track">${[...Array(2)].flatMap(()=>['EV Ecosystem','Property Partners','Technology Partners','Mobility Partners','Charging Operators']).map(x=>`<span>${x}</span>`).join('')}</div></div>
  <section class="section about-power-section"><div class="container about-power-grid"><div class="about-power-copy reveal" data-parallax data-speed="-0.014"><span class="eyebrow">Powering the future</span><h2>More than chargers.</h2><p class="lead">Supernova delivers charging hardware, infrastructure, software, payments and connected driver experiences as one operating ecosystem.</p><div class="about-power-pills"><span>Hardware</span><span>Software</span><span>Payments</span><span>Support</span></div></div><figure class="about-power-visual reveal" data-parallax data-speed="0.018"><video autoplay muted loop playsinline preload="auto" src="assets/about-scroll-video-v35.mp4" aria-label="Supernova brand motion video"></video><div class="about-power-overlay"></div><figcaption><span class="tag">Connected hardware</span><strong>Infrastructure designed to work as one ecosystem.</strong></figcaption><div class="power-scan-line" aria-hidden="true"></div></figure></div></section>
  ${innerStatement('What drives us',[["Better mobility starts with infrastructure that is",false],["reliable, accessible, and intelligent.",true]])}${globalCTA()}
</main>`}
function storiesPage(){return `<main>${pageHero('Case studies','Powering Real Results','See how organizations use Supernova technology to improve operations, support sustainability, and serve EV drivers.','View featured story','success-story-detail.html')}<section class="section compact"><div class="container"><div class="toolbar">${['All Stories','Retail Mall','Condominium','Fleet','Government','Petrol Station','Hospitality'].map((x,i)=>`<button class="filter ${i===0?'active':''}" data-story-filter="${x}">${x}</button>`).join('')}</div><div class="catalog" id="storyGrid">${stories.map(s=>`<a class="card story-card reveal" data-cat="${s[0]}" href="success-story-detail.html"><div class="story-image"></div><span class="tag">${s[0]}</span><p class="muted" style="margin:8px 0 2px">${s[1]}</p><h3>${s[2]}</h3><span class="cyan">Read Story →</span></a>`).join('')}</div><div class="pagination"><span class="page-dot">‹</span><span class="page-dot active">1</span><span class="page-dot">2</span><span class="page-dot">3</span><span class="page-dot">›</span></div></div></section>${innerStatement('Real-world impact',[["Connected charging becomes meaningful when it",false],["works every day, in real places, for real people.",true]])}${globalCTA()}</main>`}
function storyDetail(){return `<main>${pageHero('Success Stories → Fleet','Connected charging for dependable daily operations','A sample Supernova deployment story showing how infrastructure, software and operational visibility can work together.','Back to Success Stories','success-stories.html')}<section class="section compact"><div class="container"><div class="story-image" style="height:520px"></div></div></section><section class="section compact"><article class="article"><span class="eyebrow">The challenge</span><h2>Charging had to fit a real operating schedule.</h2><p>The operation needed reliable charging availability, better visibility into sessions, and a charging setup that could support daily vehicle readiness without adding unnecessary complexity.</p><span class="eyebrow" style="margin-top:40px">The solution</span><h2>Connected infrastructure with an operating layer.</h2><p>Supernova combined charging hardware, installation, monitoring and a connected software experience so the team could understand station status, charging activity and day-to-day performance.</p><div class="grid-2" style="margin-top:40px"><div class="card"><div class="metric">30% <small>Grid Peak Load Reduction</small></div></div><div class="card"><div class="metric">100% <small>Morning Route Readiness</small></div></div></div></article></section><section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow">Related success stories</span><h2>Explore more deployments.</h2></div></div><div class="grid-3">${stories.slice(0,3).map(s=>`<a class="card" href="success-story-detail.html"><div class="story-image"></div><span class="tag">${s[0]}</span><h3 style="margin-top:8px">${s[2]}</h3></a>`).join('')}</div></div></section>${innerStatement('The outcome',[["Infrastructure works best when",false],["operations become simpler and readiness becomes visible.",true]])}${globalCTA()}</main>`}
const news=[['Company Updates','Supernova expands its connected EV charging ecosystem'],['Product News','New charging hardware joins the Supernova platform'],['EV Industry','What connected charging means for growing EV adoption'],['Philippines EV','Building better charging experiences for Filipino EV drivers'],['Company Updates','Supernova strengthens support for charging partners'],['Product News','A closer look at smarter charging operations']];
function newsPage(){return `<main>${pageHero('Resources','Latest News & Updates','Stay informed about EV charging in the Philippines, Supernova product launches, company milestones, and industry developments.','Read latest article','news-article.html')}<section class="section compact"><div class="container"><div class="toolbar">${['All','Company Updates','Product News','EV Industry','Philippines EV'].map((x,i)=>`<button class="filter ${i===0?'active':''}" data-news-filter="${x}">${x}</button>`).join('')}</div><div class="catalog" id="newsGrid">${news.map((n,i)=>`<a class="card news-card reveal" data-cat="${n[0]}" href="news-article.html"><div class="news-image"></div><span class="tag">${n[0]}</span><p class="muted" style="font-size:12px;margin:7px 0">September ${20-i}, 2026</p><h3>${n[1]}</h3><p class="muted">News, product context and industry perspective from the Supernova team.</p><span class="cyan">Read Article →</span></a>`).join('')}</div><div class="pagination"><span class="page-dot">‹</span><span class="page-dot active">1</span><span class="page-dot">2</span><span class="page-dot">3</span><span class="page-dot">›</span></div></div></section>${innerStatement('Stay connected',[["The EV charging landscape keeps moving.",false],["We keep building with it.",true]])}${globalCTA()}</main>`}
function article(){return `<main>${pageHero('News & Updates → Company Updates','Supernova expands its connected EV charging ecosystem','Company Update · September 24, 2026 · 5 min read','Back to News','news.html')}<section class="section compact"><div class="container"><div class="news-image" style="height:520px"></div></div></section><section class="section compact"><article class="article"><p class="muted">By Supernova Team</p><h2>Introduction</h2><p>Supernova continues to build an EV charging ecosystem that connects charging hardware, driver experiences, station operations and support into one more coherent system.</p><h2>Expanding Access to EV Charging</h2><p>The goal is to make charging easier to deploy, easier to operate and easier for EV drivers to understand—from discovering a station to completing a session.</p><div class="quote">“Connected charging is not only about the charger. It is about the full experience around every charging session.”</div><h2>What This Means for Filipino EV Owners</h2><p>A more connected network can give drivers clearer station information, more predictable charging interactions and a simpler path from finding a charger to payment.</p><h2>Looking Ahead</h2><p>Supernova will continue developing charging hardware, infrastructure and digital experiences designed for the needs of drivers, businesses and charging operators.</p></article></section><section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow">Related articles</span><h2>More from Supernova.</h2></div></div><div class="grid-3">${news.slice(1,4).map(n=>`<a class="card" href="news-article.html"><div class="news-image"></div><span class="tag">${n[0]}</span><h3 style="margin-top:8px">${n[1]}</h3></a>`).join('')}</div></div></section>${innerStatement('Looking ahead',[["Connected charging is not one product. It is",false],["an ecosystem that improves with every session.",true]])}${globalCTA()}</main>`}
function contact(){const faqs=['What are the operating hours for Supernova charging stations?','What charging speeds are available?','How do I start and pay for a charging session?','Can I park in an EV charging space if I am not charging?','Is there protection from rain or harsh weather while charging?'];return `<main class="contact-page-v39"><section class="contact-hero-v39"><div class="contact-hero-grid" aria-hidden="true"></div><div class="contact-hero-glow contact-glow-a" aria-hidden="true"></div><div class="contact-hero-glow contact-glow-b" aria-hidden="true"></div><div class="container contact-hero-layout"><div class="contact-hero-copy reveal"><span class="eyebrow">Contact Supernova</span><h1>Let’s build a better <span class="cyan">charging experience.</span></h1><p class="lead">Whether you’re planning a charging site, looking for technical support, exploring a franchise, or simply have a question—start here.</p><div class="contact-quick-grid"><a class="contact-quick-card" href="#contactForm"><span class="contact-quick-icon">↗</span><small>Start here</small><strong>Send an inquiry</strong></a><a class="contact-quick-card" href="#contactTeams"><span class="contact-quick-icon">⌁</span><small>Need support?</small><strong>Find the right team</strong></a></div><div class="contact-hero-note"><span></span><p>For charger issues, station support, partnerships, commercial charging, and franchise inquiries.</p></div></div><div class="contact-form-panel reveal" id="contactForm"><div class="contact-form-head"><div><span class="tag">Start a conversation</span><h2>How can we help?</h2></div><span class="contact-form-status"><i></i> Team online</span></div><form class="form contact-form-v39" id="inquiryForm"><div class="contact-field-row"><label><span>Full name</span><input required placeholder="Your name"></label><label><span>Email address</span><input type="email" required placeholder="you@company.com"></label></div><div class="contact-field-row"><label><span>Phone number</span><input placeholder="+63"></label><label><span>I’m interested in</span><select><option>EV charging solutions</option><option>Commercial charging</option><option>Franchise partnership</option><option>Charging Point Operator solutions</option><option>Home charging</option><option>Technical support</option></select></label></div><label><span>Tell us what you need</span><textarea required placeholder="Share a few details about your project or question..."></textarea></label><div class="contact-form-actions"><button class="btn primary" type="submit">Send inquiry</button><p class="muted" id="formStatus">We’ll route your message to the right Supernova team.</p></div></form></div></div></section><section class="section compact contact-support-section" id="contactTeams"><div class="container"><div class="section-head"><div><span class="eyebrow">Talk to the right team</span><h2>Support when you need it.</h2></div><p class="lead">Choose the team that best matches your question.</p></div><div class="contact-team-grid"><button class="contact-team-card active" data-contact="tech"><span class="motion-dot"></span><small>Station & charger help</small><h3>Technical Support</h3><p>Help with chargers, sessions, station availability, operations, and technical concerns.</p><span class="team-link">View support details →</span></button><button class="contact-team-card" data-contact="marketing"><span class="motion-dot"></span><small>Business & partnerships</small><h3>Marketing & Partnerships</h3><p>Commercial deployments, CPO solutions, franchise inquiries, and partnership opportunities.</p><span class="team-link">View partnership details →</span></button></div><div class="contact-detail-shell"><div class="contact-detail active" data-detail="tech"><div class="contact-detail-grid"><div><span class="tag">Technical Support</span><h3>Charging support, without the runaround.</h3></div><div><small>Contact route</small><strong>Inquiry form above</strong></div><div><small>Availability</small><strong>Daily support</strong></div><div><small>Best for</small><strong>Stations & sessions</strong></div></div></div><div class="contact-detail" data-detail="marketing"><div class="contact-detail-grid"><div><span class="tag">Marketing & Partnerships</span><h3>Build the next charging destination with us.</h3></div><div><small>Contact route</small><strong>Inquiry form above</strong></div><div><small>Availability</small><strong>Business hours</strong></div><div><small>Best for</small><strong>Projects & partners</strong></div></div></div></div></div></section><section class="section contact-faq-v39"><div class="container"><div class="section-head"><div><span class="eyebrow">Frequently asked questions</span><h2>Answers before you plug in.</h2></div></div><div class="contact-faq-layout"><div class="contact-faq-search"><p class="lead">Find quick answers about charging, stations, payments, and support.</p><input class="search" id="faqSearch" placeholder="Search FAQs"></div><div class="accordion" id="faqList">${faqs.map((q,i)=>`<div class="acc-item" data-question="${q.toLowerCase()}"><button class="acc-head"><span>0${i+1} — ${q}</span><span class="acc-plus">+</span></button><div class="acc-body">Contact Supernova for the most current information relevant to the specific station, charger or service you are asking about.</div></div>`).join('')}</div></div></div></section>${innerStatement('Start a conversation',[["The next charging experience starts with",false],["the right question and the right team.",true]])}${globalCTA()}</main>`}
function render(){const page=document.body.dataset.page||'home';const map={home,commercial,cpo,homeCharging,franchise,drivers,chargers,about,stories:storiesPage,story:storyDetail,news:newsPage,article,contact};document.body.innerHTML=`<div class="site-bg-parallax" aria-hidden="true"></div><div class="space-stars" aria-hidden="true"><span class="star-layer star-a"></span><span class="star-layer star-b"></span><span class="star-layer star-c"></span></div><div class="page-loader" id="pageLoader"><div class="loader-minimal"><img class="loader-logo" src="assets/logo-supernova-nav-v16.png" alt="Supernova"><div class="loader-charge-meta" aria-hidden="true"><div class="loader-charge-label"><span class="loader-bolt">ϟ</span><span>Charging experience</span></div><strong id="loaderPercent">0%</strong></div><div class="loader-progress-shell" aria-hidden="true"><div class="loader-progress"><span class="loader-progress-fill" id="loaderProgressFill"><i class="loader-wave"></i></span><span class="loader-charge-nodes"></span></div></div></div></div><div class="mouse-glow"></div>${nav()}${breadcrumbs(page)}${map[page]()}${footer()}`;init()}
function init(){
 const navEl=document.querySelector('.nav');
 document.querySelector('.menu-btn')?.addEventListener('click',()=>navEl.classList.toggle('mobile-open'));
 document.querySelectorAll('.dropbtn').forEach(b=>b.onclick=()=>b.parentElement.classList.toggle('open'));
 const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const scrollReveals=[...document.querySelectorAll('.scroll-text-reveal')].map(el=>({el,words:[...el.querySelectorAll('[data-word]')]}));
 const missionReveals=[...document.querySelectorAll('.scroll-mission-reveal')].map(el=>({el,section:el.closest('.mission-scroll'),words:[...el.querySelectorAll('[data-mission-word]')]}));
 const innerStatementReveals=[...document.querySelectorAll('.inner-statement-reveal')].map(el=>({el,section:el.closest('.inner-statement-section'),words:[...el.querySelectorAll('[data-inner-word]')]}));
 const solutionsSection=document.querySelector('#solutions.adjacent-solutions');
 const parallaxEls=[...document.querySelectorAll('[data-parallax]')].map(el=>({el,speed:parseFloat(el.dataset.speed||'0')}));
 const fadeEl=document.querySelector('#bottomEnergyFade');
 const bgParallax=document.querySelector('.site-bg-parallax');
 const heroSection=document.querySelector('.hero.hero-split');
 const missionSection=document.querySelector('#mission');
 const missionVideo=document.querySelector('#missionScrollVideo');
 const franchiseHero=document.querySelector('#franchiseHero');
 const franchiseVideo=document.querySelector('#franchiseScrollVideo');
 let franchiseVideoDuration=0;
 let franchiseVideoTarget=0;
 let franchiseScrubRaf=0;
 let franchiseLastSeek=0;
 const chargersHero=document.querySelector('#chargersHero');
 const chargersVideo=document.querySelector('#chargersScrollVideo');
 let chargersVideoDuration=0;
 let chargersVideoTarget=0;
 let chargersScrubRaf=0;
 let chargersLastSeek=0;
 const cpoHero=document.querySelector('#cpoHero');
 const cpoVideo=document.querySelector('#cpoScrollVideo');
 let cpoVideoDuration=0;
 let cpoVideoTarget=0;
 let cpoScrubRaf=0;
 let cpoLastSeek=0;
 const driversHero=document.querySelector('#driversHero');
 const driversVideo=document.querySelector('#driversScrollVideo');
 let driversVideoDuration=0;
 let driversVideoTarget=0;
 let driversScrubRaf=0;
 let driversLastSeek=0;
 const aboutHero=document.querySelector('#aboutHero');
 const aboutVideo=document.querySelector('#aboutScrollVideo');
 let aboutVideoDuration=0;
 let aboutVideoTarget=0;
 let aboutScrubRaf=0;
 let aboutLastSeek=0;
 const FRANCHISE_VIDEO_PHASE_END=.56;
 const FRANCHISE_VIDEO_FADE_END=.62;
 const FRANCHISE_COPY_REVEAL_START=.62;
 const FRANCHISE_COPY_REVEAL_END=.70;
 let missionVideoDuration=0;
 let missionVideoTarget=0;
 let missionScrubRaf=0;
 let missionLastSeek=0;
 const runMissionScrub=(ts)=>{
   if(!missionVideo||!missionVideoDuration){missionScrubRaf=0;return}
   const delta=missionVideoTarget-missionVideo.currentTime;
   if(Math.abs(delta)<.012){missionScrubRaf=0;return}
   // Keep media seeking off the main scroll cadence. A restrained ~24 fps scrub is visually smooth
   // while substantially reducing decoder pressure during long wheel/trackpad gestures.
   if(ts-missionLastSeek>=42){
     const next=missionVideo.currentTime+delta*.30;
     try{missionVideo.currentTime=Math.max(.001,Math.min(missionVideoDuration-.001,next))}catch(e){}
     missionLastSeek=ts;
   }
   missionScrubRaf=requestAnimationFrame(runMissionScrub);
 };
 const scheduleMissionScrub=()=>{if(!missionScrubRaf)missionScrubRaf=requestAnimationFrame(runMissionScrub)};
 const runFranchiseScrub=(ts)=>{
   if(!franchiseVideo||!franchiseVideoDuration){franchiseScrubRaf=0;return}
   const delta=franchiseVideoTarget-franchiseVideo.currentTime;
   if(Math.abs(delta)<.010){franchiseScrubRaf=0;return}
   if(ts-franchiseLastSeek>=34){
     const next=franchiseVideo.currentTime+delta*.38;
     try{franchiseVideo.currentTime=Math.max(.001,Math.min(franchiseVideoDuration-.001,next))}catch(e){}
     franchiseLastSeek=ts;
   }
   franchiseScrubRaf=requestAnimationFrame(runFranchiseScrub);
 };
 const scheduleFranchiseScrub=()=>{if(!franchiseScrubRaf)franchiseScrubRaf=requestAnimationFrame(runFranchiseScrub)};
 const runChargersScrub=(ts)=>{
   if(!chargersVideo||!chargersVideoDuration){chargersScrubRaf=0;return}
   const delta=chargersVideoTarget-chargersVideo.currentTime;
   if(Math.abs(delta)<.010){chargersScrubRaf=0;return}
   if(ts-chargersLastSeek>=34){
     const next=chargersVideo.currentTime+delta*.38;
     try{chargersVideo.currentTime=Math.max(.001,Math.min(chargersVideoDuration-.001,next))}catch(e){}
     chargersLastSeek=ts;
   }
   chargersScrubRaf=requestAnimationFrame(runChargersScrub);
 };
 const scheduleChargersScrub=()=>{if(!chargersScrubRaf)chargersScrubRaf=requestAnimationFrame(runChargersScrub)};
 const runCpoScrub=(ts)=>{
   if(!cpoVideo||!cpoVideoDuration){cpoScrubRaf=0;return}
   const delta=cpoVideoTarget-cpoVideo.currentTime;
   if(Math.abs(delta)<.010){cpoScrubRaf=0;return}
   if(ts-cpoLastSeek>=34){
     const next=cpoVideo.currentTime+delta*.38;
     try{cpoVideo.currentTime=Math.max(.001,Math.min(cpoVideoDuration-.001,next))}catch(e){}
     cpoLastSeek=ts;
   }
   cpoScrubRaf=requestAnimationFrame(runCpoScrub);
 };
 const scheduleCpoScrub=()=>{if(!cpoScrubRaf)cpoScrubRaf=requestAnimationFrame(runCpoScrub)};
 const runDriversScrub=(ts)=>{
   if(!driversVideo||!driversVideoDuration){driversScrubRaf=0;return}
   const delta=driversVideoTarget-driversVideo.currentTime;
   if(Math.abs(delta)<.010){driversScrubRaf=0;return}
   if(ts-driversLastSeek>=34){
     const next=driversVideo.currentTime+delta*.38;
     try{driversVideo.currentTime=Math.max(.001,Math.min(driversVideoDuration-.001,next))}catch(e){}
     driversLastSeek=ts;
   }
   driversScrubRaf=requestAnimationFrame(runDriversScrub);
 };
 const scheduleDriversScrub=()=>{if(!driversScrubRaf)driversScrubRaf=requestAnimationFrame(runDriversScrub)};
 const runAboutScrub=(ts)=>{
   if(!aboutVideo||!aboutVideoDuration){aboutScrubRaf=0;return}
   const delta=aboutVideoTarget-aboutVideo.currentTime;
   if(Math.abs(delta)<.010){aboutScrubRaf=0;return}
   if(ts-aboutLastSeek>=34){
     const next=aboutVideo.currentTime+delta*.38;
     try{aboutVideo.currentTime=Math.max(.001,Math.min(aboutVideoDuration-.001,next))}catch(e){}
     aboutLastSeek=ts;
   }
   aboutScrubRaf=requestAnimationFrame(runAboutScrub);
 };
 const scheduleAboutScrub=()=>{if(!aboutScrubRaf)aboutScrubRaf=requestAnimationFrame(runAboutScrub)};
 if(franchiseVideo){
   franchiseVideo.pause();
   franchiseVideo.addEventListener('loadedmetadata',()=>{
     franchiseVideoDuration=Number.isFinite(franchiseVideo.duration)?franchiseVideo.duration:0;
     const sr=franchiseHero?.getBoundingClientRect();
     if(sr&&franchiseVideoDuration){
       const travel=Math.max(1,sr.height-innerHeight);
       const sectionProgress=Math.max(0,Math.min(1,-sr.top/travel));
       const videoProgress=Math.max(0,Math.min(1,sectionProgress/FRANCHISE_VIDEO_PHASE_END));
       franchiseVideoTarget=Math.max(.001,Math.min(franchiseVideoDuration-.001,franchiseVideoDuration*videoProgress));
       try{franchiseVideo.currentTime=franchiseVideoTarget}catch(e){}
     }
   },{once:true});
 }
 if(chargersVideo){
   chargersVideo.pause();
   chargersVideo.addEventListener('loadedmetadata',()=>{
     chargersVideoDuration=Number.isFinite(chargersVideo.duration)?chargersVideo.duration:0;
     const sr=chargersHero?.getBoundingClientRect();
     if(sr&&chargersVideoDuration){
       const travel=Math.max(1,sr.height-innerHeight);
       const sectionProgress=Math.max(0,Math.min(1,-sr.top/travel));
       const videoProgress=Math.max(0,Math.min(1,sectionProgress/FRANCHISE_VIDEO_PHASE_END));
       chargersVideoTarget=Math.max(.001,Math.min(chargersVideoDuration-.001,chargersVideoDuration*videoProgress));
       try{chargersVideo.currentTime=chargersVideoTarget}catch(e){}
     }
   },{once:true});
 }
 if(cpoVideo){
   cpoVideo.pause();
   cpoVideo.addEventListener('loadedmetadata',()=>{
     cpoVideoDuration=Number.isFinite(cpoVideo.duration)?cpoVideo.duration:0;
     const sr=cpoHero?.getBoundingClientRect();
     if(sr&&cpoVideoDuration){
       const travel=Math.max(1,sr.height-innerHeight);
       const sectionProgress=Math.max(0,Math.min(1,-sr.top/travel));
       const videoProgress=Math.max(0,Math.min(1,sectionProgress/FRANCHISE_VIDEO_PHASE_END));
       cpoVideoTarget=Math.max(.001,Math.min(cpoVideoDuration-.001,cpoVideoDuration*videoProgress));
       try{cpoVideo.currentTime=cpoVideoTarget}catch(e){}
     }
   },{once:true});
 }
 if(driversVideo){
   driversVideo.pause();
   driversVideo.addEventListener('loadedmetadata',()=>{
     driversVideoDuration=Number.isFinite(driversVideo.duration)?driversVideo.duration:0;
     const sr=driversHero?.getBoundingClientRect();
     if(sr&&driversVideoDuration){
       const travel=Math.max(1,sr.height-innerHeight);
       const sectionProgress=Math.max(0,Math.min(1,-sr.top/travel));
       const videoProgress=Math.max(0,Math.min(1,sectionProgress/FRANCHISE_VIDEO_PHASE_END));
       driversVideoTarget=Math.max(.001,Math.min(driversVideoDuration-.001,driversVideoDuration*videoProgress));
       try{driversVideo.currentTime=driversVideoTarget}catch(e){}
     }
   },{once:true});
 }
 if(aboutVideo){
   aboutVideo.pause();
   aboutVideo.addEventListener('loadedmetadata',()=>{
     aboutVideoDuration=Number.isFinite(aboutVideo.duration)?aboutVideo.duration:0;
     const sr=aboutHero?.getBoundingClientRect();
     if(sr&&aboutVideoDuration){
       const travel=Math.max(1,sr.height-innerHeight);
       const sectionProgress=Math.max(0,Math.min(1,-sr.top/travel));
       const videoProgress=Math.max(0,Math.min(1,sectionProgress/FRANCHISE_VIDEO_PHASE_END));
       aboutVideoTarget=Math.max(.001,Math.min(aboutVideoDuration-.001,aboutVideoDuration*videoProgress));
       try{aboutVideo.currentTime=aboutVideoTarget}catch(e){}
     }
   },{once:true});
 }
 if(missionVideo){
   missionVideo.pause();
   missionVideo.addEventListener('loadedmetadata',()=>{
     missionVideoDuration=Number.isFinite(missionVideo.duration)?missionVideo.duration:0;
     const sr=missionSection?.getBoundingClientRect();
     if(sr&&missionVideoDuration){
       const travel=Math.max(1,sr.height-innerHeight);
       const sectionProgress=Math.max(0,Math.min(1,-sr.top/travel));
       missionVideoTarget=Math.max(.001,Math.min(missionVideoDuration-.001,missionVideoDuration*(1-sectionProgress)));
       // Initial positioning happens once, off the scroll path.
       try{missionVideo.currentTime=missionVideoTarget}catch(e){}
     }
   },{once:true});
 }
 let lastY=scrollY,rafId=0,fadeCurrent=0,fadeTarget=0;
 const clamp=v=>Math.max(0,Math.min(1,v));
 const ease=t=>t*t*(3-2*t);
 const updateScrollEffects=()=>{
   rafId=0;
   const y=lastY;
   document.body.classList.toggle('scrolled',y>20);
   for(const item of scrollReveals){
     const r=item.el.getBoundingClientRect();
     if(r.bottom<0||r.top>innerHeight*1.15) continue;
     const start=innerHeight*.94,end=innerHeight*.40,p=clamp((start-r.top)/(start-end));
     const n=item.words.length;
     for(let i=0;i<n;i++){
       const w=item.words[i],wp=ease(clamp((p*n-i)*1.18));
       w.style.opacity=(.16+.84*wp).toFixed(3);
       w.style.transform=`translate3d(0,${((1-wp)*13).toFixed(2)}px,0)`;
     }
   }
   for(const item of missionReveals){
     if(!item.section) continue;
     const sr=item.section.getBoundingClientRect();
     if(sr.bottom<0||sr.top>innerHeight*1.25) continue;
     const travel=Math.max(1,sr.height-innerHeight);
     const sectionProgress=clamp(-sr.top/travel);
     const p=clamp(sectionProgress/.72);
     const n=item.words.length,step=n>1?.74/(n-1):0,windowSize=.20;
     for(let i=0;i<n;i++){
       const w=item.words[i],local=clamp((p-i*step)/windowSize),e=ease(local);
       w.style.opacity=(.08+.92*e).toFixed(3);
       w.style.transform=`translate3d(0,${((1-e)*20).toFixed(2)}px,0)`;
       w.style.color=w.classList.contains('mission-accent')?'#01C2D8':'#fff';
     }
     item.section.style.setProperty('--mission-progress',p.toFixed(4));
     const missionBgY=(sectionProgress-.5)*-110;
     item.section.style.setProperty('--mission-bg-y',`${missionBgY.toFixed(2)}px`);
     item.section.style.setProperty('--mission-glow-y',`${(-missionBgY*.42).toFixed(2)}px`);
     const line=item.section.querySelector('.mission-progress-line span');if(line)line.style.transform=`scaleX(${p.toFixed(4)})`;

     /* Scroll-scrubbed cinematic background:
        scrolling down advances the film, scrolling up rewinds it.
        The target is decoupled from the scroll handler so media seeking cannot make scrolling stutter. */
     const missionVideoY=(sectionProgress-.5)*28;
     item.section.style.setProperty('--mission-video-y',`${missionVideoY.toFixed(2)}px`);
     if(missionVideo&&missionVideoDuration){
       missionVideoTarget=Math.max(.001,Math.min(missionVideoDuration-.001,missionVideoDuration*(1-sectionProgress)));
       scheduleMissionScrub();
     }
   }
   if(franchiseHero){
     const fr=franchiseHero.getBoundingClientRect();
     if(fr.bottom>=0&&fr.top<=innerHeight*1.15){
       const travel=Math.max(1,fr.height-innerHeight);
       const sectionProgress=clamp(-fr.top/travel);
       const videoProgress=clamp(sectionProgress/FRANCHISE_VIDEO_PHASE_END);
       const videoFade=1-ease(clamp((sectionProgress-FRANCHISE_VIDEO_PHASE_END)/(FRANCHISE_VIDEO_FADE_END-FRANCHISE_VIDEO_PHASE_END)));
       const copyProgress=ease(clamp((sectionProgress-FRANCHISE_COPY_REVEAL_START)/(FRANCHISE_COPY_REVEAL_END-FRANCHISE_COPY_REVEAL_START)));
       franchiseHero.style.setProperty('--franchise-progress',sectionProgress.toFixed(4));
       franchiseHero.style.setProperty('--franchise-video-progress',videoProgress.toFixed(4));
       franchiseHero.style.setProperty('--franchise-video-opacity',videoFade.toFixed(4));
       franchiseHero.style.setProperty('--franchise-copy-progress',copyProgress.toFixed(4));
       franchiseHero.style.setProperty('--franchise-video-y',`${((videoProgress-.5)*24).toFixed(2)}px`);
       franchiseHero.classList.toggle('franchise-copy-phase',sectionProgress>=FRANCHISE_COPY_REVEAL_START);
       const progressLine=franchiseHero.querySelector('.franchise-progress-fill');
       if(progressLine) progressLine.style.transform=`scaleX(${sectionProgress.toFixed(4)})`;
       if(franchiseVideo&&franchiseVideoDuration){
         const rawTarget=franchiseVideoDuration*videoProgress;
         franchiseVideoTarget=videoProgress<=.002?.001:(videoProgress>=.998?franchiseVideoDuration-.001:Math.max(.001,Math.min(franchiseVideoDuration-.001,rawTarget)));
         // The first 56% of the pinned scroll owns the full film. The remaining scroll distance
         // holds on black while the franchise message reveals, so the story gets two extra beats.
         if(videoProgress<=.002||videoProgress>=.998){
           try{franchiseVideo.currentTime=franchiseVideoTarget}catch(e){}
         }else scheduleFranchiseScrub();
       }
     }
   }
   if(chargersHero){
     const cr=chargersHero.getBoundingClientRect();
     if(cr.bottom>=0&&cr.top<=innerHeight*1.15){
       const travel=Math.max(1,cr.height-innerHeight);
       const sectionProgress=clamp(-cr.top/travel);
       const videoProgress=clamp(sectionProgress/FRANCHISE_VIDEO_PHASE_END);
       const videoFade=1-ease(clamp((sectionProgress-FRANCHISE_VIDEO_PHASE_END)/(FRANCHISE_VIDEO_FADE_END-FRANCHISE_VIDEO_PHASE_END)));
       const copyProgress=ease(clamp((sectionProgress-FRANCHISE_COPY_REVEAL_START)/(FRANCHISE_COPY_REVEAL_END-FRANCHISE_COPY_REVEAL_START)));
       chargersHero.style.setProperty('--franchise-progress',sectionProgress.toFixed(4));
       chargersHero.style.setProperty('--franchise-video-progress',videoProgress.toFixed(4));
       chargersHero.style.setProperty('--franchise-video-opacity',videoFade.toFixed(4));
       chargersHero.style.setProperty('--franchise-copy-progress',copyProgress.toFixed(4));
       chargersHero.style.setProperty('--franchise-video-y',`${((videoProgress-.5)*24).toFixed(2)}px`);
       chargersHero.classList.toggle('franchise-copy-phase',sectionProgress>=FRANCHISE_COPY_REVEAL_START);
       const progressLine=chargersHero.querySelector('.franchise-progress-fill');
       if(progressLine) progressLine.style.transform=`scaleX(${sectionProgress.toFixed(4)})`;
       if(chargersVideo&&chargersVideoDuration){
         const rawTarget=chargersVideoDuration*videoProgress;
         chargersVideoTarget=videoProgress<=.002?.001:(videoProgress>=.998?chargersVideoDuration-.001:Math.max(.001,Math.min(chargersVideoDuration-.001,rawTarget)));
         if(videoProgress<=.002||videoProgress>=.998){
           try{chargersVideo.currentTime=chargersVideoTarget}catch(e){}
         }else scheduleChargersScrub();
       }
     }
   }
   if(cpoHero){
     const pr=cpoHero.getBoundingClientRect();
     if(pr.bottom>=0&&pr.top<=innerHeight*1.15){
       const travel=Math.max(1,pr.height-innerHeight);
       const sectionProgress=clamp(-pr.top/travel);
       const videoProgress=clamp(sectionProgress/FRANCHISE_VIDEO_PHASE_END);
       const videoFade=1-ease(clamp((sectionProgress-FRANCHISE_VIDEO_PHASE_END)/(FRANCHISE_VIDEO_FADE_END-FRANCHISE_VIDEO_PHASE_END)));
       const copyProgress=ease(clamp((sectionProgress-FRANCHISE_COPY_REVEAL_START)/(FRANCHISE_COPY_REVEAL_END-FRANCHISE_COPY_REVEAL_START)));
       cpoHero.style.setProperty('--franchise-progress',sectionProgress.toFixed(4));
       cpoHero.style.setProperty('--franchise-video-progress',videoProgress.toFixed(4));
       cpoHero.style.setProperty('--franchise-video-opacity',videoFade.toFixed(4));
       cpoHero.style.setProperty('--franchise-copy-progress',copyProgress.toFixed(4));
       cpoHero.style.setProperty('--franchise-video-y',`${((videoProgress-.5)*20).toFixed(2)}px`);
       cpoHero.classList.toggle('franchise-copy-phase',sectionProgress>=FRANCHISE_COPY_REVEAL_START);
       const progressLine=cpoHero.querySelector('.franchise-progress-fill');
       if(progressLine) progressLine.style.transform=`scaleX(${sectionProgress.toFixed(4)})`;
       if(cpoVideo&&cpoVideoDuration){
         const rawTarget=cpoVideoDuration*videoProgress;
         cpoVideoTarget=videoProgress<=.002?.001:(videoProgress>=.998?cpoVideoDuration-.001:Math.max(.001,Math.min(cpoVideoDuration-.001,rawTarget)));
         if(videoProgress<=.002||videoProgress>=.998){
           try{cpoVideo.currentTime=cpoVideoTarget}catch(e){}
         }else scheduleCpoScrub();
       }
     }
   }
   if(driversHero){

     const dr=driversHero.getBoundingClientRect();
     if(dr.bottom>=0&&dr.top<=innerHeight*1.15){
       const travel=Math.max(1,dr.height-innerHeight);
       const sectionProgress=clamp(-dr.top/travel);
       const videoProgress=clamp(sectionProgress/FRANCHISE_VIDEO_PHASE_END);
       const videoFade=1-ease(clamp((sectionProgress-FRANCHISE_VIDEO_PHASE_END)/(FRANCHISE_VIDEO_FADE_END-FRANCHISE_VIDEO_PHASE_END)));
       const copyProgress=ease(clamp((sectionProgress-FRANCHISE_COPY_REVEAL_START)/(FRANCHISE_COPY_REVEAL_END-FRANCHISE_COPY_REVEAL_START)));
       driversHero.style.setProperty('--franchise-progress',sectionProgress.toFixed(4));
       driversHero.style.setProperty('--franchise-video-progress',videoProgress.toFixed(4));
       driversHero.style.setProperty('--franchise-video-opacity',videoFade.toFixed(4));
       driversHero.style.setProperty('--franchise-copy-progress',copyProgress.toFixed(4));
       driversHero.style.setProperty('--franchise-video-y',`${((videoProgress-.5)*22).toFixed(2)}px`);
       driversHero.classList.toggle('franchise-copy-phase',sectionProgress>=FRANCHISE_COPY_REVEAL_START);
       const progressLine=driversHero.querySelector('.franchise-progress-fill');
       if(progressLine) progressLine.style.transform=`scaleX(${sectionProgress.toFixed(4)})`;
       if(driversVideo&&driversVideoDuration){
         const rawTarget=driversVideoDuration*videoProgress;
         driversVideoTarget=videoProgress<=.002?.001:(videoProgress>=.998?driversVideoDuration-.001:Math.max(.001,Math.min(driversVideoDuration-.001,rawTarget)));
         if(videoProgress<=.002||videoProgress>=.998){
           try{driversVideo.currentTime=driversVideoTarget}catch(e){}
         }else scheduleDriversScrub();
       }
     }
   }
   if(aboutHero){
     const ar=aboutHero.getBoundingClientRect();
     if(ar.bottom>=0&&ar.top<=innerHeight*1.15){
       const travel=Math.max(1,ar.height-innerHeight);
       const sectionProgress=clamp(-ar.top/travel);
       const videoProgress=clamp(sectionProgress/FRANCHISE_VIDEO_PHASE_END);
       const videoFade=1-ease(clamp((sectionProgress-FRANCHISE_VIDEO_PHASE_END)/(FRANCHISE_VIDEO_FADE_END-FRANCHISE_VIDEO_PHASE_END)));
       const copyProgress=ease(clamp((sectionProgress-FRANCHISE_COPY_REVEAL_START)/(FRANCHISE_COPY_REVEAL_END-FRANCHISE_COPY_REVEAL_START)));
       aboutHero.style.setProperty('--franchise-progress',sectionProgress.toFixed(4));
       aboutHero.style.setProperty('--franchise-video-progress',videoProgress.toFixed(4));
       aboutHero.style.setProperty('--franchise-video-opacity',videoFade.toFixed(4));
       aboutHero.style.setProperty('--franchise-copy-progress',copyProgress.toFixed(4));
       aboutHero.style.setProperty('--franchise-video-y',`${((videoProgress-.5)*22).toFixed(2)}px`);
       aboutHero.classList.toggle('franchise-copy-phase',sectionProgress>=FRANCHISE_COPY_REVEAL_START);
       const progressLine=aboutHero.querySelector('.franchise-progress-fill');
       if(progressLine) progressLine.style.transform=`scaleX(${sectionProgress.toFixed(4)})`;
       if(aboutVideo&&aboutVideoDuration){
         const rawTarget=aboutVideoDuration*videoProgress;
         aboutVideoTarget=videoProgress<=.002?.001:(videoProgress>=.998?aboutVideoDuration-.001:Math.max(.001,Math.min(aboutVideoDuration-.001,rawTarget)));
         if(videoProgress<=.002||videoProgress>=.998){try{aboutVideo.currentTime=aboutVideoTarget}catch(e){}}else scheduleAboutScrub();
       }
     }
   }
   for(const item of innerStatementReveals){
     if(!item.section) continue;
     const r=item.section.getBoundingClientRect();
     if(r.bottom<0||r.top>innerHeight*1.2) continue;
     const start=innerHeight*.88,end=innerHeight*.32;
     const p=clamp((start-r.top)/(start-end));
     const n=item.words.length,span=Math.max(1,n-1);
     for(let i=0;i<n;i++){
       const w=item.words[i];
       const wp=ease(clamp((p-(i/span)*.68)/.22));
       w.style.opacity=(.10+.90*wp).toFixed(3);
       w.style.transform=`translate3d(0,${((1-wp)*22).toFixed(2)}px,0)`;
     }
     item.section.style.setProperty('--inner-progress',p.toFixed(4));
     const line=item.section.querySelector('.inner-statement-line span');
     if(line) line.style.transform=`scaleX(${p.toFixed(4)})`;
   }
   if(!reduceMotion){
     if(bgParallax){
       const bgY=Math.max(-115,Math.min(70,-y*.026));
       bgParallax.style.setProperty('--bg-parallax-y',`${bgY.toFixed(2)}px`);
     }
     if(heroSection){
       const hr=heroSection.getBoundingClientRect();
       const heroY=Math.max(-70,Math.min(70,-hr.top*.055));
       heroSection.style.setProperty('--hero-grid-y',`${heroY.toFixed(2)}px`);
       heroSection.style.setProperty('--hero-noise-y',`${(heroY*.35).toFixed(2)}px`);
     }
     for(const item of parallaxEls){
       const el=item.el;
       if(el.closest('.mission-scroll')) continue;
       const r=el.getBoundingClientRect();
       if(r.bottom<-200||r.top>innerHeight+200) continue;
       const centerDelta=(r.top+r.height*.5)-innerHeight*.5;
       const py=Math.max(-78,Math.min(78,-centerDelta*item.speed*1.65));
       el.style.setProperty('--py',`${py.toFixed(2)}px`);
     }
   }
   if(fadeEl){
     const r=fadeEl.getBoundingClientRect();
     const raw=clamp((innerHeight*1.08-r.top)/(innerHeight*1.02));
     fadeTarget=ease(raw);
     fadeCurrent+= (fadeTarget-fadeCurrent)*.18;
     if(Math.abs(fadeTarget-fadeCurrent)<.001)fadeCurrent=fadeTarget;
     fadeEl.style.setProperty('--fade-progress',fadeCurrent.toFixed(4));
     if(Math.abs(fadeTarget-fadeCurrent)>.001) rafId=requestAnimationFrame(updateScrollEffects);
   }
 };
 const requestUpdate=()=>{lastY=scrollY;if(!rafId)rafId=requestAnimationFrame(updateScrollEffects)};
 requestUpdate();
 addEventListener('scroll',requestUpdate,{passive:true});
 addEventListener('resize',requestUpdate,{passive:true});
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.10,rootMargin:'0px 0px -5% 0px'});
 document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
 if(solutionsSection){
   const solutionsIO=new IntersectionObserver(entries=>entries.forEach(entry=>{
     if(entry.isIntersecting){solutionsSection.classList.add('section-in');solutionsIO.disconnect()}
   }),{threshold:.12,rootMargin:'0px 0px -8% 0px'});
   solutionsIO.observe(solutionsSection);
 }
 document.querySelectorAll('.process-item').forEach(item=>{
   item.addEventListener('pointermove',e=>{
     const r=item.getBoundingClientRect();
     item.style.setProperty('--mx',`${e.clientX-r.left}px`);
     item.style.setProperty('--my',`${e.clientY-r.top}px`);
   },{passive:true});
 });
 const loader=document.querySelector('#pageLoader');
 if(loader){
   const loaderPercent=document.querySelector('#loaderPercent');
   const loaderFill=document.querySelector('#loaderProgressFill');
   const loadStart=performance.now();
   const loadDuration=2000;
   const updateChargeProgress=(now)=>{
     const raw=Math.max(0,Math.min(1,(now-loadStart)/loadDuration));
     // Smooth but readable charge-up: fast initial response, then a controlled finish.
     const eased=raw<.78 ? raw*.92 : .7176 + (raw-.78)/.22*.2824;
     const pct=Math.min(100,Math.round(eased*100));
     if(loaderPercent) loaderPercent.textContent=`${pct}%`;
     if(loaderFill) loaderFill.style.width=`${Math.min(100,eased*100)}%`;
     if(raw<1) requestAnimationFrame(updateChargeProgress);
     else{
       if(loaderPercent) loaderPercent.textContent='100%';
       if(loaderFill) loaderFill.style.width='100%';
     }
   };
   requestAnimationFrame(()=>{loader.classList.add('show');requestAnimationFrame(updateChargeProgress)});
   // Keep the charging loader visible for 2 seconds, then begin the slow site reveal.
   setTimeout(()=>{
     document.body.classList.add('is-loaded');
     loader.classList.add('hide');
     setTimeout(()=>document.body.classList.add('hero-entered'),180);
     setTimeout(()=>loader.remove(),1100);
   },2000);
 }
 document.querySelectorAll('.acc-head').forEach(b=>b.onclick=()=>b.parentElement.classList.toggle('open'));
 let glowRaf=0,gx=0,gy=0;document.addEventListener('mousemove',e=>{gx=e.clientX;gy=e.clientY;if(!glowRaf)glowRaf=requestAnimationFrame(()=>{const g=document.querySelector('.mouse-glow');if(g){g.style.transform=`translate3d(${gx}px,${gy}px,0) translate(-50%,-50%)`}glowRaf=0})});
 const heroVisual=document.querySelector('#heroVisual');const heroWindow=document.querySelector('#heroVisual .ecosystem-window');if(heroVisual&&heroWindow&&!reduceMotion){heroVisual.addEventListener('mousemove',e=>{const r=heroVisual.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;heroWindow.style.setProperty('--rx',`${-y*4}deg`);heroWindow.style.setProperty('--ry',`${x*5}deg`)});heroVisual.addEventListener('mouseleave',()=>{heroWindow.style.setProperty('--rx','0deg');heroWindow.style.setProperty('--ry','0deg')})}
 document.querySelectorAll('.journey-step[data-step]').forEach(b=>b.onclick=()=>updateJourney(b.dataset.step,b));
 document.querySelectorAll('[data-driver]').forEach(b=>b.onclick=()=>driverStage(+b.dataset.driver,b));driverStage(-1);
 document.querySelectorAll('.station-item,.drivers-map-pin').forEach(el=>el.addEventListener('click',()=>activateStation(el.dataset.station)));
 filterInit('product');filterInit('story');filterInit('news');
 const ps=document.querySelector('#productSearch');if(ps)ps.oninput=()=>applyProductFilter();
 const ss=document.querySelector('#stationSearch');if(ss)ss.oninput=()=>document.querySelectorAll('.station-item').forEach(x=>x.style.display=x.innerText.toLowerCase().includes(ss.value.toLowerCase())?'block':'none');
 document.querySelectorAll('[data-contact]').forEach(t=>t.onclick=()=>{document.querySelectorAll('[data-contact],.contact-detail').forEach(x=>x.classList.remove('active'));t.classList.add('active');document.querySelector(`[data-detail="${t.dataset.contact}"]`)?.classList.add('active')});
 const fs=document.querySelector('#faqSearch');if(fs)fs.oninput=()=>document.querySelectorAll('#faqList .acc-item').forEach(x=>x.style.display=x.dataset.question.includes(fs.value.toLowerCase())?'block':'none');
 const form=document.querySelector('#inquiryForm');if(form)form.onsubmit=e=>{e.preventDefault();document.querySelector('#formStatus').textContent='Thanks — your inquiry is ready to be routed to the Supernova team.';form.reset()};
}
function updateJourney(step,btn){document.querySelectorAll('[data-step]').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const st=document.querySelector('#journeyStage');if(!st)return;const content={find:`<div class="stage-title">Driver journey · Find</div><div class="route-car"></div><div class="phone" style="right:13%;top:14%"><div class="phone-screen"><div class="phone-top"><span>9:41</span><span>● ● ●</span></div><div class="mini-map" style="height:245px"><i class="pin a"></i><i class="pin b"></i><i class="pin c"></i></div></div></div>`,connect:`<div class="stage-title">Driver journey · Connect & scan</div><div class="charger" style="left:27%;top:54%"><div class="charger-screen"></div><div class="charger-light"></div><div class="charger-port"></div><div class="charger-cable"></div></div><div class="scan"><div class="qr"></div><div class="scanline"></div></div>`,charge:`<div class="stage-title">Driver journey · Charge</div><div class="progress-ring"></div><div class="progress-value">68%</div><div class="ui-float" style="left:50%;bottom:45px;transform:translateX(-50%);width:250px;text-align:center"><span class="tag">Live session</span><p style="margin:7px 0 0">11.4 kWh · 34 min · ₱214.80</p></div>`,pay:`<div class="stage-title">Driver journey · Pay</div><div class="pay-check">✓</div><div class="ui-float" style="left:50%;bottom:55px;transform:translateX(-50%);text-align:center"><span class="tag">Payment confirmed</span><p style="margin:8px 0 0">Session complete · Receipt saved</p></div>`};st.innerHTML=content[step]}
function activateStation(id){
  if(!id) return;
  document.querySelectorAll(".station-item,.drivers-map-pin,.drivers-map-callout").forEach(el=>el.classList.remove("active"));
  document.querySelectorAll(`[data-station="${id}"]`).forEach(el=>el.classList.add("active"));
  document.querySelector(`[data-station-card="${id}"]`)?.classList.add("active");
}
function driverStage(i,btn){
  document.querySelectorAll("[data-driver]").forEach(x=>x.classList.remove("active"));
  if(btn)btn.classList.add("active");
  const s=document.querySelector("#driverScreen");
  const copy=document.querySelector("#driverPreviewCopy");
  const kicker=document.querySelector("#driverStageKicker");
  if(!s||!copy) return;
  const stages=[
    {kicker:"Initial screen",tag:"Step 0",title:"Ready when you are.",desc:"Select a step above to explore the charging experience from app download to unplug.",media:"<img src=\"assets/step-preview-initial-v34.png\" alt=\"Supernova app welcome screen\">"},
    {kicker:"Step 1 preview",tag:"Step 1",title:"Download, Register & Top-up E-Wallet",desc:"Download the app in Google Play Store or Apple App Store. Then create an account and top up your e-wallet.",media:"<video autoplay muted loop playsinline preload=\"metadata\" src=\"assets/step-preview-1-v34.mp4\"></video>"},
    {kicker:"Step 2 preview",tag:"Step 2",title:"Connect the Charger",desc:"Open your EV’s charging port and plug in the charger gun.",media:"<img src=\"assets/step-preview-2-v34.jpg\" alt=\"Connecting the charger to an EV\">"},
    {kicker:"Step 3 preview",tag:"Step 3",title:"Scan the Charger’s QR Code",desc:"Scan the QR code on the front of the charger, or select the correct Station in the app and input the corresponding Station Number or Terminal ID.",media:"<video autoplay muted loop playsinline preload=\"metadata\" src=\"assets/step-preview-1-v34.mp4\"></video>"},
    {kicker:"Step 4 preview",tag:"Step 4",title:"Start Charging",desc:"Choose your desired amount or encode it manually and your charging will start.",media:"<video autoplay muted loop playsinline preload=\"metadata\" src=\"assets/step-preview-4-v34.mp4\"></video>"},
    {kicker:"Step 5 preview",tag:"Step 5",title:"Finish Charging and Unplug",desc:"Wait for charging to finish or press Stop to end. Remove the charging gun and return it to the charger.",media:"<video autoplay muted loop playsinline preload=\"metadata\" src=\"assets/step-preview-5-v34.mp4\"></video>"}
  ];
  const data=stages[i>=0?i+1:0];
  if(kicker) kicker.textContent=data.kicker;
  s.innerHTML=`${data.media}<span class="driver-preview-sheen" aria-hidden="true"></span>`;
  copy.innerHTML=`<span class="tag">${data.tag}</span><h3>${data.title}</h3><p>${data.desc}</p>`;
}
let prodFilter='All';function filterInit(type){document.querySelectorAll(`[data-${type}-filter]`).forEach(b=>b.onclick=()=>{document.querySelectorAll(`[data-${type}-filter]`).forEach(x=>x.classList.remove('active'));b.classList.add('active');if(type==='product'){prodFilter=b.dataset.productFilter;applyProductFilter()}else{const val=b.dataset[`${type}Filter`];document.querySelectorAll(`.${type}-card`).forEach(c=>c.style.display=(val==='All'||val==='All Stories'||c.dataset.cat===val)?'block':'none')}})}function applyProductFilter(){const q=(document.querySelector('#productSearch')?.value||'').toLowerCase();document.querySelectorAll('.product-card').forEach(c=>c.style.display=((prodFilter==='All'||c.dataset.cat===prodFilter)&&c.dataset.name.includes(q))?'block':'none')}
render();
