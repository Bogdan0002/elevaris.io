/**
 * Test script to verify preview system setup
 * Run with: npx tsx scripts/test-preview-system.ts
 * 
 * Make sure .env.local is set up first!
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { join } from 'path'

// Load environment variables
dotenv.config({ path: '.env.local' })

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

async function testPreviewSystem() {
  console.log('🧪 Testing Preview System Setup...\n')

  // Check environment variables
  console.log('1. Checking environment variables...')
  if (!SUPABASE_URL) {
    console.error('❌ SUPABASE_URL is missing')
    return
  }
  console.log('✅ SUPABASE_URL:', SUPABASE_URL)

  if (!SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ SUPABASE_SERVICE_ROLE_KEY is missing')
    return
  }
  console.log('✅ SUPABASE_SERVICE_ROLE_KEY: [HIDDEN]')

  // Test Supabase connection
  console.log('\n2. Testing Supabase connection...')
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

  try {
    // Check if table exists
    const { data, error } = await supabase
      .from('client_previews')
      .select('count')
      .limit(1)

    if (error) {
      if (error.code === '42P01') {
        console.error('❌ Table "client_previews" does not exist')
        console.error('   → Run the migration: supabase/migrations/001_client_previews.sql')
        return
      }
      throw error
    }

    console.log('✅ Table "client_previews" exists')
    console.log('✅ Supabase connection successful')
  } catch (error: any) {
    console.error('❌ Supabase connection failed:', error.message)
    return
  }

  // Test creating a preview
  console.log('\n3. Testing preview creation...')
  try {
    const testConfig = {
      slug: 'test-preview-' + Date.now(),
      niche: 'cleaning',
      templateId: 'cleaning-v1',
      business: {
        name: 'Test Cleaning Co',
        city: 'Test City',
        state: 'CA',
        phone: '+15551234567',
      },
      placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
      offer: {
        shortText: 'Test offer',
      },
      branding: {
        primaryColor: '#FF6A55',
        accentColor: '#7B63FF',
      },
      services: ['Residential Cleaning', 'Commercial Cleaning', 'Deep Cleaning', 'Move-in/Move-out'],
      areasServed: ['Test City', 'Test Area'],
    }

    const { data, error } = await supabase
      .from('client_previews')
      .insert({
        slug: testConfig.slug,
        niche: testConfig.niche,
        status: 'preview',
        config: testConfig,
      })
      .select()
      .single()

    if (error) throw error

    console.log('✅ Preview created successfully')
    console.log('   Slug:', data.slug)

    // Clean up test preview
    await supabase.from('client_previews').delete().eq('id', data.id)
    console.log('✅ Test preview cleaned up')
  } catch (error: any) {
    console.error('❌ Preview creation failed:', error.message)
    return
  }

  console.log('\n✅ All tests passed! Preview system is ready to use.')
}

testPreviewSystem().catch(console.error)

