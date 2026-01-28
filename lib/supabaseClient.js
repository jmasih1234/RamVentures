import { createClient } from '@supabase/supabase-js'

let _supabase = null

function getSupabase() {
	if (_supabase) return _supabase
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
	if (!supabaseUrl || !supabaseAnonKey) {
		// Do not throw here to allow builds to run; runtime code should check for null.
		return null
	}
	_supabase = createClient(supabaseUrl, supabaseAnonKey)
	return _supabase
}

// Export a small wrapper that lazily initializes the client when first used.
// Existing code imports the default export and calls methods like `supabase.from(...)`.
// To preserve that API we return a Proxy that forwards calls to the real client.
const supabaseProxy = new Proxy({}, {
	get(_, prop) {
		const client = getSupabase()
		if (!client) {
			throw new Error('Supabase client not initialized. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in the environment.')
		}
		const value = client[prop]
		// If the property is a function, bind it to the client
		if (typeof value === 'function') return value.bind(client)
		return value
	}
})

export default supabaseProxy
