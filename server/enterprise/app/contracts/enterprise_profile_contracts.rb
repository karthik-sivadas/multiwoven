# frozen_string_literal: true

module EnterpriseProfileContracts
  class Update < Dry::Validation::Contract
    params do
      required(:user).hash do
        optional(:old_password).filled(:string)
        optional(:name).filled(:string)
        optional(:password).filled(:string)
      end
    end

    rule(user: :password) do
      old_password = values.dig(:user, :old_password)
      key.failure("requires old_password to be present") if value.present? && old_password.blank?
    end
  end
end
