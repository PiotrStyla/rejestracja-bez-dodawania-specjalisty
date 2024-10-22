import { createAdminUser } from '../lib/supabase';

async function createAdmin() {
  const adminEmail = 'p.styla@gmail.com'; // Replace with the actual admin email
  const adminName = 'Admin User'; // Replace with the actual admin name

  try {
    await createAdminUser(adminEmail, adminName);
    console.log('Admin user created or updated successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

createAdmin();