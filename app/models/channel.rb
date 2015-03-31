class Channel < ActiveRecord::Base
  self.table_name = 'admin_channels'

  has_many :pages, dependent: :destroy
  has_many :children, class_name: "Admin::Channel",
                          foreign_key: "parent_id",
                          dependent: :destroy
  belongs_to :parent, class_name: "Admin::Channel"
end

