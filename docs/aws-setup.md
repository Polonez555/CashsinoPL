# AWS Educate Setup Guide

This guide walks you through setting up an AWS Educate account for the CashsinoPL project.

## Step 1: Register for AWS Educate

1. Visit the AWS Educate registration page: https://aws.amazon.com/education/awseducate/
2. Click on **"Join AWS Educate"** or **"Create an Account"**
3. Fill in your personal and academic information:
   - Email address (use your academic email if available)
   - Full name
   - Institution/School name
   - Country/Region
4. Accept the AWS Educate terms and conditions
5. Complete any verification steps required

## Step 2: Confirm Your Email

1. Check your email inbox for a verification message from AWS Educate
2. Click the verification link in the email
3. Your account will be activated and ready to use

## Step 3: Set Up Your AWS Console Region

1. Log in to your AWS Educate account
2. Access the AWS Console from your AWS Educate dashboard
3. **Important**: Set your region to **eu-central-1 (Frankfurt)**
   - Click on the region selector in the top-right corner of the AWS Console
   - Select **Europe (Frankfurt) eu-central-1** from the dropdown menu
   - This ensures compliance with data regulations and optimal latency

## Step 4: Note Your Account ID

1. In the AWS Console, click on your account name/number in the top-right
2. Select **"My Account"** from the dropdown
3. Copy your **Account ID** (12-digit number)
4. Save it in a secure location - you'll need it for:
   - AWS IAM roles and policies
   - CloudFormation templates
   - Billing and cost tracking

## Step 5: Configure Security Credentials

1. From the AWS Console, navigate to **IAM (Identity and Access Management)**
2. Create an IAM user with appropriate permissions for development:
   - Go to **Users** → **Add users**
   - Username: `cashsinopl-dev` (or your preferred name)
   - Select **"Access key - Programmatic access"**
   - Attach appropriate policies (e.g., `AdministratorAccess` for development)

## Step 6: Generate Access Keys

1. After creating the IAM user, generate access keys:
   - Go to **Security credentials** tab
   - Click **"Create access key"**
   - Download and securely store:
     - **Access Key ID**
     - **Secret Access Key**
   - **Important**: These credentials are only shown once! Save them securely.

## Step 7: Configure AWS CLI (Optional)

```bash
# Install AWS CLI if not already installed
brew install awscli  # macOS
# or
npm install -g awscli

# Configure AWS CLI
aws configure
```

You'll be prompted for:
- **AWS Access Key ID**: (from Step 6)
- **AWS Secret Access Key**: (from Step 6)
- **Default region name**: `eu-central-1`
- **Default output format**: `json`

## Step 8: Verify Your Setup

```bash
# Verify AWS credentials are working
aws sts get-caller-identity
```

Expected output:
```json
{
  "UserId": "AIDAI...",
  "Account": "123456789012",
  "Arn": "arn:aws:iam::123456789012:user/cashsinopl-dev"
}
```

## Important Notes

### AWS Educate Limitations

- AWS Educate accounts have limited resources compared to standard AWS accounts
- Some services may not be available or have restrictions
- Monitor your service usage and costs regularly
- Educate accounts may have a monthly credit limit

### Best Practices

1. **Always use the Frankfurt region (eu-central-1)** for this project
2. **Enable MFA (Multi-Factor Authentication)** on your root account and IAM users
3. **Use IAM roles** instead of access keys when possible
4. **Monitor costs** using AWS Billing Dashboard
5. **Clean up resources** when not in use to avoid unnecessary charges

### Resources

- [AWS Educate Student Portal](https://aws.amazon.com/education/awseducate/)
- [AWS Documentation](https://docs.aws.amazon.com/)
- [AWS CLI Command Reference](https://docs.aws.amazon.com/cli/latest/reference/)
- [eu-central-1 Region Services](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/)

## Troubleshooting

### Can't access certain services
- Some services may not be available in AWS Educate accounts
- Check the [AWS Educate FAQ](https://aws.amazon.com/education/awseducate/faqs/) for limitations

### Region not working
- Ensure you've selected `eu-central-1` in the AWS Console
- Verify your AWS CLI is configured with the correct region

### Access denied errors
- Check that your IAM user has the necessary permissions
- Verify your access keys are correctly configured
- Ensure you're using the correct account ID

## Next Steps

Once your AWS Educate account is set up, you can:
1. Deploy the CashsinoPL application to AWS
2. Set up CI/CD pipelines with AWS CodePipeline
3. Configure monitoring and logging with CloudWatch
4. Implement infrastructure as code with CloudFormation or Terraform

For project-specific AWS configurations, refer to the project's deployment documentation.