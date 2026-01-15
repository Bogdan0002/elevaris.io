/**
 * NICHE-SPECIFIC DEFAULT CONTENT
 * Provides industry-specific services, headlines, icons, and stock images
 */

import type { BusinessNiche, ServiceItem, TrustBadge } from './types'

// ============================================================================
// NICHE DISPLAY NAMES
// ============================================================================

export const NICHE_DISPLAY_NAMES: Record<BusinessNiche, string> = {
  'cleaning': 'Cleaning Services',
  'landscaping': 'Landscaping',
  'roofing': 'Roofing',
  'plumbing': 'Plumbing',
  'hvac': 'HVAC',
  'auto-detailing': 'Auto Detailing',
  'painting': 'Painting',
  'moving': 'Moving Services',
  'pest-control': 'Pest Control',
  'pool-service': 'Pool Service',
  'electrical': 'Electrical',
  'handyman': 'Handyman',
  'pressure-washing': 'Pressure Washing',
  'window-cleaning': 'Window Cleaning',
  'carpet-cleaning': 'Carpet Cleaning',
  'junk-removal': 'Junk Removal',
  'locksmith': 'Locksmith',
  'garage-door': 'Garage Door',
  'concrete': 'Concrete',
  'fencing': 'Fencing',
  'tree-service': 'Tree Service',
  'gutter-cleaning': 'Gutter Cleaning',
  'solar': 'Solar Installation',
  'flooring': 'Flooring',
  'general-contractor': 'General Contractor',
}

// ============================================================================
// NICHE-SPECIFIC SERVICES
// ============================================================================

