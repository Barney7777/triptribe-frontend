pipeline {
    agent any
    tools {
        jdk 'jdk-17'
        nodejs 'node-18'
    }
    environment {
        SCANNER_HOME = tool 'sonar-scanner'
        AWS_ACCOUNT_ID = "381491877737"
        AWS_ECR_REPO_NAME = "triptribe-frontend-${env.BRANCH_NAME}"
        AWS_DEFAULT_REGION = "ap-southeast-2"
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/"
        IMAGE_TAG = "${BUILD_NUMBER}"
        GIT_REPO_NAME = "triptribe-gitops"
        GIT_USERNAME = "Barney Wang"
        
    }
    stages {
        // stage('clean workspace') {
        //     steps {
        //         cleanWs()
        //     }
        // }

        stage('Checkout from git') {
            steps {
                git branch: 'main', url: 'https://github.com/Barney7777/triptribe-frontend.git'
            }
        }


        // stage('Install Dependencies') {
        //     steps {
        //         sh "npm install"
        //     }
        // }

        // stage('Sonarqube Analysis') {
        //     steps {
        //         withSonarQubeEnv('sonar-server') {
        //             sh '''
        //             $SCANNER_HOME/bin/sonar-scanner \
        //             -Dsonar.projectName=triptribe-frontend \
        //             -Dsonar.projectKey=triptribe-frontend \
        //             -Dsonar.source=src/ 
        //             '''
        //         }
        //     }
        // }

        // stage('Quality-Gate') {
        //     steps {
        //         script {
        //             waitForQualityGate abortPipeline: false, credentialsId: 'sonar-token'
        //         }
        //     }
        // }

        stage('Docker Image Build') {
            steps {
                script {
                    sh "echo ECR Repo Name: ${AWS_ECR_REPO_NAME}"
                    sh "docker build -t ${AWS_ECR_REPO_NAME}:latest ."

                }

            }
        }

        stage('ECR Image Pushing') {
            steps {
                script {
                    sh "aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${REPOSITORY_URI}"
                    sh "docker tag ${AWS_ECR_REPO_NAME}:latest ${REPOSITORY_URI}${AWS_ECR_REPO_NAME}:${IMAGE_TAG}"
                    sh "docker push ${REPOSITORY_URI}${AWS_ECR_REPO_NAME}:${IMAGE_TAG}"
                    sh "docker push ${AWS_ECR_REPO_NAME}:latest"
                }
            }
        }

        // stage('Cleanup Artifacts') {
        //     steps {
        //         script {
        //             sh "docker rmi ${AWS_ECR_REPO_NAME}:latest"
        //             sh "docker rmi ${REPOSITORY_URI}${AWS_ECR_REPO_NAME}:${IMAGE_TAG}"
        //         }
        //     }
        // }
    }
}
