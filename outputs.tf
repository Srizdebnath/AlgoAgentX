# Outputs — GCP

output "cloud_run_url" {
  value = google_cloud_run_v2_service.cloud_run.uri
}

output "cloud_sql_connection" {
  value = google_sql_database_instance.cloud_sql.connection_name
}
