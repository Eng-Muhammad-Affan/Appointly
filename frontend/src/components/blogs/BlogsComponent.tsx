// BlogPostComponent.tsx - Individual Blog Post Page
import { useState, useEffect } from "react";
import { FaCalendar, FaUser, FaClock, FaTag, FaArrowLeft, FaShare, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import api from "@/lib/api";
import Header from "../user/Header";
import Footer from "../user/Footer";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  category: {
    name: string;
    slug: string;
  };
  tags: string[];
  readTime: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiErrorResponse {
  message: string;
}

const BlogPostComponent = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/blogs/${slug}`);
      const { data } = response.data as { data: { post: BlogPost; relatedPosts: BlogPost[] } };
      setPost(data.post);
      setRelatedPosts(data.relatedPosts || []);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        if (axiosError.response?.status === 404) {
          toast.error("Blog post not found");
          navigate("/blog");
        } else {
          toast.error(axiosError.response?.data?.message || "Failed to load blog post");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const shareUrl = window.location.href;
  const shareText = post?.title || "Check out this article";

  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8" />
            <div className="h-96 bg-gray-200 rounded-2xl mb-8" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-2xl mb-4">
            <FaTag className="h-10 w-10 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-blue-main hover:text-blue-700 font-medium"
          >
            <FaArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header /> 
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-main font-medium mb-8 transition-colors"
        >
          <FaArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-main text-sm font-medium rounded-lg">
              {post.category.name}
            </span>
            <span className="text-sm text-gray-500">{post.readTime} min read</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <img
                src={post.author.avatar || "/api/placeholder/48/48"}
                alt={post.author.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="flex items-center gap-2">
                  <FaUser className="h-3 w-3 text-gray-400" />
                  <span className="font-medium text-gray-900">{post.author.name}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <div className="flex items-center gap-1">
                    <FaCalendar className="h-3 w-3" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock className="h-3 w-3" />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 mr-2">Share:</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-200 transition-colors"
              >
                <FaFacebook className="h-4 w-4" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-100 text-blue-400 rounded-xl flex items-center justify-center hover:bg-blue-200 transition-colors"
              >
                <FaTwitter className="h-4 w-4" />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center hover:bg-blue-200 transition-colors"
              >
                <FaLinkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={post.featuredImage || "/api/placeholder/1200/600"}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex items-center gap-2 mb-12 pb-8 border-b border-gray-200">
            <FaTag className="h-4 w-4 text-gray-400" />
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Bio */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-12">
          <div className="flex items-start gap-4">
            <img
              src={post.author.avatar || "/api/placeholder/64/64"}
              alt={post.author.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {post.author.name}
              </h3>
              <p className="text-gray-600">
                {post.author.bio || "Author and contributor at our blog."}
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost._id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex">
                    <div className="w-1/3">
                      <img
                        src={relatedPost.featuredImage || "/api/placeholder/200/150"}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <span className="text-xs text-blue-main font-medium">
                        {relatedPost.category.name}
                      </span>
                      <h3 className="text-sm font-bold text-gray-900 mt-1 group-hover:text-blue-main transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <FaCalendar className="h-3 w-3" />
                        <span>{formatDate(relatedPost.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
      <Footer/>
    </>
  );
};

export default BlogPostComponent;