pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    parameters {
        string(name: 'API_BASE_URL', defaultValue: 'http://localhost:8091', description: 'Backend API URL baked into the React build')
        string(name: 'HOST_PORT', defaultValue: '80', description: 'Host port where nginx should serve the frontend')
    }

    environment {
        IMAGE_NAME = 'front-hms'
        CONTAINER_NAME = 'front-hms-nginx'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'CI=true npm test -- --watchAll=false'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                    docker build \
                      --build-arg REACT_APP_API_BASE_URL='${params.API_BASE_URL}' \
                      -t ${IMAGE_NAME}:${IMAGE_TAG} \
                      -t ${IMAGE_NAME}:latest \
                      .
                """
            }
        }

        stage('Deploy') {
            steps {
                sh """
                    docker rm -f ${CONTAINER_NAME} || true
                    docker run -d \
                      --name ${CONTAINER_NAME} \
                      --restart unless-stopped \
                      -p ${params.HOST_PORT}:80 \
                      ${IMAGE_NAME}:latest
                """
            }
        }
    }

    post {
        always {
            sh 'docker image prune -f || true'
        }
        success {
            echo "Frontend deployed at http://localhost:${params.HOST_PORT}"
        }
    }
}
