pipeline {
    agent { label 'lcube-web' }
    tools { nodejs 'node-20' }

    environment {
        REPO_NAME = 'otw-ethglobal-bangkok'
        PACKAGE_MANAGER = 'npm'
        BUILD_COMMAND = 'npm run build'
        START_COMMAND = 'npm run start'
        
        NEXT_PUBLIC_PRIVY_APP_ID='cm3juc4bo00mz28ul3iduqvf1'
        PRIVY_APP_SECRET='3nBoKmDYJWz8ya2q9eBTABjzx6ofjyeDBc1pdF9zVfY22syc5EghoCGsTMFLJoebKU2cfjGjnzuV7csshMNiGLAS'

        // Apache Configuration
        APACHE_DIR = '/var/www/html'
        SNYK_ID = 'lcube-snyk-token'
        JK_WORKSPACE = '/var/www/jenkins/workspace'
    }

    stages {
        stage("Create .env File") {
            steps {
                echo "Creating .env file from Jenkins environment variables."
                sh """
                    cd ${JK_WORKSPACE}/${REPO_NAME}_${BRANCH_NAME}/client/
                    cat > .env <<EOF
                    NEXT_PUBLIC_PRIVY_APP_ID=${NEXT_PUBLIC_PRIVY_APP_ID}
                    PRIVY_APP_SECRET=${PRIVY_APP_SECRET}
                    NODE_ENV=production
                    PORT=3000
                    EOF
                """
                echo "Successfully created .env file."
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