require 'net/http'

urls = []
Page.find_each do |post|
  urls << post_path(post)
end
puts urls 
exit
#urls = ['http://www.example.com/1.html', 'http://www.example.com/2.html']
uri = URI.parse('http://data.zz.baidu.com/urls?site=www.zhidak.com&token=oXMgA86lI6yDcx94')
req = Net::HTTP::Post.new(uri.request_uri)
req.body = urls.join("\n")
req.content_type = 'text/plain'
res = Net::HTTP.start(uri.hostname, uri.port) { |http| http.request(req) }
puts res.body