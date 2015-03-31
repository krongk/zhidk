json.array!(@comments) do |comment|
  json.extract! comment, :id, :name, :mobile_phone, :email, :qq, :address, :content, :status
  json.url comment_url(comment, format: :json)
end
