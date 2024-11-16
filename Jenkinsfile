pipeline {
    agent { label 'lcube-web' }
    tools { nodejs 'node-20' }

    environment {
        REPO_NAME = 'otw-ethglobal-bangkok'
        PACKAGE_MANAGER = 'npm'
        BUILD_COMMAND = 'npm run build'
        START_COMMAND = 'npm run start'
        NODE_VERSION = '20.12.2'
        
        NEXT_PUBLIC_PRIVY_APP_ID='cm3juc4bo00mz28ul3iduqvf1'
        PRIVY_APP_SECRET='3nBoKmDYJWz8ya2q9eBTABjzx6ofjyeDBc1pdF9zVfY22syc5EghoCGsTMFLJoebKU2cfjGjnzuV7csshMNiGLAS'

        // Apache Configuration
        APACHE_DIR = '/var/www/html'
        SNYK_ID = 'lcube-snyk-token'
        JK_WORKSPACE = '/var/www/jenkins/workspace'
    }

    stages {
        stage("Install NVM and Setup Node.js") {
            steps {
                echo "Installing NVM and setting up Node.js environment."
                sh """
                    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
                    export NVM_DIR="\$HOME/.nvm"
                    [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
                    nvm install ${NODE_VERSION}
                    nvm use ${NODE_VERSION}
                    node -v
                    npm -v
                """
            }
        }

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

        stage("Start Next.js Server with PM2") {
            steps {
                echo "Starting the Next.js server with PM2."
                sh """
                    export NVM_DIR="\$HOME/.nvm"
                    [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
                    cd ${JK_WORKSPACE}/${REPO_NAME}_${BRANCH_NAME}/client/
                    pm2 stop ${REPO_NAME} || true
                    pm2 start ecosystem.config.js
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