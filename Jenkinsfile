pipeline {
    agent any
    tools {
        jdk 'jdk-17'
        nodejs 'node-18'
    }
    environment {
        AWS_ACCOUNT_ID = "381491877737"
        AWS_ECR_REPO_NAME = "triptribe-frontend-${env.BRANCH_NAME}"
        AWS_DEFAULT_REGION = "ap-southeast-2"
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/"
        IMAGE_TAG = "${BUILD_NUMBER}"
        // GIT_REPO_NAME = "triptribe-gitops"
        // GIT_USERNAME = "Barney Wang"
        
    }
    stages {
        stage('Docker Image Build') {
            steps {
                script {
                    sh "echo ECR Repo Name: ${AWS_ECR_REPO_NAME}"
                    sh "docker build -t ${REPOSITORY_URI}${AWS_ECR_REPO_NAME}:latest ."

                }

            }
        }

        stage('ECR Image Pushing') {
            steps {
                script {
                    sh "aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${REPOSITORY_URI}"
                    sh "docker tag ${REPOSITORY_URI}${AWS_ECR_REPO_NAME}:latest ${REPOSITORY_URI}${AWS_ECR_REPO_NAME}:${IMAGE_TAG}"
                    sh "docker push ${REPOSITORY_URI}${AWS_ECR_REPO_NAME}:${IMAGE_TAG}"
                    sh "docker push ${REPOSITORY_URI}${AWS_ECR_REPO_NAME}:latest"
                }
            }
        }

        stage('Cleanup Artifacts') {
            steps {
                script {
                    sh "docker rmi ${REPOSITORY_URI}${AWS_ECR_REPO_NAME}:latest"
                    sh "docker rmi ${REPOSITORY_URI}${AWS_ECR_REPO_NAME}:${IMAGE_TAG}"
                }
            }
        }

        stage('Checkout Code from Gitops') {
            steps {
                git branch: 'dev', credentialsId: 'gitlab-token', url: 'https://gitlab.com/terraform3895216/triptribe-gitops.git'
            }
        }

        stage ('update k8s manifests') {
            steps {
                sh """
                cd triptribe-k8s-manifests/dev/frontend
                cat triptribe.yml
                sed -i 's|image: .*|image: ${REPOSITORY_URI}${AWS_ECR_REPO_NAME}:${IMAGE_TAG}|' triptribe.yml
                cat triptribe.yml
                git config --global user.name "Barney7777"
                git config --global user.email "wangyaxu7@gmail.com"
                git add triptribe.yml
                git commit -m "Update Deployment Manifest for ${REPOSITORY_URI}${AWS_ECR_REPO_NAME}:${IMAGE_TAG}"
            """
            withCredentials([gitUsernamePassword(credentialsId: 'gitlab-token', gitToolName: 'Default')]) {
                    // sh "git push https://gitlab.com/${GIT_USERNAME}/${GIT_REPO_NAME}.git dev"
                    sh "git push https://gitlab.com/terraform3895216/triptribe-gitops.git dev"
                }
            }  
        }
    }
}
