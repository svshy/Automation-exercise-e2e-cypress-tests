pipeline{
    agent any
    parameters{
        string(name: 'SPEC', defaultValue: 'cypress/e2e/*.cy.js', description: "Enter the scripts path that you want execute")
        choice(name: 'BROWSER', choices: ['chrome', 'edge', 'firefox'], description: 'Choice the browser where you want to execute your scripts')
    }
    options{
        ansiColor('xterm')
    }
    stages{
        stage('Building'){
            steps{
            echo "Building the application"
            }
        }
        stage('Testing'){
            steps{
                bat "npm i"
                bat "npx cypress run --browser ${BROWSER} --spec ${SPEC}"
            }
        }
        stage('Deploying'){
            steps{
            echo "Deploy the application"
            }
        }
    }
    post{
        always{
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'cypress/reports/html', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: '', useWrapperFileDirectly: true])
        }
    }
}