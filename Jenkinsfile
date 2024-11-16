pipeline {
    agent { label 'lcube-web' }
    tools { nodejs 'node-20' }

    environment {
        REPO_NAME = 'otw-ethglobal-bangkok'
        PACKAGE_MANAGER = 'npm'
        BUILD_COMMAND = 'npm run build'
        START_COMMAND = 'npm run start'
        
        // Environment Variables
        NEXT_PUBLIC_PRIVY_APP_ID = 'cm3juc4bo00mz28ul3iduqvf1'
        PRIVY_APP_SECRET = '3nBoKmDYJWz8ya2q9eBTABjzx6ofjyeDBc1pdF9zVfY22syc5EghoCGsTMFLJoebKU2cfjGjnzuV7csshMNiGLAS'
        
        // Apache Configuration
        APACHE_DIR = '/var/www/html'
        SNYK_ID = 'lcube-snyk-token'
        JK_WORKSPACE = '/var/www/jenkins/workspace'
        NEXT_PORT = '3000'
    }

    stages {
        stage("Install Dependencies") {
            steps {
                echo "Installing dependencies on ${NODE_NAME}."
                slackSend color: "warning", message: "Installing dependencies for ${REPO_NAME} from ${BRANCH_NAME} branch..."
                sh 'npm cache clean --force'
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
        stage("Install PM2 Globally") {
            steps {
                echo "Installing PM2 globally."
                sh 'npm install -g pm2'
                sh 'pm2 --version'
            }
        }

        stage("Start Next.js Server") {
            steps {
                echo "Starting the Next.js server with local PM2."
                sh 'cd ${JK_WORKSPACE}/${REPO_NAME}_${BRANCH_NAME} && npx pm2 stop ${REPO_NAME} || true'
                sh 'cd ${JK_WORKSPACE}/${REPO_NAME}_${BRANCH_NAME} && npx pm2 start npm --name ${REPO_NAME} -- run start'
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