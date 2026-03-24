pipeline {
    agent any
    
    environment {
        PROJECT_NAME = 'CashsinoPL'
        BRANCH_NAME = 'main'
        NODE_VERSION = '20'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
                sh 'git log -1'
            }
        }
        
        stage('Install') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm ci'
            }
        }
        
        stage('Lint') {
            steps {
                echo 'Running linter...'
                sh 'npm run lint-check || true'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building application...'
                sh 'npm run build'
            }
        }
    }
    
    post {
        success {
            echo """
            ========================================
            ✓ Pipeline SUCCEEDED for ${PROJECT_NAME}
            Branch: ${BRANCH_NAME}
            Build Number: ${BUILD_NUMBER}
            ========================================
            """
        }
        
        failure {
            echo """
            ========================================
            ✗ Pipeline FAILED for ${PROJECT_NAME}
            Branch: ${BRANCH_NAME}
            Build Number: ${BUILD_NUMBER}
            ========================================
            """
        }
        
        always {
            echo 'Pipeline execution completed.'
            cleanWs()
        }
    }
}