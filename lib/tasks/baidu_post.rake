# 将sitemap提交的百度站长数据
# http://zhanzhang.baidu.com/linksubmit/index?site=http%3A%2F%2Fwww.zhidak.com%2F
# 返回：
  # 字段  是否必选  参数类型  说明
  # success 是 int 成功推送的url条数
  # remain  是 int 当天剩余的可推送url条数
  # not_same_site 否 array 由于不是本站url而未处理的url列表
  # not_valid 否 array 不合法的url列表

require 'net/http'

namespace :sitemap do
  desc "post sitemap to baidu"
  task :baidu => :environment do
    urls = []
    urls << [ENV["HOST_NAME"], 'about'].join('/')
    urls << [ENV["HOST_NAME"], 'contact'].join('/')
    urls << [ENV["HOST_NAME"], 'price'].join('/')
    urls << [ENV["HOST_NAME"], 'case'].join('/')
    urls << [ENV["HOST_NAME"], 'portfolio'].join('/')
    Page.find_each do |post|
      urls << [ENV["HOST_NAME"], 'post', post.short_title].join('/')
    end
    uri = URI.parse('http://data.zz.baidu.com/urls?site=www.zhidak.com&token=oXMgA86lI6yDcx94')
    req = Net::HTTP::Post.new(uri.request_uri)
    req.body = urls.join("\n")
    req.content_type = 'text/plain'
    res = Net::HTTP.start(uri.hostname, uri.port) { |http| http.request(req) }
    puts res.body
  end
end
