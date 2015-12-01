class HomeController < ApplicationController
  def index
    @portfolios = Page.recent(6, :channel => 'portfolio')
    @cases = Page.recent(6, :channel => 'case')
    @about = Page.find_by(short_title: 'about')
    @about ||= Page.first
    @posts = Page.recent(10, channel: 'post')
  end

  def posts
    @posts = Channel.find_by(short_title: 'post').pages.page(params[:page])
    @relative_posts = Page.limit(10)
  end

  def post
    @post = params[:id] =~ /^\d+$/ ? Page.find(params[:id]) : Page.find_by(short_title: params[:id])
    @post ||= Page.first
    @relative_posts = Page.limit(10)
  end

  def portfolio
    @posts = Channel.find_by(short_title: 'portfolio').pages.page(params[:page])
    @relative_posts = Page.limit(10)
  end

  def case
    @posts = Channel.find_by(short_title: 'case').pages.page(params[:page])
    # @relative_posts = Page.limit(10)
  end

  def price
  end

  def contact
    @comment = Comment.new
  end

  def about
  end
end
