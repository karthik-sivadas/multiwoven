# frozen_string_literal: true

module Multiwoven
  module Integrations
<<<<<<< HEAD
    VERSION = "0.1.72"
=======
    VERSION = "0.1.76"
>>>>>>> 29a322e4 (feat(CE): add Iterable connector)

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
<<<<<<< HEAD
      Http
=======
      Iterable
>>>>>>> 29a322e4 (feat(CE): add Iterable connector)
    ].freeze
  end
end
