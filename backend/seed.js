const mongoose = require('mongoose');
const User = require('./models/User');
const BlogPost = require('./models/BlogPost');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const seedData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Find or create admin user
    let admin = await User.findOne({ username: 'abiggj' });
    if (!admin) {
      console.log('Admin user abiggj not found. Creating one...');
      admin = new User({
        username: 'abiggj',
        email: 'aniket.jhariya@gmail.com',
        password: 'planner07',
        role: 'admin'
      });
      await admin.save();
      console.log('✅ Created admin user abiggj');
    } else {
      // Re-save admin user to ensure its password is encrypted correctly after fixing double-hash bug
      admin.password = 'planner07';
      await admin.save();
      console.log('✅ Updated admin user abiggj password encryption');
    }

    // Clear existing blog posts
    await BlogPost.deleteMany({});
    console.log('🧹 Cleared existing blog posts');

    const samplePosts = [
      {
        title: 'Mastering CI/CD Pipelines: A DevOps Guide',
        content: '<p>Continuous Integration and Continuous Deployment (CI/CD) form the backbone of modern DevOps methodologies. In this guide, we dive into how to build a scalable pipeline utilizing AWS CodeBuild, Docker containerization, and ECS Fargate. We will walk through configuring automatic triggers, managing build secrets securely, and orchestrating zero-downtime blue-green deployments.</p>',
        category: 'DevOps',
        tags: ['CI/CD', 'AWS', 'Docker', 'Automation'],
        status: 'published',
        author: admin._id,
        excerpt: 'Continuous Integration and Continuous Deployment (CI/CD) form the backbone of modern DevOps methodologies.',
        featuredImage: {
          url: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871',
          alt: 'CI/CD pipeline representation',
          caption: 'Automated CI/CD workflows'
        }
      },
      {
        title: 'Moving to Go: Why We Chose Golang for High-Concurrency Microservices',
        content: '<p>When building the backend services for our pet social media application, Pawwp, concurrency and lightweight footprints were crucial requirements. Golang provided the perfect ecosystem with its native goroutines and channel primitives. This article details the gorilla/mux routing system, integrating MongoDB, and achieving ultra-low CPU utilization in production compared to Node.js/Python frameworks.</p>',
        category: 'Golang',
        tags: ['Go', 'Microservices', 'Concurrency', 'Backend'],
        status: 'published',
        author: admin._id,
        excerpt: 'When building the backend services for our pet social media application, Pawwp, concurrency and lightweight footprints were crucial.',
        featuredImage: {
          url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
          alt: 'Golang development',
          caption: 'Go development patterns'
        }
      },
      {
        title: 'Deep Dive: Deploying Deep Learning GAN Models in Production',
        content: '<p>Generative Adversarial Networks (GANs) produce stunning results, but hosting them in real-time, high-traffic API environments presents significant scalability challenges. In this post, we discuss orchestrating predictive GAN workloads on AWS Batch, using S3 payloads, and building responsive inference queues. We cover GPU memory optimization and pipeline caching patterns.</p>',
        category: 'AI & ML',
        tags: ['GAN', 'Machine Learning', 'AWS Batch', 'Model Deployment'],
        status: 'published',
        author: admin._id,
        excerpt: 'Generative Adversarial Networks (GANs) produce stunning results, but hosting them in real-time inference environments presents challenges.',
        featuredImage: {
          url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a',
          alt: 'Artificial intelligence nodes',
          caption: 'Deep learning inference pipelines'
        }
      }
    ];

    for (const post of samplePosts) {
      const blogPost = new BlogPost(post);
      await blogPost.save();
    }
    console.log('✅ Seeded 3 sample blog posts successfully!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

seedData();
