class CommentsController < ApplicationController
  #before_action :set_comment, only: [:show, :edit, :update, :destroy]

  # GET /comments/new
  def new
    @comment = Comment.new
  end

  # POST /comments
  # POST /comments.json
  def create
    @comment = Comment.new(comment_params)

    respond_to do |format|
      if @comment.save
        if Rails.env == 'production' && filter_backlist(@comment)
          SmsSendWorker.perform_async(ENV['ADMIN_PHONE'].split('|').join(','), "【直达客】#{@comment.mobile_phone}留言：#{@comment.content.to_s.truncate(36)}")
        end
        format.html { redirect_to contact_path, notice: '信息提交成功，我们会尽快回复您的请求.' }
        format.json { render action: 'show', status: :created, location: @comment }
      else
        format.html { render action: 'new' }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def comment_params
      params.require(:comment).permit(:name, :mobile_phone, :email, :qq, :address, :content, :status)
    end

    def filter_backlist(cmt)
      return false if cmt.mobile_phone.blank? || cmt.content.blank?
      return false if cmt.mobile_phone !~ /^1\d{10}$/
      return false if cmt.content =~ /(http:|www)/i
      return true
    end
end
