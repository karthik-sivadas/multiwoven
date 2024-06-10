# frozen_string_literal: true

module Enterprise
  module Api
    module V1
      class ProfilesController < EnterpriseBaseController
        include Profiles

        def update
          result = UpdateProfile.call(
            user: current_user,
            old_password: params[:user][:old_password],
            user_params:
          )

          if result.success?
            render json: result.user, status: :ok
          else
            render json: { errors: result.errors }, status: :unprocessable_entity
          end
        end

        private

        def user_params
          user_params = params.require(:user).permit(:name, :password)
          user_params[:password_confirmation] = user_params[:password]
          user_params
        end
      end
    end
  end
end
