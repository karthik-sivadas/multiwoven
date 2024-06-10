# frozen_string_literal: true

require "rails_helper"

RSpec.describe Enterprise::Api::V1::ProfilesController, type: :controller do
  let(:workspace) { create(:workspace) }
  let!(:workspace_id) { workspace.id }
  let(:user) { workspace.workspace_users.first.user }

  before do
    user.update!(password: "Password@123$", confirmed_at: Time.current)
  end

  describe "PATCH /enterprise/api/v1/profile" do
    context "when unauthenticated" do
      it "returns unauthorized" do
        patch :update,
              params: { user: { old_password: user.password, password: "new_password" } }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when authenticated" do
      context "with valid params" do
        it "updates the user's profile password and returns success" do
          request.headers.merge!(auth_headers(user, workspace_id))
          patch :update, params: { user: { old_password: user.password, password: "Hello@1234" } }
          expect(response).to have_http_status(:ok)
          response_hash = JSON.parse(response.body).with_indifferent_access
          expect(response_hash.dig(:data, :id)).to eq(user.id.to_s)
          expect(response_hash.dig(:data, :attributes, :name)).to eq(user.name)
        end

        it "updates the user's profile password and name and returns success" do
          request.headers.merge!(auth_headers(user, workspace_id))
          patch :update, params: { user: { old_password: user.password, password: "Hello@1234", name: "Test" } }
          expect(response).to have_http_status(:ok)
          response_hash = JSON.parse(response.body).with_indifferent_access
          expect(response_hash.dig(:data, :id)).to eq(user.id.to_s)
          expect(response_hash.dig(:data, :attributes, :name)).to eq("Test")
        end

        it "updates the user's name and returns success" do
          request.headers.merge!(auth_headers(user, workspace_id))
          patch :update, params: { user: { name: "Test" } }
          expect(response).to have_http_status(:ok)
          response_hash = JSON.parse(response.body).with_indifferent_access
          expect(response_hash.dig(:data, :id)).to eq(user.id.to_s)
          expect(response_hash.dig(:data, :attributes, :name)).to eq("Test")
        end
      end

      context "with invalid params" do
        it "returns unprocessable entity" do
          request.headers.merge!(auth_headers(user, workspace_id))
          patch :update,
                params: { user: { password: "new_password" } }

          expect(response).to have_http_status(:bad_request)
          response_hash = JSON.parse(response.body).with_indifferent_access
          expect(response_hash.dig(:errors, 0, :detail)).to include("password requires old_password to be present")
        end
      end

      context "with incorrect old password" do
        it "returns unprocessable entity" do
          request.headers.merge!(auth_headers(user, workspace_id))
          patch :update,
                params: { user: { old_password: "invalid", password: "new_password" } }

          expect(response).to have_http_status(:unprocessable_entity)
          response_hash = JSON.parse(response.body).with_indifferent_access
          expect(response_hash[:errors]).to include("Incorrect old password")
        end
      end
    end
  end
end
