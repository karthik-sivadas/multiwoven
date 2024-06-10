# frozen_string_literal: true

require "rails_helper"

RSpec.describe Profiles::UpdateProfile, type: :interactor do
  let(:user) { create(:user, password: "Password@123", password_confirmation: "Password@123") }

  describe ".call" do
    context "with valid params" do
      let(:context_params) do
        {
          user_params: { name: "New Name" },
          old_password: "old_password",
          user:
        }
      end

      it "updates the profile successfully" do
        result = described_class.call(context_params)

        expect(result.success?).to eq(true)
        expect(result.message).to eq("Profile updated successfully!")
        expect(result.user.reload.name).to eq("New Name")
      end
    end

    context "with valid password" do
      let(:context_params) do
        {
          user_params: { password: "Today@980", password_confirmation: "Today@980", name: "New Name" },
          old_password: "Password@123",
          user:
        }
      end
      before { user.update!(confirmed_at: Time.current) }
      it "updates the profile successfully" do
        result = described_class.call(context_params)

        expect(result.success?).to eq(true)
        expect(result.message).to eq("Profile updated successfully!")
        expect(result.user.reload.name).to eq("New Name")
      end
    end

    context "with invalid old password" do
      let(:context_params) do
        {
          user_params: { name: "New Name", password: "new_password" },
          old_password: "invalid_old_password",
          user:
        }
      end

      it "fails with an error message" do
        result = described_class.call(context_params)

        expect(result.failure?).to eq(true)
        expect(result.errors).to eq("Incorrect old password")
      end
    end

    context "with blank name" do
      let(:context_params) do
        {
          user_params: { name: "" },
          old_password: "old_password",
          user:
        }
      end

      it "does not update the profile and returns false" do
        result = described_class.call(context_params)
        expect(result.success?).to eq(false)
        expect(result.errors).to eq("Profile not updated")
        expect(user.reload.name).not_to eq("")
      end
    end

    context "with blank password" do
      let(:context_params) do
        {
          user_params: { password: "" },
          old_password: "old_password",
          user:
        }
      end

      it "does not update the profile and returns false" do
        result = described_class.call(context_params)

        expect(result.success?).to eq(false)
        expect(result.errors).to eq("Profile not updated")
        expect(user.reload.encrypted_password).not_to eq("")
      end
    end
  end
end
