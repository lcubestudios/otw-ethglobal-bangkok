pipeline {
    agent { label 'frontend-node' }
    tools { nodejs 'node-20' }

    environment {
        REPO_NAME = 'otw-ethglobal-bangkok'
        PACKAGE_MANAGER = 'npm'
        BUILD_COMMAND = 'npm run build'
        
        // Environment Variables
        REACT_APP_BACKEND_URL = 'http://localhost:3000'
        REACT_APP_PRIVY_APP_ID = 'cm3juc4bo00mz28ul3iduqvf1'
        
        // Apache Configuration
        APACHE_DIR = '/var/www/html'
        SNYK_ID = 'lcube-snyk-token'
        JK_WORKSPACE = '/var/www/jenkins/workspace'
    }

    stages {
        stage("Install Dependencies") {
            steps {
                echo "Installing dependencies on ${NODE_NAME}."
                slackSend color: "warning", message: "Installing dependencies for ${REPO_NAME} from ${BRANCH_NAME} branch..."
                sh 'cd ${JK_WORKSPACE}/${REPO_NAME}_${BRANCH_NAME} && ${PACKAGE_MANAGER} install'
            }
        }

        stage("Build Application") {
            steps {
                echo "Building the application on ${NODE_NAME}."
                slackSend color: "warning", message: "Starting build process for ${REPO_NAME} from ${BRANCH_NAME} branch..."
                sh 'cd ${JK_WORKSPACE}/${REPO_NAME}_${BRANCH_NAME} && ${BUILD_COMMAND}'
            }
        }

        stage("Deploy to Server") {
            steps {
                echo "Deploying the application to Apache server."
                sh "if [ ! -d ${APACHE_DIR}/${BRANCH_NAME}/${REPO_NAME}/ ]; then mkdir -p ${APACHE_DIR}/${BRANCH_NAME}/${REPO_NAME}/; fi"
                sh "rsync -Puqr --delete-during ${JK_WORKSPACE}/${REPO_NAME}_${BRANCH_NAME}/build/ ${APACHE_DIR}/${BRANCH_NAME}/${REPO_NAME}/"
                slackSend color: "good", message: "Deployment successful for ${REPO_NAME}."
            }
        }
    }

    post {
        success {
            echo 'The pipeline completed successfully.'
            slackSend color: "good", message: "The pipeline completed successfully. Check the deployed app at https://${BRANCH_NAME}.lcubestudios.io/${REPO_NAME}/"
        }
        failure {
            echo 'Pipeline failed, at least one step failed.'
            slackSend color: "danger", message: "Pipeline failed. Check Jenkins console: https://jenkins.lcubestudios.io/job/${REPO_NAME}/job/${BRANCH_NAME}/"
        }
    }
}