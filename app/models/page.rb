class Page < ActiveRecord::Base
  self.table_name = 'admin_pages'

  default_scope { order('updated_at DESC') }

  belongs_to :channel
  self.per_page = 24

  def get_image_path
    if image_path
      'http://admin.zhidak.com/' + image_path
    else
      '/assets/logo-1.png'
    end
  end

  def get_content
    if content
      begin
        content.gsub(/src="(\/ckeditor_assets\/pictures\/\d+\/)/, 'class="img-responsive" src="http://admin.zhidak.com/\1')
      rescue
        '页面解析有错'
      end
    else
      '没有任何内容'
    end
  end

  def short_description(count = 50)
    self.description.to_s.truncate(count)
  end
  
  def format_date
    self.updated_at.strftime("%Y-%m-%d") unless self.updated_at.nil?
  end

  def thumb_image_path
    self.image_path.sub(/content/, 'thumb')
  end

  # "H|C|F" => ['H', 'C', 'F']
  # 用于在_form.html.erb中初始化值
  def arr_properties
    properties.to_s.split('|')
  end

  #最近新闻
  #params: 
  # => typo = ['article', 'image', 'product']
  # => channel =[ channel.short_title, ]
  # => properties =[recommend, top, hot]
  #eg: Admin::Page.recent(12, :typo => 'product',  :rand => true)
  #    Admin::Page.recent(10, :channel => 'product-bed', :properties => '1')
  def self.recent(count = 10, options = {})
    queries     = []
    conditions  = []
    if options[:channel].present?
      queries     << 'admin_channels.short_title = ?'
      conditions  << options[:channel]
    end
    if options[:typo].present?
      queries     << 'admin_channels.typo = ?'
      conditions  << options[:typo]
    end
    if options[:properties].present?
      queries     << 'admin_pages.properties regexp ?'
      conditions  << options[:properties]
    end
    conditions.unshift(queries.join(' AND '))
    return Page.joins(:channel).where(conditions).order("updated_at DESC").limit(count)
  end

  #搜索
  def self.search(search)
    if search
      where('title LIKE ?', "%#{search}%")
    else
      all
    end
  end
end
