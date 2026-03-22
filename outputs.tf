# Outputs

output "ecs_cluster_arn" {
  value = aws_ecs_cluster.ecs_cluster.arn
}

output "rds_endpoint" {
  value = aws_db_instance.rds.endpoint
}

output "alb_dns" {
  value = aws_lb.alb.dns_name
}
