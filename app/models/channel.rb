class Channel < ActiveRecord::Base
  self.table_name = 'admin_channels'

  has_many :pages, dependent: :destroy
  has_many :children, class_name: "Channel",
                          foreign_key: "parent_id",
                          dependent: :destroy
  belongs_to :parent, class_name: "Channel"

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
        the_content = content.gsub(/src="(\/ckeditor_assets\/pictures\/\d+\/)/, 'class="image fit max800" src="http://admin.zhidak.com/\1')
        the_content = the_content.gsub(/<h3>/i, '<h3><i class="fa fa-dot-circle-o fa-lg"></i> ')
      rescue => ex
        logger.error 'page parser: ' + ex.message
        '页面解析有错'
      end
    else
      '没有任何内容'
    end
  end

end
