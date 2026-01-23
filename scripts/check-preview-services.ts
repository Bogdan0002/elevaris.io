import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load .env.local explicitly
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing environment variables!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkPreview(slug: string) {
  console.log(`\n🔍 Checking preview: ${slug}\n`)
  
  const { data, error } = await supabase
    .from('client_previews')
    .select('slug, config')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('❌ Error:', error)
    return
  }

  if (!data) {
    console.error('❌ Preview not found!')
    return
  }

  console.log('📊 Business:', data.config?.business?.name)
  console.log('🎯 Niche:', data.config?.niche)
  console.log('📝 Services count:', data.config?.services?.length)
  console.log('\n🔧 Services:')
  
  if (Array.isArray(data.config?.services)) {
    data.config.services.forEach((service: any, i: number) => {
      const name = typeof service === 'string' ? service : service.name
      console.log(`  ${i + 1}. ${name}`)
    })
  } else {
    console.log('  ⚠️  Services is not an array:', typeof data.config?.services)
  }
}

// Get slug from command line or use default
const slug = process.argv[2] || 'a-a-gutters-llc'
checkPreview(slug)

