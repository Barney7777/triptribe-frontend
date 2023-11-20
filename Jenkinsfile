pipeline {
    agent any
    environment {
	VERCEL_TOKEN = 'yUum3VoqZQc2489GYwjDl1oD'
	PROJECT_NAME = 'trip-tribe-frontend' 
	}
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout your source code from version control
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                // Build your application
                sh 'mvn clean install'
            }
        }
        
        stage('Test') {
            steps {
                // Run your tests
                sh 'mvn test'
            }
        }
        stage('Deploy to Vercel') {
            steps {
                script{
                        sh "vercel deploy --prod --token=yUum3VoqZQc2489GYwjDl1oD --yes --project trip-tribe-frontend"
                }
            }
        }
        
        stage('Deploy') {
            steps {
                // Deploy your application
                sh './deploy.sh'
            }
        }
    }
    
    post {
        success {
            // Actions to be taken if the pipeline is successful
            echo 'Pipeline succeeded! Deploying to production...'
        }
        failure {
            // Actions to be taken if the pipeline fails
            echo 'Pipeline failed. Notify the team.'
        }
    }
}