export const NICHE_SERVICES: Record<BusinessNiche, ServiceItem[]> = {
  'cleaning': [
    { name: 'Residential Cleaning', description: 'Regular maintenance cleaning for homes and apartments. Eco-friendly products and attention to detail.', icon: 'Home', features: ['Weekly/Bi-weekly options', 'All rooms included', 'Eco-friendly products'] },
    { name: 'Commercial Cleaning', description: 'Professional cleaning for offices, retail spaces, and businesses. After-hours available.', icon: 'Building2', features: ['After-hours available', 'Custom schedules', 'Commercial-grade equipment'] },
    { name: 'Deep Cleaning', description: 'Intensive top-to-bottom cleaning service. Perfect for move-ins or special occasions.', icon: 'Sparkles', features: ['Top to bottom clean', 'Hard-to-reach areas', 'Appliance cleaning'] },
    { name: 'Move-in/Move-out Cleaning', description: 'Comprehensive cleaning for relocations. Get your deposit back or welcome new tenants.', icon: 'Truck', features: ['Full property coverage', 'Same-day available', 'Carpet cleaning included'] },
  ],
  
  'landscaping': [
    { name: 'Lawn Maintenance', description: 'Regular mowing, edging, and lawn care to keep your property looking pristine year-round.', icon: 'Leaf', features: ['Weekly/Bi-weekly service', 'Edging included', 'Debris cleanup'] },
    { name: 'Landscape Design', description: 'Custom landscape designs that transform your outdoor space into a beautiful oasis.', icon: 'Palette', features: ['3D renderings', 'Plant selection', 'Hardscape design'] },
    { name: 'Irrigation Systems', description: 'Smart irrigation installation and repair to keep your landscape healthy and water-efficient.', icon: 'Droplets', features: ['Smart controllers', 'Drip systems', 'Seasonal adjustments'] },
    { name: 'Hardscaping', description: 'Patios, walkways, retaining walls, and outdoor living spaces built to last.', icon: 'Hammer', features: ['Pavers & stone', 'Retaining walls', 'Outdoor kitchens'] },
  ],
  
  'roofing': [
    { name: 'Roof Replacement', description: 'Complete roof replacement with premium materials and expert installation. Lifetime warranty available.', icon: 'Home', features: ['Free inspection', 'Multiple material options', 'Warranty included'] },
    { name: 'Roof Repair', description: 'Fast, reliable repairs for leaks, storm damage, and wear. Emergency service available.', icon: 'Wrench', features: ['Same-day service', 'Storm damage repair', 'Leak detection'] },
    { name: 'Roof Inspection', description: 'Comprehensive roof inspections to identify issues before they become costly problems.', icon: 'Search', features: ['Detailed report', 'Photo documentation', 'Maintenance plan'] },
    { name: 'Gutter Installation', description: 'Seamless gutters and gutter guards to protect your home from water damage.', icon: 'Droplets', features: ['Seamless gutters', 'Gutter guards', 'Downspout extensions'] },
  ],
  
  'plumbing': [
    { name: 'Emergency Plumbing', description: '24/7 emergency plumbing services for burst pipes, severe leaks, and plumbing emergencies.', icon: 'AlertTriangle', features: ['24/7 availability', 'Fast response', 'No overtime charges'] },
    { name: 'Drain Cleaning', description: 'Professional drain cleaning to clear clogs and restore proper flow throughout your home.', icon: 'Droplets', features: ['Camera inspection', 'Hydro jetting', 'Preventive maintenance'] },
    { name: 'Water Heater Services', description: 'Installation, repair, and maintenance for all types of water heaters.', icon: 'Flame', features: ['Tank & tankless', 'Same-day install', 'Energy efficient'] },
    { name: 'Pipe Repair & Replacement', description: 'Expert pipe repair and repiping services to ensure reliable water flow.', icon: 'Wrench', features: ['Trenchless options', 'Leak detection', 'Full repiping'] },
  ],
  
  'hvac': [
    { name: 'AC Installation', description: 'Expert installation of high-efficiency air conditioning systems for maximum comfort.', icon: 'Snowflake', features: ['Free estimates', 'Energy Star rated', 'Financing available'] },
    { name: 'Heating Services', description: 'Furnace and heat pump installation, repair, and maintenance to keep you warm.', icon: 'Flame', features: ['All brands serviced', 'Same-day repair', 'Tune-ups'] },
    { name: 'HVAC Maintenance', description: 'Preventive maintenance plans to extend equipment life and prevent breakdowns.', icon: 'Settings', features: ['Bi-annual tune-ups', 'Priority service', 'Discounted repairs'] },
    { name: 'Indoor Air Quality', description: 'Air purifiers, humidifiers, and duct cleaning for healthier indoor air.', icon: 'Wind', features: ['Air purification', 'Duct cleaning', 'Humidity control'] },
  ],
  
  'auto-detailing': [
    { name: 'Full Detail Package', description: 'Complete interior and exterior detailing that makes your car look showroom new.', icon: 'Car', features: ['Interior deep clean', 'Exterior polish', 'Engine bay cleaning'] },
    { name: 'Paint Correction', description: 'Professional paint correction to remove swirls, scratches, and oxidation.', icon: 'Sparkles', features: ['Multi-stage polish', 'Scratch removal', 'Gloss enhancement'] },
    { name: 'Ceramic Coating', description: 'Long-lasting ceramic coating protection for your vehicle\'s paint and surfaces.', icon: 'Shield', features: ['5+ year protection', 'Hydrophobic finish', 'UV protection'] },
    { name: 'Interior Detailing', description: 'Deep cleaning and conditioning of all interior surfaces, seats, and carpets.', icon: 'Armchair', features: ['Leather conditioning', 'Odor elimination', 'Stain removal'] },
  ],
  
  'painting': [
    { name: 'Interior Painting', description: 'Professional interior painting with premium paints and flawless finishes.', icon: 'Paintbrush', features: ['Color consultation', 'Furniture protection', 'Clean workspace'] },
    { name: 'Exterior Painting', description: 'Weather-resistant exterior painting that protects and beautifies your home.', icon: 'Home', features: ['Power washing included', 'Premium paints', 'Multi-year warranty'] },
    { name: 'Cabinet Refinishing', description: 'Transform your kitchen with professional cabinet painting and refinishing.', icon: 'Square', features: ['No replacement needed', 'Custom colors', 'Quick turnaround'] },
    { name: 'Commercial Painting', description: 'Minimize disruption with efficient commercial painting services.', icon: 'Building2', features: ['After-hours work', 'Fast completion', 'Safety compliant'] },
  ],
  
  'moving': [
    { name: 'Local Moving', description: 'Stress-free local moving with professional movers who handle your belongings with care.', icon: 'Truck', features: ['Licensed & insured', 'Packing supplies', 'Same-day available'] },
    { name: 'Long Distance Moving', description: 'Reliable long-distance moving with tracking and guaranteed delivery dates.', icon: 'MapPin', features: ['GPS tracking', 'Guaranteed dates', 'Full-service packing'] },
    { name: 'Packing Services', description: 'Professional packing services using quality materials to protect your items.', icon: 'Package', features: ['All supplies included', 'Fragile item care', 'Unpacking available'] },
    { name: 'Storage Solutions', description: 'Secure, climate-controlled storage for short or long-term needs.', icon: 'Warehouse', features: ['Climate controlled', 'Flexible terms', '24/7 access'] },
  ],
  
  'pest-control': [
    { name: 'General Pest Control', description: 'Comprehensive pest control for ants, roaches, spiders, and common household pests.', icon: 'Bug', features: ['Quarterly treatments', 'Safe for pets', 'Satisfaction guarantee'] },
    { name: 'Termite Treatment', description: 'Protect your home from termite damage with advanced treatment solutions.', icon: 'Shield', features: ['Free inspection', 'Warranty included', 'Preventive treatment'] },
    { name: 'Rodent Control', description: 'Effective rodent removal and exclusion to keep mice and rats out permanently.', icon: 'AlertTriangle', features: ['Humane options', 'Entry point sealing', 'Ongoing monitoring'] },
    { name: 'Mosquito Control', description: 'Enjoy your outdoor spaces with professional mosquito control treatments.', icon: 'Droplets', features: ['Yard treatment', 'Event spraying', 'Monthly service'] },
  ],
  
  'pool-service': [
    { name: 'Weekly Pool Cleaning', description: 'Regular pool maintenance to keep your water crystal clear and safe.', icon: 'Droplets', features: ['Chemical balancing', 'Skimming & vacuuming', 'Filter cleaning'] },
    { name: 'Pool Repair', description: 'Expert repair services for pumps, filters, heaters, and pool equipment.', icon: 'Wrench', features: ['All brands serviced', 'Same-day available', 'Parts warranty'] },
    { name: 'Pool Renovation', description: 'Transform your pool with resurfacing, tile work, and equipment upgrades.', icon: 'Sparkles', features: ['Resurfacing', 'Tile replacement', 'LED lighting'] },
    { name: 'Pool Opening/Closing', description: 'Seasonal pool opening and closing services to protect your investment.', icon: 'Calendar', features: ['Winterization', 'Spring startup', 'Cover installation'] },
  ],
  
  'electrical': [
    { name: 'Electrical Repair', description: 'Safe, reliable electrical repairs for outlets, switches, and wiring issues.', icon: 'Zap', features: ['Same-day service', 'Code compliant', 'Safety inspection'] },
    { name: 'Panel Upgrades', description: 'Electrical panel upgrades to support your home\'s power needs safely.', icon: 'Settings', features: ['200 amp upgrades', 'Permit included', 'Surge protection'] },
    { name: 'Lighting Installation', description: 'Indoor and outdoor lighting installation including recessed and landscape lighting.', icon: 'Lightbulb', features: ['LED upgrades', 'Dimmer installation', 'Smart lighting'] },
    { name: 'EV Charger Installation', description: 'Electric vehicle charger installation for convenient home charging.', icon: 'Battery', features: ['Level 2 chargers', 'All brands', 'Permit handling'] },
  ],
  
  'handyman': [
    { name: 'General Repairs', description: 'Skilled handyman services for all your home repair and maintenance needs.', icon: 'Wrench', features: ['No job too small', 'Same-day available', 'Quality guaranteed'] },
    { name: 'Furniture Assembly', description: 'Professional assembly of furniture, fitness equipment, and more.', icon: 'Armchair', features: ['All brands', 'Tools included', 'Cleanup included'] },
    { name: 'Drywall Repair', description: 'Expert drywall patching, repair, and texturing for seamless results.', icon: 'Square', features: ['Hole patching', 'Texture matching', 'Paint-ready finish'] },
    { name: 'Door & Window Repair', description: 'Repair and replacement of doors, windows, and hardware.', icon: 'DoorOpen', features: ['Lock installation', 'Weather sealing', 'Hardware upgrade'] },
  ],
  
  'pressure-washing': [
    { name: 'House Washing', description: 'Gentle soft washing to remove dirt, mold, and mildew from your home\'s exterior.', icon: 'Home', features: ['Safe for all siding', 'Mold removal', 'Curb appeal boost'] },
    { name: 'Driveway Cleaning', description: 'High-pressure cleaning for driveways, sidewalks, and concrete surfaces.', icon: 'Car', features: ['Oil stain removal', 'Sealing available', 'Fast drying'] },
    { name: 'Deck & Fence Cleaning', description: 'Restore your deck and fence to like-new condition with professional cleaning.', icon: 'Fence', features: ['Wood safe', 'Staining available', 'Mold treatment'] },
    { name: 'Commercial Pressure Washing', description: 'Keep your business looking professional with regular pressure washing.', icon: 'Building2', features: ['Parking lots', 'Storefronts', 'Graffiti removal'] },
  ],
  
  'window-cleaning': [
    { name: 'Residential Window Cleaning', description: 'Crystal-clear windows inside and out for homes of all sizes.', icon: 'Home', features: ['Interior & exterior', 'Screen cleaning', 'Track cleaning'] },
    { name: 'Commercial Window Cleaning', description: 'Professional window cleaning for offices, storefronts, and commercial buildings.', icon: 'Building2', features: ['High-rise capable', 'Regular scheduling', 'Insured service'] },
    { name: 'Pressure Washing', description: 'Combine window cleaning with pressure washing for complete exterior cleaning.', icon: 'Droplets', features: ['Bundle discount', 'Same-day service', 'Soft washing'] },
    { name: 'Solar Panel Cleaning', description: 'Maximize solar efficiency with professional panel cleaning.', icon: 'Sun', features: ['Efficiency boost', 'Safe cleaning', 'Regular plans'] },
  ],
  
  'carpet-cleaning': [
    { name: 'Steam Carpet Cleaning', description: 'Deep steam cleaning that removes dirt, stains, and allergens from carpets.', icon: 'Droplets', features: ['Hot water extraction', 'Fast drying', 'Pet-safe solutions'] },
    { name: 'Upholstery Cleaning', description: 'Professional cleaning for sofas, chairs, and fabric furniture.', icon: 'Sofa', features: ['Fabric protection', 'Stain removal', 'Odor elimination'] },
    { name: 'Area Rug Cleaning', description: 'Specialized cleaning for area rugs, oriental rugs, and delicate fabrics.', icon: 'Square', features: ['Pickup & delivery', 'Hand washing', 'Fringe repair'] },
    { name: 'Commercial Carpet Cleaning', description: 'Keep your business carpets clean and professional with regular service.', icon: 'Building2', features: ['After-hours service', 'Quick drying', 'Maintenance plans'] },
  ],
  
  'junk-removal': [
    { name: 'Residential Junk Removal', description: 'Fast, friendly junk removal for homes. We do all the heavy lifting.', icon: 'Trash2', features: ['Same-day service', 'We load everything', 'Eco-friendly disposal'] },
    { name: 'Commercial Cleanouts', description: 'Office cleanouts, warehouse clearing, and commercial junk removal.', icon: 'Building2', features: ['Flexible scheduling', 'Large capacity', 'Proper disposal'] },
    { name: 'Estate Cleanouts', description: 'Compassionate estate cleanout services during difficult times.', icon: 'Home', features: ['Sensitive handling', 'Donation sorting', 'Complete cleanout'] },
    { name: 'Construction Debris Removal', description: 'Remove construction debris and renovation waste efficiently.', icon: 'Hammer', features: ['Dumpster alternative', 'Same-day pickup', 'Recycling included'] },
  ],
  
  'locksmith': [
    { name: 'Emergency Lockout', description: '24/7 emergency lockout service to get you back inside quickly and safely.', icon: 'Key', features: ['15-minute response', 'No damage entry', 'All lock types'] },
    { name: 'Lock Replacement', description: 'Professional lock replacement and rekeying for homes and businesses.', icon: 'Lock', features: ['High-security locks', 'Same-day service', 'Master keying'] },
    { name: 'Smart Lock Installation', description: 'Upgrade to smart locks for keyless convenience and enhanced security.', icon: 'Smartphone', features: ['All brands', 'Setup included', 'App configuration'] },
    { name: 'Commercial Locksmith', description: 'Complete commercial locksmith services including access control systems.', icon: 'Building2', features: ['Access control', 'Master systems', 'Emergency service'] },
  ],
  
  'garage-door': [
    { name: 'Garage Door Repair', description: 'Fast, reliable repair for all garage door issues. Springs, openers, and more.', icon: 'Wrench', features: ['Same-day service', 'All brands', 'Parts in stock'] },
    { name: 'Garage Door Installation', description: 'New garage door installation with a wide selection of styles and materials.', icon: 'DoorOpen', features: ['Free estimates', 'Premium brands', 'Warranty included'] },
    { name: 'Opener Repair & Installation', description: 'Garage door opener repair and replacement with smart home integration.', icon: 'Settings', features: ['Smart openers', 'Battery backup', 'Quiet operation'] },
    { name: 'Spring Replacement', description: 'Safe, professional spring replacement to restore proper door operation.', icon: 'AlertTriangle', features: ['Safety first', 'High-cycle springs', 'Same-day service'] },
  ],
  
  'concrete': [
    { name: 'Concrete Driveways', description: 'Durable, attractive concrete driveways built to last for decades.', icon: 'Car', features: ['Stamped options', 'Color choices', 'Proper drainage'] },
    { name: 'Patios & Walkways', description: 'Custom concrete patios and walkways to enhance your outdoor living.', icon: 'Footprints', features: ['Decorative finishes', 'Non-slip surface', 'Custom design'] },
    { name: 'Concrete Repair', description: 'Professional repair for cracks, settling, and damaged concrete surfaces.', icon: 'Wrench', features: ['Crack repair', 'Leveling', 'Resurfacing'] },
    { name: 'Foundation Work', description: 'Foundation repair and new foundation construction by experienced pros.', icon: 'Home', features: ['Structural repair', 'Waterproofing', 'Engineering support'] },
  ],
  
  'fencing': [
    { name: 'Wood Fencing', description: 'Beautiful wood fences in cedar, redwood, and pine for privacy and style.', icon: 'Fence', features: ['Custom designs', 'Staining options', 'Gate included'] },
    { name: 'Vinyl Fencing', description: 'Low-maintenance vinyl fencing that looks great for years.', icon: 'Square', features: ['No painting needed', 'Lifetime warranty', 'Multiple styles'] },
    { name: 'Chain Link Fencing', description: 'Affordable, durable chain link fencing for security and boundaries.', icon: 'Grid3x3', features: ['Privacy slats', 'Gates available', 'Commercial grade'] },
    { name: 'Fence Repair', description: 'Expert fence repair to restore your property\'s security and appearance.', icon: 'Wrench', features: ['All materials', 'Post replacement', 'Storm damage'] },
  ],
  
  'tree-service': [
    { name: 'Tree Removal', description: 'Safe, professional tree removal for any size tree. Stump grinding included.', icon: 'TreeDeciduous', features: ['Fully insured', 'Stump grinding', 'Debris cleanup'] },
    { name: 'Tree Trimming', description: 'Expert tree trimming to maintain health, safety, and appearance.', icon: 'Scissors', features: ['Crown shaping', 'Dead branch removal', 'Storm prep'] },
    { name: 'Emergency Tree Service', description: '24/7 emergency response for storm damage and fallen trees.', icon: 'AlertTriangle', features: ['Fast response', 'Insurance claims', 'Safe removal'] },
    { name: 'Tree Health Care', description: 'Diagnose and treat tree diseases, pests, and nutrient deficiencies.', icon: 'Heart', features: ['Disease treatment', 'Fertilization', 'Pest control'] },
  ],
  
  'gutter-cleaning': [
    { name: 'Gutter Cleaning', description: 'Thorough gutter cleaning to prevent water damage and foundation issues.', icon: 'Droplets', features: ['Debris removal', 'Downspout flush', 'Inspection included'] },
    { name: 'Gutter Repair', description: 'Fix leaks, sagging, and damage to restore proper gutter function.', icon: 'Wrench', features: ['Leak sealing', 'Rehanging', 'Section replacement'] },
    { name: 'Gutter Guard Installation', description: 'Reduce maintenance with professional gutter guard installation.', icon: 'Shield', features: ['Multiple styles', 'Lifetime warranty', 'Debris blocking'] },
    { name: 'Gutter Installation', description: 'New seamless gutter installation in various colors and styles.', icon: 'Home', features: ['Seamless gutters', 'Color matching', 'Proper pitch'] },
  ],
  
  'solar': [
    { name: 'Solar Panel Installation', description: 'Professional solar installation to reduce energy bills and carbon footprint.', icon: 'Sun', features: ['Free assessment', 'Permit handling', 'Financing available'] },
    { name: 'Battery Storage', description: 'Home battery systems for energy independence and backup power.', icon: 'Battery', features: ['Tesla Powerwall', 'Grid backup', 'Smart monitoring'] },
    { name: 'Solar Maintenance', description: 'Keep your solar system performing at peak efficiency with regular maintenance.', icon: 'Settings', features: ['Panel cleaning', 'Performance check', 'Inverter service'] },
    { name: 'Solar Repair', description: 'Expert diagnosis and repair for all solar system components.', icon: 'Wrench', features: ['All brands', 'Warranty work', 'Performance restoration'] },
  ],
  
  'flooring': [
    { name: 'Hardwood Flooring', description: 'Beautiful hardwood floor installation, refinishing, and repair.', icon: 'Square', features: ['Solid & engineered', 'Custom staining', 'Dustless sanding'] },
    { name: 'Tile Installation', description: 'Expert tile installation for floors, showers, and backsplashes.', icon: 'Grid3x3', features: ['All tile types', 'Heated floors', 'Waterproofing'] },
    { name: 'Luxury Vinyl Flooring', description: 'Durable, waterproof luxury vinyl plank and tile installation.', icon: 'Layers', features: ['Waterproof', 'Pet-friendly', 'Quick install'] },
    { name: 'Carpet Installation', description: 'Professional carpet installation with quality padding and seaming.', icon: 'Armchair', features: ['Free measuring', 'Old carpet removal', 'Furniture moving'] },
  ],
  
  'general-contractor': [
    { name: 'Kitchen Remodeling', description: 'Complete kitchen renovations from design to completion.', icon: 'ChefHat', features: ['Custom cabinets', 'Countertops', 'Appliance install'] },
    { name: 'Bathroom Remodeling', description: 'Transform your bathroom with modern fixtures and finishes.', icon: 'Bath', features: ['Walk-in showers', 'Vanities', 'Tile work'] },
    { name: 'Home Additions', description: 'Expand your living space with professionally built home additions.', icon: 'Plus', features: ['Permit handling', 'Full design', 'Foundation to finish'] },
    { name: 'Whole Home Renovation', description: 'Complete home renovations managed from start to finish.', icon: 'Home', features: ['Project management', 'Licensed trades', 'On-time completion'] },
  ],
}

