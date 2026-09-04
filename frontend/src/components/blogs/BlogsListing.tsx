// BlogListingComponent.tsx - Blog Listing Page with Demo Blogs
import { useState, useEffect } from "react";
import { 
  FaSearch, 
  FaCalendar, 
  FaUser, 
  FaClock, 
  FaArrowRight, 
  FaHeart, 
  FaComment,
  FaBookmark,
  FaRegBookmark,
  FaTag,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../user/Header";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  readTime: number;
  publishedDate: string;
  likes: number;
  comments: number;
  isFeatured?: boolean;
}

const BlogListingComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Demo blog posts
  const demoBlogs: BlogPost[] = [
    {
      id: "1",
      title: "The Future of Web Development: What to Expect in 2026",
      slug: "future-of-web-development-2026",
      excerpt: "Explore the cutting-edge technologies and trends that will shape the future of web development. From AI-powered development to new frameworks and tools.",
      featuredImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
      author: {
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      },
      category: "Technology",
      tags: ["Web Development", "AI", "Future Tech"],
      readTime: 8,
      publishedDate: "2026-05-28",
      likes: 245,
      comments: 32,
      isFeatured: true,
    },
    {
      id: "2",
      title: "Designing for Accessibility: A Complete Guide",
      slug: "designing-for-accessibility-guide",
      excerpt: "Learn how to create inclusive digital experiences that work for everyone. This comprehensive guide covers WCAG guidelines, best practices, and practical tips.",
      featuredImage: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=400&fit=crop",
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      },
      category: "Design",
      tags: ["Accessibility", "UX Design", "WCAG"],
      readTime: 12,
      publishedDate: "2026-05-25",
      likes: 189,
      comments: 24,
    },
    {
      id: "3",
      title: "Building Scalable Applications with Microservices",
      slug: "building-scalable-applications-microservices",
      excerpt: "Discover how microservices architecture can help you build more scalable and maintainable applications. Real-world examples and implementation strategies included.",
      featuredImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
      author: {
        name: "Marcus Rodriguez",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      },
      category: "Technology",
      tags: ["Microservices", "Architecture", "Scalability"],
      readTime: 15,
      publishedDate: "2026-05-22",
      likes: 312,
      comments: 45,
    },
  ];

  const categories = ["all", "Technology", "Design", "Business", "Lifestyle"];

  // Filter and search logic
  const filteredBlogs = demoBlogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory =
      selectedCategory === "all" || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const toggleSavePost = (postId: string) => {
    setSavedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
            <FaTag className="h-8 w-8 text-blue-main" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Blog
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            Insights, tutorials, and stories from the world of technology and design
          </p>
        </div>

        {/* Featured Post */}
        {selectedCategory === "all" && searchTerm === "" && currentPage === 1 && (
          <div className="mb-12">
            {demoBlogs
              .filter((blog) => blog.isFeatured)
              .map((featuredPost) => (
                <Link
                  key={featuredPost.id}
                  to={`/blog/${featuredPost.slug}`}
                  className="group relative block bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="relative h-64 lg:h-full overflow-hidden">
                      <img
                        src={featuredPost.featuredImage}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-lg shadow-lg">
                          Featured Post
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <span className="px-3 py-1 bg-blue-100 text-blue-main text-sm font-medium rounded-lg self-start mb-4">
                        {featuredPost.category}
                      </span>
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-main transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={featuredPost.author.avatar}
                            alt={featuredPost.author.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {featuredPost.author.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatDate(featuredPost.publishedDate)} · {featuredPost.readTime} min read
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-gray-500 text-sm">
                          <div className="flex items-center gap-1">
                            <FaHeart className="h-4 w-4" />
                            <span>{featuredPost.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaComment className="h-4 w-4" />
                            <span>{featuredPost.comments}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search articles..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-main focus:border-blue-main transition-all duration-200 outline-none bg-white hover:border-gray-400"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-blue-main text-white shadow-lg shadow-blue-main/25"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category === "all" ? "All Posts" : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-2xl mb-4">
              <FaSearch className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Card Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-main text-white text-xs font-medium rounded-lg shadow-lg">
                        {post.category}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSavePost(post.id);
                      }}
                      className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                    >
                      {savedPosts.includes(post.id) ? (
                        <FaBookmark className="h-4 w-4 text-blue-main" />
                      ) : (
                        <FaRegBookmark className="h-4 w-4 text-gray-600" />
                      )}
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <FaCalendar className="h-3 w-3" />
                        <span>{formatDate(post.publishedDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaClock className="h-3 w-3" />
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>

                    {/* Title */}
                    <Link to={`/blog/${post.slug}`}>
                      <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-main transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Author and Engagement */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {post.author.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-500 text-sm">
                        <div className="flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer">
                          <FaHeart className="h-3 w-3" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-blue-500 transition-colors cursor-pointer">
                          <FaComment className="h-3 w-3" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </div>

                    {/* Read More Link */}
                    <Link
                      to={`/blog/${post.slug}`}
                      className="mt-4 inline-flex items-center gap-1 text-blue-main font-medium text-sm hover:gap-2 transition-all group/link"
                    >
                      Read Article
                      <FaArrowRight className="h-3 w-3 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-12 mb-8">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <FaChevronLeft className="h-4 w-4" />
              </button>
              
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                    currentPage === page
                      ? "bg-blue-main text-white shadow-lg shadow-blue-main/25"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
                disabled={currentPage === 3}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <FaChevronRight className="h-4 w-4" />
              </button>
            </div>
          </>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 mt-8">
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
            <p className="text-3xl font-bold text-blue-main mb-1">150+</p>
            <p className="text-sm text-gray-600">Articles Published</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
            <p className="text-3xl font-bold text-blue-main mb-1">50k+</p>
            <p className="text-sm text-gray-600">Monthly Readers</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
            <p className="text-3xl font-bold text-blue-main mb-1">25+</p>
            <p className="text-sm text-gray-600">Expert Authors</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
            <p className="text-3xl font-bold text-blue-main mb-1">10k+</p>
            <p className="text-sm text-gray-600">Subscribers</p>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mb-12">
          <div className="bg-blue-main rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4 backdrop-blur-sm">
              <FaTag className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss an update. Get the latest articles delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-blue-main rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogListingComponent;