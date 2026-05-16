import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: '/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                projects: resolve(__dirname, 'projects.html'),
                skills: resolve(__dirname, 'skills.html'),
                speaking: resolve(__dirname, 'speaking.html'),
                blog: resolve(__dirname, 'blog.html'),
                contact: resolve(__dirname, 'contact.html'),
                education: resolve(__dirname, 'education.html'),
                'blog-compute-startup': resolve(__dirname, 'blog-compute-startup.html'),
                'blog-gke-orchestration': resolve(__dirname, 'blog-gke-orchestration.html'),
                'blog-k8s-terraform': resolve(__dirname, 'blog-k8s-terraform.html'),
                'blog-wordpress-gcp': resolve(__dirname, 'blog-wordpress-gcp.html'),
            }
        }
    }
})
