class HomeController < ApplicationController
  def index
    @posts = Page.recent(3, :channel => 'post')
    @cases = Page.recent(4, :channel => 'case')
    @about = Page.find_by(short_title: 'about')
    @about ||= Page.first
  end

  def posts
    @posts = Channel.find_by(short_title: 'post').pages.page(params[:page])
    @relative_posts = Page.limit(10)
  end

  def post
    @post = Page.find(params[:id])
    @post ||= Page.first
    @relative_posts = Page.limit(10)
  end

  def portfolio
    @posts = Channel.find_by(short_title: 'portfolio').pages.page(params[:page])
    @relative_posts = Page.limit(10)
  end

  def case
    @posts = Channel.find_by(short_title: 'case').pages.page(params[:page])
    @relative_posts = Page.limit(10)
  end

  def price
  end

  def contact
    @comment = Comment.new
  end

  def about
  end
end
