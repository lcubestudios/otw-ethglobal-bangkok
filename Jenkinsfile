pipeline {
    agent { label 'lcube-web' }
    tools { nodejs 'node-20' }

    environment {
        REPO_NAME = 'otw-ethglobal-bangkok'
        PACKAGE_MANAGER = 'npm'
        BUILD_COMMAND = 'npm run build'
        START_COMMAND = 'npm run start'
        NODE_VERSION = '20.12.2'

        // Apache Configuration
        APACHE_DIR = '/var/www/html'
        SNYK_ID = 'lcube-snyk-token'
        JK_WORKSPACE = '/var/www/jenkins/workspace'
    }

    stages {
        stage("Setup Node.js Environment") {
            steps {
                echo "Setting up Node.js environment with nvm."
                sh """
                    source ~/.nvm/nvm.sh
                    nvm install ${NODE_VERSION}
                    nvm use ${NODE_VERSION}
                    node -v
                    npm -v
                """
            }
        }
        stage("Install Dependencies") {
            steps {
                echo "Installing dependencies on ${NODE_NAME}."
                slackSend color: "warning", message: "Installing dependencies for ${REPO_NAME} from ${BRANCH_NAME} branch..."
                sh 'cd ${JK_WORKSPACE}/${REPO_NAME}_${BRANCH_NAME}/client/ && ${PACKAGE_MANAGER} install'
            }
        }

        stage("Build Application") {
            steps {
                echo "Building the application on ${NODE_NAME}."
                slackSend color: "warning", message: "Starting build process for ${REPO_NAME} from ${BRANCH_NAME} branch..."
                sh 'cd ${JK_WORKSPACE}/${REPO_NAME}_${BRANCH_NAME}/client/ && ${BUILD_COMMAND}'
            }
        }

        stage("Start Next.js Server with PM2") {
            steps {
                echo "Starting the Next.js server with PM2."
                sh """
                    source ~/.nvm/nvm.sh
                    cd ${JK_WORKSPACE}/${REPO_NAME}_${BRANCH_NAME}/client/
                    pm2 stop ${REPO_NAME} || true
                    pm2 start ecosystem.config.js --env production
                    pm2 save
                """
                slackSend color: "good", message: "Next.js server started successfully with PM2 for ${REPO_NAME}."
            }
        }
    }


    post {
        success {
            echo 'The pipeline completed successfully.'
            slackSend color: "good", message: "The pipeline completed successfully. Check the deployed app at https://${BRANCH_NAME}.lcubestudios.io/"
        }
        failure {
            echo 'Pipeline failed, at least one step failed.'
            slackSend color: "danger", message: "Pipeline failed. Check Jenkins console: https://jenkins.lcubestudios.io/job/${REPO_NAME}/job/${BRANCH_NAME}/"
        }
    }
}