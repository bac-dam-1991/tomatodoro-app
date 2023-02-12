resource "aws_s3_bucket" "base_infra_bucket" {
  provider      = aws.main_region
  bucket        = var.base_infra_bucket_name
  force_destroy = true

  tags = merge(local.tags, {
    SERVICE = "Infrastructure bucket"
  })
}

resource "aws_s3_bucket_public_access_block" "public_access_block" {
  provider                = aws.main_region
  bucket                  = aws_s3_bucket.base_infra_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_ownership_controls" "app_bucket_ownership_controls" {
  provider = aws.main_region
  bucket   = aws_s3_bucket.base_infra_bucket.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}