// ============================================================================
// NICHE-SPECIFIC HEADLINES
// ============================================================================

export interface NicheContent {
  heroHeadline: string
  heroSubheadline: string
  servicesHeadline: string
  aboutHeadline: string
  whyUsHeadline: string
  ctaText: string
  ctaSecondaryText: string
}

export const NICHE_CONTENT: Record<BusinessNiche, NicheContent> = {
  'cleaning': {
    heroHeadline: 'Sparkling Clean Homes',
    heroSubheadline: 'Professional cleaning services with meticulous attention to detail. Experience the joy of coming home to a spotless, fresh space.',
    servicesHeadline: 'Professional Cleaning Services',
    aboutHeadline: 'Your Trusted Cleaning Partner',
    whyUsHeadline: 'The Difference',
    ctaText: 'Get Free Quote',
    ctaSecondaryText: 'Call Now',
  },
  'landscaping': {
    heroHeadline: 'Transform Your Outdoor Space',
    heroSubheadline: 'Expert landscaping services that create beautiful, sustainable outdoor environments you\'ll love coming home to.',
    servicesHeadline: 'Landscaping Services',
    aboutHeadline: 'Your Landscape Partners',
    whyUsHeadline: 'Why We\'re Different',
    ctaText: 'Free Consultation',
    ctaSecondaryText: 'Call Now',
  },
  'roofing': {
    heroHeadline: 'Protect Your Home From Above',
    heroSubheadline: 'Expert roofing services with premium materials and craftsmanship. Your roof is your first line of defense.',
    servicesHeadline: 'Roofing Services',
    aboutHeadline: 'Your Roofing Experts',
    whyUsHeadline: 'The Roofing Difference',
    ctaText: 'Free Inspection',
    ctaSecondaryText: 'Emergency Service',
  },
  'plumbing': {
    heroHeadline: 'Reliable Plumbing Solutions',
    heroSubheadline: 'Fast, professional plumbing services for your home or business. Available 24/7 for emergencies.',
    servicesHeadline: 'Plumbing Services',
    aboutHeadline: 'Your Trusted Plumbers',
    whyUsHeadline: 'Why Choose Us',
    ctaText: 'Get Free Quote',
    ctaSecondaryText: '24/7 Emergency',
  },
  'hvac': {
    heroHeadline: 'Comfort You Can Count On',
    heroSubheadline: 'Expert heating and cooling services to keep your home comfortable year-round. Energy-efficient solutions.',
    servicesHeadline: 'HVAC Services',
    aboutHeadline: 'Your Comfort Experts',
    whyUsHeadline: 'The Comfort Difference',
    ctaText: 'Schedule Service',
    ctaSecondaryText: 'Emergency Repair',
  },
  'auto-detailing': {
    heroHeadline: 'Showroom Shine, Every Time',
    heroSubheadline: 'Professional auto detailing that makes your vehicle look and feel brand new. Mobile service available.',
    servicesHeadline: 'Detailing Services',
    aboutHeadline: 'Your Detailing Experts',
    whyUsHeadline: 'The Detail Difference',
    ctaText: 'Book Appointment',
    ctaSecondaryText: 'Get Quote',
  },
  'painting': {
    heroHeadline: 'Transform Your Space with Color',
    heroSubheadline: 'Professional painting services that bring your vision to life. Premium paints and flawless finishes.',
    servicesHeadline: 'Painting Services',
    aboutHeadline: 'Your Painting Professionals',
    whyUsHeadline: 'Why We\'re Different',
    ctaText: 'Free Estimate',
    ctaSecondaryText: 'Color Consultation',
  },
  'moving': {
    heroHeadline: 'Stress-Free Moving',
    heroSubheadline: 'Professional movers who handle your belongings with care. Local and long-distance moving services.',
    servicesHeadline: 'Moving Services',
    aboutHeadline: 'Your Moving Partners',
    whyUsHeadline: 'The Moving Difference',
    ctaText: 'Get Free Quote',
    ctaSecondaryText: 'Call Now',
  },
  'pest-control': {
    heroHeadline: 'Protect Your Home from Pests',
    heroSubheadline: 'Effective pest control solutions that keep your home safe and pest-free. Family and pet-safe treatments.',
    servicesHeadline: 'Pest Control Services',
    aboutHeadline: 'Your Pest Control Experts',
    whyUsHeadline: 'Why Choose Us',
    ctaText: 'Free Inspection',
    ctaSecondaryText: 'Call Now',
  },
  'pool-service': {
    heroHeadline: 'Crystal Clear Pools',
    heroSubheadline: 'Professional pool maintenance and repair to keep your pool sparkling clean and ready for enjoyment.',
    servicesHeadline: 'Pool Services',
    aboutHeadline: 'Your Pool Experts',
    whyUsHeadline: 'The Pool Difference',
    ctaText: 'Get Free Quote',
    ctaSecondaryText: 'Call Now',
  },
  'electrical': {
    heroHeadline: 'Safe & Reliable Electrical',
    heroSubheadline: 'Licensed electricians providing safe, code-compliant electrical services for your home or business.',
    servicesHeadline: 'Electrical Services',
    aboutHeadline: 'Your Electrical Experts',
    whyUsHeadline: 'Why Choose Us',
    ctaText: 'Get Free Quote',
    ctaSecondaryText: 'Emergency Service',
  },
  'handyman': {
    heroHeadline: 'Your Home Repair Experts',
    heroSubheadline: 'Skilled handyman services for all your home repair and improvement needs. No job too small.',
    servicesHeadline: 'Handyman Services',
    aboutHeadline: 'Your Trusted Handyman',
    whyUsHeadline: 'Why We\'re Different',
    ctaText: 'Get Free Quote',
    ctaSecondaryText: 'Call Now',
  },
  'pressure-washing': {
    heroHeadline: 'Restore Your Property\'s Beauty',
    heroSubheadline: 'Professional pressure washing that removes years of dirt, grime, and stains. Instant curb appeal.',
    servicesHeadline: 'Pressure Washing Services',
    aboutHeadline: 'Your Cleaning Experts',
    whyUsHeadline: 'Why Choose Us',
    ctaText: 'Get Free Quote',
    ctaSecondaryText: 'Call Now',
  },
  'window-cleaning': {
    heroHeadline: 'Crystal Clear Views',
    heroSubheadline: 'Professional window cleaning for streak-free, sparkling windows that let the light shine through.',
    servicesHeadline: 'Window Cleaning Services',
    aboutHeadline: 'Your Window Experts',
    whyUsHeadline: 'The Clear Difference',
    ctaText: 'Get Free Quote',
    ctaSecondaryText: 'Call Now',
  },
  'carpet-cleaning': {
    heroHeadline: 'Revive Your Carpets',
    heroSubheadline: 'Deep carpet cleaning that removes stains, odors, and allergens. Fast drying, lasting freshness.',
    servicesHeadline: 'Carpet Cleaning Services',
    aboutHeadline: 'Your Carpet Experts',
    whyUsHeadline: 'Why Choose Us',
    ctaText: 'Get Free Quote',
    ctaSecondaryText: 'Call Now',
  },
  'junk-removal': {
    heroHeadline: 'Clear the Clutter',
    heroSubheadline: 'Fast, friendly junk removal services. We do all the heavy lifting so you don\'t have to.',
    servicesHeadline: 'Junk Removal Services',
    aboutHeadline: 'Your Cleanup Crew',
    whyUsHeadline: 'Why Choose Us',
    ctaText: 'Get Free Quote',
    ctaSecondaryText: 'Call Now',
  },
  'locksmith': {
    heroHeadline: 'Security You Can Trust',
    heroSubheadline: '24/7 locksmith services for emergencies, lock changes, and security upgrades. Fast response times.',
    servicesHeadline: 'Locksmith Services',
    aboutHeadline: 'Your Security Experts',
    whyUsHeadline: 'Why Choose Us',
    ctaText: 'Get Help Now',
    ctaSecondaryText: '24/7 Emergency',
  },
  'garage-door': {
    heroHeadline: 'Reliable Garage Door Service',
    heroSubheadline: 'Expert garage door repair and installation. Same-day service available for your convenience.',
    servicesHeadline: 'Garage Door Services',
    aboutHeadline: 'Your Garage Door Experts',
    whyUsHeadline: 'Why Choose Us',
    ctaText: 'Get Free Quote',
    ctaSecondaryText: 'Same-Day Service',
  },
  'concrete': {
    heroHeadline: 'Built to Last',
    heroSubheadline: 'Professional concrete services for driveways, patios, foundations, and more. Quality craftsmanship.',
    servicesHeadline: 'Concrete Services',
    aboutHeadline: 'Your Concrete Experts',
    whyUsHeadline: 'Why Choose Us',
    ctaText: 'Get Free Quote',
    ctaSecondaryText: 'Call Now',
  },
  'fencing': {
    heroHeadline: 'Define Your Property',
    heroSubheadline: 'Quality fence installation and repair. Privacy, security, and curb appeal for your property.',
    servicesHeadline: 'Fencing Services',
    aboutHeadline: 'Your Fencing Experts',
    whyUsHeadline: 'Why Choose Us',
    ctaText: 'Get Free Quote',
    ctaSecondaryText: 'Call Now',
  },
  'tree-service': {
    heroHeadline: 'Professional Tree Care',
    heroSubheadline: 'Expert tree removal, trimming, and health care. Safe, efficient, and fully insured.',
    servicesHeadline: 'Tree Services',
    aboutHeadline: 'Your Tree Care Experts',
    whyUsHeadline: 'Why Choose Us',
    ctaText: 'Get Free Quote',
    ctaSecondaryText: 'Emergency Service',
  },
  'gutter-cleaning': {
    heroHeadline: 'Protect Your Home',
    heroSubheadline: 'Professional gutter cleaning and maintenance to prevent water damage and foundation issues.',
    servicesHeadline: 'Gutter Services',
    aboutHeadline: 'Your Gutter Experts',
    whyUsHeadline: 'Why Choose Us',
    ctaText: 'Get Free Quote',
    ctaSecondaryText: 'Call Now',
  },
  'solar': {
    heroHeadline: 'Power Your Home with Solar',
    heroSubheadline: 'Professional solar installation to reduce energy bills and your carbon footprint. Financing available.',
    servicesHeadline: 'Solar Services',
    aboutHeadline: 'Your Solar Experts',
    whyUsHeadline: 'Why Go Solar',
    ctaText: 'Free Assessment',
    ctaSecondaryText: 'Call Now',
  },
  'flooring': {
    heroHeadline: 'Beautiful Floors, Expertly Installed',
    heroSubheadline: 'Professional flooring installation for hardwood, tile, vinyl, and carpet. Transform your space.',
    servicesHeadline: 'Flooring Services',
    aboutHeadline: 'Your Flooring Experts',
    whyUsHeadline: 'Why Choose Us',
    ctaText: 'Free Estimate',
    ctaSecondaryText: 'Call Now',
  },
  'general-contractor': {
    heroHeadline: 'Build Your Dream Home',
    heroSubheadline: 'Full-service general contracting for renovations, additions, and new construction. Licensed and insured.',
    servicesHeadline: 'Our Services',
    aboutHeadline: 'Your Building Partner',
    whyUsHeadline: 'Why Choose Us',
    ctaText: 'Free Consultation',
    ctaSecondaryText: 'Call Now',
  },
}

