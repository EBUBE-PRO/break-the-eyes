export interface User {
  id: number | string;
  username: string;
  email: string;
  role: 'admin' | 'editor';
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  status: 'draft' | 'published';
  views: number;
  created_at: string;
  updated_at: string;
  categories?: string[];
  category_ids?: number[];
}

export interface Lead {
  id: number;
  full_name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image_url: string;
  created_at: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
