import { createClient } from '@supabase/supabase-js';
import { cookingProjects as fallbackProjects } from '../data/cookingData';

const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 
  '';

const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-ref')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;


/**
 * Fetch projects from Supabase database `cooking_projects`.
 * Falls back to local `cookingData.js` if Supabase is not configured or errors occur.
 */
export async function getProjects() {
  if (!isSupabaseConfigured || !supabase) {
    console.log('[Supabase] Client not configured. Using fallback local data.');
    return fallbackProjects;
  }

  try {
    const { data, error } = await supabase
      .from('cooking_projects')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.warn('[Supabase] Error fetching projects, using fallback data:', error.message);
      return fallbackProjects;
    }

    if (!data || data.length === 0) {
      console.log('[Supabase] No items in DB yet. Returning local fallback projects.');
      return fallbackProjects;
    }

    return data;
  } catch (err) {
    console.error('[Supabase] Unexpected error:', err);
    return fallbackProjects;
  }
}

/**
 * Upload image to Supabase Storage bucket 'dishes'
 */
export async function uploadDishImage(file) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase URL & Anon Key belum diatur di file .env');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = fileName;

  const { error: uploadError } = await supabase.storage
    .from('dishes')
    .upload(filePath, file, { cacheControl: '3600', upsert: true });


  if (uploadError) {
    console.error('Supabase Storage Error:', uploadError);
    throw new Error(`Upload gambar gagal: ${uploadError.message || 'Izin RLS Storage belum diatur atau bucket bermasalah.'}`);
  }


  const { data } = supabase.storage.from('dishes').getPublicUrl(filePath);
  return data.publicUrl;
}

/**
 * Insert a new project row to Supabase
 */
export async function addProject(projectData, imageFile) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase belum dikonfigurasi!');
  }

  let imageUrl = projectData.image || '';

  if (imageFile) {
    imageUrl = await uploadDishImage(imageFile);
  }

  const newRow = {
    title: projectData.title,
    category: projectData.category || 'Pastry',
    emoji: projectData.emoji || '🍳',
    description: projectData.description || '',
    tags: Array.isArray(projectData.tags) ? projectData.tags : (projectData.tags || '').split(',').map(t => t.trim()).filter(Boolean),
    date: projectData.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    image: imageUrl
  };

  const { data, error } = await supabase
    .from('cooking_projects')
    .insert([newRow])
    .select();

  if (error) {
    throw new Error(`Gagal menyimpan data: ${error.message}`);
  }

  return data[0];
}

/**
 * Delete a project from Supabase
 */
export async function deleteProject(id) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase belum dikonfigurasi!');
  }

  const { error } = await supabase
    .from('cooking_projects')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Gagal menghapus data: ${error.message}`);
  }

  return true;
}

/**
 * Login Admin
 */
export async function loginAdmin(email, password) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase belum dikonfigurasi di .env!');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Logout Admin
 */
export async function logoutAdmin() {
  if (supabase) {
    await supabase.auth.signOut();
  }
}

/**
 * Get active user session
 */
export async function getAdminUser() {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
}
