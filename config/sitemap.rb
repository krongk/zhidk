# Set the host name for URL creation
SitemapGenerator::Sitemap.default_host = "http://www.zhidak.com"

SitemapGenerator::Sitemap.create do
  # Put links creation logic here.
  #
  # The root path '/' and sitemap index file are added automatically for you.
  # Links are added to the Sitemap in the order they are specified.
  #
  # Usage: add(path, options={})
  #        (default options are used if you don't specify)
  #
  # Defaults: :priority => 0.5, :changefreq => 'weekly',
  #           :lastmod => Time.now, :host => default_host
  #
  # Examples:
  #
  # Add '/articles'
  #
  add posts_path, :priority => 0.7, :changefreq => 'daily'
  add price_path, :priority => 0.7, :changefreq => 'daily'
  add contact_path, :priority => 0.7, :changefreq => 'daily'
  add about_path, :priority => 0.7, :changefreq => 'daily'
  add case_path, :priority => 0.7, :changefreq => 'daily'
  add portfolio_path, :priority => 0.7, :changefreq => 'daily'
  #
  # Add all articles:
  #
    Page.find_each do |post|
      add post_path(post), :lastmod => post.updated_at
    end
end