// ============================================================================
// NICHE-SPECIFIC STOCK IMAGES (Unsplash)
// ============================================================================

export interface NicheImages {
  hero: string
  services: string[]
  gallery: string[]
  about: string
}

export const NICHE_STOCK_IMAGES: Record<BusinessNiche, NicheImages> = {
  'cleaning': {
    hero: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80',
    services: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&q=80',
      'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
      'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&q=80',
    ],
    about: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
  },
  'landscaping': {
    hero: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1920&q=80',
    services: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1598902108854-10e335adac99?w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    ],
    about: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=800&q=80',
  },
  'roofing': {
    hero: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?w=1920&q=80',
    services: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    ],
    gallery: [],
    about: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  },
  'plumbing': {
    hero: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1920&q=80',
    services: [],
    gallery: [],
    about: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
  },
  'hvac': {
    hero: 'https://images.unsplash.com/photo-1631545806609-e9a2c8e4a0e2?w=1920&q=80',
    services: [],
    gallery: [],
    about: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
  },
  'auto-detailing': {
    hero: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=1920&q=80',
    services: [
      'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&q=80',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    ],
    about: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80',
  },
  'painting': {
    hero: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1920&q=80',
    services: [],
    gallery: [],
    about: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80',
  },
  'moving': {
    hero: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=1920&q=80',
    services: [],
    gallery: [],
    about: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80',
  },
  'pest-control': {
    hero: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
    services: [],
    gallery: [],
    about: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  'pool-service': {
    hero: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1920&q=80',
    services: [],
    gallery: [
      'https://images.unsplash.com/photo-1572331165267-854da2b021aa?w=800&q=80',
    ],
    about: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
  },
  'electrical': {
    hero: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1920&q=80',
    services: [],
    gallery: [],
    about: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  'handyman': {
    hero: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80',
    services: [],
    gallery: [],
    about: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  },
  'pressure-washing': {
    hero: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    services: [],
    gallery: [],
    about: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  'window-cleaning': {
    hero: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=1920&q=80',
    services: [],
    gallery: [],
    about: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  'carpet-cleaning': {
    hero: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=1920&q=80',
    services: [],
    gallery: [],
    about: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  'junk-removal': {
    hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    services: [],
    gallery: [],
    about: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  'locksmith': {
    hero: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    services: [],
    gallery: [],
    about: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  'garage-door': {
    hero: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=1920&q=80',
    services: [],
    gallery: [],
    about: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  'concrete': {
    hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    services: [],
    gallery: [],
    about: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  },
  'fencing': {
    hero: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=1920&q=80',
    services: [],
    gallery: [],
    about: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  'tree-service': {
    hero: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80',
    services: [],
    gallery: [],
    about: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  'gutter-cleaning': {
    hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    services: [],
    gallery: [],
    about: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  'solar': {
    hero: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80',
    services: [
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80',
    ],
    gallery: [],
    about: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  'flooring': {
    hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    services: [],
    gallery: [],
    about: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  'general-contractor': {
    hero: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80',
    services: [],
    gallery: [],
    about: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
}

// ============================================================================
// NICHE-SPECIFIC TRUST BADGES
// ============================================================================

export const NICHE_TRUST_BADGES: Record<BusinessNiche, TrustBadge[]> = {
  'cleaning': [
    { icon: '⚡', label: 'Fast Response', description: 'Quick turnaround times' },
    { icon: '✓', label: 'Vetted Cleaners', description: 'Background checked' },
    { icon: '⭐', label: 'Top Rated', description: '5-star service' },
    { icon: '🛡️', label: 'Insured', description: 'Fully protected' },
  ],
  'landscaping': [
    { icon: '🌿', label: 'Eco-Friendly', description: 'Sustainable practices' },
    { icon: '✓', label: 'Licensed', description: 'Fully certified' },
    { icon: '⭐', label: 'Award Winning', description: 'Top-rated service' },
    { icon: '🛡️', label: 'Insured', description: 'Fully protected' },
  ],
  'roofing': [
    { icon: '🏆', label: 'Certified', description: 'Factory trained' },
    { icon: '✓', label: 'Licensed', description: 'State licensed' },
    { icon: '📋', label: 'Warranty', description: 'Work guaranteed' },
    { icon: '🛡️', label: 'Insured', description: '$2M coverage' },
  ],
  'plumbing': [
    { icon: '⚡', label: '24/7 Service', description: 'Always available' },
    { icon: '✓', label: 'Licensed', description: 'Master plumbers' },
    { icon: '💰', label: 'Fair Pricing', description: 'No hidden fees' },
    { icon: '🛡️', label: 'Insured', description: 'Fully protected' },
  ],
  'hvac': [
    { icon: '❄️', label: 'EPA Certified', description: 'Refrigerant certified' },
    { icon: '✓', label: 'NATE Certified', description: 'Industry certified' },
    { icon: '💰', label: 'Financing', description: 'Easy payments' },
    { icon: '🛡️', label: 'Warranty', description: 'Parts & labor' },
  ],
  'auto-detailing': [
    { icon: '✨', label: 'Premium Products', description: 'Top-tier supplies' },
    { icon: '🚗', label: 'Mobile Service', description: 'We come to you' },
    { icon: '⭐', label: '5-Star Rated', description: 'Top reviews' },
    { icon: '🛡️', label: 'Insured', description: 'Your car protected' },
  ],
  'painting': [
    { icon: '🎨', label: 'Color Expert', description: 'Free consultation' },
    { icon: '✓', label: 'Licensed', description: 'Fully certified' },
    { icon: '📋', label: 'Warranty', description: '5-year guarantee' },
    { icon: '🛡️', label: 'Insured', description: 'Fully protected' },
  ],
  'moving': [
    { icon: '📦', label: 'Careful Handling', description: 'White glove service' },
    { icon: '✓', label: 'Licensed', description: 'DOT registered' },
    { icon: '💰', label: 'Fair Pricing', description: 'No hidden fees' },
    { icon: '🛡️', label: 'Insured', description: 'Full coverage' },
  ],
  'pest-control': [
    { icon: '🌿', label: 'Eco-Safe', description: 'Pet & child safe' },
    { icon: '✓', label: 'Licensed', description: 'State certified' },
    { icon: '📋', label: 'Guaranteed', description: 'Results or free' },
    { icon: '🛡️', label: 'Insured', description: 'Fully protected' },
  ],
  'pool-service': [
    { icon: '💧', label: 'CPO Certified', description: 'Pool operators' },
    { icon: '✓', label: 'Licensed', description: 'State certified' },
    { icon: '📋', label: 'Guaranteed', description: 'Clear water promise' },
    { icon: '🛡️', label: 'Insured', description: 'Fully protected' },
  ],
  'electrical': [
    { icon: '⚡', label: '24/7 Service', description: 'Emergency available' },
    { icon: '✓', label: 'Licensed', description: 'Master electricians' },
    { icon: '📋', label: 'Code Compliant', description: 'Up to code' },
    { icon: '🛡️', label: 'Insured', description: 'Fully protected' },
  ],
  'handyman': [
    { icon: '🔧', label: 'Multi-Skilled', description: 'One call does it all' },
    { icon: '✓', label: 'Background Checked', description: 'Vetted pros' },
    { icon: '💰', label: 'Fair Pricing', description: 'No surprises' },
    { icon: '🛡️', label: 'Insured', description: 'Fully protected' },
  ],
  'pressure-washing': [
    { icon: '💧', label: 'Soft Wash Safe', description: 'Surface safe' },
    { icon: '✓', label: 'Licensed', description: 'Fully certified' },
    { icon: '🌿', label: 'Eco-Friendly', description: 'Safe solutions' },
    { icon: '🛡️', label: 'Insured', description: 'Property protected' },
  ],
  'window-cleaning': [
    { icon: '✨', label: 'Streak-Free', description: 'Perfect results' },
    { icon: '✓', label: 'Insured', description: 'Fully covered' },
    { icon: '🏢', label: 'High-Rise', description: 'Any height' },
    { icon: '⭐', label: 'Top Rated', description: '5-star service' },
  ],
  'carpet-cleaning': [
    { icon: '🌿', label: 'Green Clean', description: 'Safe products' },
    { icon: '⚡', label: 'Fast Dry', description: '2-4 hours' },
    { icon: '✓', label: 'IICRC Certified', description: 'Industry certified' },
    { icon: '📋', label: 'Guaranteed', description: 'Satisfaction promise' },
  ],
  'junk-removal': [
    { icon: '♻️', label: 'Eco-Friendly', description: 'We recycle' },
    { icon: '⚡', label: 'Same Day', description: 'Fast service' },
    { icon: '💪', label: 'We Lift', description: 'No effort for you' },
    { icon: '💰', label: 'Upfront Pricing', description: 'No surprises' },
  ],
  'locksmith': [
    { icon: '⚡', label: '15 Min Response', description: 'Fast arrival' },
    { icon: '✓', label: 'Licensed', description: 'State certified' },
    { icon: '🔐', label: 'All Locks', description: 'Any type' },
    { icon: '🛡️', label: 'Insured', description: 'Fully protected' },
  ],
  'garage-door': [
    { icon: '⚡', label: 'Same Day', description: 'Fast service' },
    { icon: '✓', label: 'Licensed', description: 'Certified techs' },
    { icon: '📋', label: 'Warranty', description: 'Parts & labor' },
    { icon: '🛡️', label: 'Insured', description: 'Fully protected' },
  ],
  'concrete': [
    { icon: '💪', label: 'Built to Last', description: 'Quality materials' },
    { icon: '✓', label: 'Licensed', description: 'State certified' },
    { icon: '📋', label: 'Warranty', description: 'Work guaranteed' },
    { icon: '🛡️', label: 'Insured', description: 'Fully protected' },
  ],
  'fencing': [
    { icon: '📏', label: 'Free Estimate', description: 'No obligation' },
    { icon: '✓', label: 'Licensed', description: 'Fully certified' },
    { icon: '📋', label: 'Warranty', description: 'Materials covered' },
    { icon: '🛡️', label: 'Insured', description: 'Fully protected' },
  ],
  'tree-service': [
    { icon: '🌳', label: 'Certified Arborist', description: 'Tree experts' },
    { icon: '⚡', label: 'Emergency 24/7', description: 'Storm response' },
    { icon: '♻️', label: 'Eco-Friendly', description: 'We recycle' },
    { icon: '🛡️', label: '$2M Insured', description: 'Full coverage' },
  ],
  'gutter-cleaning': [
    { icon: '🏠', label: 'Protect Your Home', description: 'Prevent damage' },
    { icon: '✓', label: 'Insured', description: 'Fully covered' },
    { icon: '📸', label: 'Photo Report', description: 'Before & after' },
    { icon: '⭐', label: 'Top Rated', description: '5-star service' },
  ],
  'solar': [
    { icon: '☀️', label: 'NABCEP Certified', description: 'Industry certified' },
    { icon: '💰', label: '$0 Down', description: 'Financing available' },
    { icon: '📋', label: '25-Year Warranty', description: 'Long-term coverage' },
    { icon: '🌿', label: 'Clean Energy', description: 'Reduce carbon' },
  ],
  'flooring': [
    { icon: '📏', label: 'Free Measure', description: 'No obligation' },
    { icon: '✓', label: 'Licensed', description: 'Certified installers' },
    { icon: '📋', label: 'Warranty', description: 'Installation covered' },
    { icon: '🛡️', label: 'Insured', description: 'Fully protected' },
  ],
  'general-contractor': [
    { icon: '📋', label: 'Licensed', description: 'State certified' },
    { icon: '🏆', label: 'Award Winning', description: 'Top builder' },
    { icon: '💰', label: 'Financing', description: 'Easy payments' },
    { icon: '🛡️', label: 'Insured', description: '$2M coverage' },
  ],
}

// ============================================================================
// NICHE-SPECIFIC COLOR PALETTES
// ============================================================================

export interface ColorPalette {
  primary: string
  accent: string
  name: string
}

export const NICHE_COLOR_PALETTES: Record<BusinessNiche, ColorPalette[]> = {
  'cleaning': [
    { primary: '#0EA5E9', accent: '#10B981', name: 'Fresh & Clean' },
    { primary: '#3B82F6', accent: '#8B5CF6', name: 'Modern Blue' },
    { primary: '#14B8A6', accent: '#F59E0B', name: 'Teal Energy' },
  ],
  'landscaping': [
    { primary: '#22C55E', accent: '#84CC16', name: 'Natural Green' },
    { primary: '#16A34A', accent: '#EAB308', name: 'Garden Fresh' },
    { primary: '#65A30D', accent: '#0D9488', name: 'Earth Tones' },
  ],
  'roofing': [
    { primary: '#1E40AF', accent: '#DC2626', name: 'Professional Blue' },
    { primary: '#374151', accent: '#F59E0B', name: 'Slate & Gold' },
    { primary: '#7C3AED', accent: '#EC4899', name: 'Modern Purple' },
  ],
  'plumbing': [
    { primary: '#0284C7', accent: '#22C55E', name: 'Water Blue' },
    { primary: '#1D4ED8', accent: '#F97316', name: 'Trust Blue' },
    { primary: '#0891B2', accent: '#A855F7', name: 'Aqua Pro' },
  ],
  'hvac': [
    { primary: '#0369A1', accent: '#DC2626', name: 'Cool & Warm' },
    { primary: '#1E3A8A', accent: '#F59E0B', name: 'Comfort Blue' },
    { primary: '#0F766E', accent: '#F43F5E', name: 'Climate Control' },
  ],
  'auto-detailing': [
    { primary: '#0F172A', accent: '#EAB308', name: 'Luxury Dark' },
    { primary: '#1E293B', accent: '#F43F5E', name: 'Premium Slate' },
    { primary: '#18181B', accent: '#22D3EE', name: 'Midnight Shine' },
  ],
  'painting': [
    { primary: '#7C3AED', accent: '#EC4899', name: 'Creative Purple' },
    { primary: '#2563EB', accent: '#F59E0B', name: 'Artistic Blue' },
    { primary: '#DC2626', accent: '#1D4ED8', name: 'Bold Red' },
  ],
  'moving': [
    { primary: '#EA580C', accent: '#0284C7', name: 'Moving Orange' },
    { primary: '#0369A1', accent: '#22C55E', name: 'Reliable Blue' },
    { primary: '#7C3AED', accent: '#F59E0B', name: 'Modern Move' },
  ],
  'pest-control': [
    { primary: '#16A34A', accent: '#0284C7', name: 'Safe Green' },
    { primary: '#0891B2', accent: '#22C55E', name: 'Protection Teal' },
    { primary: '#1D4ED8', accent: '#84CC16', name: 'Shield Blue' },
  ],
  'pool-service': [
    { primary: '#0EA5E9', accent: '#14B8A6', name: 'Pool Blue' },
    { primary: '#0284C7', accent: '#22D3EE', name: 'Crystal Water' },
    { primary: '#0891B2', accent: '#F59E0B', name: 'Tropical' },
  ],
  'electrical': [
    { primary: '#EAB308', accent: '#1D4ED8', name: 'Electric Yellow' },
    { primary: '#0369A1', accent: '#F59E0B', name: 'Power Blue' },
    { primary: '#DC2626', accent: '#1E3A8A', name: 'High Voltage' },
  ],
  'handyman': [
    { primary: '#F59E0B', accent: '#0284C7', name: 'Handy Orange' },
    { primary: '#0369A1', accent: '#22C55E', name: 'Reliable Blue' },
    { primary: '#DC2626', accent: '#1D4ED8', name: 'Tool Red' },
  ],
  'pressure-washing': [
    { primary: '#0284C7', accent: '#22C55E', name: 'Clean Blue' },
    { primary: '#0891B2', accent: '#F59E0B', name: 'Power Wash' },
    { primary: '#1D4ED8', accent: '#14B8A6', name: 'Fresh Spray' },
  ],
  'window-cleaning': [
    { primary: '#0EA5E9', accent: '#22D3EE', name: 'Crystal Clear' },
    { primary: '#0284C7', accent: '#F59E0B', name: 'Sunshine Blue' },
    { primary: '#0891B2', accent: '#84CC16', name: 'Fresh View' },
  ],
  'carpet-cleaning': [
    { primary: '#7C3AED', accent: '#22C55E', name: 'Deep Clean Purple' },
    { primary: '#0284C7', accent: '#F59E0B', name: 'Fresh Blue' },
    { primary: '#0891B2', accent: '#EC4899', name: 'Modern Teal' },
  ],
  'junk-removal': [
    { primary: '#22C55E', accent: '#0284C7', name: 'Eco Green' },
    { primary: '#F59E0B', accent: '#1D4ED8', name: 'Clear Out' },
    { primary: '#0891B2', accent: '#84CC16', name: 'Fresh Start' },
  ],
  'locksmith': [
    { primary: '#1E3A8A', accent: '#EAB308', name: 'Secure Blue' },
    { primary: '#374151', accent: '#F59E0B', name: 'Key Gold' },
    { primary: '#0F172A', accent: '#22D3EE', name: 'Night Security' },
  ],
  'garage-door': [
    { primary: '#374151', accent: '#F59E0B', name: 'Steel & Gold' },
    { primary: '#1D4ED8', accent: '#22C55E', name: 'Reliable Blue' },
    { primary: '#0F172A', accent: '#EAB308', name: 'Premium Dark' },
  ],
  'concrete': [
    { primary: '#374151', accent: '#F59E0B', name: 'Solid Gray' },
    { primary: '#1E3A8A', accent: '#22C55E', name: 'Foundation Blue' },
    { primary: '#0F172A', accent: '#0EA5E9', name: 'Modern Slate' },
  ],
  'fencing': [
    { primary: '#16A34A', accent: '#78350F', name: 'Natural Wood' },
    { primary: '#374151', accent: '#22C55E', name: 'Modern Gray' },
    { primary: '#1D4ED8', accent: '#F59E0B', name: 'Trust Blue' },
  ],
  'tree-service': [
    { primary: '#16A34A', accent: '#78350F', name: 'Forest Green' },
    { primary: '#065F46', accent: '#F59E0B', name: 'Deep Woods' },
    { primary: '#22C55E', accent: '#0284C7', name: 'Fresh Leaf' },
  ],
  'gutter-cleaning': [
    { primary: '#0284C7', accent: '#22C55E', name: 'Flow Blue' },
    { primary: '#374151', accent: '#0EA5E9', name: 'Gutter Gray' },
    { primary: '#0891B2', accent: '#F59E0B', name: 'Clean Teal' },
  ],
  'solar': [
    { primary: '#F59E0B', accent: '#22C55E', name: 'Solar Gold' },
    { primary: '#0284C7', accent: '#EAB308', name: 'Sky & Sun' },
    { primary: '#16A34A', accent: '#F59E0B', name: 'Green Energy' },
  ],
  'flooring': [
    { primary: '#78350F', accent: '#F59E0B', name: 'Hardwood' },
    { primary: '#374151', accent: '#0EA5E9', name: 'Modern Slate' },
    { primary: '#1D4ED8', accent: '#22C55E', name: 'Trust Blue' },
  ],
  'general-contractor': [
    { primary: '#1E3A8A', accent: '#F59E0B', name: 'Builder Blue' },
    { primary: '#374151', accent: '#22C55E', name: 'Professional Gray' },
    { primary: '#0F172A', accent: '#EAB308', name: 'Premium Dark' },
  ],
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get default services for a niche
 */
export function getDefaultServices(niche: BusinessNiche): ServiceItem[] {
  return NICHE_SERVICES[niche] || NICHE_SERVICES['cleaning']
}

/**
 * Get default content for a niche
 */
export function getDefaultContent(niche: BusinessNiche): NicheContent {
  return NICHE_CONTENT[niche] || NICHE_CONTENT['cleaning']
}

/**
 * Get default images for a niche
 */
const FALLBACK_IMAGES: NicheImages = {
  hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
  services: [
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  ],
  gallery: [
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80',
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80',
    'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  ],
  about: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
}

export function getDefaultImages(niche: BusinessNiche): NicheImages {
  const nicheImages = NICHE_STOCK_IMAGES[niche] || NICHE_STOCK_IMAGES['cleaning']
  return {
    hero: nicheImages.hero || FALLBACK_IMAGES.hero,
    services: nicheImages.services?.length ? nicheImages.services : FALLBACK_IMAGES.services,
    gallery: nicheImages.gallery?.length ? nicheImages.gallery : FALLBACK_IMAGES.gallery,
    about: nicheImages.about || FALLBACK_IMAGES.about,
  }
}

/**
 * Get default trust badges for a niche
 */
export function getDefaultTrustBadges(niche: BusinessNiche): TrustBadge[] {
  return NICHE_TRUST_BADGES[niche] || NICHE_TRUST_BADGES['cleaning']
}

/**
 * Get color palettes for a niche
 */
export function getColorPalettes(niche: BusinessNiche): ColorPalette[] {
  return NICHE_COLOR_PALETTES[niche] || NICHE_COLOR_PALETTES['cleaning']
}

/**
 * Get display name for a niche
 */
export function getNicheDisplayName(niche: BusinessNiche): string {
  return NICHE_DISPLAY_NAMES[niche] || 'Service Business'
}


