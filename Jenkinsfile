pipeline {
    agent any

    environment {
        PROJECT_NAME = 'CashsinoPL'
        BACKEND_DIR  = 'backend'
        FRONTEND_DIR = 'frontend'
        E2E_DIR      = 'e2e'
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out ${PROJECT_NAME}..."
                checkout scm
                sh 'git log -1 --oneline'
            }
        }

        stage('Install') {
            parallel {
                stage('Backend') {
                    steps {
                        dir(BACKEND_DIR) { sh 'npm ci' }
                    }
                }
                stage('Frontend') {
                    steps {
                        dir(FRONTEND_DIR) { sh 'npm ci' }
                    }
                }
            }
        }

        stage('Lint') {
            parallel {
                stage('Backend Lint') {
                    steps {
                        dir(BACKEND_DIR) { sh 'npm run lint || true' }
                    }
                }
                stage('Frontend Lint') {
                    steps {
                        dir(FRONTEND_DIR) { sh 'npm run lint || true' }
                    }
                }
            }
        }

        stage('Test') {
            parallel {
                stage('Backend Unit') {
                    steps {
                        dir(BACKEND_DIR) { sh 'npm run test:unit -- --coverage' }
                    }
                }
                stage('Backend Integration') {
                    steps {
                        dir(BACKEND_DIR) { sh 'npm run test:integration' }
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir(FRONTEND_DIR) { sh 'npm run build' }
            }
        }

        stage('E2E Tests') {
            steps {
                dir(BACKEND_DIR) { sh 'npm start &' }
                dir(FRONTEND_DIR) { sh 'npm run preview -- --port 3000 &' }
                sh 'npx wait-on http://localhost:3000 http://localhost:5000/api/health --timeout 30000'
                dir(E2E_DIR) {
                    sh 'npm ci && npx playwright install --with-deps && npm test'
                }
            }
            post {
                always {
                    publishHTML(target: [
                        reportDir: "${E2E_DIR}/playwright-report",
                        reportFiles: 'index.html',
                        reportName: 'Playwright E2E Report',
                        keepAll: true
                    ])
                }
            }
        }

        stage('SonarQube Analysis') {
            when { branch 'main' }
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'sonar-scanner'
                }
            }
        }

        stage('Quality Gate') {
            when { branch 'main' }
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }

    post {
        success {
            echo "========================================\n✓ Pipeline SUCCEEDED for ${PROJECT_NAME}\nBranch: ${env.BRANCH_NAME} | Build: #${env.BUILD_NUMBER}\n========================================"
        }
        failure {
            echo "========================================\n✗ Pipeline FAILED for ${PROJECT_NAME}\nBranch: ${env.BRANCH_NAME} | Build: #${env.BUILD_NUMBER}\n========================================"
        }
        always {
            cleanWs()
        }
    }
}
