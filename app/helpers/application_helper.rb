module ApplicationHelper

  def title(page_title)
    content_for(:title){ [page_title, '直达客'].join('-')}
    return page_title
  end
  def meta_keywords(meta_keywords)
    content_for(:meta_keywords){ [meta_keywords, '网店，微店建设，O2O营销，企业网站建设，微信公共号开发，百度直达号开发，适配网站建设'].join(',')}
  end
  def meta_description(meta_description)
    content_for(:meta_description){ [meta_description, '直达客平台为企业提供O2O全网营销解决方案，五个产品入口，八大营销模式；直达你的客户，移动你的生意！'].join(',')}
  end

  def get_date(date)
    return if date.blank?
    date.strftime("%Y-%m-%d")
  end

end
