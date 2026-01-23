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

async function listPreviews() {
  console.log('\n📋 All Previews in Database:\n')
  
  const { data, error } = await supabase
    .from('client_previews')
    .select('slug, config')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('❌ Error:', error)
    return
  }

  if (!data || data.length === 0) {
    console.log('❌ No previews found!')
    return
  }

  console.log(`Found ${data.length} previews:\n`)
  
  data.forEach((preview, i) => {
    const business = preview.config?.business?.name || 'Unknown'
    const niche = preview.config?.niche || '?'
    const serviceCount = preview.config?.services?.length || 0
    console.log(`${i + 1}. ${preview.slug}`)
    console.log(`   📊 ${business} | 🎯 ${niche} | 🔧 ${serviceCount} services`)
    console.log('')
  })
}

listPreviews()

