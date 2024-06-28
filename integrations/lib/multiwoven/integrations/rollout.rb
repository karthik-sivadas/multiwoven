# frozen_string_literal: true

module Multiwoven
  module Integrations
<<<<<<< HEAD
    VERSION = "0.1.75"
=======
    VERSION = "0.3.3"
>>>>>>> 677e38a2 (fix(CE): handle S3 credentials (#246))

    ENABLED_SOURCES = %w[
      Snowflake
      Redshift
      Bigquery
      Postgresql
      Databricks
      SalesforceConsumerGoodsCloud
      AwsAthena
      Clickhouse
    ].freeze

    ENABLED_DESTINATIONS = %w[
      Klaviyo
      SalesforceCrm
      FacebookCustomAudience
      Slack
      Hubspot
      GoogleSheets
      Airtable
      Stripe
      SalesforceConsumerGoodsCloud
      Sftp
      Postgresql
      Zendesk
      Http
    ].freeze
  end
end
