# frozen_string_literal: true

module Multiwoven
  module Integrations
<<<<<<< HEAD
    VERSION = "0.1.75"
=======
    VERSION = "0.5.0"
>>>>>>> d0c9f238 (feat(CE): Add databricks lakehouse destination)

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
      MariaDB
      DatabricksLakehouse
>>>>>>> d0c9f238 (feat(CE): Add databricks lakehouse destination)
    ].freeze
  end
end
