# frozen_string_literal: true

require "rails_helper"

RSpec.describe EnterpriseProfileContracts::Update do
  subject(:contract) { described_class.new }

  context "when parameters are valid" do
    let(:valid_inputs) do
      {
        user: {
          old_password: "old_password",
          name: "New Name",
          password: "new_password"
        }
      }
    end

    it "passes validation" do
      result = contract.call(valid_inputs)
      expect(result).to be_success
    end
  end

  context "when old_password is missing" do
    let(:invalid_inputs) do
      {
        user: {
          name: "New Name",
          password: "new_password"
        }
      }
    end

    it "passes validation" do
      result = contract.call(invalid_inputs)
      expect(result.errors.to_h[:user]).to include(password:
      ["requires old_password to be present"])
    end
  end

  context "when name is missing" do
    let(:invalid_inputs) do
      {
        user: {
          old_password: "old_password",
          password: "new_password"
        }
      }
    end

    it "passes validation" do
      result = contract.call(invalid_inputs)
      expect(result).to be_success
    end
  end

  context "when password is missing" do
    let(:invalid_inputs) do
      {
        user: {
          old_password: "old_password",
          name: "New Name"
        }
      }
    end

    it "passes validation" do
      result = contract.call(invalid_inputs)
      expect(result).to be_success
    end
  end

  context "when all fields are missing" do
    let(:invalid_inputs) do
      {
        user: {}
      }
    end

    it "passes validation" do
      result = contract.call(invalid_inputs)
      expect(result).to be_success
    end
  end

  context "when old_password is not a string" do
    let(:invalid_inputs) do
      {
        user: {
          old_password: 123,
          name: "New Name",
          password: "new_password"
        }
      }
    end

    it "fails validation" do
      result = contract.call(invalid_inputs)
      expect(result.errors.to_h).to have_key(:user)
      expect(result.errors[:user]).to have_key(:old_password)
      expect(result.errors[:user][:old_password]).to include("must be a string")
    end
  end

  context "when name is not a string" do
    let(:invalid_inputs) do
      {
        user: {
          old_password: "old_password",
          name: 123,
          password: "new_password"
        }
      }
    end

    it "fails validation" do
      result = contract.call(invalid_inputs)
      expect(result.errors.to_h).to have_key(:user)
      expect(result.errors[:user]).to have_key(:name)
      expect(result.errors[:user][:name]).to include("must be a string")
    end
  end

  context "when password is not a string" do
    let(:invalid_inputs) do
      {
        user: {
          old_password: "old_password",
          name: "New Name",
          password: 123
        }
      }
    end

    it "fails validation" do
      result = contract.call(invalid_inputs)
      expect(result.errors.to_h).to have_key(:user)
      expect(result.errors[:user]).to have_key(:password)
      expect(result.errors[:user][:password]).to include("must be a string")
    end
  end
end
