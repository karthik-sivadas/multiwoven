# frozen_string_literal: true

module Profiles
  class UpdateProfile
    include Interactor

    def call
      if update_password || update_name
        context.message = "Profile updated successfully!"
      else
        context.fail!(errors: "Profile not updated")
      end
    end

    def update_password
      return false if context.user_params[:password].blank? || context.old_password.blank?

      if context.user&.valid_password?(context.old_password) && context.user&.verified?
        update_user_password
      else
        context.fail!(errors: "Incorrect old password")
      end
    end

    def update_user_password
      return true if context.user.update(context.user_params)

      context.fail!(errors: context.user.errors.full_messages)
    end

    def update_name
      return false if context.user_params[:name].blank?

      context.user.update(name: context.user_params[:name])
    end
  end
end
