/**
 * Predefined default content for business templates
 * Works across all niches with niche-specific overrides
 */

import type { BusinessNiche } from './types'
import { NICHE_TRUST_BADGES, NICHE_SERVICES, NICHE_CONTENT } from './niche-defaults'

// ============================================================================
// UNIVERSAL DEFAULTS (work for any niche)
// ============================================================================

export const DEFAULT_CLEANING_CONTENT = {
  // Services with descriptions (legacy support)
  serviceDescriptions: {
    'Residential Cleaning': 'Thorough cleaning of homes, apartments, and living spaces',
    'Commercial Cleaning': 'Professional office and business space cleaning',
    'Deep Cleaning': 'Intensive deep cleaning for move-ins, move-outs, or special occasions',
    'Move-in/Move-out Cleaning': 'Complete cleaning service for relocations',
    'Post-Construction Cleaning': 'Cleanup after construction or renovation projects',
    'Window Cleaning': 'Interior and exterior window cleaning services',
    'Carpet Cleaning': 'Professional carpet and upholstery cleaning',
    'Office Cleaning': 'Regular maintenance cleaning for office spaces',
    'Kitchen Cleaning': 'Deep kitchen and appliance cleaning',
    'Bathroom Cleaning': 'Sanitized and spotless bathroom cleaning',
  },

  // Why Us points (will be personalized)
  whyUsPoints: [
    'Experienced & Trusted Team',
    'Eco-Friendly Products',
    '100% Satisfaction Guarantee',
    'Flexible Scheduling',
    'Fully Insured & Bonded',
    'Same-Day Service Available',
  ],

  // Trust badges (default)
  trustBadges: [
    { label: 'Fast Response', icon: '⚡', description: 'Quick turnaround times' },
    { label: 'Vetted Pros', icon: '✓', description: 'Background checked professionals' },
    { label: 'Top Rated', icon: '⭐', description: 'Your satisfaction is our priority' },
    { label: 'Insured', icon: '🛡️', description: 'Fully protected service' },
  ],

  // Navigation items for full website
  navItems: [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Areas', href: '#areas' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ],

  // Footer sections
  footerLinks: {
    services: [
      { label: 'Residential Cleaning', href: '#' },
      { label: 'Commercial Cleaning', href: '#' },
      { label: 'Deep Cleaning', href: '#' },
      { label: 'Move-in/Move-out', href: '#' },
    ],
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Our Team', href: '#' },
      { label: 'Service Areas', href: '#areas' },
      { label: 'Contact', href: '#contact' },
    ],
  },
}

// ============================================================================
// NICHE-AWARE DEFAULT GETTERS
// ============================================================================

/**
 * Get trust badges for a specific niche
 */
export function getTrustBadges(niche: BusinessNiche = 'cleaning') {
  return NICHE_TRUST_BADGES[niche] || DEFAULT_CLEANING_CONTENT.trustBadges
}

/**
 * Get default services for a specific niche
 */
export function getServices(niche: BusinessNiche = 'cleaning') {
  return NICHE_SERVICES[niche] || NICHE_SERVICES['cleaning']
}

/**
 * Get content headlines for a specific niche
 */
export function getNicheHeadlines(niche: BusinessNiche = 'cleaning') {
  return NICHE_CONTENT[niche] || NICHE_CONTENT['cleaning']
}

/**
 * Get navigation items (universal for all niches)
 */
export function getNavItems() {
  return DEFAULT_CLEANING_CONTENT.navItems
}

/**
 * Get footer links (universal for all niches)
 */
export function getFooterLinks() {
  return DEFAULT_CLEANING_CONTENT.footerLinks
}

// ============================================================================
// STATS DEFAULTS
// ============================================================================

export const DEFAULT_STATS = {
  yearsExperience: 3,
  happyCustomers: 500,
  satisfactionRate: 98,
  projectsCompleted: 2500,
}

// ============================================================================
// ANIMATION PRESETS
// ============================================================================

export const ANIMATION_PRESETS = {
  // Stagger children animations
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  
  // Fade up animation
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  },
  
  // Scale in animation
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  },
  
  // Slide in from left
  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  },
  
  // Slide in from right
  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  },
}

// ============================================================================
// RESPONSIVE BREAKPOINTS
// ============================================================================

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

// ============================================================================
// SPACING PRESETS
// ============================================================================

export const SECTION_SPACING = {
  mobile: 'py-16',
  tablet: 'md:py-20',
  desktop: 'lg:py-28',
  full: 'py-16 md:py-20 lg:py-28',
}

export const CONTAINER_PADDING = {
  mobile: 'px-4',
  tablet: 'sm:px-6',
  desktop: 'lg:px-8',
  full: 'px-4 sm:px-6 lg:px-8',
}
